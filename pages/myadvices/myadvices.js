const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasItems: false,
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的建议'
    })
    wx.showLoading({
      title: '加载中...'
    })

    var that = this;
    app.request_with_sk({
      url: app.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0013',
        body: JSON.stringify({
          sk: app.globalData.sk
        })
      }
    },
      function (res) {
        wx.hideLoading();
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.items || res.data.body.items.length == 0) {
          return;
        }

        var items = [];
        for (var i = 0; i < res.data.body.items.length; i++) {
          var item = res.data.body.items[i];
          var create_at = app.format_date(new Date(item.create_at), 'yyyy/MM/dd HH:mm:ss')
          items.push({
            content: item.content,
            create_at: create_at
          });
        }

        that.setData({
          hasItems: true,
          items: items
        });
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