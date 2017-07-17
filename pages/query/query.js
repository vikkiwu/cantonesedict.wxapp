// query.js

var data = {
  input: '',
  results: [{ chntext: '未找到相关数据' }]
}
Page({

  query: function () {
    var that = this
    if (that.data.input || that.data.input.trim().length==0){
      that.setData({
        results: [{ chntext: '请输入要查询的字词' }]
      })
      return
    }
    wx.request({
      url: 'https://wx.uimoe.com',
      method: 'POST',
      data: {
        code: 'CAN001',
        body: '{\"input\":\"' + that.data.input + '\"}'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var message = '系统繁忙，请稍后再试哦~'
        if (res.data.message) {
          message = res.data.message
        }
        if (res.data.error != 0) {
          that.setData({
            results: [{ chntext: message }]
          })
          return
        }
        var results = [];
        try {
          results = JSON.parse(res.data.body)
        } catch (e) {
          console.log(res.data.body)
        }

        console.log(results)
        that.setData({
          results: results
        })
      }
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