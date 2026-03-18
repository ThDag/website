import formHandler from "./form.js"
import http from 'http'

const PORT = 3011

formHandler()

const n8nHook = async (data) => {
  const url = "http://host.docker.internal:5678/webhook/59f8c12c"

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log('Success:', result);

  } catch (error) {
    console.error("Error: ", error)

  }

  console.log("n8n hook activated")
};

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
    n8nHook(data)
  })

});

// Define the port to listen on const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
