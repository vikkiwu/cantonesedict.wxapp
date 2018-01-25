const app = getApp()
var data = {
  hasUserInfo: false,
  userid: 0,
  categoryname: '',
  categoryid: 0,
  todaycompleted: 0,
  completed: 0,
  remains: 0,
  total: 0,
  groups: [
    { title: "最近更新", url: "/pages/newupdates/newupdates" },
    { title: "查询最多", url: "/pages/hotquery/hotquery" }
  ]
}
Page({

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
    if (app.globalData.userInfo && app.globalData.userInfo.userid) {
      data.hasUserInfo = true
      data.userid = app.globalData.userInfo.userid
    }
    if (app.globalData.learning) {
      data.categoryname = app.globalData.learning.categoryname || ''
      data.categoryid = app.globalData.learning.categoryid || 0
      data.todaycompleted = app.globalData.learning.todaycompleted || 0
      data.completed = app.globalData.learning.completed || 0
      data.remains = app.globalData.learning.remains || 0
      data.total = app.globalData.learning.total || 0
    }
    this.setData(data)
    console.log(app.globalData)
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