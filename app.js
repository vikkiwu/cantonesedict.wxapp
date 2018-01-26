//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.init()
  },
  globalData: {
    api: {
      host: 'https://www.uimoe.com',
      url: 'https://www.uimoe.com/api/index'
    },
    userInfo: null,
    learning: null
  },
  init:function(){
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://www.uimoe.com/api/index?code=CAN019&body={"code":"' + res.code + '"}',
          method: 'POST',
          success: function (res) {
            if (res.data.error != 0) {
              return
            }

            var innerResponse = JSON.parse(res.data.body);
            console.log(innerResponse);

            
          },
          fail: function (e) {
            console.error(e);
          }
        })
      },
      fail: function (e) {
        console.error(e);
      }
    })
  }
})
