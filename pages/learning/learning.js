const app = getApp()
Page({
  change_scene: function () {
    wx.navigateTo({
      url: '/pages/choosecategory/choosecategory'
    })
  },
  choose_words: function (e) {
    var scene_id = e.currentTarget.dataset.scene_id;
    wx.navigateTo({
      url: '/pages/choosevocabulary/choosevocabulary?scene_id=' + scene_id
    })
  },
  review_words: function (e) {
    var scene_id = e.currentTarget.dataset.scene_id;
    wx.navigateTo({
      url: '/pages/reviewvocabulary/reviewvocabulary?scene_id=' + scene_id
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    learnning_plan: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'learnning_plan',
      success: function (res) {
        if (res.data) {
          that.setData({
            learnning_plan: res.data
          });
        }
      },
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