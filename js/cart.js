$(function () {
  /*
  * 购物车
  * */
  shop.api.fetchCart(function (response) {
     console.log(response);
    for(var i=0; i<response.data.length; i++){
      var obj = response.data[i];
      obj.subtotal = parseInt(obj.goods_price) * parseInt(obj.goods_number);
      var tr = '<tr data-id="'+obj.goods_id+'">\
                <td class="txtl" width="110">\
                  <input type="checkbox" class="chkbox" checked="true">\
                </td>\
                <td width="300"><img width="100px" src="'+obj.goods_thumb+'" /><br /> ' + obj.goods_name + '</td>\
                <td width="120"><span class="operate minus"  id="minus-'+obj.goods_id+'">-</span><input type="text" value="'+obj.goods_number+'" class="goods_number" /><span class="operate plus" id="plus-'+obj.goods_id+'">+</span></td>\
                <td width="160" class="goods_price">'+obj.goods_price+'</td>\
                <td width="160" id="subtotal_'+obj.goods_id+'" class="subtotal">'+obj.subtotal+'</td>\
                <td><span>删除</span></td>\
              </tr>';
      //添加节点
      $('.carTab tbody').append($(tr));
      //添加完总计一下
      total();
    };
  });

  /*
  * table事件委托,任意元素都会触发
  *
  * */
  $('table').click(function (event) {
    /*
    * 1.加减号实现
    * 2.全选
    * 3.总计
    * 4.删除
    * 5.更新购物车
    * */
    //1.加号 //修改数量

    if(event.target.className === "operate plus"){

      var oNumber = $(event.target).prev();
      var number = oNumber.val();
      oNumber.val(++number);
      subtotal();
      updateGoods();
    }
    //2. 减号 //修改数量
    if(event.target.className === "operate minus"){

      var oNumber = $(event.target).next();
      var number = parseInt(oNumber.val());
      if(number<2)number=2;
      oNumber.val(--number);
      subtotal();
      updateGoods();
    }
    //3.全选
    if(event.target.id === 'selectAll'){
      var selected = event.target.checked;
      var checkboxs = document.getElementsByClassName('chkbox');
      for(var i=0; i<checkboxs.length; i++){
        checkboxs[i].checked = selected;
      }
    }
    //5.删除物品
    if(event.target.textContent == '删除'){
      var tr = event.target.parentNode.parentNode;
      tr.parentNode.removeChild(tr);

      if($('.carTab').length == 1){
        $('#payMoneyTxt').text('0');
      }
    }
    //4.总计
    total();
    /*
    * 小计函数: subtotal();
    * */
    function subtotal() {
      var prise = parseInt($(event.target).parent().next().text());
      var oSubtotal = $(event.target).parent().next().next();
      var subtotal = prise*number;
      oSubtotal.text(subtotal);
    }
    /*
    * 更新购物车
    * */
    function updateGoods() {
      var goods_id = $(event.target).parent().parent().attr('data-id');
      shop.api.updateCart(goods_id, number, function (response) {
        console.log(response);
      })
    }
  });
});

/*
 * 计算总价:total();
 * */
function total() {
  var trs = $('#shoppingcarList tr:gt(0)');
  var sum = 0;
  for(var i=0; i<trs.length; i++){
    var tr = trs[i];
    //判断是否选中
    if($(tr).children('td:first').children('input').is(':checked')){
      sum += parseInt($(tr).children('td:eq(4)').text());
    }
    $('#payMoneyTxt').text(sum);
  }
}

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
    qt.html('<a href="login.html" class="login">登录</a><a href="register.html" class="register">注册</a>');
  });
} else {
  var qt = $('.head-nav li:first-child');
  qt.html('<a href="login.html" class="login">登录</a><a href="register.html" class="register">注册</a>');
}