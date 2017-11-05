/**
 * Created by 程丹 on 2017/11/4.
 */
$(function () {
    $(".btn_login").on("click",function () {
        var username = $("[name='username']").val();
        var pass = $("[name='password']").val();
        // console.log(username + pass);
        if(!username){
            mui.toast("您还没有输入用户名哦")
        }
        if(!pass){
            mui.toast("您还没有输入密码哦")
        }
        $.ajax({
            type:"post",
            url : "/user/login",
            data : {
                username : username,
                password : pass
            },
            success : function (msg) {
                if(msg.success){
                    var search = location.search;
                    if(search.indexOf("retURL") > -1){
                        search = search.replace("?retURL=","");
                        location.href = search;
                    }else {
                        location.href = "user.html";
                    }
                }
                if(msg.error === 403){
                    mui.toast(msg.message);
                }
            }
        })
    })
});