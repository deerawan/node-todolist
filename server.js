var http = require('http');
var url = require('url');

var items = [];
var server = http.createServer(function(request, response){
	switch(request.method) {
		case 'POST':
			var item = '';
			request.setEncoding('utf8');
			request.on('data', function(chunk) {
				item += chunk;
			});
			request.on('end', function(){
				items.push(item);
				response.end('OK');
			});
			break;
		case 'GET':
			var body = items.map(function(item, i) {
				return i + ': ' + item;
			}).join('\n');
			response.setHeader('Content-Length', Buffer.byteLength(body));
			response.setHeader('Content-Type', 'text/plain; charset="utf-8"');
			response.end(body);			
			break;
		case 'PUT': 
			var path = url.parse(request.url).pathname;
			var i = parseInt(path.slice(1), 10);
			validateItem(i, response, function(){
				var item = '';
				request.on('data', function(chunk){
					item += chunk;
				});
				request.on('end', function(chunk){
					items[i] = item;
					response.end('OK');
				});
			});			
			break;
		case 'DELETE':
			var path = url.parse(request.url).pathname;
			var i = parseInt(path.slice(1), 10);
			validateItem(i, response, function(){
				items.splice(i, 1);
				response.end('OK\n');
			});						
			break;
	}
});
server.listen(3000);

function validateItem(index, response, callback) {
	if(isNaN(index)) {
		response.statusCode = 400;
		response.end('invalid item id');
	} else if(!items[index]) {
		response.statusCode = 404;
		response.end('item not found');
	} else {
		callback();
	}
}