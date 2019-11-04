import mysql from 'promise-mysql'
import { DB as DBConfig } from '../config'

const pool = mysql.createPool(DBConfig)

export default pool
