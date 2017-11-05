/**
 * Created by 程丹 on 2017/11/4.
 */
$(function () {
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        success : function (msg) {
            tools.checkLogin(msg);
            console.log(msg);

            $(".mui-table-view .info").html(template("tpl",msg));
        }
    });

    $(".logout").on("click",function () {
        // console.log(1);
        mui.confirm("您真的要退出了吗?","可怜巴巴的提醒",["否","是"],function (e) {
            if(e.index === 0){
                mui.toast("啊哈哈，就知道您不是真的想退出啦");
            }else {
                $.ajax({
                    type:'get',
                    url:'/user/logout',
                    success : function (msg) {
                        if(msg.success){
                            location.href = "login.html";
                        }
                    }
                })
            }
        })
    })
});