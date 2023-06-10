 const http = require('http');
 const port = 8000; // !port number
 const fs = require('fs');
 // !fs is a module that is used to read and write files
 function requestHandler(req, res) {
     console.log(req.url); //!req.url is the url of the request
     res.writeHead(200, { "content-type": "text/html" }); //!res.writeHead is used to write the response header
     fs.readFile('./index.html', function(err, data) {
             if (err) {
                 console.log("error", err); //!err is used to handle the error
                 return res.end('<h1>error!</h1>'); //!res.end is used to end the response
             }
             return res.end(data);
         })
         //  res.end("<h1>Gotcha!</h1>"); //!res.end is used to end the response
     let filepath;
     switch (req.url) {
         case '/':
             filepath = './index.html';
             break;
         case '/file1.html':
             filepath = './file1.html';
         default:
             filepath = 'file2.html';
     }
     fs.readFileSync(filepath, function(err, data) {
         if (err) {
             console.log("error!", err);
         }
         return res.end(data);
     })
 }
 const server = http.createServer(requestHandler);
 server.listen(port, function(err) {
     if (err) {
         console.log(err);
         return;
     } else {
         console.log("server is up and running on port:", port);
     }
 })