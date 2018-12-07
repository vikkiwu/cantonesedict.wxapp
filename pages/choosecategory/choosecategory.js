const app = getApp()
Page({
  choose: function (e) {
    var scene_name = e.currentTarget.dataset.scene_name;
    var scene_id = e.currentTarget.dataset.scene_id;
    var total = e.currentTarget.dataset.total;

    var that = this;
    var learning_plan = that.data.learning_plan;
    learning_plan.scene_name = scene_name;
    learning_plan.scene_id = scene_id;
    learning_plan.total_words = total;

    var learning_end_at = that.get_learning_end_at(learning_plan);
    that.setData({
      hide_set_plan: false,
      learning_end_at: learning_end_at,
      learning_plan: learning_plan
    });
  },
  words_per_day_changed: function (e) {
    var that = this;
    var words_per_day = 8;
    if (e.detail.value) {
      words_per_day = Math.abs(parseInt(e.detail.value));
    }

    var learning_end_at = that.get_learning_end_at(that.data.learning_plan);
    that.data.learning_plan.words_per_day = words_per_day;
    that.setData({
      learning_end_at: learning_end_at,
      learning_plan: that.data.learning_plan
    });
  },
  get_learning_end_at: function (learning_plan) {
    var days = Math.ceil(1.0 * learning_plan.total_words / learning_plan.words_per_day);
    learning_plan.days = days;

    var dt = new Date();
    dt.setDate(dt.getDate() + days);
    return app.format_date(dt, 'yyyy-MM-dd');
  },
  set_plan: function () {
    var that = this;
    app.request_with_sk({
      url: app.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0005',
        body: JSON.stringify({
          sk: app.globalData.sk,
          scene_id: that.data.learning_plan.scene_id,
          words_per_day: that.data.learning_plan.words_per_day,
          days: that.data.learning_plan.days
        })
      }
    },
      function (res) {
        console.log(res.data)
        var message = '系统繁忙，请稍后再试';
        if (!res.data) {
          wx.showToast({
            title: message
          })
          return;
        }

        if (res.data.message) {
          message = res.data.message;
        }
        if (res.data.status != 0) {
          wx.showToast({
            title: message
          })
          return;
        }

        app.get_learnning_plan(function (learnning_plan) {
          var pages = getCurrentPages()
          var prev = pages[pages.length - 2]
          prev.data = {
            learnning_plan: learnning_plan
          }
          prev.setData(prev.data)
          wx.navigateBack({})
        })
      }
    )
  },
  hide_dialog: function () {
    var that = this;
    that.setData({
      hide_set_plan: true
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    hide_set_plan: true,
    learning_plan: {
      scene_id: 0,
      scene_name: '',
      words_per_day: 8,
      days: 0
    },
    learning_end_at: '',
    scenes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择词库'
    })
    var that = this;
    wx.getStorage({
      key: 'scenes',
      success: function (res) {
        if (res.data) {
          that.setData({
            scenes: res.data
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