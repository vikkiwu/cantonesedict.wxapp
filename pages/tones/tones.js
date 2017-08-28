// tones.js
var data = {
  items: [
    { chntext: "1", cantext: "诗", canpronounce: "si1", description: "si1" },
    { chntext: "2", cantext: "史", canpronounce: "si2", description: "si2" },
    { chntext: "3", cantext: "试", canpronounce: "si3", description: "si3" },
    { chntext: "4", cantext: "时", canpronounce: "si4", description: "si4" },
    { chntext: "5", cantext: "市", canpronounce: "si5", description: "si5" },
    { chntext: "6", cantext: "事", canpronounce: "si6", description: "si6" },
    { chntext: "7", cantext: "悉", canpronounce: "sik1", description: "sik1" },
    { chntext: "8", cantext: "锡", canpronounce: "sik3", description: "sik3" },
    { chntext: "9", cantext: "蚀", canpronounce: "sik6", description: "sik6" }
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
      title: '声调'
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