/**
 * Created by 程丹 on 2017/11/1.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators: false
});



function gitHistory() {
    var search_history = localStorage.getItem("lt_search_history") || "[]";
    var arr = JSON.parse(search_history);
    return arr;
}

function render() {
    var arr = gitHistory();
    $(".lt_history").html(template("tpl",{arr:arr}));
}
render();

$(".lt_history").on("click",".icon_clear",function () {
    localStorage.removeItem("lt_search_history");
    render();
});

$(".lt_history").on("click",".fa-close",function (){
   var arr = gitHistory();
    var index = $(this).data("index");
    arr.splice(index,1);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    render();
});

$(".lt_search button").on("click",function () {
    var key = $(".lt_search input").val().trim();
    // console.log(key);
    if(key === ""){
        mui.toast('我不知道你想买啥呀');
        return;
    }
    var arr = gitHistory();
    var index = arr.indexOf(key);
    if(index > -1){
        arr.splice(index,1);
    }
    if(index >= 10){
        arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    render();
    location.href = "searchList.html?key=" + key;
});














