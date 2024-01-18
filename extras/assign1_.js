const http = require('http');

const server = http.createServer(() => {
    const requestHandler = (req, res) => {
        const url = req.url;
        const method = req.method;
        if(url === '/'){
            res.write('<html>');
            res.write('<head><title>Greet</title></head>');
            res.write('<body>');
            res.write('<h1>Hello</h1>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        }
        if(url === '/'){
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<form action = "/message" method = "POST"><input type = "text" name = "message"></input><button type = "submit">Send</button></form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        }
        if(url === '/message' && method === 'POST'){
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                fs.writeFile('message.txt', message, (err) => {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                });
                
            });
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My page</title></head>');
        res.write('<body><h1>Yo</h1></body>');
        res.write('</html>');
        res.end();
    }
    
});

server.listen(3000);