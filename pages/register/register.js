// register.js
const app = getApp()
Page({
  username_inputed: function (e) {
    this.setData({
      message: '',
      usernameerror: ''
    })
  },
  userpass_inputed: function (e) {
    this.setData({
      message: '',
      userpasserror: ''
    })
  },
  userpass2_inputed: function (e) {
    this.setData({
      message: '',
      userpasserror2: ''
    })
  },
  form1_submit: function (e) {
    var that = this
    var username = e.detail.value.username;
    var userpass = e.detail.value.userpass;
    var userpass2 = e.detail.value.userpass2;
    var valid = true
    if (!username || username.trim().length == 0) {
      valid = false
      that.setData({
        usernameerror: '账号不能为空'
      })
    }

    if (!userpass || userpass.trim().length == 0) {
      valid = false
      that.setData({
        userpasserror: '密码不能为空'
      })
    }

    if (userpass != userpass2) {
      valid = false
      that.setData({
        userpasserror: '两次密码不一致'
      })
    }

    if (!valid) {
      return
    }

    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=CAN010&body={"username":"' + username + '","userpass":"' + userpass + '"}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var message = '系统繁忙，请稍后再试'
        if (res.data.message) {
          message = res.data.message
        }

        if (res.data.error != 0) {
          that.setData({
            message: message
          })
          return
        }

        app.globalData.userInfo = {
          nickName: username
        }
        wx.navigateBack({})
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    usernameerror: '',
    userpasserror: '',
    userpasserror2: '',
    message: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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