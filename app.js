//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData = wx.getStorageSync('globalData') || {}
  },
  globalData: {
    userInfo: null,
    learning: null
  }
})
