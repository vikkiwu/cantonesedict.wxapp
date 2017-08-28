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
    { chntext: "eu", cantext: "暂无", canpronounce: "", description: "" },
    { chntext: "em", cantext: "暂无", canpronounce: "", description: "" },
    { chntext: "eng", cantext: "郑", canpronounce: "zeng6", description: "zeng6" },
    { chntext: "ep", cantext: "暂无", canpronounce: "", description: "" },
    { chntext: "ek", cantext: "锡", canpronounce: "sek3", description: "sek3" },
    { chntext: "i", cantext: "思", canpronounce: "si1", description: "si1" },
    { chntext: "iu", cantext: "消", canpronounce: "siu1", description: "siu1" },
    { chntext: "im", cantext: "闪", canpronounce: "sim2", description: "sim2" },
    { chntext: "in", cantext: "先", canpronounce: "sin2", description: "sin2" },
    { chntext: "ing", cantext: "升", canpronounce: "sing1", description: "sing1" },
    { chntext: "ip", cantext: "摄", canpronounce: "sip3", description: "sip3" },
    { chntext: "it", cantext: "泄", canpronounce: "sit3", description: "sit3" },
    { chntext: "ik", cantext: "式", canpronounce: "sik1", description: "sik1" },
    { chntext: "o", cantext: "可", canpronounce: "ho2", description: "ho2" },
    { chntext: "oi", cantext: "开", canpronounce: "hoi1", description: "hoi1" },
    { chntext: "ou", cantext: "好", canpronounce: "hou2", description: "hou2" },
    { chntext: "on", cantext: "安", canpronounce: "on1", description: "on1" },
    { chntext: "ong", cantext: "康", canpronounce: "ong1", description: "ong1" },
    { chntext: "ot", cantext: "褐", canpronounce: "hot3", description: "hot3" },
    { chntext: "ok", cantext: "学", canpronounce: "hok6", description: "hok6" },
    { chntext: "oe", cantext: "靴", canpronounce: "hoe1", description: "hoe1" },
    { chntext: "oeng", cantext: "双", canpronounce: "soeng1", description: "soeng1" },
    { chntext: "oek", cantext: "脚", canpronounce: "goek3", description: "goek3" },
    { chntext: "eoi", cantext: "需", canpronounce: "seoi1", description: "seoi1" },
    { chntext: "eon", cantext: "询", canpronounce: "seon1", description: "seon1" },
    { chntext: "eot", cantext: "卒", canpronounce: "zeot1", description: "zeot1" },
    { chntext: "u", cantext: "夫", canpronounce: "fu1", description: "fu1" },
    { chntext: "ui", cantext: "灰", canpronounce: "hui1", description: "hui1" },
    { chntext: "un", cantext: "欢", canpronounce: "hun1", description: "hun1" },
    { chntext: "ung", cantext: "风", canpronounce: "fung1", description: "fung1" },
    { chntext: "ut", cantext: "阔", canpronounce: "fut3", description: "fut3" },
    { chntext: "uk", cantext: "福", canpronounce: "fuk1", description: "fuk1" },
    { chntext: "yu", cantext: "书", canpronounce: "syu1", description: "syu1" },
    { chntext: "yun", cantext: "孙", canpronounce: "syun1", description: "syun1" },
    { chntext: "yut", cantext: "雪", canpronounce: "syut3", description: "syut3" },
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
      if (!e.currentTarget.dataset.canpronounce){
        return
      }
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