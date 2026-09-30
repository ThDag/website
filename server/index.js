import handleFormRequest from "./form.js";
import handlePersonalBin from "./personalBin.js";
import handleGallery from "./gallery.js";
import http from 'http'

const PORT = 3011



// ----------------- Create a server object -----------------
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
    }

    res.setHeader('Content-Type', 'application/json');

    // -------- direct the  call ---------
    let result;
    try {
      if (url == "/api/form/") {
        result = await handleFormRequest(data)
        endCreateServer(res)
      } else if (url == "/api/personalbin") {
        result = await handlePersonalBin(data, req.headers)
        endCreateServer(res)
      }
      else if (url.startsWith("/api/images/")) {
        result = await handleGallery(req, res)
        return;
      }
    } catch (err) {
      console.error(err)
    }

    console.log("recieved data: ", data)
    console.log("url: ", url);
    console.log("result: ", result)


  })
});

function endCreateServer(res) {
  // this is the ending of the res for functions that didn't end it themselves (aka not handleGallery)
  if (result?.cookie) {
    res.writeHead(200, { "Set-Cookie": result.cookie })
  }

  res.end(JSON.stringify(result));
}

// Define the port to listen on const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
