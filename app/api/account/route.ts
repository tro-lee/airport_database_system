import type { NextRequest } from 'next/server'
import { getPool } from '@/server/db'

export async function GET(request: NextRequest) {
  const condition = request.nextUrl.searchParams.get('condition')
  const pool = await getPool()
  try {
    const result = await pool?.query(`SELECT * FROM account_lc09 WHERE name LIKE '${condition}%'`)
    return Response.json(result?.rows)
  }
  catch (e) {
    console.error(e)
    return Response.error()
  }
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const { name, password } = res
  const pool = await getPool()
  try {
    await pool?.query('INSERT INTO account_lc09 (name, password) VALUES ($1, $2)', [name, password])
    return Response.json({ message: '插入成功' })
  }
  catch (e) {
    console.error(e)
    return Response.error()
  }
}
