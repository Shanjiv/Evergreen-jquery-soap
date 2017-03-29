const soap = require('jquery.soap');


function login (username, password, onFinish) {
  soap({
  	url: 'http://localhost:3000/wscalc1?wsdl',
  	method: 'multiplicar',
    appendMethodToURL: false,
  	data: {
  		a: 4,
  		b: 5
  	},

  	success: function (soapResponse) {
      const result =  $(soapResponse.content).find('undefined\\:mulres').text();
     onFinish(true, result);
  	},
  	error: function (soapResponse) {
      try {
        const result =  $(soapResponse.content).find('undefined\\:mulres').text();
        onFinish(true, result);
      } catch (e) {
        onFinish(false);
      }
  		// show error
  	}
  });
}

module.exports = {login};
