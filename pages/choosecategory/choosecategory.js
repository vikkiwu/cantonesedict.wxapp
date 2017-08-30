const app = getApp()
Page({
  loaddata: function () {
    var that = this
    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=CAN003&body={"page":1,"pagesize":10}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var message = '系统繁忙，请稍后再试哦~'
        if (res.data.message) {
          message = res.data.message
        }
        if (res.data.error != 0) {
          return
        }
        var innerResponse = {};
        try {
          innerResponse = JSON.parse(res.data.body)
        } catch (e) {
          console.log(res.data.body)
        }

        if (!innerResponse.items) {
          return;
        }

        that.setData({
          categories: innerResponse.items
        })
      }
    })
  },
  choose: function (e) {
    var categoryname = e.currentTarget.dataset.categoryname
    var categoryid = e.currentTarget.dataset.categoryid

    console.log(app.globalData)
    var userid = 0
    if (app.globalData.userInfo && app.globalData.userInfo.userid) {
      userid = app.globalData.userInfo.userid
    }

    if (userid <= 0) {
      wx.showToast({
        title: '请先转到【我的】，登录后再执行此操作',
        icon: 'success',
        duration: 1000
      })
      return
    }

    wx.request({
      url: 'https://wx.uimoe.com/home/index?code=CAN013&body={"categoryid":' + categoryid + ',"userid":' + userid + '}',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        var message = '系统繁忙，请稍后再试哦~'
        if (res.data.message) {
          message = res.data.message
        }
        if (res.data.error != 0) {
          return
        }
        var innerResponse = {};
        try {
          innerResponse = JSON.parse(res.data.body)
        } catch (e) {
          console.log(res.data.body)
        }

        app.globalData.learning = {
          categoryname: categoryname,
          categoryid: categoryid,
          todaycompleted: innerResponse.todaycompleted,
          completed: innerResponse.completed,
          total: innerResponse.total,
          remains: innerResponse.remains
        }
        wx.setStorageSync('globalData', app.globalData)
      }
    })
    wx.navigateBack({})
  },
  /**
   * 页面的初始数据
   */
  data: {
    categories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择词库'
    })
    this.loaddata()
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