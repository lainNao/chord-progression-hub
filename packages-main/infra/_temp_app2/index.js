// app.js
const postgres = require("postgres");
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  console.log(await sql`select version()`);
  // console.log(await sql`SELECT * FROM playing_with_neon;`);
}

getPgVersion();
