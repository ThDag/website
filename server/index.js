import handleFormRequest from "./form.js";
import handlePersonalBin from "./personalBin.js";
import http from 'http'

const PORT = 3011

async function handleRequest(data, url) {
  let result = null;

  if (url == "/api/form") {
    result = await handleFormRequest(data)
  } else if (url == "/api/personalbin") {
    result = await handlePersonalBin(data)
  }

  return result
}


// Create a server object
const server = http.createServer((req, res) => {
  const { method, url } = req;

  let data = "";
  req.on("data", chunk => {
    data += chunk.toString()
  })

  req.on("end", async () => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;

    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      console.log("given data >> ", data)
      console.log("url:", url);
      const result = await handleRequest(data, url)
      console.log("result:", result)

      res.end(`request recieved body; ${data} \n\n result: ${JSON.stringify(result)}`);


    }

  })

});

// Define the port to listen on const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
