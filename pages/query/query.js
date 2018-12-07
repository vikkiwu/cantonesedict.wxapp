const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    hot_query: [],
    new_update: [],
    my_query: [],
    ready_to_query: true,
    hide_fast_query: true,
    hide_query_result: true,
    query_placeholder: '输入要查询的字词(最多20字)',
    voice_img: '/images/voice.png',
    input: '',
    input_focus: false
  },
  play_voice: function (e) {
    var that = this;
    that.setData({
      voice_img: '/images/loading.gif'
    });
    app.play_voice(e, null, function () {
      that.setData({
        voice_img: '/images/voice.png'
      });
    });
  },
  query_input: function (e) {
    this.setData({
      input_focus: true,
      hide_query_result: true,
      hide_fast_query: false,
      ready_to_query: false
    });
  },
  query_cancel: function () {
    this.setData({
      ready_to_query: true
    });
  },
  fast_query: function (e) {
    var input = e.currentTarget.dataset.input;
    if (!input) {
      return;
    }

    var that = this;
    that.input_change(e, input);
    that.setData({
      input: input
    });
  },
  input_change: function (e, input) {
    var that = this;
    if (!input) {
      input = e.detail.value;
    }

    if (!input) {
      return;
    }

    var my_query = wx.getStorageSync('my_query');
    if (!my_query) {
      my_query = [];
    }

    my_query.push({
      text: input,
      query_at: new Date().getTime()
    });

    that.setData({
      my_query: my_query
    });

    wx.setStorage({
      key: 'my_query',
      data: my_query
    })

    wx.showLoading({
      title: '正在查询...'
    })
    app.request_with_sk({
      url: app.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0002',
        body: JSON.stringify({
          sk: app.globalData.sk,
          input: input,
          original_language: 'mandarin',
          translation_language: 'cantonese'
        })
      }
    },
      function (res) {
        wx.hideLoading();
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.items || res.data.body.items.length == 0) {
          return;
        }

        that.setData({
          hide_fast_query: true,
          hide_query_result: false,
          items: res.data.body.items
        });
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'hot_query',
      success: function (res) {
        if (res.data && res.data.length > 0) {
          that.setData({
            hot_query: res.data
          });
        }
      }
    })
    wx.getStorage({
      key: 'new_update',
      success: function (res) {
        if (res.data && res.data.length > 0) {
          that.setData({
            new_update: res.data
          });
        }
      }
    })
    wx.getStorage({
      key: 'my_query',
      success: function (res) {
        if (res.data && res.data.length > 0) {
          that.setData({
            my_query: res.data
          });
        }
      }
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