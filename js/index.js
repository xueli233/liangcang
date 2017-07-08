
/*
* 轮播图
*
* k*/
  //定义变量
  var val = 2000;  //时间间隔
  var  idx = 0;   //信号量
  var $lis = $('.imageslist li');    //图片列表
  var $cis = $('.circle li');    //小圆圈列表
  var timer;

  //1.设置定时器,定时换图片
  timer = setInterval(function () {
    idx++;
    handle();
  }, val);

  //2.鼠标移入停止
  $('.carousel').mouseenter(function () {
    clearInterval(timer);
  });

  //3.鼠标移出继续
  $('.carousel').mouseleave(function () {
    clearInterval(timer);
    timer = setInterval(function () {
      idx++;
      handle();
    }, val);
  });

  //4.按钮点击事件
  $('.btns').click(function (event) {
    //如果是左按钮
    if(event.target.className == 'leftBtn'){
      idx--;
      handle();
      console.log(idx);
    }

    //如果是右按钮
    if(event.target.className == 'rightBtn'){
      idx++;
      handle();
      console.log(idx);
    }
  });
  //5.小圆圈显示
  $('.circle').click(function (event) {
    $(event.target).addClass('current').siblings().removeClass('current');
    idx = $(event.target).index()+1;
    handle();
  });
  /*
 * 事件处理函数
 * */
  function handle() {
    if (idx < 1) idx = 5;
    if (idx > $lis.length) idx = 1;
    $lis.eq(idx-1).addClass('first').siblings().removeClass('first');
    $cis.eq(idx-1).addClass('current').siblings().removeClass('current');
  }
/***************轮播图 end****************/






/*
 * 商品分类
 * */
var goodsUl = $('#goods-ul');
if(goodsUl){
  shop.api.fetchGoodsCategory(function (respoonse) {
    for(var i=0; i<respoonse.data.length; i++){
      var obj = respoonse.data[i];
      // var diyClassName = 'items';
      $('#goods-category').append('<li class="lis">' +
          '<a href="index.html?cat_id=' + obj.cat_id + '">' +
          '<img src="images/img-'+obj.cat_id + '.png" />' +
          '<p>'+obj.cat_name + '</p>' +
          '</a>' +
          '</li>')
    }
  });
}

 /*
   * 商品详情
   * */
  var cat_id = $.getQueryString('cat_id');
  shop.api.fetchGoodsListByCatId(cat_id, function (response) {
    //如果为空,给出提示
    if (response.data.length === 0) {
      var oH1 = document.createElement('h1');
      oH1.innerText = '当前分类下面没有商品';
      document.body.appendChild(oH1);
      return
    }
    //数据操作
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      var oLi = document.createElement('li'); //li
      oLi.className = 'items';
      if((i+1) % 4 ==  0){
        oLi.className = 'items diy';
      }
      var oA = document.createElement('a');
      oA.className = 'oImg';
      oA.href = 'cn/detail.html?goods_id=' + obj.goods_id;
      oLi.appendChild(oA);

      var oImage = document.createElement('img'); //图片
      oImage.src = obj.goods_thumb;
      var oP = document.createElement('p'); //详情
      oP.className = 'desc';
      oP.innerText = obj.goods_name;
      var sp = document.createElement('span');
      oP.appendChild(sp);
      sp.innerText = '价格:'+ obj.price + '元';
      sp.className = 'price';
      oA.appendChild(oImage);
      oA.appendChild(oP);

      $('#goods-ul').append(oLi); //ul
      iHover();//添加hover效果
    }
  });

  /*
   * 商品列表展示
   * */
  function iHover() {
    $('.items').hover(function (e) {
      var _this = $(this), //闭包 //
          _desc = _this.find('.desc').stop(true),
          width = _this.width(),//取得元素宽
          height = _this.height(),//取得元素高
          left = e.offsetX || e.originalEvent.layerX, //取得左边界
          top = e.offsetY || e.originalEvent.layerY, //取得右边界
          right = width - left, //计算出右边界
          bottom = height - top, //计算出边界
          _out = e.type == "mouseleave",//是否是离开事件
          spos = {}, //起始位置
          way = 'none', //存储进入或离开的方向
          _exec = function (way) {
            spos = {
              left: {"left": -width, "top": 0},
              right: {"left": left, "top": 0},
              top: {"top": -height, "left": 0},
              bottom: {"top": height, "left": 0}
            }[way];

            if (_out) {
              _desc.animate(spos, 'fast');
            } else {
              _desc.css(spos).animate({"left": 0, "top": 0}, 'fast');//进入
            }
          };
      //判断进入/离开的方向
      if (_out) {
        //对象的边界矩阵和当前鼠标的坐标
        var _rect = {
              left: _this.offset().left,
              right: _this.offset().left + _this.width(),
              top: _this.offset().top,
              bottom: _this.offset().top + _this.height()
            },
            pos = (e.pageX || e.pageY) ? {x: e.pageX, y: e.pageY} : {
                  x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
                  y: e.clientY + document.body.scrollTop - document.body.clientTop
                };
        //判断离开的方向
        if (pos.y <= _rect.top) {
          way = 'top';
        } else if (pos.y >= _rect.bottom) {
          way = 'bottom';
        } else if (pos.x <= _rect.left) {
          way = 'left';
        } else {
          way = 'right';
        }
        ;
      } else {
        //获取进入的方向
        way = [{way: 'left', v: left}, {way: 'right', v: right}, {way: 'top', v: top}, {
          way: 'bottom',
          v: bottom
        }].sort(function (a, b) {
          return a.v - b.v;
        })[0].way;
      }
      ;
      //消灭卡顿现像
      $(".desc").hide();
      _this.find('.desc').show();
      // 执行对应边界 进入/离开 的方法
      _exec(way);
    });
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
    qt.html('<a href="cn/login.html" class="login">登录</a><a href="cn/register.html" class="register">注册</a>');
  });
} else {
  var qt = $('.head-nav li:first-child');
  qt.html('<a href="cn/login.html" class="login">登录</a><a href="cn/register.html" class="register">注册</a>');
}
