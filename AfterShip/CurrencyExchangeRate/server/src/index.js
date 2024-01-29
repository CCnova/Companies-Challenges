import http from "node:http";
import nodeUrl from "node:url";

const PORT = process.env.PORT || 3000;
const APP_ID = process.env.APP_ID;

const server = http.createServer(async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  };

  const url = nodeUrl.parse(req.url, true);
  const { currency, date } = url.query;

  const latestResponse = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&base=${currency.toUpperCase()}`
  );
  const latestData = await latestResponse.json();

  const historicalResponse = await fetch(
    `https://openexchangerates.org/api/historical/${date}.json?app_id=${APP_ID}&base=${currency.toUpperCase()}`
  );

  const historicalData = await historicalResponse.json();

  res.writeHead(200, headers);
  res.end(JSON.stringify({ latest: latestData, historical: historicalData }));
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
