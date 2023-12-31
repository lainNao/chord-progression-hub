const postgres = require("postgres");
require("dotenv").config();

const {
  NEON_HOST,
  NEON_DB_NAME,
  NEON_USER_NAME,
  NEON_PASSWORD,
  NEON_ENDPOINT_ID,
  PORT,
} = process.env;

console.log(
  "スタート！！！！！！！！！！！！！！！！！！",
  NEON_HOST,
  NEON_DB_NAME,
  NEON_USER_NAME,
  NEON_PASSWORD,
  NEON_ENDPOINT_ID,
  PORT,
  process.env
);

const sql = postgres({
  host: NEON_HOST,
  database: NEON_DB_NAME,
  username: NEON_USER_NAME,
  password: NEON_PASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${NEON_ENDPOINT_ID}`,
  },
});

// async function getQuery1() {
//   return  sql`select version()`;
// }

async function sampleQuery2() {
  return sql`SELECT * FROM playing_with_neon;`;
}

require("http")
  .createServer(async (_, res) => {
    const result = await sampleQuery2();
    const result2 = process.env;

    res.end(JSON.stringify({ result, result2 }));
  })
  .listen(PORT ?? 8080);
