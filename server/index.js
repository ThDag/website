import handleFormRequest from "./form.js";
import handlePersonalBin from "./personalBin.js";
import http from 'http'

const PORT = 3011

function handleRequest(data, url) {

  if (url == "/api/form") {
    handleFormRequest(data)
  } else if (url == "/api/personalbin") {
    handlePersonalBin(data)
  }
}


// Create a server object
const server = http.createServer((req, res) => {
  const { method, url } = req;

  let data = "";
  req.on("data", chunk => {
    data += chunk.toString()
  })

  req.on("end", () => {
    console.log("given data >> ", data)

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end(`request recieved body; ${data}`);

    console.log("url;", url);
    handleRequest(data, url)
  })

});

// Define the port to listen on const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
