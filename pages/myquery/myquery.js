const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasItems: false,
    items: []
  },
  clear_my_query: function () {
    var that = this;
    wx.setStorage({
      key: 'my_query',
      data: [],
      success: function (res) {
        that.setData({
          hasItems: false,
          items: []
        });
        wx.showToast({
          title: '已清除',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的查询'
    })
    var that = this;
    wx.getStorage({
      key: 'my_query',
      success: function (res) {
        if (!res.data || res.data.length == 0) {
          return;
        }

        var items = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          var query_at = app.format_date(new Date(item.query_at), 'yyyy/MM/dd HH:mm:ss')
          items.push({
            text: item.text,
            query_at: query_at
          });
        }

        that.setData({
          hasItems: true,
          items: items
        });
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