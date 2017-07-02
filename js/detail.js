/*得到商品id*/
var goods_id = $.getQueryString('goods_id');

/*
* 获取单个商品详情
*
* */
shop.api.fetchGoodsDetail(goods_id, function (response) {
  var obj = response.data[0];
  //图片
  var oDiv = document.createElement('div');
  var oImg = document.createElement('img');
  oImg.src = obj.goods_thumb;
  oDiv.appendChild(oImg);
  //文字
  var oP = document.createElement('p');
  oP.innerText = obj.goods_desc;
  oDiv.appendChild(oP);

  var oBtn = document.createElement('button');
  oBtn.innerText = '加入购物车';
  /*
  * 加入购物车点击事件
  *
  *
  * */
  oBtn.onclick = function () {
    //验证用户是否登录
      if(!localStorage.token){
      location.href = 'login.html#callbackurl='+location.href;
      return;
    }
    console.log('已登录');
    //获取当前商品已经购买的数量
    var goods_number = localStorage.getItem('car' + goods_id);
    //如果已有加1,第一次买则设置1
    goods_number = goods_number ?  parseInt(goods_number) + 1 : 1;
    //更新本地购买商品数量
    updateCartInfo(goods_id, goods_number,function () {
     location.href = 'D:/js/project/liangcang-1/cn/cart.html';
    });
  }
  oDiv.appendChild(oBtn);
  document.body.appendChild(oDiv);
});