"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositiveIdParamsValidator = exports.CategoryValidator = void 0;

var _linValidatorV = require("../core/lin-validator-v2");

class CategoryValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.name = [new _linValidatorV.Rule('isLength', '分类名字不能为空', {
      min: 1
    })];
    this.key = [new _linValidatorV.Rule('isLength', '分类关键字不能为空', {
      min: 1
    })];
  }

}

exports.CategoryValidator = CategoryValidator;

class PositiveIdParamsValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.id = [new _linValidatorV.Rule('isInt', '分类ID需要正整数', {
      min: 1
    })];
  }

}

exports.PositiveIdParamsValidator = PositiveIdParamsValidator;