"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryArticle = exports.getCategory = exports.getCategoryList = exports.updateCategory = exports.destroyCategory = exports.createCategory = void 0;

var _category = require("../validators/category");

var _category2 = require("../dao/category");

var _helper = require("../lib/helper");

const res = new _helper.Resolve();

const createCategory = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _category.CategoryValidator().validate(ctx);
  await _category2.CategoryDao.createCategory(v); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.success('创建分类成功');
};

exports.createCategory = createCategory;

const destroyCategory = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _category.PositiveIdParamsValidator().validate(ctx); // 获取分类ID参数

  const id = v.get('path.id'); // 删除分类

  await _category2.CategoryDao.destroyCategory(id);
  ctx.response.status = 200;
  ctx.body = res.success('删除分类成功');
};

exports.destroyCategory = destroyCategory;

const updateCategory = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _category.PositiveIdParamsValidator().validate(ctx); // 获取分类ID参数

  const id = v.get('path.id'); // 更新分类

  await _category2.CategoryDao.updateCategory(id, v); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.success('更新分类成功');
};

exports.updateCategory = updateCategory;

const getCategoryList = async ctx => {
  // 获取分类下关联的文章
  const categoryList = await _category2.CategoryDao.getCategoryList(); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(categoryList);
};

exports.getCategoryList = getCategoryList;

const getCategory = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _category.PositiveIdParamsValidator().validate(ctx); // 获取参数

  const id = v.get('path.id'); // 获取分类

  const category = await _category2.CategoryDao.getCategory(id); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(category);
};

exports.getCategory = getCategory;

const getCategoryArticle = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _category.PositiveIdParamsValidator().validate(ctx); // 分类ID

  const categoryId = v.get('path.id'); // 页面

  const page = v.get('query.page'); // 排序

  const desc = v.get('query.desc'); // 获取分类

  const category = await _category2.CategoryDao.getCategoryArticle(categoryId, page, desc); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(category);
};

exports.getCategoryArticle = getCategoryArticle;