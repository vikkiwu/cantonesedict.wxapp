//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var globalData2 = wx.getStorageSync('globalData') || {}
    if (globalData2.userInfo) {
      this.globalData.userInfo = globalData2.userInfo
    }
    if (globalData2.learning) {
      this.globalData.learning = globalData2.learning
    }
  },
  globalData: {
    api: {
      host: 'https://www.uimoe.com',
      url: 'https://www.uimoe.com/api/index'
    },
    userInfo: null,
    learning: null
  }
})
