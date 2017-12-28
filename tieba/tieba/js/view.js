/// <reference path="uform.js" />
var s = 0, aa;                              //变量s用于判定当前状态
//var myDate = new Date();
//var mytime = myDate.toLocaleString();     //获取当前时间
var users;                                  //用于保存登陆者等信息
var page = 1, tpage, outstr = "";           //page为当前页，tpage为总页数，outstr用于输出页码。
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
    take_title();
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
                $$("img", { "className": "close", "src": "img/close.png", "onclick": "removeframe(0)" }, div1);
                var UserName = $$("div", { "innerHTML": "账户", "className": "user", "style": { "padding-top": "40px", "padding-left": "60px"} }, div1);
                $$("input", { "type": "text", "className": "user_text", "id": "username_text" }, UserName);
                var PassWord = $$("div", { "innerHTML": "密码", "className": "user", "style": { "padding-top": "15px", "padding-left": "60px"} }, div1);
                $$("input", { "type": "password", "className": "user_text", "id": "username_password" }, PassWord);
                var Login = $$("div", { "className": "login", "innerHTML": "登录", "onclick": "login();", "style": { "margin-top": "20px"} }, div1);
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
                $$("img", { "className": "close", "src": "img/close.png", "onclick": "removeframe(0)" }, div2);
                var phone_mail = $$("div", { "innerHTML": "手机/邮箱", "className": "phone" }, div2);
                $$("input", { "type": "text", "id": "phmail" }, phone_mail);
                var UserName2 = $$("div", { "innerHTML": "账户", "className": "user2" }, div2);
                $$("input", { "type": "text", "className": "user_text2", "id": "username_text" }, UserName2);
                var PassWord2 = $$("div", { "innerHTML": "密码", "className": "user", "style": { "padding-top": "10px"} }, div2);
                $$("input", { "type": "password", "className": "user_text2", "id": "username_password" }, PassWord2);
                var Login = $$("div", { "className": "login", "innerHTML": "注册", "onclick": "register();", "style": { "width": "180px", "margin-left": "125px"} }, div2);
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
    //跨域写法:window.frames[0].U.A.Request(参数);
    //alert(window.frames[0].U.A.Request("http://tiebabll.1473.cn/request.ashx", (["myLogin", "bbb","ccc"])).value);
    var username = $("#username_text")[0].value;
    var password = $("#username_password")[0].value;
    if (username == "" || password == "") { alert("用户名或密码未输入!!!"); return; }
    else {
        var flag = window.frames[0].U.A.Request("http://tiebabll.1473.cn/request.ashx", (["myLogin", username, password])).value;
        if (flag == "YES") {
            s = 1;
            users = username;
            alert("登陆成功");
            removeframe(0);
            $(".body_o_three2")[0].innerHTML = "";
            $("#Tips_label")[0].innerHTML = "你好," + username + "!" + "<p>欢迎来到焦点吧！O(∩_∩)O</p>"
            $$("div", { "innerHTML": "[登出]", "onclick": "logoutclick();", "style": { "cursor": "pointer"} }, $("#Tips_label")[0]);
        } else {
            alert("登陆失败，请确保账号密码没有错误。");
        }
    }

}

function logoutclick() {
    $("#Tips_label")[0].innerHTML = ""; s = 0;
}
function register() {
    var phonemail = $("#phmail")[0].value;
    var username = $("#username_text")[0].value;
    var password = $("#username_password")[0].value;
    if (username == "" || password == "" || phonemail == "") { alert("请认真填写每一项!!!"); return; }
    else {
        window.frames[0].U.A.Request("http://tiebabll.1473.cn/request.ashx", (["myEnroll", username, password, phonemail]));
        alert("注册成功");
        removeframe(0);
        $("#login")[0].click();
    }
}
function publich() {
    var title = $("#title")[0].value;
    var note = $("#note")[0].value;
    if (s == 0) {
        alert("请先登录再进行操作");
        return;
    } else if (note != "" || title != "") {
        window.frames[0].U.A.Request("http://tiebabll.1473.cn/request.ashx", (["myPublish", title, note, users, "123"]));
        alert("发表成功");
    }
    take_title();
}
function take_title() {
    $("#ttt")[0].innerHTML = "";
    aa = eval(window.frames[0].U.A.Request("http://tiebabll.1473.cn/request.ashx", (["take_title"])).value);
    for (var i = 0; i < 5; i++) {
        $$("div", { "className": "body_t_one", "id": aa[i].id, "innerHTML": aa[i].title, "onclick": "take_all(this.id);" }, $("#ttt")[0]);
    }
    totalpage();
}
function take_all(id) {
    $("#n_t")[0].innerHTML = "";
    $("#a_n")[0].innerHTML = "";
    $("#p_t")[0].innerHTML = "";
    var bb = eval(window.frames[0].U.A.Request("http://tiebabll.1473.cn/request.ashx", (["myTake", id])).value);
    $$("div", { "className": "body_f_one", "id": bb[0].id, "innerHTML": bb[0].title }, $("#n_t")[0]);
    $$("div", { "className": "body_f3_two", "id": bb[0].id, "innerHTML": bb[0].author }, $("#a_n")[0]);
    $$("div", { "className": "body_f_two", "id": bb[0].id, "innerHTML": bb[0].note }, $("#n_t")[0]);
    $$("div", { "className": "body_f3_three", "id": bb[0].id, "innerHTML": bb[0].timerss }, $("#p_t")[0]);
}
function totalpage() {
    if ((aa.length) % 5 == 0) { tpage = parseInt((aa.length + 1) / 5); }
    else { tpage = parseInt(aa.length / 5) + 1; }
    if (page != 1) {
        outstr = outstr + "<a onclick='getpage(1)'>首页</a>"
        outstr = outstr + "<a onclick='getpage(" + (page - 1) + ")'>上一页</a>";
    }
    if (page != tpage) {
        outstr = outstr + "<a onclick='getpage(" + tpage + ")'>尾页</a>"
    }
    if (tpage <= 10) {
        for (count = 1; count <= tpage; count++) {
            if (count != page) {
                outstr = outstr + "<li class='number' onclick='getpage(" + count + ")'>" + (count) + "</li>";
            } else {
                outstr = outstr + "<li class='number_select' >" + (count) + "</li>";
            }
        }
        if (page != 10) {
            outstr = outstr + "<a onclick='getpage(" + (page + 1) + ")'> next </a>";
        }
    } else if (tpage > 10) {
        if (parseInt((page - 1) / 10) == 0) {

            if (page <= 6) {
                for (count = 1; count <= 10; count++) {
                    if (count != page) {
                        outstr = outstr + "<li class='number' onclick='getpage(" + count + ")'>" + (count) + "</li>";
                    } else {
                        outstr = outstr + "<li class='number_select'>" + count + "</li>";
                    }
                }
            }
            else {
                for (count = page - 5; count <= page + 5; count++) {
                    if (count != page) {
                        outstr = outstr + "<li class='number' onclick='getpage(" + count + ")'>" + (count) + "</li>";
                    } else {
                        outstr = outstr + "<li class='number_select'>" + count + "</li>";
                    }
                }
            }
            outstr = outstr + "<a onclick='getpage(" + (page + 1) + ")'> next </a>";
        }
        else if (parseInt((page - 1) / 10) == parseInt(tpage / 10)) {
            for (count = tpage - 7; count <= tpage; count++) {
                if (count != page) {
                    outstr = outstr + "<li class='number' onclick='getpage(" + count + ")'>" + (count) + "</li>";
                } else {
                    outstr = outstr + "<li class='number_select'>" + count + "</li>";
                }
            }

            if (page < count - 1) {
                outstr = outstr + "<a onclick='getpage(" + (page + 1) + ")'> next </a>";
            }
        }
        else {
            for (count = page - 5; count <= page + 4 && count <= tpage; count++) {
                if (count != page) {
                    outstr = outstr + "<li class='number' onclick='getpage(" + count + ")'>" + (count) + "</li>";
                } else {
                    outstr = outstr + "<li class='number_select'>" + count + "</li>";
                }
            }
            if (page != null) {
                outstr = outstr + "<a onclick='getpage(" + (page + 1) + ")'> next </a>";
            }
        }
    }
    document.getElementById("ul_page").innerHTML = "<div id='setpage'><span id='info'>共" + tpage + "页|第" + page + "页<\/span>" + outstr + "<\/div>";
    outstr = "";
}
function getpage(target) {
    page = target;
    totalpage();
    gettitle(target - 1);
}
function gettitle(number) {
    $("#ttt")[0].innerHTML = "";
    var startnumber = number * 5;
    var endnumber = startnumber + 5;
    for (; startnumber < endnumber; startnumber++) {
        if (aa[startnumber] != undefined) {
            $$("div", { "className": "body_t_one", "id": aa[startnumber].id, "innerHTML": aa[startnumber].title, "onclick": "take_all(this.id);" }, $("#ttt")[0]);
        }
    }
}