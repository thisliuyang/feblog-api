"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticleByKeyword = exports.getArticleDetail = exports.getArticleList = exports.updateArticle = exports.deleteArticle = exports.addArticle = void 0;

var _article = require("../validators/article");

var _article2 = require("../dao/article");

var _category = require("../dao/category");

var _comments = require("../dao/comments");

var _helper = require("../lib/helper");

const res = new _helper.Resolve();

const addArticle = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _article.ArticleValidator().validate(ctx); // 创建文章

  await _article2.ArticleDao.createArticle(v); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.success('创建文章成功');
};

exports.addArticle = addArticle;

const deleteArticle = async (ctx, next) => {
  // 通过验证器校验参数是否通过
  const v = await new _article.PositiveIdParamsValidator().validate(ctx); // 获取文章ID参数

  const id = v.get('path.id'); // 删除文章

  await _article2.ArticleDao.destroyArticle(id);
  ctx.response.status = 200;
  ctx.body = res.success('删除文章成功');
};

exports.deleteArticle = deleteArticle;

const updateArticle = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _article.PositiveIdParamsValidator().validate(ctx); // 获取文章ID参数

  const id = v.get('path.id'); // 更新文章

  await _article2.ArticleDao.updateArticle(id, v);
  ctx.response.status = 200;
  ctx.body = res.success('更新文章成功');
};

exports.updateArticle = updateArticle;

const getArticleList = async ctx => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // eslint-disable-next-line camelcase
  const {
    page,
    desc,
    category_id,
    keyword
  } = ctx.query; // 查询文章列表

  const articleList = await _article2.ArticleDao.getArticleList(page, desc, category_id, keyword); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(articleList);
};

exports.getArticleList = getArticleList;

const getArticleDetail = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _article.PositiveIdParamsValidator().validate(ctx); // 获取文章ID参数

  const id = v.get('path.id'); // 查询文章

  const article = await _article2.ArticleDao.getArticleDetail(id); // 获取关联此文章的分类详情

  const category = await _category.CategoryDao.getCategory(article.getDataValue('category_id')); // 获取关联此文章的评论列表

  const commentsList = await _comments.CommentsDao.getArticleComments(id); // 更新文章浏览

  await _article2.ArticleDao.updateArticleBrowse(id, ++article.browse);
  await article.setDataValue('category_detail', category);
  await article.setDataValue('comments_list', commentsList); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(article);
};

exports.getArticleDetail = getArticleDetail;

const getArticleByKeyword = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _article.ArticleSearchValidator().validate(ctx); // 获取查询文章关键字

  const keyword = v.get('query.keyword'); // 页码

  const page = v.get('query.page'); // 排序

  const desc = v.get('query.desc'); // 查询文章

  const article = await _article2.ArticleDao.getArticleByKeyword(keyword, page, desc); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(article);
};

exports.getArticleByKeyword = getArticleByKeyword;