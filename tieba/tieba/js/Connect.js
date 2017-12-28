/*用于前台与后台的连接*/
/// <reference path="uform.js" />
var s = 0; //0为未登录，1为登录
window.onload = function () {
    var li = document.getElementsByTagName("li");
    for (var i = 0; i < li.length - 1; i++) {
        li[i].index = i;
        li[i].onmouseover = function () {
            for (i = 0; i < li.length - 1; i++) {
                li[i].style.background = "";
                li[i].style.color = "";
            }
            this.style.background = "#de9e57";
            this.style.color = "white";
        }
    }
}
function createframe(type) {
    switch (type) {
        case 0:
            if ($("#login")[0].style.background != "white") {
                $("#login")[0].style.background = "white";
                $("#login")[0].style.color = "#ccc";
                $("#register")[0].style.background = "";
                $("#register")[0].style.color = "#5c6573";
                $("#square")[0].innerHTML = "";
                var div1 = $$("div", { "id": "oDIV" }, $("#square")[0]);
                $$("img", { "className": "close", "src": "img/close.png", "onclick": "Login_remove()" }, div1);
                var UserName = $$("div", { "innerHTML": "账户", "className": "user" }, div1);
                $$("input", { "type": "text", "className": "user_text", "id": "username_text" }, UserName);
                var PassWord = $$("div", { "innerHTML": "密码", "className": "user", "style": { "padding": "20 0 0 45"} }, div1);
                $$("input", { "type": "password", "className": "user_text", "id": "username_password" }, PassWord);
                var Login = $$("div", { "className": "login", "innerHTML": "登录", "onclick": "login();" }, div1);
            }
            else { removeframe(0); }
            break;
        case 1:
            if ($("#register")[0].style.background != "white") {
                $("#login")[0].style.background = "";
                $("#login")[0].style.color = "#5c6573";
                $("#register")[0].style.background = "white";
                $("#register")[0].style.color = "#ccc";
                $("#square")[0].innerHTML = "";
                var div2 = $$("div", { "id": "oDIV" }, $("#square")[0]);
                $$("img", { "className": "close", "src": "img/close.png", "onclick": "Login_remove()" }, div2);
                var phone_mail = $$("div", { "innerHTML": "手机/邮箱", "className": "phone" }, div2);
                $$("input", { "type": "text", "id": "phmail" }, phone_mail);
                var UserName2 = $$("div", { "innerHTML": "账户", "className": "user2" }, div2);
                $$("input", { "type": "text", "className": "user_text2", "id": "username_text" }, UserName2);
                var PassWord2 = $$("div", { "innerHTML": "密码", "className": "user", "style": { "padding": "10 0 0 70"} }, div2);
                $$("input", { "type": "password", "className": "user_text2", "id": "username_password" }, PassWord2);
                var Login = $$("div", { "className": "login", "innerHTML": "注册", "onclick": "register();", "style": { "width": "175px", "margin": "20 0 0 125"} }, div2);
            }
            else { removeframe(0); }
            break;

    }
}
function removeframe(type) {
    switch (type) {
        case 0:
            $("#login")[0].style.background = "";
            $("#login")[0].style.color = "#5c6573";
            $("#register")[0].style.background = "";
            $("#register")[0].style.color = "#5c6573";
            $("#square")[0].innerHTML = "";
            break;
    }
}
function login() {
    var username = $("#username_text")[0].value;
    var password = $("#username_password")[0].value;
    if (s == 1) {
        alert("您已登录，请不要凑热闹！！！");
    } //U.A.Request("http://cl.1473.cn/ARequest.ashx", (['HREQ', oUser_Name]));
    else if (username == "" || password == "") { alert("用户名或密码未输入!!!"); return; }
    else {
        alert(1);
        var flag = U.A.Request("http://tieba.1473.cn/request.ashx", (['myLogin', 'ccc']));
        alert(flag);
        if (flag == "YES") {
            alert("登录成功");
            s = 1;
            removeframe(0);
            $(".body_o_three2")[0].innerHTML = "";
            $("#Tips_label")[0].innerHTML = "你好," + username + "!" + "<p>欢迎来到焦点吧！O(∩_∩)O</p>"
            $$("div", { "innerHTML": "[登出]", "onclick": "logoutclick();", "style": { "cursor": "pointer"} }, $("#Tips_label")[0]);
        }
    }
}
function logoutclick() {
    $("#Tips_label")[0].innerHTML = "";
}
function register() {
    var phonemail = $("#phmail")[0].value;
    var username = $("#username_text")[0].value;
    var password = $("#username_password")[0].value;
    if (username == "" || password == "" || phonemail == "") { alert("请认真填写每一项!!!"); return; }
    alert("注册成功");
    removeframe(0);
    $("#login")[0].click();
}
function c_login() {
    /// <summary>登录账户</summary>
    var username = document.getElementById("");
    var password = document.getElementById("");
    if (s == 1) {
        alert("您已登录，请不要凑热闹！！！");
    }
    else if (username == "" || password == "") { alert("账号或密码不能为空"); }
    else {

    }
}
function c_enroll() {
    /// <summary>注册账户</summary>
    var username = document.getElementById("");
    var password = document.getElementById("");
    if (s == 1) {
        alert("您已登录，请不要凑热闹！！！");
    } else if (username == "" || password == "") {
        alert("账号或密码不能为空");
    } else {
        US.Ajax.Request({ "mode": "myEnroll", "user": username, "pwd": password });
        alert("注册成功");
    }
}
function c_publich() {
    var note = document.getElementById("");
    var username = document.getElementById("").value.substring();
    if (s == 0) {
        alert("请先登录再进行操作");
        return;
    } else if (note == "") {
        US.Ajax.Request({ "mode": "myPublich", "noteText": note, "user": username });
        alert("发表成功");
        c_take();
    }
}
function c_del() {
    /// <summary>删除帖子</summary>
    var note = document.getElementById("");
    var username = document.getElementById("");
    if (s == 0) {
        alert("请先登录再进行操作");
        return;
    } else {
        US.Ajax.Request({ "mode": "myDel", "noteText": note, "user": username });
        c_take();
    }
}
function c_updata() {
    /// <summary>更改内容</summary>
    var note = document.getElementById("");
    var username = document.getElementById("");
    if (s == 0) {
        alert("请先登录再进行操作");
        return;
    } else {
        US.Ajax.Request({ "mode": "myUpdata", "noteText": note, "user": username });
        c_take();
    }
}
function c_take() {
    /// <summary>获取帖子</summary>
    var username = document.getElementById("");
    var password = document.getElementById("");
    US.Ajax.Request({ "mode": "myTake" });
}
function LoginPane() {
    /// <summary>登录信息</summary>
}