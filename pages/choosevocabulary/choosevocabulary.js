const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
var data = {
  canchoose: true,
  categoryid: 0,
  userid: 0,
  item: {}
}
Page({
  play_voice: function (e) {
    var canvoice = e.currentTarget.dataset.canvoice
    var canpronounce = e.currentTarget.dataset.canpronounce
    this.play_voice2(canpronounce, canvoice)
  },
  play_voice2: function (canpronounce, canvoice) {
    var items = []
    if (canvoice) {
      items.push({ canvoice: canvoice })
    } else {
      if (!canpronounce) {
        return
      }

      var parts = canpronounce.split(' ')
      for (var i = 0; i < parts.length; i++) {
        items.push({ canpronounce: parts[i] })
      }
    }

    var i = 0
    var canplay = true
    var timer1 = setInterval(function () {
      if (i >= items.length) {
        i = 0
        canplay = true
        clearInterval(timer1)
        return
      }

      if (!canplay) {
        return
      }

      canplay = false
      var item = items[i]
      var voiceurl = ''
      if (item.canvoice) {
        voiceurl = item.canvoice
      } else {
        voiceurl = 'https://wx.uimoe.com/assets/voice/' + item.canpronounce + '.wav'
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
  },
  loaddata: function () {
    var that = this
    wx.showLoading({
      title: '努力加载中...'
    })
    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=can015&body={"categoryid":' + data.categoryid + ',"userid":' + data.userid + '}',
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.error == 7) {
          data.canchoose = false
          that.setData(data)
          return
        }

        if (res.data.error != 0) {
          return
        }
        var innerResponse = {}
        try {
          innerResponse = JSON.parse(res.data.body)
        } catch (e) {
          console.log(res.data.body)
        }

        data.canchoose = true
        data.item = innerResponse
        that.setData(data)

        that.play_voice2(innerResponse.canpronounce, innerResponse.canvoice)
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  next: function () {
    if (!data.canchoose) {
      return
    }
    this.loaddata()
  },
  completed: function (e) {
    if (!data.canchoose) {
      return
    }

    var vocabularyid = e.currentTarget.dataset.vocabularyid
    if (!vocabularyid) {
      return
    }
    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=can009&body={"vocabularyid":' + vocabularyid + ',"categoryid":' + data.categoryid + ',"userid":' + data.userid + '}',
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        if (res.data.error != 0) {
          return
        }

        app.globalData.learning.todaycompleted += 1
        app.globalData.learning.completed += 1
        app.globalData.learning.remains -= 1
        var pages = getCurrentPages()
        var prev = pages[pages.length - 2]
        prev.data = app.globalData.learning
        prev.setData(prev.data)
      },
      fail: function () {
        wx.hideLoading()
      }
    })
    this.loaddata()
  },
  /**
   * 页面的初始数据
   */
  data: data,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    data.categoryid = options.categoryid
    data.userid = options.userid
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