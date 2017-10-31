/**
 * Created by 程丹 on 2017/10/29.
 */
if(location.href.indexOf("login.html") < 0){
    $.ajax({
        type: "get",
        url : "/employee/checkRootLogin",
        success : function (data) {
            if(data.error === 400){
                location.href = "login.html";
            }
        }
    });
};

$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function () {
        //让进度条结束
        NProgress.done();
    }, 500);
});

$(function () {
    $(".child").prev().on("click",function () {
        // console.log(1);
        $(this).next().slideToggle();
    });
    
    $(".icon_menu").on("click",function () {
        $(".lt_aside").toggleClass("now");
        $(".lt_main").toggleClass("now");
        $(".lt_header").toggleClass("now");
    });
    
    $(".icon_logout").on("click",function () {
        // console.log(1);
        $("#logoutModal").modal("show");
    });

    $(".btn_logout").on("click",function () {
        $.ajax({
            type : "get",
            url : "/employee/employeeLogout",
            success : function (data) {
                if(data.success){
                    location.href = "login.html";
                }
            }
        })
    })
});

