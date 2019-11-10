
import {
  ArticleValidator,
  PositiveIdParamsValidator,
  ArticleSearchValidator
} from '../validators/article'
import { ArticleDao } from '../dao/article'
import { CategoryDao } from '../dao/category'
import { CommentsDao } from '../dao/comments'
import { Resolve } from '../lib/helper'
const res = new Resolve()

export const addArticle = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new ArticleValidator().validate(ctx)

  // 创建文章
  await ArticleDao.createArticle(v)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.success('创建文章成功')
}

export const deleteArticle = async (ctx, next) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx)

  // 获取文章ID参数
  const id = v.get('path.id')
  // 删除文章
  await ArticleDao.destroyArticle(id)

  ctx.response.status = 200
  ctx.body = res.success('删除文章成功')
}

export const updateArticle = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx)

  // 获取文章ID参数
  const id = v.get('path.id')
  // 更新文章
  await ArticleDao.updateArticle(id, v)

  ctx.response.status = 200
  ctx.body = res.success('更新文章成功')
}

export const getArticleList = async (ctx) => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // eslint-disable-next-line camelcase
  const { page, desc, category_id, keyword } = ctx.query
  // 查询文章列表
  const articleList = await ArticleDao.getArticleList(page, desc, category_id, keyword)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(articleList)
}

export const getArticleDetail = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx)

  // 获取文章ID参数
  const id = v.get('path.id')
  // 查询文章
  const article = await ArticleDao.getArticleDetail(id)

  // 获取关联此文章的分类详情
  const category = await CategoryDao.getCategory(article.getDataValue('category_id'))
  // 获取关联此文章的评论列表
  const commentsList = await CommentsDao.getArticleComments(id)

  // 更新文章浏览
  await ArticleDao.updateArticleBrowse(id, ++article.browse)

  await article.setDataValue('category_detail', category)
  await article.setDataValue('comments_list', commentsList)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(article)
}

export const getArticleByKeyword = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new ArticleSearchValidator().validate(ctx)

  // 获取查询文章关键字
  const keyword = v.get('query.keyword')
  // 页码
  const page = v.get('query.page')
  // 排序
  const desc = v.get('query.desc')

  // 查询文章
  const article = await ArticleDao.getArticleByKeyword(keyword, page, desc)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(article)
}
