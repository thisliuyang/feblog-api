"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenNotEmptyValidator = void 0;

var _linValidatorV = require("../../core/lin-validator-v2");

class TokenNotEmptyValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.token = [new _linValidatorV.Rule('isLength', '不允许为空', {
      min: 1
    })];
  }

}

exports.TokenNotEmptyValidator = TokenNotEmptyValidator;