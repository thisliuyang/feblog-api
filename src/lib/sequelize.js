import Sequelize from 'sequelize'
import { DB as DBConfig, System as SystemConfig } from '../config'

const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: SystemConfig.db_type,
  dialectOptions: { // MySQL > 5.5，其它数据库删除此项
    charset: 'utf8mb4',
    // collate: 'utf8mb4_unicode_520_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  }
})
// sequelize.sync({
//   force: false
// })
// export default sequelize
module.exports = {
  sequelize
}
