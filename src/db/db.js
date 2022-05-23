const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'oscillations',
  password: 'postgres',
  port: 5432,
})

const insertTicker = (data) => {

  pool.query('', [data], (error) => {
    if (error) {
      throw error
    }
  })
}
module.exports = {
  insertTicker,
}