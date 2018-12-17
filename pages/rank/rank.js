// pages/rank/rank.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide_points_rule: true,
    me: { i: '-', name: '我', points: 0 },
    items: []
  },
  close_points_rule_dialog: function () {
    var that = this;
    that.setData({
      hide_points_rule: true
    });
  },
  open_points_rule_dialog: function () {
    var that = this;
    that.setData({
      hide_points_rule: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '积分排行'
    })
    var that = this;
    wx.getStorage({
      key: 'last_show_points_rule',
      success: function (res) {
        if (!res.data) {
          wx.setStorage({
            key: 'last_show_points_rule',
            data: new Date().getTime(),
          });
          that.setData({
            hide_points_rule: false
          })
        }
      },
      fail: function (e) {
        wx.setStorage({
          key: 'last_show_points_rule',
          data: new Date().getTime(),
        });
        that.setData({
          hide_points_rule: false
        })
      }
    })
    wx.showLoading({
      title: '加载中...'
    })
    wx.getStorage({
      key: 'user_points_rank',
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        if (!res.data || !res.data.items || res.data.items.length == 0) {
          return;
        }

        that.setData({
          me: res.data.me,
          items: res.data.items
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