const app = getApp()
var data = {
  content: '',
  inputLength: 0
}
Page({
  textarea1_input: function (e) {
    var that = this;
    that.setData({
      inputLength: e.detail.value.length
    })
  },
  form1_reset: function () {
    var that = this;
    that.setData({
      inputLength: 0
    })
  },
  form1_submit: function (e) {
    var that = this
    var input = e.detail.value.input
    if (!input || input.trim().length == 0) {
      wx.showToast({
        title: '请输入你的建议',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '正在提交...'
    })
    app.request_with_sk({
      url: app.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0011',
        body: JSON.stringify({
          sk: app.globalData.sk,
          content: input
        })
      }
    },
      function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (!res.data || res.data.status != 0) {
          wx.showToast({
            title: '系统繁忙，请稍后再试',
            icon: 'none'
          })
          return
        }

        that.setData({ content: '', inputLength: 0 });
        wx.showToast({
          title: '提交成功，感谢您的建议',
          icon: 'none'
        })
      }
    )
  },
  /**
   * 页面的初始数据
   */
  data: data,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '优化建议'
    });
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