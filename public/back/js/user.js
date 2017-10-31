/**
 * Created by 程丹 on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                // console.log(data);
                var html = template("tpl",data);
                $("tbody").html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion : 3,
                    currentPage : currentPage,
                    size : "small",
                    totalPages : Math.ceil(data.total / pageSize),
                    onPageClicked : function (event,originalEvent,type,page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();
    $("tbody").on("click",".btn",function () {
        // console.log(1);
        $("#userModal").modal("show");
        var id = $(this).parent().data("id");
        var isDelete = $(this).parent().data("isDelete");
        isDelete = isDelete === 1 ? 0 : 1;
        // console.log(id);
        // console.log(isDelete);

        $(".btn_confirm").off().on("click",function () {
            // console.log(1);
            $.ajax({
                type:"post",
                url: "/user/updateUser",
                data:{
                    id : id,
                    isDelete : isDelete
                },
                success : function (data) {
                    if(data.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })
        })
    });
});