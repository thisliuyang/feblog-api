"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositiveIntegerValidator = void 0;

var _linValidatorV = require("../../core/lin-validator-v2");

class PositiveIntegerValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.id = [new _linValidatorV.Rule('isInt', '需要正整数', {
      min: 1
    })];
  }

}

exports.PositiveIntegerValidator = PositiveIntegerValidator;