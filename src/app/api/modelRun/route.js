import { spawn } from "child_process";
import { Pool } from "pg";
import { join } from "path";

const pythonPath = "/usr/bin/python3"; // Example path to the Python executable
const pythonScriptPath = join(__dirname, "ml", "output_script.py"); // Example path to the Python script

const dbobj = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
};

export async function POST(req2) {
  const req = await req2.json();
  const motor_id = req.motor_id;

  try {
    // const pool = new Pool(dbobj);
    // const client = await pool.connect();
    // const result = await client.query(
    //   `SELECT *
    //   FROM motor_feature
    //   WHERE motor_id = ${motor_id}
    //   ORDER BY timestamp DESC LIMIT 200;`
    // );
    // const res = result.rows;
    // client.release();

    // Spawn a child process to run the Python script
    const pythonProcess = spawn(pythonPath, [
      "src/app/api/modelRun/ml/output_script.py",
    ]);

    // Handle stdout data from the Python script
    pythonProcess.stdout.on("data", (data) => {
      const pythonOutput = JSON.parse(data);
      return new Response(JSON.stringify(pythonOutput), {
        status: 200,
        headers: {
          "Content-type": "application/json",
        },
      });
    });

    // Handle errors
    pythonProcess.stderr.on("data", (data) => {
      console.error("Error:", data.toString());
      const errorMessage = {
        error: data.toString() || "Internal Server Error",
        code: 500,
      };
      const errorBody = JSON.stringify(errorMessage);
      return new Response(errorBody, {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
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
