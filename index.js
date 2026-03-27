const http = require('http')
const fs = require('fs')
//const db = require('./db')

const express = require("express");
const app = express();
app.use(express.static("public"));

let server = http.createServer((req, res) => {

 res.writeHead(200, { 'Content-Type': 'text/html' })
 
 const stream = fs.createReadStream('./templates/index.html')
 stream.pipe(res)
})

const PORT = 3000
const HOST = 'localhost'

server.listen(PORT,HOST, () => {
  console.log('Server running on http://localhost:3000')
})