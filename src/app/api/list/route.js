import { Pool } from "pg";
const dbobj = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
};

export async function GET() {
//   console.log(dbobj);
    try {
    const pool = new Pool(dbobj);
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * 
            FROM motor_details;`
    );
    const res = result.rows;
    client.release();
    return new Response(JSON.stringify({ m_list: res }), {
      status: 200,
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error executing query", error);

    const errorMessage = {
      error: error.message || "Internal Server Error",
      code: error.code || 500,
    };
    const errorBody = JSON.stringify(errorMessage);

    return new Response(errorBody, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
