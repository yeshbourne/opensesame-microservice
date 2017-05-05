module['exports'] = function echoHttp(hook) {

    var https = require('https');
    var querystring = require('querystring');

    var deviceid = "";
    var atoken = "";

    var query = hook.params["text"];

    console.log(query);

    var func = 'openSesame';
    var arg = '1';

    if (func != undefined && arg != undefined) {
        var path = "/v1/devices/" + deviceid + "/" + func

        var data = querystring.stringify({
            arg: arg,
            access_token: atoken
        });

        var options = {
            hostname: 'api.particle.io',
            port: 443,
            path: path,
            method: 'POST',

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        var req = https.request(options, function (res) {
            console.log('statusCode: ', res.statusCode);
            console.log('headers: ', res.headers);

            res.setEncoding('utf8');

            res.on('data', function (d) {
				hook.res.end("Test data "+d);
            });

            res.on('end', function () {
                hook.res.end(res.statusCode);
            });
        });

        req.on('error', function (error) {
            hook.res.end( error);
        });


        req.write(data);
        req.end();
    }
    else {
        hook.res.end("Test: Fail");
    }
};
