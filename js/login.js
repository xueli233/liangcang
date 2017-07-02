/*
* 点击登录事件
* */

$(function () {

  $('#login').click(function () {

    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    //发送请求
    shop.api.login(username, password, function (response) {
      //判断是否登录成功,把用户信息存到本地
      if(response.code ===0){
        var data = response.data;
        for(var prop in data){
          if(data.hasOwnProperty(prop)){
            shop.base.storage.setItem(prop,data[prop]);
          }
        }
        //判断有callbackurl则跳回指定的callbackurl,否则首页
        var callbackurl = location.hash.substr(13);
        if(callbackurl){
          location.assign(callbackurl);
        } else {
          location.assign('D:/js/project/liangcang-1/index.html');
        }
      }
    });
  });
});