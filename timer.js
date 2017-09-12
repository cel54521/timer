'use strict';

var interval;
var finishHour;
var finishMinute;
var notificationWindow;

function startTimer(){
    clearInterval(interval);
    interval = setInterval(update,0.5);

    finishHour = document.getElementById("finishHour").value;
    finishMinute = document.getElementById("finishMinute").value;

    notificationWindow = null;
}

function update(){
    var hour;
    var minute;

    var date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();

    var temp = new Date();
    temp.setHours(finishHour);
    temp.setMinutes(finishMinute);

    var diffUnixTime =  temp.getTime() - date.getTime();

    var remainHour = parseInt((diffUnixTime / 1000) / 3600);
    var remainMinute = Math.abs(parseInt((diffUnixTime / 1000) / 60 % 60));

    var rtView = document.getElementById("rtView");

    if(diffUnixTime < 0){
        rtView.innerHTML = remainHour + "時間" + remainMinute + "分 超過しています";
    }else{
        rtView.innerHTML = "後" + remainHour + "時間" + remainMinute + "分です";
    }

    if(hour == finishHour){
        if(minute ==finishMinute){
            if (!("Notification" in window)) {
                if(notificationWindow == null){
                    showForIE();
                }
            }else{
                if(notificationWindow == null){
                    show("終了時間になりました","icon.png");
                    notificationWindow = true;
                }

            }

        }
    }
}

function showForIE() {
    notificationWindow = window.open('notification.htm', '終了時間', 'width=400, height=300, menubar=no, toolbar=no, scrollbars=yes');
}


var Notification;

function initNotification(){
    // Notificationを取得
    Notification = window.Notification || window.mozNotification || window.webkitNotification;

    if(Notification != null){
        // Notificationの権限チェック
        Notification.requestPermission(function (permission) {

        });
    }
}

function show(str,iconPath) {
    if(Notification != null){
        // 通知インスタンス生成
        var instance = new Notification(
            "通知", // 通知タイトル
            {
                body: str, // 通知内容
                icon: iconPath, // アイコン
            }
        );
        setTimeout(instance.close.bind(instance),10000);
        instance.onclick = function () {
            console.log("onclick");
        };
        //instance.onerror = function () {
        //    console.log("onerror");
        //};
        instance.onshow = function () {
            console.log("onshow");
        };
        instance.onclose = function () {
            console.log("onclose");
        };
    }else{

    }
}

onload = function() {
    initNotification();
};
