import fsp from "fs/promises"
import fs from "fs"
import path from "path"


const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

async function getGalleryImages(req, res) {


  if (req.method != "GET") {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return "request directed to gallery.js";
  }


  // this part of the code makes sure the person is only trying to access images folder and not doing /../../ to access other files
  const root = path.resolve("./public/images/")
  const imagePath = path.resolve(root, req.url.match(/(?<=\/images\/).+/)[0])
  if (!imagePath.startsWith(root + "/")) {
    res.statusCode = 403;
    res.end("Forbidden");
    return "request directed to gallery.js";
  }

  const ext = path.extname(imagePath);
  const contentType = MIME_TYPES[ext];

  if (!contentType) {
    res.writeHead(415, {
      "Content-Type": "text/plain"
    })
    res.end("file type not supported");
    return "error: file type not supported, request directed to gallery.js";
  }

  // fs.stat(imagePath, (err, stats) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain"
  //     })
  //     res.end(`internal server error: ${err}`);
  //     return `error : ${err}, request directed to gallery.js`;
  //   }
  //   res.writeHead(200, {
  //     'Content-Type': contentType,
  //     'Content-Length': stats.size,
  //   });
  // })

  const stats = await fsp.stat(imagePath);
  // in the future it should be a try catch block and return to the client info if the file doesn't exist
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stats.size,
  });

  const imageStream = fs.createReadStream(imagePath)
  imageStream.pipe(res)

}

export default getGalleryImages
