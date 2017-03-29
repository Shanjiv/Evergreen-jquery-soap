//---- SOAP server
const soap = require('soap');
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

var service = {
    ws: {
        calc: {
            sumar : function(args) {
                var n = 1*args.a + 1*args.b;
                return { sumres : n };
            },

            multiplicar : function(args) {
                console.log('🚀🚀🚀🚀🚀');
                var n = args.a * args.b;
                return { mulres : n };
            }
        }
    }
};

var xml = fs.readFileSync(process.cwd() + '/soap-server/wscalc1.wsdl', 'utf8');

//<------>END SOAP stuff </------>

// Create our app
const app = express();
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.listen(PORT, function(){
  console.log('Express server is up on port : ' + PORT);
  soap.listen(app, '/wscalc1', service, xml);
});


/* Client */
// var url = 'http://localhost:3000/wscalc1?wsdl';
//
// soap.createClient(url, function(err, client) {
//     if (err) throw err;
//     console.log(client.describe().ws.calc , `\n--describe calc-----\n`);
//     client.multiplicar({a: 4,b: 3},function(err,res){
//         if (err) throw err;
//         console.log(res,  `\n----multiplicar---\n`);
//     });
//     client.sumar({a: 4,b: 3},function(err,res){
//         if (err) throw err;
//         console.log(res,  `\n---sumar----\n`);
//     });
// });
