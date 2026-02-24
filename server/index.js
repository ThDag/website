import formHandler from "./form.js"
import http from 'http'

const PORT = 3000

formHandler()

// Create a server object
const server = http.createServer((req, res) => {
  const { method, url } = req;

  let data = "";
  req.on("data", chunk => {
    data += chunk.toString()
  })

  req.on("end", () => {
    console.log("given data >> ", data)
  })


  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body as 'Hello, World!'
  console.log(req.headers.cookie)
  res.write("first response \n")
  res.end('second and last response Hello, World!\n');

});

// Define the port to listen on const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
