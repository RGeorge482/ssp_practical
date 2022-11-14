const http = require('http'), 
      express = require('express'),
      fs = require("fs"),
      xmlParse = require('xslt-processor').xmlParse,
      xsltProcess = require('xslt-processor').xsltProcess,
      router = express(),
      server = http.createServer(router);


router.get('/', function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'uft8'),
        xsl = fs.readFileSync('menu.xsl', 'uft8');

        xml = xmlParse(xml);
        xsl = xmlParse(xsl);

        let html = xsltProcess(xml, xsl);

        res.end(html.toString());
})      

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    const addr = server.address();
    console.log("Server listening at ", addr.address + ":" + addr.port);
})