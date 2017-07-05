/*
 * 用户注册
 * */
//1.当页面加载完成后执行
$(function () {
  //2.确认用户名可用
  $('input[name="username"]').blur(function () {
    //请求数据

    $.ajax({
      "url": "http://h6.duchengjiu.top/shop/api_user.php",
      "type": "POST",
      "dataType": "json",
      "data": {
        "status": "check",
        "username": $(this).val()
      },
      "success": function (response) {
        console.log(response);
        if(response.code === 0){
          $("em[class='error']").hide();
          $('em[class="success"]').show();
        }else if(response.code ===2001){
          $('em[class="success"]').hide();
          $("em[class='error']").show();
        }
      }
    });
  });
  //3.点击注册
  $('#register').click(function () {
    //3.获取用户名和密码
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    var repwd = $('input[name="repwd"]').val();
    var agreeLC = $('input[name="agreeLC"]');

    /*
     * 表单验证
     * - [x] 用户名,填写3-20位的英文数字下划线
     * - [x] 密码最小长度为6位
     * - [x] 确认密码
     * */
//      var ruser = /^\w{3,20}$/;
    var rpwd = /^\w{6,18}$/;

    if(!rpwd.test(password)){
      alert("请输入6-18位密码");
    }else if(password !== repwd){
      alert("密码不匹配请重新输入");
    }else if(!agreeLC.is(':checked')){
      alert("请同意良仓协议");
    }
    else{
      /*
       * 4.ajax请求
       * 参数:
       * - url, type, dataType, data{status, username, password}
       * */
      $.ajax({
        "url" : "http://h6.duchengjiu.top/shop/api_user.php",
        "type" : "POST",
        "dataType": "json",
        "data": {
          "status":"register",
          "username":username,
          "password":password
        },
        "success": function (response) {
          console.log(response);
          location.assign('/cn/login.html');
        }
      });

    }

  });
});