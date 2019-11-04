import db from '../tool/db'
import moment from 'moment'
export const Get = async (ctx, next) => {
  ctx.body = { code: 0 }
}

export const GetCourses = async (ctx, next) => {
  const pool = await db
  const res = await pool.query('SELECT * FROM ningmeng.course WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) < start_time;')
  for (const i of res) {
    i.startTime = moment(i.start_time).format('YYYY-MM-DD HH:mm')
  }
  const sort = res.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1
    }
    if (a.startTime > b.startTime) {
      return 1
    }
    return 0
  })
  const now = moment().format('YYYY-MM-DD HH:mm')

  ctx.body = {
    code: 0,
    data: {
      hasBaby: true,
      initDate: '',
      weekCourses: [
        now,
        sort
      ]
    },
    msg: 'ok'
  }
}

export const Post = async (ctx, next) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    para: ctx.request.body
  }

  next()
}

export const Put = (ctx, next) => {
  ctx.body = {
    result: 'put',
    name: ctx.params.name,
    para: ctx.request.body
  }

  next()
}

export const Delete = (ctx, next) => {
  ctx.body = {
    result: 'delete',
    name: ctx.params.name,
    para: ctx.request.body
  }

  next()
}
