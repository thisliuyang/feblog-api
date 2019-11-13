"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleSearchValidator = exports.PositiveIdParamsValidator = exports.ArticleValidator = void 0;

var _linValidatorV = require("../core/lin-validator-v2");

var _category = require("../models/category");

class ArticleValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.title = [new _linValidatorV.Rule('isLength', 'title不能为空', {
      min: 1
    })];
    this.author = [new _linValidatorV.Rule('isLength', 'author不能为空', {
      min: 1
    })];
    this.cover = [new _linValidatorV.Rule('isLength', 'cover不能为空', {
      min: 1
    })];
    this.content = [new _linValidatorV.Rule('isLength', 'content不能为空', {
      min: 1
    })];
    this.category_id = [new _linValidatorV.Rule('isLength', 'category_id不能为空', {
      min: 1
    })];
  }

  async validateCategoryId(vals) {
    const categoryId = vals.body.category_id;
    const category = await _category.Category.findOne({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      throw new Error('暂无此分类ID');
    }
  }

}

exports.ArticleValidator = ArticleValidator;

class PositiveIdParamsValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.id = [new _linValidatorV.Rule('isInt', '文章ID需要正整数', {
      min: 1
    })];
  }

}

exports.PositiveIdParamsValidator = PositiveIdParamsValidator;

class ArticleSearchValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.keyword = [new _linValidatorV.Rule('isLength', '必须传入搜索关键字', {
      min: 1
    })];
  }

}

exports.ArticleSearchValidator = ArticleSearchValidator;