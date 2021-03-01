//这里是你备案的域名信息
var host= 'https://app.chainmall.pro/api/';
var hosts= "http://192.168.10.184:8080/"
/**
 * POST请求，
 * URL：接口
 * data：参数，json类型
 * success：成功的回调函数
 * fail：失败的回调函数
 */

wx.login({
  success(res) {
    if (res.code) {
      let code = res.code
      wx.request({
        url: host + 'weixin/getAppletOpenId',
        method: 'POST',
        data: {
          code: code
        },
        success(res) {
          wx.request({
            url: host + '/user/wxAppletTokenByOpenId',
            method: 'POST',
            data: {
              openid: res.data.data.openid
            },
            success(res) {
              if (res.data.data.accessToken) {
                wx.setStorageSync('user', res.data.data.accessToken)
                wx.request({
                  url: host + "user/info",
                  method: "GET",
                  header: {
                    "content-type": "application/json;charset=UTF-8",
                    'Authorization': 'Bearer ' + wx.getStorageSync('user')
                  },
                  success(res) {
                    console.log(res)
                    if (res.data.code == 0) {
                      wx.setStorageSync('userId', res.data.data.uuid)
                    }
                  }
                })
              }
            }
          })

        }
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '登录失败！' + res.errMsg,
      })

    }
  }
})

function postData(requestHandler) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + requestHandler.url,
    header: {
      "content-type": "application/json;charset=UTF-8",
    },
    data: requestHandler.data,
    method: 'POST',
    success: function (res) {
      //直接将返回的数据传入
      requestHandler.success(res.data);
    },
    fail: function () {
      requestHandler.fail();
    },
  })
}

function postData_token(requestHandler) {
  // console.log(wx.getStorageSync('user'))
  if (wx.getStorageSync('user') == "") {
    wx.reLaunch({
      url: '/pages/login/login',
    });
    wx.showToast({
      icon: "none",
      title: '请登录',
    })
  } else {
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: host + requestHandler.url,
      header: {
        "content-type": "application/json;charset=UTF-8",
        'Authorization': 'Bearer ' + wx.getStorageSync('user')
      },
      data: requestHandler.data,
      method: 'POST',
      success: function (res) {
        //直接将返回的数据传入
        requestHandler.success(res.data);
        if (res.data.code == 401) {
          wx.showToast({
            icon: "none",
            title: '请重新登录',
          })
          wx.reLaunch({
            url: '/pages/login/login',
          });
        }
      },
      fail: function () {
        requestHandler.fail();
      },
    })
  }

}
//GET请求，直接URL调用，在url后面加参数
function getData(requestHandler) {
  wx.request({
    url: host + requestHandler.url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      requestHandler.success(res.data);
    },
    fail: function () {
      requestHandler.fail();
    },
  })
}

function getData_token(requestHandler) {
  if (wx.getStorageSync('user') == "") {
    wx.showToast({
      icon: "none",
      title: '请先登录',
    })
    wx.reLaunch({
      url: '/pages/login/login',
    });

  } else {
    wx.request({
      url: host + requestHandler.url,
      header: {
        "content-type": "application/json;charset=UTF-8",
        'Authorization': 'Bearer ' + wx.getStorageSync('user')
      },
      method: 'GET',
      success: function (res) {
        requestHandler.success(res.data);
      },
      fail: function () {
        requestHandler.fail();
      },
    })
  }

}
/**
 * POST请求，
 * URL：接口
 * data：参数，json类型
 * success：成功的回调函数
 * fail：失败的回调函数
 */
function postDatas(requestHandler) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: hosts + requestHandler.url,
    header: {
      "content-type": "application/json;charset=UTF-8",
    },
    data: requestHandler.data,
    method: 'POST',
    success: function (res) {
      //直接将返回的数据传入
      requestHandler.success(res.data);
    },
    fail: function () {
      requestHandler.fail();
    },
  })
}

function postData_tokens(requestHandler) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: hosts + requestHandler.url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': 'Bearer ' + wx.getStorageSync('user')
    },
    data: requestHandler.data,
    method: 'POST',
    success: function (res) {
      //直接将返回的数据传入
      requestHandler.success(res.data);
    },
    fail: function () {
      requestHandler.fail();
    },
  })
}
//GET请求，直接URL调用，在url后面加参数
function getDatas(requestHandler) {
  wx.request({
    url: hosts + requestHandler.url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      requestHandler.success(res.data);
    },
    fail: function () {
      requestHandler.fail();
    },
  })
}
/**
 * module.exports用来导出代码
 */
module.exports.postData = postData;
module.exports.getData = getData;
module.exports.postData_token = postData_token;
module.exports.getData_token = getData_token;
module.exports.postDatas = postDatas;
module.exports.getDatas = getDatas;
module.exports.postData_tokens = postData_tokens;