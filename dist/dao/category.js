"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryDao = void 0;

var _sequelize = require("sequelize");

var _category = require("../models/category");

var _article = require("../models/article");

var _article2 = require("../dao/article");

class CategoryDao {
  // 创建分类
  static async createCategory(v) {
    // 查询是否存在重复的分类
    const hasCategory = await _category.Category.findOne({
      where: {
        key: v.get('body.key'),
        deleted_at: null
      }
    });

    if (hasCategory) {
      throw new global.errs.Existing('分类已存在');
    }

    ;
    const category = new _category.Category();
    category.name = v.get('body.name');
    category.key = v.get('body.key');
    category.parent_id = v.get('body.parent_id');
    category.save();
  } // 删除分类


  static async destroyCategory(id) {
    // 查询分类
    const category = await _category.Category.findOne({
      where: {
        id,
        deleted_at: null
      }
    });

    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类');
    }

    category.destroy();
  } // 获取分类详情


  static async getCategory(id) {
    const category = await _category.Category.scope('bh').findOne({
      where: {
        id,
        deleted_at: null
      }
    });

    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类');
    }

    return category;
  } // 更新分类


  static async updateCategory(id, v) {
    const category = await _category.Category.findByPk(id);

    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类');
    }

    category.name = v.get('body.name');
    category.key = v.get('body.key');
    category.parent_id = v.get('body.parent_id');
    category.save();
  } // 分类列表


  static async getCategoryList() {
    const category = await _category.Category.scope('bh').findAll({
      where: {
        deleted_at: null
      }
    }); // 统计每个分类下有多少文章

    const ids = [];
    category.forEach(item => {
      ids.push(item.id);
    });
    const article = await CategoryDao._getArticle(ids);
    category.forEach(item => {
      CategoryDao._setArticle(item, article);
    });
    return category;
  } // 获取每个分类下有多少文章


  static async _getArticle(ids) {
    // eslint-disable-next-line no-return-await
    return await _article.Article.scope('bh').findAll({
      where: {
        category_id: {
          [_sequelize.Op.in]: ids
        }
      },
      group: ['category_id'],
      attributes: ['category_id', [_sequelize.Sequelize.fn('COUNT', '*'), 'count']]
    });
  } // 设置每个分类下的文章总数


  static _setArticle(category, article) {
    let count = 0;
    article.forEach(item => {
      if (parseInt(category.id) === parseInt(item.category_id)) {
        count = item.get('count');
      }
    });
    category.setDataValue('article_nums', count);
    return category;
  } // 获取一个分类下的文章


  static async getCategoryArticle(category_id, page = 1, desc = 'created_at') {
    const pageSize = 10;
    const article = await _article.Article.scope('iv').findAndCountAll({
      limit: pageSize,
      // 每页10条
      offset: (page - 1) * pageSize,
      where: {
        deleted_at: null,
        category_id
      },
      order: [[desc, 'DESC']]
    });
    const categoryIds = [];
    const articleIds = [];
    const r = article.rows;
    r.forEach(article => {
      articleIds.push(article.id);
      categoryIds.push(article.category_id);
    }); // // 获取每篇文章评论

    const comments = await _article2.ArticleDao._getArticleComments(articleIds);
    r.forEach(article => {
      _article2.ArticleDao._setArticleComments(article, comments);
    }); // 获取每篇文章分类详情

    const category = await _article2.ArticleDao._getArticleCategoryDetail(categoryIds);
    r.forEach(article => {
      _article2.ArticleDao._setArticleCategoryDetail(article, category);
    });
    return {
      data: r,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: article.count,
        total: article.count,
        total_pages: Math.ceil(article.count / 10)
      }
    };
  }

}

exports.CategoryDao = CategoryDao;