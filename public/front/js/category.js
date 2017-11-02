/**
 * Created by 程丹 on 2017/11/1.
 */
var sc = mui('.mui-scroll-wrapper').scroll({
    indicators: false
});

$.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function (data) {
        $(".lt_aside ul").html( template("tpl",data));
        renderSecond(data.rows[0].id);
    }
});

function renderSecond(id) {
    $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data : {
            id : id
        },
        success: function (data) {
            $(".lt_main ul").html(template("tpl2",data))
        }
    })
}

$(".lt_aside ul").on("click","li",function () {
    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    renderSecond(id);
    // console.log(id);
    sc[1].scrollTo(0,0,500);
});