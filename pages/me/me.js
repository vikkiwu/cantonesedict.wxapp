const app = getApp()
var data = {
  usernameerror: '',
  userpasserror: '',
  message: '',
  hasUserInfo: false,
  userInfo: {}
}
Page({
  login: function (e) {
    var that = this
    wx.showLoading({
      title: '登录中...'
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.api.url + '?code=CAN016&body={"code":"' + res.code + '"}',
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
                    url: app.globalData.api.url + '?code=CAN012&body={"openid":"' + innerResponse.openid + '"}',
                    method: 'POST',
                    success: function (res4) {
                      console.log(res4.data)
                      var message = '系统繁忙，请稍后再试'
                      if (res4.data.message) {
                        message = res4.data.message
                      }

                      if (res4.data.error != 0) {
                        data.message = message
                        that.setData(data)
                        return
                      }

                      var innerResponse = {}
                      try {
                        innerResponse = JSON.parse(res4.data.body)
                      } catch (e) {
                        console.log(res4.data.body)
                      }

                      if (!innerResponse.username) {
                        data.message = message
                        that.setData(data)
                        return
                      }

                      data.hasUserInfo = true
                      data.userInfo = {
                        nickName: userInfo.nickName,
                        avatarUrl: userInfo.avatarUrl,
                        gender: userInfo.gender,
                        province: userInfo.province,
                        city: userInfo.city,
                        country: userInfo.country,
                        username: innerResponse.username,
                        userid: innerResponse.userid
                      }
                      app.globalData.userInfo = {
                        nickName: userInfo.nickName,
                        avatarUrl: userInfo.avatarUrl,
                        gender: userInfo.gender,
                        province: userInfo.province,
                        city: userInfo.city,
                        country: userInfo.country,
                        username: innerResponse.username,
                        userid: innerResponse.userid
                      }
                      that.setData(data)
                      wx.setStorageSync('globalData', app.globalData)
                      wx.hideLoading()
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
    });
  },
  username_inputed: function (e) {
    data.message = ""
    data.usernameerror = ""
    this.setData(data)
  },
  userpass_inputed: function (e) {
    data.message = ""
    data.userpasserror = ""
    this.setData(data)
  },
  form1_submit: function (e) {
    var that = this
    var username = e.detail.value.username;
    var userpass = e.detail.value.userpass;
    var valid = true
    if (!username || username.trim().length == 0) {
      valid = false
      data.usernameerror = "账号不能为空"
    }

    if (!userpass || userpass.trim().length == 0) {
      valid = false
      data.userpasserror = '密码不能为空'
    }

    if (!valid) {
      that.setData(data)
      return
    }

    wx.request({
      url: app.globalData.api.url + '?code=CAN014&body={"username":"' + username + '","userpass":"' + userpass + '"}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var message = '系统繁忙，请稍后再试'
        if (res.data.message) {
          message = res.data.message
        }

        if (res.data.error != 0) {
          data.message = message
          that.setData(data)
          return
        }

        var innerResponse = {}
        try {
          innerResponse = JSON.parse(res.data.body)
        } catch (e) {
          console.log(res.data.body)
        }

        if (!innerResponse.username) {
          data.message = message
          that.setData(data)
          return
        }

        data.hasUserInfo = true
        data.userInfo = {
          nickName: innerResponse.username,
          username: innerResponse.username,
          userid: innerResponse.userid
        }
        app.globalData.userInfo = {
          nickName: innerResponse.username,
          username: innerResponse.username,
          userid: innerResponse.userid
        }
        that.setData(data)
        wx.setStorageSync('globalData', app.globalData)
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: data,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo && app.globalData.userInfo) {
      data.hasUserInfo = true
      data.userInfo = {
        nickName: app.globalData.userInfo.nickName,
        username: app.globalData.userInfo.username,
        userid: app.globalData.userInfo.userid
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})