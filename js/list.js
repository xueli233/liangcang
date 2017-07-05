/*商品分类
* */
var goodsUl = $('#goods-ul');

if(goodsUl){
  shop.api.fetchGoodsCategory(function (respoonse) {
    for(var i=0; i<respoonse.data.length; i++){
      var obj = respoonse.data[i];
      var diyClassName = '';
      if (i % 5 === 0) {
        diyClassName = "end";
      }
      $('#goods-category').append('<li class="' + diyClassName + '">' +
            '<a href="index.html?cat_id=' + obj.cat_id + '">' +
              '<img src="../images/img-'+obj.cat_id + '.png" />' +
              '<p>'+obj.cat_name + '</p>' +
            '</a>' +
          '</li>')
    }
  });
}
/*商品详情
*
*
* */
var cat_id = $.getQueryString('cat_id');
shop.api.fetchGoodsListByCatId(cat_id, function (response) {
  //如果为空,给出提示
  if(response.data.length === 0){
    var oH1 = document.createElement('h1');
    oH1.innerText = '当前分类下面没有商品';
    document.body.appendChild(oH1);
    return
  }
  //数据操作
  for(var i=0; i<response.data.length; i++){
    var obj = response.data[i];
    var oLi = document.createElement('li');
    var oA = document.createElement('a');
    oA.href = 'cn/detail.html?goods_id=' + obj.goods_id;
    oLi.appendChild(oA);

    if (i % 5 === 4) {
      oLi.className += " diy";
    }

    var oImage = document.createElement('img');
    oImage.src = obj.goods_thumb;
    var oP = document.createElement('p');
    oP.innerText = obj.goods_name;
    oA.appendChild(oImage);
    oA.appendChild(oP);

    $('#goods-ul').append(oLi);
  }
});
/*
* 判断是否登录
* */

if(localStorage.getItem('token')){

  $('.head-nav li:first-child').html('<a href="javascript:">'+ localStorage.getItem('username') + '</a><a href="#" class="quit">退出</a> ');
  var qt = $('.quit');
  qt.click(function () {
    console.log('点击');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    var qt = $('.head-nav li:first-child');
    qt.html('<a href="cn/login.html" class="login">登录</a><a href="cn/register.html" class="register">注册</a>');
  });
} else {
  var qt = $('.head-nav li:first-child');
  qt.html('<a href="cn/login.html" class="login">登录</a><a href="cn/register.html" class="register">注册</a>');
}
