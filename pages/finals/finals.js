// finals.js
var data = {
  items: [
    { chntext: "aa", cantext: "渣", canpronounce: "zaa1", description: "zaa1" },
    { chntext: "aai", cantext: "斋", canpronounce: "zaai1", description: "zaai1" },
    { chntext: "aau", cantext: "嘲", canpronounce: "zaau1", description: "zaau1" },
    { chntext: "aam", cantext: "站", canpronounce: "zaam6", description: "zaam6" },
    { chntext: "aan", cantext: "赞", canpronounce: "zaan3", description: "zaan3" },
    { chntext: "aang", cantext: "挣", canpronounce: "zaang1", description: "zaang1" },
    { chntext: "aap", cantext: "集", canpronounce: "zaap6", description: "zaap6" },
    { chntext: "aat", cantext: "扎", canpronounce: "zaat3", description: "zaat3" },
    { chntext: "aak", cantext: "责", canpronounce: "zaak3", description: "zaak3" },
    { chntext: "ai", cantext: "挤", canpronounce: "zai1", description: "zai1" },
    { chntext: "au", cantext: "周", canpronounce: "zau1", description: "zau1" },
    { chntext: "am", cantext: "斟", canpronounce: "zam1", description: "zam1" },
    { chntext: "an", cantext: "珍", canpronounce: "zan1", description: "zan1" },
    { chntext: "ang", cantext: "增", canpronounce: "zang1", description: "zang1" },
    { chntext: "ap", cantext: "汁", canpronounce: "zap1", description: "zap1" },
    { chntext: "at", cantext: "侄", canpronounce: "zat6", description: "zat6" },
    { chntext: "ak", cantext: "则", canpronounce: "zak1", description: "zak1" },
    { chntext: "e", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ei", cantext: "四", canpronounce: "sei3", description: "sei3" },
    { chntext: "eu", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "em", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "eng", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ep", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ek", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "i", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "iu", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "im", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "in", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ing", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ip", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "it", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ik", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "o", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "oi", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ou", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "on", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ong", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ont", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "onk", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "oe", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "oeng", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "oek", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "eoi", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "eon", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "eot", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "u", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ui", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "un", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ung", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "ut", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "uk", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "yu", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "yun", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "yut", cantext: "些", canpronounce: "se1", description: "se1" },
    { chntext: "m", cantext: "唔", canpronounce: "m4", description: "m4" },
    { chntext: "ng", cantext: "吴", canpronounce: "ng1", description: "ng1" }
  ]
}
Page({
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
  /**
   * 页面的初始数据
   */
  data: data,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#22b14c',
    })
    wx.setNavigationBarTitle({
      title: '韵母'
    })
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