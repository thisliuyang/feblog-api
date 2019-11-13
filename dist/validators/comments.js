"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositiveArticleIdParamsValidator = exports.CommentsValidator = void 0;

var _linValidatorV = require("../core/lin-validator-v2");

class CommentsValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.nickname = [new _linValidatorV.Rule('isLength', '评论人名字不能为空', {
      min: 1
    })];
    this.email = [new _linValidatorV.Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')];
    this.content = [new _linValidatorV.Rule('isLength', '评论内容名字不能为空', {
      min: 1
    })];
    this.article_id = [new _linValidatorV.Rule('isLength', '文章ID不能为空', {
      min: 1
    })];
  }

}

exports.CommentsValidator = CommentsValidator;

class PositiveArticleIdParamsValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.id = [new _linValidatorV.Rule('isInt', '评论ID需要正整数', {
      min: 1
    })];
  }

}

exports.PositiveArticleIdParamsValidator = PositiveArticleIdParamsValidator;