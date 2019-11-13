"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticleComments = exports.getComments = exports.getCommentsList = exports.updateComments = exports.destroyComments = exports.createComments = void 0;

var _comments = require("../validators/comments");

var _comments2 = require("../dao/comments");

var _helper = require("../lib/helper");

const res = new _helper.Resolve();
console.log(_comments.CommentsValidator, 88);

const createComments = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _comments.CommentsValidator().validate(ctx);
  const r = await _comments2.CommentsDao.createComments(v);
  const data = {
    id: r.getDataValue('id'),
    article_id: r.getDataValue('article_id'),
    parent_id: r.getDataValue('parent_id'),
    nickname: r.getDataValue('nickname'),
    content: r.getDataValue('content'),
    created_at: r.getDataValue('created_at')
  }; // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(data);
};

exports.createComments = createComments;

const destroyComments = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _comments.PositiveArticleIdParamsValidator().validate(ctx); // 获取分类ID参数

  const id = v.get('path.id');
  await _comments2.CommentsDao.destroyComments(id); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.success('删除评论成功');
};

exports.destroyComments = destroyComments;

const updateComments = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _comments.PositiveArticleIdParamsValidator().validate(ctx); // 获取分类ID参数

  const id = v.get('path.id');
  await _comments2.CommentsDao.updateComments(id, v); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.success('更新评论成功');
};

exports.updateComments = updateComments;

const getCommentsList = async ctx => {
  const page = ctx.query.page;
  const commentsList = await _comments2.CommentsDao.getCommentsList(page); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(commentsList);
};

exports.getCommentsList = getCommentsList;

const getComments = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _comments.PositiveArticleIdParamsValidator().validate(ctx); // 获取分类ID参数

  const id = v.get('path.id');
  const comments = await _comments2.CommentsDao.getComments(id); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(comments);
};

exports.getComments = getComments;

const getArticleComments = async ctx => {
  // 通过验证器校验参数是否通过
  const v = await new _comments.PositiveArticleIdParamsValidator().validate(ctx, {
    id: 'article_id'
  }); // 获取分类ID参数

  const articleId = v.get('path.article_id'); // 页面, 排序

  const {
    page,
    desc
  } = ctx.query;
  const commentsList = await _comments2.CommentsDao.getArticleComments(articleId, page, desc); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(commentsList);
};

exports.getArticleComments = getArticleComments;