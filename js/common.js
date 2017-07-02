
/*
* 商城API
* - config
* - base
*   - storage
*     - seItem
*     -getItem
*   - business
*     - getToken
*     - saveGoodsInfoOfCart
* - api
* */
window.shop = {
  /*config*/
  config: {
    API_PREFIX: "http://h6.duchengjiu.top/shop/",
    USER_TOKEN: "token",
    CART_PREFIX: 'cart_',//在本地存储商品ID和数量
  },
  /*base*/
  base: {
    storage: {
      "setItem": function (k,v) {
        return localStorage.setItem(k,v)
      },
      "getItem": function (k) {
        return localStorage.getItem(k);
      }
    },
    /*business*/
    business: {
      "getToken": function () {
        return shop.base.storage.getItem(shop.config.USER_TOKEN)
      },
      "saveGoodsInfoOfCart": function (goods_id, number) {
        return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number)
      }
    }
  },
  /*api
  *1  fetchGoodsCategory(); //获取商品分类
  *2  fetchGoodsListByCatId(); //获取商品列表详情
  *3  fetchGoodsDetail(); //获取商品详情
  *4  fetchHotGoods(); //获取热门商品
  *5  searchGoods(); //搜索商品
  *6  checkUsernameUnique(); //检查用户是否已注册
  *7  register(); //用户注册
  *8  login(); //用户登录
  *9  updateCart(); //更新购物车
  *10 fetchCart(); //获取购物车信息
  *11 fetchUserAddress(); //获取用户地址
  *12 addUserAddress(); //增加用户地址
  *13 delteUserAddress(); //地址详情
  *14 editUserAddress(); //编辑用户地址
  *15 fetchOrder(); //
  *16 addOrder() //
  *17 cancelOrder();
  * */
  api: {
    //1
    fetchGoodsCategory : function (callback) {
      $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
    },
    //2
    fetchGoodsListByCatId : function (cat_id,callback) {
      $.get(shop.config.API_PREFIX + 'api_goods.php', "cat_id="+cat_id, callback, 'json');
    },
    //3
    fetchGoodsDetail : function (goods_id, callback) {
      $.get(shop.config.API_PREFIX + 'api_goods.php', "goods_id="+goods_id, callback, 'json');
    },
    //4
    fetchHotGoods : function () {

    },
    //5
    searchGoods : function (opts) {
      var data = {};
      data.search_text = opts.search_text;
      data.page = opts.page || 1;
      data.pagesize = opts.pagesize || shop.config.PAGESIZE;
      var callback= opts.callback;

      $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
    },
    //6
    checkUsernameUnique : function () {

    },
    //7
    register : function (username, password, callback) {
      var data = {
        "status": "register",
        "username": username,
        "password": password
      };
      $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
    //8
    login : function (username, password, callback) {
      var data = {
        "status": "login",
        "username": username,
        "password": password
      };
     $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
    //9
    updateCart : function (goods_id, number, callback) {
      var data = {
        "goods_id": goods_id,
        "number": number
      }
      $.post(shop.config.API_PREFIX + 'api_cart.php?token=' + shop.base.business.getToken(), data, callback, 'json');
    },
    //10
    fetchCart : function (callback) {
      $.get(shop.config.API_PREFIX + 'api_cart.php?token=' + shop.base.business.getToken(), callback, 'json')
    },
    //11
    fetchUserAddress : function () {

    },
    //12
    addUserAddress : function () {

    },
    //13
    delteUserAddress : function () {

    },
    //14
    editUserAddress : function () {

    },
    //15
    fetchOrder : function () {

    },
    //16
    addOrder : function () {

    },
    //17
    cancelOrder : function () {

    },

  }
}
/*
* 获取地址中的id编号
* */
$.getQueryString = function (name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
/*
* 更新购物车
*
* */

function updateCartInfo(goods_id, goods_number, callback) {
  shop.api.updateCart(goods_id, goods_number, function (response) {
    //加入购物车之后把商品ID和对应的数量存储到本地
    shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
    callback(response);
  });
}