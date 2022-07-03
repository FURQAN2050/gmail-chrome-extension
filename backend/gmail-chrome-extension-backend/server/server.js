// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const http = require('http');
const https = require('https');
var sslConfig = require('./ssl-config');

const app = module.exports = loopback();


app.start = function (httpOnly) {
  if (httpOnly === undefined) {
    httpOnly = process.env.HTTP;
  }
  let server = null;
  if (!httpOnly) {
    const options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
    };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }
  server.listen(app.get('port'), function () {
    const baseUrl = (httpOnly ? 'http://' : 'https://') + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

const bootOptions = {
  appRootDir: __dirname,
  bootDirs: [`${__dirname}/boot/create-tables`],
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, bootOptions, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});