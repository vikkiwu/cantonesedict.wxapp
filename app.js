//app.js
const audio_context = wx.createInnerAudioContext();
App({
  onLaunch: function () {
    var that = this;
    that.get_or_set_sk();
    setTimeout(function () {
      that.get_or_set_scenes(function () {
        that.get_or_set_hot_query();
        that.get_or_set_new_update();
        that.get_or_set_learnning_plan();
        that.get_or_set_user_points_rank();
      });
    }, 3000);
  },
  globalData: {
    sk: '',
    api: {
      host: 'https://uimoe.com',
      url: 'https://uimoe.com/api/v3'
    }
  },
  request_with_sk: function (cfg, callback) {
    var that = this;
    wx.request({
      url: cfg.url,
      method: cfg.method,
      data: cfg.data,
      success: function (res) {
        //sk失效
        if (res.data && res.data.status == 6) {
          //清除旧的sk
          that.globalData.sk = '';
          wx.setStorage({
            key: 'sk',
            data: '',
          });

          //重新获取sk
          that.get_sk_with_login();
          setTimeout(function () {
            wx.showToast({
              title: '网络似乎有点问题...请再试一次',
              icon: 'none'
            })
          }, 3000);
          return;
        }
        callback && callback(res);
      },
      fail: function (e) {
        callback && callback({ data: {} });
      }
    })
  },
  get_or_set_sk: function () {
    var that = this;
    var should = true;
    var sk = wx.getStorageSync('sk');
    if (sk) {
      should = false;
      that.globalData.sk = sk;
    }

    if (should) {
      that.get_sk_with_login();
    }
  },
  get_sk_with_login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.get_sk(res.code);
        }
      }
    })
  },
  get_sk: function (code) {
    var that = this;
    wx.request({
      url: that.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0001',
        body: JSON.stringify({
          code: code,
          user_from: 'wxapp'
        })
      }
      ,
      success: function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.sk) {
          return;
        }

        that.globalData.sk = res.data.body.sk;
        wx.setStorage({
          key: 'sk',
          data: res.data.body.sk,
        });
      },
      fail: function (res) {
        var e = res || 'get_sk error';
        console.error(e);
      }
    })
  },
  get_or_set_hot_query: function () {
    var that = this;
    var should = true;
    var last_get_hot_query_at = wx.getStorageSync('last_get_hot_query_at');
    if (last_get_hot_query_at) {
      if (!that.should_update(new Date(last_get_hot_query_at))) {
        should = false;
      }
    }

    if (should) {
      that.get_hot_query();
    }
  },
  get_hot_query: function () {
    var that = this;
    that.request_with_sk({
      url: that.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0008',
        body: JSON.stringify({
          sk: that.globalData.sk,
          skip: 0,
          take: 10
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.items || res.data.body.items.length == 0) {
          return;
        }

        wx.setStorage({
          key: 'hot_query',
          data: res.data.body.items,
        });

        var last_get_hot_query_at = new Date().getTime();
        wx.setStorage({
          key: 'last_get_hot_query_at',
          data: last_get_hot_query_at,
        });
      }
    )
  },
  get_or_set_new_update: function () {
    var that = this;
    var should = true;
    var last_get_new_update_at = wx.getStorageSync('last_get_new_update_at');
    if (last_get_new_update_at) {
      if (!that.should_update(new Date(last_get_new_update_at))) {
        should = false;
      }
    }

    if (should) {
      that.get_new_update();
    }
  },
  get_new_update: function () {
    var that = this;
    that.request_with_sk({
      url: that.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0009',
        body: JSON.stringify({
          sk: that.globalData.sk,
          skip: 0,
          take: 10
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.items || res.data.body.items.length == 0) {
          return;
        }

        wx.setStorage({
          key: 'new_update',
          data: res.data.body.items,
        });

        var last_get_new_update_at = new Date().getTime();
        wx.setStorage({
          key: 'last_get_new_update_at',
          data: last_get_new_update_at,
        });
      }
    )
  },
  get_or_set_learnning_plan: function () {
    var that = this;
    var should = true;
    var last_get_learnning_plan_at = wx.getStorageSync('last_get_learnning_plan_at');
    if (last_get_learnning_plan_at) {
      if (!that.should_update(new Date(last_get_learnning_plan_at))) {
        should = false;
      }
    }

    if (should) {
      that.get_learnning_plan();
    }
  },
  get_learnning_plan: function (callback) {
    var that = this;
    that.request_with_sk({
      url: that.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0003',
        body: JSON.stringify({
          sk: that.globalData.sk
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body) {
          return;
        }

        wx.setStorage({
          key: 'learnning_plan',
          data: res.data.body,
        });

        var last_get_learnning_plan_at = new Date().getTime();
        wx.setStorage({
          key: 'last_get_learnning_plan_at',
          data: last_get_learnning_plan_at,
        });

        callback && callback(res.data.body);
      }
    )
  },
  get_or_set_scenes: function (callback) {
    var that = this;
    var should = true;
    var last_get_scenes_at = wx.getStorageSync('last_get_scenes_at');
    if (last_get_scenes_at) {
      if (!that.should_update(new Date(last_get_scenes_at))) {
        should = false;
      }
    }

    if (should) {
      that.get_scenes(callback);
    } else {
      callback && callback();
    }
  },
  get_scenes: function (callback) {
    var that = this;
    that.request_with_sk({
      url: that.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0004',
        body: JSON.stringify({
          sk: that.globalData.sk
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.items || res.data.body.items.length == 0) {
          return;
        }

        wx.setStorage({
          key: 'scenes',
          data: res.data.body.items,
        });

        var last_get_scenes_at = new Date().getTime();
        wx.setStorage({
          key: 'last_get_scenes_at',
          data: last_get_scenes_at,
        });

        callback && callback();
      }
    )
  },
  get_or_set_user_points_rank: function () {
    var that = this;
    var should = true;
    var last_get_user_points_rank_at = wx.getStorageSync('last_get_user_points_rank_at');
    if (last_get_user_points_rank_at) {
      if (!that.should_update(new Date(last_get_user_points_rank_at))) {
        should = false;
      }
    }

    if (should) {
      that.get_user_points_rank();
    }
  },
  get_user_points_rank: function () {
    var that = this;
    that.request_with_sk({
      url: that.globalData.api.url,
      method: 'GET',
      data: {
        code: 'DICT0016',
        body: JSON.stringify({
          sk: that.globalData.sk
        })
      }
    },
      function (res) {
        console.log(res.data)
        if (!res.data || !res.data.body || !res.data.body.items || res.data.body.items.length == 0) {
          return;
        }

        wx.setStorage({
          key: 'user_points_rank',
          data: res.data.body,
        });

        var last_get_user_points_rank_at = new Date().getTime();
        wx.setStorage({
          key: 'last_get_user_points_rank_at',
          data: last_get_user_points_rank_at,
        });
      }
    )
  },
  should_update: function (dt) {
    var that = this;
    var dt2 = new Date();
    return that.format_date(dt2, 'yyyyMMdd') != that.format_date(dt, 'yyyyMMdd');
  },
  format_date: function (dt, format) {
    format = format.replace('yyyy', dt.getFullYear());
    format = format.replace('MM', dt.getMonth() + 1);
    format = format.replace('dd', dt.getDate());
    format = format.replace('HH', dt.getHours());
    format = format.replace('mm', dt.getMinutes());
    format = format.replace('ss', dt.getSeconds());
    return format;
  },
  play_voice: function (e, voice_url, callbak) {
    var that = this;
    if (!voice_url) {
      voice_url = e.currentTarget.dataset.voice_url
    }

    if (!voice_url) {
      setTimeout(function () {
        callbak && callbak();
      }, 1000)
      return;
    }

    audio_context.src = voice_url;
    audio_context.play();
    setTimeout(function () {
      callbak && callbak();
    }, 1000);
  }
})
