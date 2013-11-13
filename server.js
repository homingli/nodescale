var http = require("http"),
    url = require("url"),
    port = process.env.VCAP_APP_PORT || 3000;

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname;

        if (uri == "/") {
                response.writeHead(200,{ 'Content-Type': 'text/html'});
                response.write(["<h1 style='text-align:center;color:red'>",
				"Stackato Scaling Test ",
				"<span style='color:black;font-size:0.4em'>(in node.js)</span></h1>"].join(''), "utf8");

		if (process.env.VCAP_APP_HOST)
			response.write("<h3 style='text-align:center'>IP: "+process.env.VCAP_APP_HOST+"</h3>", "utf8");

                response.write("<h3 style='text-align:center'>PID: "+process.pid+"</h3>", "utf8");

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
