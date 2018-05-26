const app = getApp()
var data = {
  inputLength: 0
}
Page({
  textarea1_input: function (e) {
    data.inputLength = e.detail.value.length
    this.setData(data)
  },
  form1_reset: function () {
    data.inputLength = 0
    this.setData(data)
  },
  form1_submit: function (e) {
    var that = this
    var input = e.detail.value.input
    if (!input || input.trim().length == 0) {
      wx.showToast({
        title: '请输入发现的问题',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '正在提交...'
    })
    wx.request({
      url: app.globalData.api.url2 + '?code=CAN031&body={"content":"' + input + '","sk":"' + app.globalData.sk + '"}',
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.status != 0) {
          wx.showToast({
            title: '系统繁忙，请稍后再试',
            icon: 'none'
          })
          return
        }

        wx.showToast({
          title: '提交成功，感谢您的反馈',
          icon: 'none'
        })
      },
      fail: function () {
        wx.hideLoading()
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