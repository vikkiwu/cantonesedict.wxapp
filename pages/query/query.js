// query.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  message_tapped: function (e) {
    var input = this.data.input
    if (!input) {
      return
    }

    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=CAN002&body={"opttype":0,"chntext":"' + input + '"}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '感谢您的反馈',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  playvoicechanged: function (e) {
    this.setData({
      playvoice: e.detail.value
    })
  },
  play_voice: function (e) {
    console.log(e.currentTarget)
    var voiceurl = ''
    if (e.currentTarget.dataset.canvoice) {
      voiceurl = e.currentTarget.dataset.canvoice
    } else {
      voiceurl = 'https://wx.uimoe.com/assets/voice/' + e.currentTarget.dataset.canpronounce + '.wav'
    }
    wx.playBackgroundAudio({
      dataUrl: voiceurl,
      title: e.currentTarget.dataset.canpronounce + '.wav',
    })
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

    that.setData({
      input: input
    })
    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=CAN001&body={"input":"' + input + '"}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var message = '未找到相关数据，点击文字反馈给我哦~'
        if (res.data.error != 0) {
          that.setData({
            message: message,         
            results: []
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
          that.setData({
            message: message,
            results: []
          })
          return;
        }

        wx.vibrateShort({})
        that.setData({
          message: '',
          results: innerResponse.results
        })

        if (that.data.playvoice) {
          var i = 0
          var canplay = true
          var timer1 = setInterval(function () {
            if (i >= innerResponse.results.length) {
              canplay = true
              clearInterval(timer1)
              return
            }

            if (!canplay) {
              return
            }

            canplay = false
            var item = innerResponse.results[i]
            var voiceurl = ''
            if (item.canvoice) {
              voiceurl = item.canvoice
            } else {
              voiceurl = 'https://wx.uimoe.com/assets/voice/' + item.canpronounce + '.wav'
            }

            backgroundAudioManager.onError(function () {
              console.log('e')
              canplay = true
              i += 1
            })
            backgroundAudioManager.onEnded(function () {
              console.log('end')
              canplay = true
              i += 1
            })
            backgroundAudioManager.title = item.canpronounce + '.wav'
            backgroundAudioManager.epname = 'vocabulary'
            backgroundAudioManager.singer = '粤语小词典'
            backgroundAudioManager.src = voiceurl
          }, 100)
        }
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
    playvoice: true
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