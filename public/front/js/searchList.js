/**
 * Created by 程丹 on 2017/11/2.
 */
mui(".mui-scroll-wrapper").scroll({
    indicators: false
});
var data = {
    proName:"",
    brandId:"",
    price:"",
    num:"",
    page:1,
    pageSize:10
};
// console.log(key);
function render(data) {
    $.ajax({
        type : "get",
        url: "/product/queryProduct",
        data : data,
        success : function (data) {
            // console.log(data);
            $(".lt_product ul").html( template("tpl",data));
        }
    })
}
var key = tools.getParam("key");
$(".lt_search input").val(key);
data.proName = key;
render(data);

$(".lt_search button").on("click",function () {

    $(".sort_title a").removeClass("now");
    $(".sort_title span").removeClass("fa-angle-up").addClass("fa-angle-down");
    // data.price = "";
    // data.num = "";
    var key = $(".lt_search input").val().trim();
    if(key === ""){
        mui.toast("哎呀，我不知道你要搜啥呀");
    }
    data.proName = key;
    render(data);
});



$(".sort_title a[data-type]").on("click",function () {
    var $this = $(this);
    var $span = $(this).find("span");
    if($this.hasClass("now")){
        $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up")
    }else {
        $this.addClass("now").siblings().removeClass("now");
        $span.removeClass("fa-angle-up").addClass("fa-angle-down")
    }
    var type = $this.data("type");
    var value = $span.hasClass("fa-angle-down") ? 2 : 1;
    data[type] = value;
    render(data);
    data.price = "";
    data.num = "";
});