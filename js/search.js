//获取参数search_text
var searchText = $.getQueryString('search_text');
var oSearchText  = document.getElementById('search-text');
oSearchText.value = searchText;

searchGoods();

/*
* 调用商品接口
* */

function searchGoods() {
  shop.api.searchGoods({
    "search_text": searchText,
    "page": 1,
    "pagesize": 10,
    "callback": function (response) {
      var html = '';
      //数据操作
      for(var i=0; i<response.data.length; i++){
        var obj = response.data[i];
        html  += '<div><a href = "detail.html?goods_id='
        + obj.goods_id
        + '"><img src ='
        + obj.goods_thumb
        + '" /><p>'
        + obj.goods_name
        + '</p></a></div>';
      }
      document.getElementById('container').innerHTML= html;
    }
  });
}

/*
* 搜索按钮点击事件
*
* */
var searchBtn = $('#search-btn');
if(searchBtn.length === 1){
  searchBtn.click(function () {
      console.log('11111');
      location.href = 'search.html?search_text=' + $('#search-text').val();
  });
}
