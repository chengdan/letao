/**
 * Created by 程丹 on 2017/11/4.
 */
$(function () {
   mui.init({
       pullRefresh:{
           container : ".mui-scroll-wrapper",
           down:{
               auto:true,
               callback : function () {
                   $.ajax({
                       type:"get",
                       url:"/cart/queryCart",
                       success:function (msg) {
                           // console.log(msg);
                           setTimeout(function () {
                               tools.checkLogin(msg);
                               $("#OA_task_2").html(template("tpl",{data:msg}));
                               mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                           },1000)
                       }
                   })
               }
           }
       }
   });

    $("#OA_task_2").on("tap",".btn_delete",function () {
        var id = $(this).data("id");
        mui.confirm("您忍心删除我吗？","人家好可怜的",["否","是"],function (e) {
            if(e.index == 0){
                mui.toast("您做了明智的选择呢!");
            }else {
                // console.log(1);
                $.ajax({
                    type:"get",
                    url:"/cart/deleteCart",
                    data:{
                        id:[id]
                    },
                    success:function (msg) {
                        tools.checkLogin(msg);
                        if(msg.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                            setTimeout(function () {
                                $(".lt_total span").html("00.00");
                            },1000)
                        }
                    }
                })
            }
        });
    });
    
    $("#OA_task_2").on("tap",".btn_edit",function () {
        var data = this.dataset;
        console.log(data);
        var html = template("tpl2",data);
        html = html.replace(/\n/g,"");
        mui.confirm(html,"编辑商品",["确定","取消"],function (e) {
           if(e.index == 0){
           $.ajax({
               type:"post",
               url:"/cart/updateCart",
               data:{
                   id:data.id,
                   size:$(".lt_edit_size span.now").html(),
                   num:$(".mui-numbox-input").val()
               },
               success:function (data) {
                   // console.log(data);
                   tools.checkLogin(data);
                   if(data.success){
                       mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                       setTimeout(function () {
                           $(".lt_total span").html("00.00");
                       },1000)
                   }
               }
           })
           }else {
               mui.toast("欢迎您回来")
           }
        });
        mui(".mui-numbox").numbox();
        $(".lt_edit_size span").on("tap", function () {
            $(this).addClass("now").siblings().removeClass("now");
        })
    });
    

    $("#OA_task_2").on("change",".ck",function () {
            var total = 0;
            $(":checked").each(function (i,e) {
                total += $(this).data("num") * $(this).data("price");
            });
            $(".lt_total span").html(total.toFixed(2));
        })
});