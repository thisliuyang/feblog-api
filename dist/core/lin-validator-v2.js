"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinValidator = exports.Rule = void 0;

var _httpException = require("./http-exception");

var _lodash = require("lodash");

var _validator = _interopRequireDefault(require("validator"));

var _util = require("./util");

class LinValidator {
  constructor() {
    this.data = {};
    this.parsed = {};
  }

  _assembleAllParams(ctx) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      path: ctx.params,
      header: ctx.request.header
    };
  }

  get(path, parsed = true) {
    if (parsed) {
      const value = (0, _lodash.get)(this.parsed, path, null);

      if (value == null) {
        const keys = path.split('.');
        const key = (0, _lodash.last)(keys);
        return (0, _lodash.get)(this.parsed.default, key);
      }

      return value;
    } else {
      return (0, _lodash.get)(this.data, path);
    }
  }

  _findMembersFilter(key) {
    if (/validate([A-Z])\w+/g.test(key)) {
      return true;
    }

    if (this[key] instanceof Array) {
      this[key].forEach(value => {
        const isRuleType = value instanceof Rule;

        if (!isRuleType) {
          throw new Error('验证数组必须全部为Rule类型');
        }
      });
      return true;
    }

    return false;
  }

  async validate(ctx, alias = {}) {
    this.alias = alias;

    const params = this._assembleAllParams(ctx);

    this.data = (0, _lodash.cloneDeep)(params);
    this.parsed = (0, _lodash.cloneDeep)(params);
    const memberKeys = (0, _util.findMembers)(this, {
      filter: this._findMembersFilter.bind(this)
    });
    const errorMsgs = []; // const map = new Map(memberKeys)

    for (const key of memberKeys) {
      const result = await this._check(key, alias);

      if (!result.success) {
        errorMsgs.push(result.msg);
      }
    }

    if (errorMsgs.length !== 0) {
      throw new _httpException.ParameterException(errorMsgs);
    }

    ctx.v = this;
    return this;
  }

  async _check(key, alias = {}) {
    const isCustomFunc = typeof this[key] === 'function';
    let result;

    if (isCustomFunc) {
      try {
        await this[key](this.data);
        result = new RuleResult(true);
      } catch (error) {
        result = new RuleResult(false, error.msg || error.message || '参数错误');
      } // 函数验证

    } else {
      // 属性验证, 数组，内有一组Rule
      const rules = this[key];
      const ruleField = new RuleField(rules); // 别名替换

      key = alias[key] ? alias[key] : key;

      const param = this._findParam(key);

      result = ruleField.validate(param.value);

      if (result.pass) {
        // 如果参数路径不存在，往往是因为用户传了空值，而又设置了默认值
        if (param.path.length === 0) {
          (0, _lodash.set)(this.parsed, ['default', key], result.legalValue);
        } else {
          (0, _lodash.set)(this.parsed, param.path, result.legalValue);
        }
      }
    }

    if (!result.pass) {
      const msg = `${isCustomFunc ? '' : key}${result.msg}`;
      return {
        msg: msg,
        success: false
      };
    }

    return {
      msg: 'ok',
      success: true
    };
  }

  _findParam(key) {
    let value;
    value = (0, _lodash.get)(this.data, ['query', key]);

    if (value) {
      return {
        value,
        path: ['query', key]
      };
    }

    value = (0, _lodash.get)(this.data, ['body', key]);

    if (value) {
      return {
        value,
        path: ['body', key]
      };
    }

    value = (0, _lodash.get)(this.data, ['path', key]);

    if (value) {
      return {
        value,
        path: ['path', key]
      };
    }

    value = (0, _lodash.get)(this.data, ['header', key]);

    if (value) {
      return {
        value,
        path: ['header', key]
      };
    }

    return {
      value: null,
      path: []
    };
  }

}

exports.LinValidator = LinValidator;

class RuleResult {
  constructor(pass, msg = '') {
    Object.assign(this, {
      pass,
      msg
    });
  }

}

class RuleFieldResult extends RuleResult {
  constructor(pass, msg = '', legalValue = null) {
    super(pass, msg);
    this.legalValue = legalValue;
  }

}

class Rule {
  constructor(name, msg, ...params) {
    Object.assign(this, {
      name,
      msg,
      params
    });
  }

  validate(field) {
    if (this.name === 'isOptional') {
      return new RuleResult(true);
    }

    if (!_validator.default[this.name](field + '', ...this.params)) {
      return new RuleResult(false, this.msg || this.message || '参数错误');
    }

    return new RuleResult(true, '');
  }

}

exports.Rule = Rule;

class RuleField {
  constructor(rules) {
    this.rules = rules;
  }

  validate(field) {
    if (field == null) {
      // 如果字段为空
      const allowEmpty = this._allowEmpty();

      const defaultValue = this._hasDefault();

      if (allowEmpty) {
        return new RuleFieldResult(true, '', defaultValue);
      } else {
        return new RuleFieldResult(false, '字段是必填参数');
      }
    }

    const filedResult = new RuleFieldResult(false);

    for (const rule of this.rules) {
      const result = rule.validate(field);

      if (!result.pass) {
        filedResult.msg = result.msg;
        filedResult.legalValue = null; // 一旦一条校验规则不通过，则立即终止这个字段的验证

        return filedResult;
      }
    }

    return new RuleFieldResult(true, '', this._convert(field));
  }

  _convert(value) {
    for (const rule of this.rules) {
      if (rule.name === 'isInt') {
        return parseInt(value);
      }

      if (rule.name === 'isFloat') {
        return parseFloat(value);
      }

      if (rule.name === 'isBoolean') {
        return !!value;
      }
    }

    return value;
  }

  _allowEmpty() {
    for (const rule of this.rules) {
      if (rule.name === 'isOptional') {
        return true;
      }
    }

    return false;
  }

  _hasDefault() {
    for (const rule of this.rules) {
      const defaultValue = rule.params[0];

      if (rule.name === 'isOptional') {
        return defaultValue;
      }
    }
  }

}