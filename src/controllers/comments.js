import { CommentsValidator, PositiveArticleIdParamsValidator } from '../validators/comments'
import { CommentsDao } from '../dao/comments'
import { Resolve } from '../lib/helper'
const res = new Resolve()
console.log(CommentsValidator, 88)
export const createComments = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CommentsValidator().validate(ctx)

  const r = await CommentsDao.createComments(v)

  const data = {
    id: r.getDataValue('id'),
    article_id: r.getDataValue('article_id'),
    parent_id: r.getDataValue('parent_id'),
    nickname: r.getDataValue('nickname'),
    content: r.getDataValue('content'),
    created_at: r.getDataValue('created_at')
  }

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(data)
}

export const destroyComments = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx)

  // 获取分类ID参数
  const id = v.get('path.id')
  await CommentsDao.destroyComments(id)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.success('删除评论成功')
}

export const updateComments = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx)

  // 获取分类ID参数
  const id = v.get('path.id')
  await CommentsDao.updateComments(id, v)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.success('更新评论成功')
}

export const getCommentsList = async (ctx) => {
  const page = ctx.query.page
  const commentsList = await CommentsDao.getCommentsList(page)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(commentsList)
}

export const getComments = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx)

  // 获取分类ID参数
  const id = v.get('path.id')
  const comments = await CommentsDao.getComments(id)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(comments)
}

export const getArticleComments = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx, {
    id: 'article_id'
  })

  // 获取分类ID参数
  const articleId = v.get('path.article_id')
  // 页面, 排序
  const { page, desc } = ctx.query
  const commentsList = await CommentsDao.getArticleComments(articleId, page, desc)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(commentsList)
}
