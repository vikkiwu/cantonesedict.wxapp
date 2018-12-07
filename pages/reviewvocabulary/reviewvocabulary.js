const app = getApp()
Page({
  play_voice: function (e) {
    var that = this;
    that.setData({
      voice_img: '/images/loading.gif'
    });
    app.play_voice(e, null, function () {
      that.setData({
        voice_img: '/images/voice.png'
      });
    });
  },
  loaddata: function () {
    var that = this;
    app.request_with_sk({
      url: app.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0007',
        body: JSON.stringify({
          sk: app.globalData.sk
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.learning || res.data.body.learning.length == 0) {
          return;
        }

        var plan = res.data.body.plan || {};
        var learning = res.data.body.learning[0];
        var translation = learning.translation || {};
        that.setData({
          can_choose: true,
          learning: translation,
          plan: plan
        });
      })
  },
  next: function () {
    var that = this;
    that.loaddata();
  },
  /**
   * 页面的初始数据
   */
  data: {
    voice_img: '/images/voice.png',
    can_choose: false,
    text: '',
    explain: [],
    plan: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '复习'
    })
    var that = this;
    that.loaddata();
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