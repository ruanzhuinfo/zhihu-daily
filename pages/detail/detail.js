var WxParse = require('../../wxParse/wxParse.js')
Page({
  data:{
    loading_height:Number,
    title:String,
    path:String
  },
  onLoad:function(options){
    wx.showNavigationBarLoading()
    this.setData({
      loading_height:44,
      path:'https://news-at.zhihu.com/api/4/story/'+options.id
    })

    // 生命周期函数--监听页面加载
    var that = this
    wx.request({
      url: that.data.path,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success        
        // console.log(res.data)
        that.setData({
          title:res.data.title
        })

        var article = res.data.body
        WxParse.wxParse('article', 'html', article, that);
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading()
        that.setData({
          loading_height:0
        })
        
      }
    })
  },
  
  onShareAppMessage: function() {
    // 用户点击右上角分享
    cons
    return {
      title: '知乎日报', // 分享标题
      desc: this.data.title, // 分享描述
      path: this.data.path // 分享路径
    }
  }
})