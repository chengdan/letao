/**
 * Created by 程丹 on 2017/11/4.
 */
$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });


    var id = tools.getParam("productId");
// console.log(id);
    $.ajax({
        type : "get",
        url:"/product/queryProductDetail",
        data :{
            id : id
        },
        success : function (data) {
            // console.log(data);
            var temp = data.size.split("-");
            var sizeArray = [];
            for (var i = temp[0]; i <= temp[1]; i++){
                sizeArray.push(i);
            }
            data.sizeArray = sizeArray;

            $(".mui-scroll").html( template("tpl",data));

            mui('.mui-slider').slider({
                interval:1000
            });
            mui(".mui-numbox").numbox();
        }
    });

    $(".mui-scroll").on("click", ".size", function () {
        // console.log(1);
        $(this).addClass("now").siblings().removeClass('now');
    });

    $(".btn_add_cart").on("click",function () {
        var size = $(".size.now").html();
        // console.log(size);
        var num = $(".mui-numbox-input").val();
        // console.log(num);
        if(!size){
            mui.toast("啊哦，您还没有选择尺码呢");
            return;
        }
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:id,
                num:num,
                size:size
            },
            success:function (data) {
                if(data.success){
                    mui.toast("已经添加成功咯");
                }
                if(data.error === 400){
                    location.href = "login.html?retURL=" + location.href;
                }
            }
        })
    })
});