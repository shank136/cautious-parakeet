const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">Send</button></form></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        //fs.writeFileSync('message.txt', message);
        fs.writeFile('message.txt', message, (err) => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<h1>Hello from Node.js server!</h1>');
    res.write('</html>');
    res.end();
};

//module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'This is some text from routes'
// }

//module.exports.handler = requestHandler;
//module.exports.someText = 'This is some text from routes';

exports.handler = requestHandler;
exports.someText = 'This is some text from routes';