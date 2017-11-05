/**
 * Created by 程丹 on 2017/11/5.
 */
$(function () {
    $(".btn_getcode").on("click",function () {
        var $this = $(this);
        if($this.hasClass("disabled")){
            return;
        }
        $this.addClass("disabled").html("发送验证码中...");
        $.ajax({
            type : "get",
            url:"/user/vCode",
            success : function (msg) {
                console.log(msg.vCode);
                var num = 60;
                var timer = setInterval(function () {
                    num--;
                    $this.html(num +"秒后再次发送");
                    if(num <= 0){
                        $this.html("点击发送验证码").removeClass("disabled");
                        clearInterval(timer);
                    }
                },1000)
            }
        })
    });


   $(".btn_register").on("click",function () {
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var repassword = $("[name='repassword']").val();
        var mobile = $("[name='mobile']").val();
        var vCode = $("[name='vCode']").val();
       if(!username){
           mui.toast("您还没有输入用户名哦");
           return;
       }
       if(!password){
           mui.toast("您还没有输入密码哦");
           return;
       }
       if(!repassword){
           mui.toast("您还没有输入确认密码哦");
           return;
       }
       if(password != repassword){
           mui.toast("您输入的两次密码不一致哦");
           return;
       }
       if(!mobile){
           mui.toast("您还没有输入手机号码哦");
           return;
       }
       if(!/^1[34578]\d{9}$/.test(mobile)){
           mui.toast("真调皮，输入有效的手机号码吧");
           return;
       }
       if(!vCode){
           mui.toast("您还没有输入验证码哦");
           return;
       }
       if(!/^\d{6}$/.test(vCode)){
           mui.toast("真调皮，输入有效的验证码吧");
           return;
       }
        $.ajax({
            type:"post",
            url:"/user/register",
            data:{
                username : username,
                password : password,
                mobile: mobile,
                vCode: vCode
            },
            success : function (msg) {
                if(msg.success){
                    mui.toast("注册成功了，即将开始您的购物之旅");
                    setTimeout(function () {
                        location.href = "login.html";
                    },1000)
                }else {
                    mui.toast(msg.message);
                }
            }
        })
   })
});