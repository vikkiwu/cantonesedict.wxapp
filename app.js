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
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.uimoe.com/api/index?code=CAN016&body={"code":"' + res.code + '"}',
            method: 'POST',
            success: function (res2) {
              if (res2.data.error != 0) {
                return
              }

              var innerResponse = {}
              try {
                innerResponse = JSON.parse(res2.data.body)
              } catch (e) {
                console.log(res2.data.body)
              }

              console.log(innerResponse);
              wx.getUserInfo({
                withCredentials: false,
                lang: 'zh_CN',
                success: function (res3) {
                  var userInfo = res3.userInfo
                  console.log(userInfo)
                  wx.request({
                    url: 'https://www.uimoe.com/api/index?code=CAN012&body={"openid":"' + innerResponse.openid + '"}',
                    method: 'POST',
                    success: function (res4) {
                      console.log(res4.data)
                    },
                    fail: function () {
                      wx.hideLoading()
                    }
                  })
                },
                fail: function () {
                  wx.hideLoading()
                  console.log('获取用户信息失败')
                }
              })
            },
            fail: function () {
              wx.hideLoading()
              console.log('code换取session_key失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  }
})
