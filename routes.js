const fs = require('fs')


const requestHandler =  (req,res)=>{
    const url = req.url;
    const method = req.method
    
    res.setHeader('Content-Type','text/html')
    if (url == "/") {
        res.write('<html>')
        res.write('<head><title>test title</title></head>')
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"/><button type="submit">Send</button></form></body>')
        res.write('</html>') 
        return res.end();
    }

    if (  url == "/message" && method == "POST") {
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk)
            console.log('----------')
            body.push(chunk)
        })
        return req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1]
        fs.writeFile('message.txt',message, (err)=> {
                res.statusCode = 302
                res.setHeader('Location','/')
                return res.end() 
        })
        
        })
        

    }

    res.write('<html>')
    res.write('<head><title>test title</title></head>')
    res.write('<body><h1>test h1 tag</h1></body>')
    res.write('</html>')
    res.end();
}

module.exports = 
{
    someText: "test",
    handler: requestHandler

}