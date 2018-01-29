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
      host: 'https://www.uimoe.com/m',
      url: 'https://www.uimoe.com/api/index',
      url2: 'https://www.uimoe.com/api/v2'
    },
    sk: '',
    hasLearning: false,
    hasLearningToday: false,
    learning: {
      categoryname: '',
      categoryid: 0,
      total: 0,
      complete: 0,
      remain: 0,
      todaycomplete: 0,
      todaywords: []
    }
  },
  init: function () {
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://www.uimoe.com/api/v2?code=CAN020&body={"code":"' + res.code + '"}',
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            if (res.data.status != 0) {
              return
            }

            that.globalData.sk = res.data.body.sk
            that.globalData.hasLearning = true
            that.globalData.hasLearningToday = res.data.body.learning.todaywords.length > 0
            that.globalData.learning = res.data.body.learning
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
