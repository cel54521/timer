'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Menu = electron.Menu;
var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {

    // ブラウザ(Chromium)の起動, 初期画面のロード
    mainWindow = new BrowserWindow({
        "width": 300,
        "height": 400,
        "resizable": false,

    });
    mainWindow.loadURL('file://' + __dirname + '/index.htm');

    initWindowMenu();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

function initWindowMenu(){
    const template = [
        {
            label: 'メニュー',
            submenu: [
                {
                    label: 'Quit', click() { app.quit(); }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
