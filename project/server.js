const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res) => {
   // console.log(req.url,req.method);
    //lodash
    const num = _.random(0,20);
    console.log(num);

    //run once
    const greet = _.once(() => {
        console.log('Hello');
    })
    greet();

    res.setHeader('Content-type','text/html');
    let path = './views';
    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }

   fs.readFile(path,'utf8',(err, data) => {
    if(err){
        console.log(err);
        res.end();
    }
    else{
       // res.write(data);
        res.end(data);
    }
   })
});

server.listen(3030,'localhost',()=> {
    console.log('listening to request on port 3030');
    console.log("hey there");
});

