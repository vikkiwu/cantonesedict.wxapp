const app = getApp()
var data = {
  groups: [
    { title: "最近更新", url: "/pages/newupdates/newupdates" },
    { title: "查询最多", url: "/pages/hotquery/hotquery" }
  ], 
  groups2: [
    { title: "我的查询", url: "/pages/myquery/myquery" },
    { title: "我的学习", url: "/pages/mylearning/mylearning" },
    { title: "我的生词", url: "/pages/mynewwords/mynewwords" },
    { title: "我的反馈", url: "/pages/myfeedbacks/myfeedbacks" }
  ],
  groups3: [
    { title: "问题反馈", url: "/pages/problems/problems" },
    { title: "优化建议", url: "/pages/advices/advices" }
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