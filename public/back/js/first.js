/**
 * Created by 程丹 on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 2;

    function render() {
        $.ajax({
            type :"get",
            url : "/category/queryTopCategoryPaging",
            data:{
                page : currentPage,
                pageSize : pageSize
            },
            success : function (data) {
                // console.log(data);
                var html = template("tpl",data);
                $("tbody").html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion : 3,
                    currentPage : currentPage,
                    totalPages : Math.ceil(data.total /pageSize),
                    size : "small",
                    onPageClicked(a,b,c,page){
                        currentPage = page,
                            render();
                    }
                })
            }
        })
    }
    render();

    $(".btn_add").on("click",function () {
        $("#addModal").modal("show");
    });

    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields : {
            categoryName : {
               validators : {
                   notEmpty:{
                       message : "一级分类名称不能为空"
                   }
               }
            }
        }
    });

    $form.on("success.form.bv",function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success : function (data) {
                if(data.success){
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    render();
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                }
            }
        })
    })
});