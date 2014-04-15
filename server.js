var http = require("http"),
    url = require("url"),
    port = process.env.VCAP_APP_PORT || process.env.PORT || 3000;

/* reference: http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js */
/* works only on systems with eth0 */
var os=require('os');
var ip;
var eth0=os.networkInterfaces().eth0.forEach(function(alias){
  if (alias.family=='IPv4') {
    ip="eth0("+alias.family+"): "+alias.address;
  }
});


http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname;

        if (uri == "/") {
                response.writeHead(200,{ 'Content-Type': 'text/html'});
                response.write(["<h2>NodeScale: showcases application instance scaling (containers with different IP/PID)</h2>",
                "<h1>IP: ", ip,
                "</h1><h1>PID: ", process.pid,
                "</h1>"].join(''), "utf8");
                response.end()
                return;
        } else {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

	return (new Error("Should not get here"));

}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://0.0.0.0:" + port + "/\nCTRL + C to shutdown");
