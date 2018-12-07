//app.js
const audio_context = wx.createInnerAudioContext();
App({
  onLaunch: function () {
    var that = this;
    that.get_or_set_sk();
    setTimeout(function () {
      that.get_or_set_hot_query();
      that.get_or_set_new_update();
      that.get_or_set_learnning_plan();
      that.get_or_set_scenes();
    }, 5000);
  },
  globalData: {
    sk: '',
    api: {
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
            var sk2 = wx.getStorageSync('sk');
            if (sk2) {
              that.request_with_sk(cfg, callback);
            } else {
              wx.showToast({
                title: '服务器维护中...请1小时后再试',
                icon: 'none'
              })
            }
          }, 5000);
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
    var should = true;
    var last_get_hot_query_at = wx.getStorageSync('last_get_hot_query_at');
    if (last_get_hot_query_at) {
      var ts = new Date().getTime() - last_get_hot_query_at;
      if (ts < 24 * 60 * 60 * 1000) {
        should = false;
      }
    }

    if (should) {
      this.get_hot_query();
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
    var should = true;
    var last_get_new_update_at = wx.getStorageSync('last_get_new_update_at');
    if (last_get_new_update_at) {
      var ts = new Date().getTime() - last_get_new_update_at;
      if (ts < 24 * 60 * 60 * 1000) {
        should = false;
      }
    }

    if (should) {
      this.get_new_update();
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
    var should = true;
    var last_get_learnning_plan_at = wx.getStorageSync('last_get_learnning_plan_at');
    if (last_get_learnning_plan_at) {
      var ts = new Date().getTime() - last_get_learnning_plan_at;
      if (ts < 24 * 60 * 60 * 1000) {
        should = false;
      }
    }

    if (should) {
      this.get_learnning_plan();
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
  get_or_set_scenes: function () {
    var should = true;
    var last_get_scenes_at = wx.getStorageSync('last_get_scenes_at');
    if (last_get_scenes_at) {
      var ts = new Date().getTime() - last_get_scenes_at;
      if (ts < 24 * 60 * 60 * 1000) {
        should = false;
      }
    }

    if (should) {
      this.get_scenes();
    }
  },
  get_scenes: function () {
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
      }
    )
  },
  groupby: function (list, key) {
    var groups = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (!item[key]) {
        continue;
      }

      for (var m = 0; m < groups.length; m++) {
        if (groups[m].key == item[key]) {
          if (!groups[m].val) {
            groups[m].val = [];
          }

          groups[m].val.push(item);
        } else {
          var val = [];
          val.push(item);
          groups.push({
            name: item[key],
            val: val
          });
        }
      }
    }

    return groups;
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

    audio_context.onEnded = function (res) {
      callbak && callbak();
    };
    audio_context.onError = function (res) {
      var e = res || '';
      console.error('播放失败:' + voice_url + ',' + e);
      callbak && callbak();
    };
    audio_context.src = voice_url;
    audio_context.play();
  }
})
