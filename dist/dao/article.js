"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleDao = void 0;

var _sequelize = require("sequelize");

var _article = require("../models/article");

var _category = require("../models/category");

var _comments = require("../models/comments");

class ArticleDao {
  // 创建文章
  static async createArticle(v) {
    // 检测是否存在文章
    const hasArticle = await _article.Article.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    }); // 如果存在，抛出存在信息

    if (hasArticle) {
      throw new global.errs.Existing('文章已存在');
    } // 创建文章


    const article = new _article.Article();
    article.title = v.get('body.title');
    article.author = v.get('body.author');
    article.content = v.get('body.content');
    article.cover = v.get('body.cover');
    article.browse = v.get('body.browse');
    article.category_id = v.get('body.category_id');
    article.save();
  } // 获取文章列表


  static async getArticleList(page = 1, desc = 'created_at', category_id, keyword) {
    const pageSize = 10; // 筛选方式

    const filter = {
      deleted_at: null
    }; // 筛选方式：存在分类ID
    // eslint-disable-next-line camelcase

    if (category_id) {
      // eslint-disable-next-line camelcase
      filter.category_id = category_id;
    } // 筛选方式：存在搜索关键字


    if (keyword) {
      filter.title = {
        [_sequelize.Op.like]: `%${keyword}%`
      };
    }

    const article = await _article.Article.scope('iv').findAndCountAll({
      limit: pageSize,
      // 每页10条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [[desc, 'DESC']]
    });
    const categoryIds = [];
    const articleIds = [];
    const r = article.rows;
    r.forEach(article => {
      articleIds.push(article.id);
      categoryIds.push(article.category_id);
    }); // // 获取每篇文章评论

    const comments = await ArticleDao._getArticleComments(articleIds);
    r.forEach(article => {
      ArticleDao._setArticleComments(article, comments);
    }); // 获取每篇文章分类详情

    const category = await ArticleDao._getArticleCategoryDetail(categoryIds);
    r.forEach(article => {
      ArticleDao._setArticleCategoryDetail(article, category);
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
  } // 获取每篇文章评论


  static async _getArticleComments(articleIds) {
    // eslint-disable-next-line no-return-await
    return await _comments.Comments.scope('bh').findAll({
      where: {
        article_id: {
          [_sequelize.Op.in]: articleIds
        }
      },
      group: ['article_id'],
      attributes: ['article_id', [_sequelize.Sequelize.fn('COUNT', '*'), 'count']]
    });
  } // 设置每章文章评论总数


  static _setArticleComments(article, comments) {
    let count = 0;
    comments.forEach(item => {
      if (parseInt(article.id) === parseInt(item.article_id)) {
        count = item.get('count');
      }
    });
    article.setDataValue('comments_nums', count);
    return article;
  } // 获取每篇文章分类详情


  static async _getArticleCategoryDetail(categoryIds) {
    // eslint-disable-next-line no-return-await
    return await _category.Category.scope('bh').findAll({
      where: {
        id: {
          [_sequelize.Op.in]: categoryIds
        }
      }
    });
  } // 设置每章文章分类详情


  static _setArticleCategoryDetail(article, category) {
    category.forEach(item => {
      if (parseInt(article.category_id) === parseInt(item.id)) {
        article.setDataValue('category_detail', item);
      }
    });
    return article;
  } // 删除文章


  static async destroyArticle(id) {
    // 检测是否存在文章
    const article = await _article.Article.findOne({
      where: {
        id,
        deleted_at: null
      }
    }); // 不存在抛出错误

    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');
    } // 软删除文章


    article.destroy();
  } // 更新文章


  static async updateArticle(id, v) {
    // 查询文章
    const article = await _article.Article.findByPk(id);

    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');
    } // 更新文章


    article.title = v.get('body.title');
    article.author = v.get('body.author');
    article.content = v.get('body.content');
    article.cover = v.get('body.cover');
    article.browse = v.get('body.browse');
    article.category_id = v.get('body.category_id');
    article.save();
  } // 更新文章浏览次数


  static async updateArticleBrowse(id, browse) {
    // 查询文章
    const article = await _article.Article.findByPk(id);

    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');
    } // 更新文章浏览


    article.browse = browse;
    article.save();
  } // 文章详情


  static async getArticleDetail(id) {
    const article = await _article.Article.findOne({
      where: {
        id
      }
    });

    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');
    }

    return article;
  } // 搜索文章


  static async getArticleByKeyword(keyword, page = 1, desc = 'created_at') {
    const pageSize = 10;
    const article = await _article.Article.findAndCountAll({
      where: {
        title: {
          [_sequelize.Op.like]: `%${keyword}%`
        },
        deleted_at: null
      },
      limit: pageSize,
      // 每页10条
      offset: (page - 1) * pageSize,
      order: [[desc, 'DESC']]
    });
    const categoryIds = [];
    const articleIds = [];
    const r = article.rows;
    r.forEach(article => {
      articleIds.push(article.id);
      categoryIds.push(article.category_id);
    }); // 获取每篇文章评论

    const comments = await ArticleDao._getArticleComments(articleIds);
    r.forEach(article => {
      ArticleDao._setArticleComments(article, comments);
    }); // 获取每篇文章分类详情

    const category = await ArticleDao._getArticleCategoryDetail(categoryIds);
    r.forEach(article => {
      ArticleDao._setArticleCategoryDetail(article, category);
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

exports.ArticleDao = ArticleDao;