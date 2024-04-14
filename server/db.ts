import pg from 'pg'

let pool: pg.Pool | null = null
async function init() {
  pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
}

export async function getPool() {
  if (pool)
    return pool

  await init()
  return pool
}
