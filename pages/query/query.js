// query.js
Page({
  play_voice: function (e) {
    console.log(e.currentTarget)
    var voiceurl = ''
    if (this.data.continueplay === 'checked') {
      for (var i = 0; i < this.data.results.length; i++) {
        var item = this.data.results[i]
        if (item.canvoice) {
          voiceurl = item.canvoice;
        } else {
          voiceurl = 'https://wx.uimoe.com/assets/voice/' + item.canpronounce + '.wav'
        }
        wx.playBackgroundAudio({
          dataUrl: voiceurl,
          title: e.currentTarget.dataset.canpronounce + '.wav',
        })
      }
    } else {
      if (e.currentTarget.dataset.canvoice) {
        voiceurl = e.currentTarget.dataset.canvoice
      } else {
        voiceurl = 'https://wx.uimoe.com/assets/voice/' + e.currentTarget.dataset.canpronounce + '.wav'
      }
      wx.playBackgroundAudio({
        dataUrl: voiceurl,
        title: e.currentTarget.dataset.canpronounce + '.wav',
      })
    }
  },
  textarea1_input: function (e) {
    this.setData({
      inputLength: e.detail.value.length
    })
  },
  form1_reset: function () {
    this.setData({
      input: '',
      results: []
    })
  },
  form1_submit: function (e) {
    var that = this
    var input = e.detail.value.input;
    if (!input || input.trim().length == 0) {
      that.setData({
        message: '请输入要查询的字词'
      })
      return
    }
    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=CAN001&body={"input":"' + input + '"}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var message = '系统繁忙，请稍后再试哦~'
        if (res.data.message) {
          message = res.data.message
        }
        if (res.data.error != 0) {
          that.setData({
            showresult: 'none',
            message: message
          })
          return
        }
        var innerResponse = {};
        try {
          innerResponse = JSON.parse(res.data.body)
        } catch (e) {
          console.log(res.data.body)
        }

        if (!innerResponse.results) {
          message = '未找到相关数据'
          that.setData({
            showresult: 'none',
            message: message
          })
          return;
        }

        that.setData({
          message: '',
          showresult: 'inline',
          results: innerResponse.results
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    inputLength: 0,
    message: '',
    results: [],
    showresult: 'none',
    continueplay: 'checked'
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