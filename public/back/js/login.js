/**
 * Created by 程丹 on 2017/10/29.
 */
$(function () {
    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators :{
                    notEmpty : {
                        message : "用户名不能为空"
                    },
                    callback : {
                        message : "用户名或密码错误"
                    }
                }
            },
            password : {
                validators :{
                    notEmpty : {
                        message : "用户密码不能为空"
                    },
                    callback : {
                        message : "用户名或密码错误"
                    },
                    stringLength : {
                        min : 6,
                        max : 12,
                        message : "用户密码必须是6-12位"
                    }
                }
            }
        }
    });

    var validator = $form.data("bootstrapValidator");
    $form.on("success.form.bv",function (e) {
        e.preventDefault();

        $.ajax({
            type : "post",
            url : "/employee/employeeLogin",
            data: $form.serialize(),
            success : function (data) {
                // console.log(data);
                if(data.success){
                    location.href = "index.html"
                }else {
                    if(data.error === 1000){
                        validator.updateStatus("username", "INVALID", "callback");
                    }
                    if(data.error === 1001){
                        validator.updateStatus("password", "INVALID", "callback");
                    }
                }
            }
        })
    });
    $("[type='reset']").on("click",function () {
        validator.resetForm();
    })
});




