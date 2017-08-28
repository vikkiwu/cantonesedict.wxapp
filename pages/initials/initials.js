// initials.js
var data = {
  items: [
    { chntext: "b", cantext: "波", canpronounce: "bo1", description: "bo1" },
    { chntext: "p", cantext: "婆", canpronounce: "po4", description: "po4" },
    { chntext: "m", cantext: "摸", canpronounce: "mo2", description: "mo2" },
    { chntext: "f", cantext: "科", canpronounce: "fo1", description: "fo1" },
    { chntext: "d", cantext: "地", canpronounce: "dei6", description: "dei6" },
    { chntext: "t", cantext: "条", canpronounce: "tiu4", description: "tiu4" },
    { chntext: "n", cantext: "你", canpronounce: "nei2", description: "nei2／lei2（n也可以读l）" },
    { chntext: "l", cantext: "了", canpronounce: "liu4", description: "liu4" },
    { chntext: "g", cantext: "哥", canpronounce: "go1", description: "go1" },
    { chntext: "gw", cantext: "广", canpronounce: "gwong2", description: "gwong2" },
    { chntext: "k", cantext: "其", canpronounce: "kei4", description: "kei4" },
    { chntext: "kw", cantext: "框", canpronounce: "kwaang1", description: "kwaang1" },
    { chntext: "ng", cantext: "我", canpronounce: "ngo5", description: "ngo5" },
    { chntext: "h", cantext: "哈", canpronounce: "haa1", description: "haa1" },
    { chntext: "z", cantext: "站", canpronounce: "zaam6", description: "zaam6" },
    { chntext: "c", cantext: "车", canpronounce: "ce1", description: "ce1" },
    { chntext: "s", cantext: "三", canpronounce: "saam1", description: "saam1" },
    { chntext: "j", cantext: "衣", canpronounce: "ji1", description: "ji1（j发y音）" },
    { chntext: "w", cantext: "乌", canpronounce: "wu1", description: "wu1（w发u音）" }
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
      title: '声母'
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