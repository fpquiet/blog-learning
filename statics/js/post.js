// 根据id 查询评论数据

var search = location.search;
var id = search.substr(search.indexOf('=') + 1);

initData();

function initData() {
  $.ajax({
    type: 'get',
    url: '/getcomments/' + id,
    dataType: 'json'
  })
  .then(function(data) {
    if(data && data.length > 0) {
      var html = template('tpl', {data: data});
      $('#comments').html(html);
    }else{
      $('#comments').html('暂无评论，赶紧来坐沙发');
    }
    
  }, function() {
    console.log('服务器出错了')
  })
}


//2 发表评论
$('#btnSend').click(function() {
  //构造post的数据
  //name=xx&email=xxx

  var data = $('#frm').serialize();

  $.ajax({
    type: 'post',
    url: '/addblog',
    data: data,
    dataType: 'json'
  })
  .then(function(data) {
    if(data.code === 1) {
      //评论成功
      initData();
      layer.msg(data.msg);

      //清空文本框
    }else{
      //评论失败
      layer.msg(data.msg, function(){
        //关闭后的操作
      });
    }
  }, function() {
    console.log('服务器出错了')
  })
  return false;
})