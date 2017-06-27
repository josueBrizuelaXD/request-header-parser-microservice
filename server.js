const express = require("express");
const app = express();
const accepts = require("accepts");
const useragent = require("express-useragent");

app.enable("trust proxy");
app.use(useragent.express());

app.get("/", function(req, res){
	const user = {
	software: req.useragent.source.match(/\((.+?)\)/)[1],
	language: accepts(req).language()[0],
	ipaddress: req.ip || req.ips,	
	};
	
	res.end(JSON.stringify(user));
});
app.listen(process.env.PORT || 3000);