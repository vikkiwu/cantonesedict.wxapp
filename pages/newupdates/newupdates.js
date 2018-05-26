const app = getApp()
Page({
  play_voice: function (e) {
    var voice = e.currentTarget.dataset.canvoice;
    var prounounce = e.currentTarget.dataset.canpronounce;
    app.play_voice(voice, prounounce);
  },
  form1_submit: function (e) {
    this.loaddata()
  },
  loaddata: function () {
    var that = this
    wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      url: app.globalData.api.url + '?code=CAN005&body={"page":' + that.data.page + ',"pagesize":10}',
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        var message = '系统繁忙，请稍后再试哦~'
        if (res.data.message) {
          message = res.data.message
        }
        if (res.data.error != 0) {
          wx.showToast({
            title: '没有更多了...',
            icon: 'success',
            duration: 1000
          })
          return
        }
        var innerResponse = {};
        try {
          innerResponse = JSON.parse(res.data.body)
        } catch (e) {
          console.log(res.data.body)
        }

        if (!innerResponse.items) {
          return;
        }
        var newpage = that.data.page + 1
        that.setData({
          page: newpage,
          items: innerResponse.items
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
  data: {
    page: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '最近更新'
    })
    this.loaddata()
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