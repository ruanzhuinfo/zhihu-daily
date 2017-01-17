// pages/home/home.js
var util = require('../../utils/util.js')
Page({
  data:{
    loading_text:String,
    date:String,
    stories:[],
    top_stories:[]
  },

  onLoad:function(options){
    this.onPullDownRefresh()
  },

  onPullDownRefresh: function(){
    this.setData({
      loading_text: "加载中..."
    })
    wx.showNavigationBarLoading()
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/stories/latest',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // "Authorization": "Bearer 36Xl5vIlQxKje54ffZguAg"
      }, 
      success: function(res){
        
        // http 转换为为 https
        for (var i in res.data.stories) {
          var item = res.data.stories[i]
          item.image = util.convertHTTP(item.images[0])
        }
        for (var i in res.data.top_stories) {
          var item = res.data.top_stories[i]
          item.image = util.convertHTTP(item.image)
        }

        that.setData({
          stories: res.data.stories,
          top_stories: res.data.top_stories,
          date:res.data.date
        })
      },
      complete:function() {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        console.log(that.data)
      }
    })
  },

  onReachBottom:function() {

    wx.showNavigationBarLoading()
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/stories/before/' + that.data.date,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Authorization": "Bearer 36Xl5vIlQxKje54ffZguAg"
      }, 
      success: function(res){
        for (var i in res.data.stories) {
          var item = res.data.stories[i]
          item.image = util.convertHTTP(item.images[0])
        }

        that.setData({
          stories: that.data.stories.concat(res.data.stories),
          date:res.data.date,
        })
      },
      complete:function() {
        wx.hideNavigationBarLoading()
        this.setData({
          loading_text:""
        });
        console.log(that.data)
      }
    })
  },

  tapItem:function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
    })
  },

  onShareAppMessage: function() {
    // 用户点击右上角分享
    cons
    return {
      title:"知乎日报", // 分享标题
      desc: "行业好内容", // 分享描述
      path:"" // 分享路径
    }
  }



})