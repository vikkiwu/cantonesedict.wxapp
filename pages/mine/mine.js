const app = getApp()
Page({
  data: {
    points: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIGetUserInfo: false,
    userInfo: {
      avatarUrl: '/images/icon.png',
      city: 'Guangzhou',
      country: 'China',
      gender: 1,
      language: 'zn_CN',
      nickName: '用户',
      province: 'Guangdong'
    }
  },
  to_my_points: function () {
    wx.navigateTo({
      url: '/pages/mypoints/mypoints',
    })
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              that.setData({
                canIGetUserInfo: true,
                userInfo: res.userInfo
              });
              that.get_total_points();
              that.update_user_info(res.userInfo);
            }
          })
        }
      }
    })
  },
  update_user_info: function (userInfo) {
    var that = this;
    var should = true;
    var last_update_user_info_at = wx.getStorageSync('last_update_user_info_at');
    if (last_update_user_info_at) {
      if (!that.should_update(new Date(last_update_user_info_at))) {
        should = false;
      }
    }

    if (!should) {
      return;
    }
    app.request_with_sk({
      url: app.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0017',
        body: JSON.stringify({
          sk: app.globalData.sk,
          avatar_url: userInfo.avatarUrl,
          city: userInfo.city,
          country: userInfo.country,
          gender: userInfo.gender,
          language: userInfo.language,
          nick_name: userInfo.nickName,
          province: userInfo.province
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.total_points) {
          return;
        }

        that.setData({
          points: res.data.body.total_points
        });
        wx.setStorage({
          key: 'last_update_user_info_at',
          data: new Date().getTime()
        })
      }
    )
  },
  get_total_points: function () {
    var that = this;
    app.request_with_sk({
      url: app.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0015',
        body: JSON.stringify({
          sk: app.globalData.sk
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.total_points) {
          return;
        }

        that.setData({
          points: res.data.body.total_points
        });
      }
    )
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo
    });
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