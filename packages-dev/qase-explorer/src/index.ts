import { qaseApi, getQaseTestCaseUrl } from "./qaseApi";
import { makeTestSuiteNamesBreadCrumbStringRecursively } from "./util";
import http from "http";

const PORT = 8976;
http
  .createServer(async (_, response) => {
    const getAllTestSuites = await qaseApi.getAllTestSuites();

    const suites = makeTestSuiteNamesBreadCrumbStringRecursively(
      getAllTestSuites.result.entities
    );
    const testCases = await qaseApi.getAllCases();

    const html = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="utf-8">

        <!-- datatable -->
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.js"></script>

        <title>Specs</title>
        <script>
          console.log("suites", ${JSON.stringify(suites)});
          console.log("cases", ${JSON.stringify(testCases.result.entities)});
        </script>
        <style>
          html {
            font-size: 12px;
            background: #FFF;
            filter: invert(1) hue-rotate(180deg);
          }
        </style>
      </head>
      <body>
        <h1>Specs</h1>
        <table id="test-cases">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>description</th>
              <th>suite</th>
              <th>behavior</th>
              <th>link</th>
            </tr>
          </thead>
          <tbody>
            ${testCases.result.entities.map((testCase) => {
              return `<tr>
                <td>${testCase.id}</td>
                <td>${testCase.title}</td>
                <td>${testCase.description}</td>
                <td>${suites[testCase.suite_id]}</td>
                <td>${
                  testCase.behavior === 2
                    ? "正常系"
                    : testCase.behavior === 3
                    ? "異常系"
                    : "不明"
                }</td>
                <td>
                  <a href="${getQaseTestCaseUrl(
                    testCase.id
                  )}" target="_blank">Show</a>
                </td>
              </tr>`;
            })}
          </tbody>
        </table>

        <script>
          $(document).ready(() => {
            $('table').DataTable({
              "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
              }
            });
          });
        </script>
      </body>
    `;

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  })
  .listen(PORT);

console.log(`Listening on: http://localhost:${PORT}`);
