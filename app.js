//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.init()
  },
  globalData: {
    api: {
      host: 'https://www.uimoe.com/m',
      url: 'https://www.uimoe.com/api/index',
      url2: 'https://www.uimoe.com/api/v2'
    },
    sk: '',
    hasLearning: false,
    hasLearningToday: false,
    learning: {
      categoryname: '',
      categoryid: 0,
      total: 0,
      complete: 0,
      remain: 0,
      todaycomplete: 0,
      todaywords: []
    }
  },
  play_index: -1,
  playing: false,
  play_voice: function (voice, prounounce) {
    var that = this;
    var urls = [];
    if (voice) {
      urls.push(voice);
    } else {
      if (prounounce) {
        var parts = prounounce.split(' ');
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          var url = 'https://www.uimoe.com/m/assets/voice/' + p + '.wav';
          urls.push(url);
        }
      }
    }
    if (urls.length > 0) {
      wx.onBackgroundAudioStop(function () {
        that.playing = false;
      });
      var timer1 = setInterval(function () {
        if (!that.playing) {
          that.playing = true;
          that.play_index += 1;
          if (that.play_index > urls.length - 1) {
            clearInterval(timer1);
            that.playing = false;
            that.play_index = -1;
            return;
          }

          var url = urls[that.play_index];
          if (url) {
            wx.playBackgroundAudio({
              dataUrl: url,
              title: url,
              fail: function () {
                that.playing = false;
              }
            })
          }
        }
      }, 1000);
    }
  },
  init: function () {
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://www.uimoe.com/api/v2?code=CAN020&body={"code":"' + res.code + '"}',
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            if (res.data.status != 0) {
              return
            }

            that.globalData.sk = res.data.body.sk
            that.globalData.hasLearning = true
            that.globalData.hasLearningToday = res.data.body.learning.todaywords.length > 0
            that.globalData.learning = res.data.body.learning
          },
          fail: function (e) {
            console.error(e);
          }
        })
      },
      fail: function (e) {
        console.error(e);
      }
    })
  }
})
