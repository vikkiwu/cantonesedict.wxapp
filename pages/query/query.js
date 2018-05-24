const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  addtonewwords: function (e) {
    var input = this.data.input
    if (!input) {
      return
    }

    wx.request({
      url: app.globalData.api.url2 + '?code=CAN029&body={"sk":"' + app.globalData.sk + '","chntext":"' + input + '"}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '已加到我的生词',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  feedback: function (e) {
    var input = this.data.input
    if (!input) {
      return
    }

    wx.request({
      url: app.globalData.api.url2 + '?code=CAN030&body={"chntext":"' + input + '","sk":"' + app.globalData.sk + '"}',
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
  play_voice: function (e) {
    var voice = e.currentTarget.dataset.canvoice;
    var prounounce = e.currentTarget.dataset.canpronounce;
    app.play_voice(voice, prounounce);
  },
  show_actions: function (e) {
    var that = this
    var title = e.currentTarget.dataset.chntext + "[" + e.currentTarget.dataset.canpronounce + "]"
    var itemList = []
    if (e.currentTarget.dataset.chntext) {
      itemList = [title, '查询结果不对？点击反馈', '添加到生词']
    } else {
      itemList = ['未找到结果', '点击反馈']
    }
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#22b14c",
      success: function (res) {
        switch (res.tapIndex) {
          case 0: {
            that.play_voice(e)
          } break
          case 1: {
            that.feedback(e)
          } break
          case 2: {
            that.addtonewwords(e)
          } break
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
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
    var input = e.detail.value.input
    if (!input || input.trim().length == 0) {
      that.setData({
        message: '请输入要查询的字词'
      })
      return
    }

    that.setData({
      input: input
    })

    wx.showLoading({
      title: '正在努力查询...'
    })
    wx.request({
      url: app.globalData.api.url2 + '?code=CAN024&body={"input":"' + input + '","sk":"' + app.globalData.sk + '"}',
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        var message = '未找到相关数据，点这里反馈给我哦~'
        if (res.data.status != 0) {
          that.setData({
            message: message,
            results: []
          })
          return
        }

        if (!res.data.body.results || res.data.body.results.length == 0) {
          that.setData({
            message: message,
            results: []
          })
          return
        }

        wx.vibrateShort({})
        that.setData({
          message: '找到' + res.data.body.results.length + "个结果,长按结果项显示更多选项",
          results: res.data.body.results
        })

        if (that.data.playvoice) {
          var i = 0
          var canplay = true
          var timer1 = setInterval(function () {
            if (i >= res.data.body.results.length) {
              i = 0
              canplay = true
              clearInterval(timer1)
              return
            }

            if (!canplay) {
              return
            }

            canplay = false
            var item = res.data.body.results[i]
            var voiceurl = ''
            if (item.canvoice) {
              voiceurl = item.canvoice
            } else {
              voiceurl = app.globalData.api.host + '/assets/voice/' + item.canpronounce + '.wav'
            }

            backgroundAudioManager.onError(function () {
              canplay = true
              i += 1
            })
            backgroundAudioManager.onEnded(function () {
              canplay = true
              i += 1
            })
            backgroundAudioManager.title = item.canpronounce + '.wav'
            backgroundAudioManager.epname = 'vocabulary'
            backgroundAudioManager.singer = '粤语小词典'
            backgroundAudioManager.src = voiceurl
          }, 100)
        }
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
    input: '',
    inputLength: 0,
    message: '...',
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