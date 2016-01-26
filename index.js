'use strict';
var app = require('app');
//var server = require('./server/server.js');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;


app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({width: 800, height: 600, "dark-theme":true});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.openDevTools();
	mainWindow.on('closed', function () {
		mainWindow = null;
		app.quit();
	});
});
