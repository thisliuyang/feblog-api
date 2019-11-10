import { CategoryValidator, PositiveIdParamsValidator } from '../validators/category'
import { CategoryDao } from '../dao/category'
import { Resolve } from '../lib/helper'
const res = new Resolve()

export const createCategory = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CategoryValidator().validate(ctx)

  await CategoryDao.createCategory(v)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.success('创建分类成功')
}

export const destroyCategory = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx)

  // 获取分类ID参数
  const id = v.get('path.id')
  // 删除分类
  await CategoryDao.destroyCategory(id)

  ctx.response.status = 200
  ctx.body = res.success('删除分类成功')
}

export const updateCategory = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx)

  // 获取分类ID参数
  const id = v.get('path.id')
  // 更新分类
  await CategoryDao.updateCategory(id, v)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.success('更新分类成功')
}

export const getCategoryList = async (ctx) => {
  // 获取分类下关联的文章
  const categoryList = await CategoryDao.getCategoryList()

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(categoryList)
}

export const getCategory = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx)

  // 获取参数
  const id = v.get('path.id')
  // 获取分类
  const category = await CategoryDao.getCategory(id)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(category)
}

export const getCategoryArticle = async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx)

  // 分类ID
  const categoryId = v.get('path.id')
  // 页面
  const page = v.get('query.page')
  // 排序
  const desc = v.get('query.desc')
  // 获取分类
  const category = await CategoryDao.getCategoryArticle(categoryId, page, desc)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(category)
}
