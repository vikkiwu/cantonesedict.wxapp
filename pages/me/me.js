// me.js
//获取应用实例
const app = getApp()
var data = {
  usernameerror: '',
  userpasserror: '',
  message: '',
  hasUserInfo: false,
  userInfo: {}
}
Page({
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
      url: 'https://wx.uimoe.com/home/index?code=CAN014&body={"username":"' + username + '","userpass":"' + userpass + '"}',
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

        data.hasUserInfo = true
        data.userInfo = {
          nickName: username
        }
        app.globalData.userInfo = {
          nickName: username
        }
        that.setData(data)
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
    if (app.globalData.userInfo && app.globalData.userInfo.nickName) {
      data.hasUserInfo = true
      data.userInfo = {
        nickName: username
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