// pages/subOrder/subOrder.js
const app = getApp();
const call = require("../../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    type: null,
    radio: '1',
    radios: 1,
    address: "",
    goodsDetail: "",
    goodsAttr: "",
    totalMoney: null,
    attrId: null,
    id: null,
    goodsNum: null,
    coinId: null,
    coinType: null,
    componay: null,
    type: null,
    show: false,
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.15;
    that.setData({
      'boxHeight': boxHeight,
      type: options.type,
      id: options.id,
      type: options.type
    });
    if (options.type == 1) {
      let id = parseInt(options.id)
      console.log(id)
      call.postData_token({
        url: "coupon/couponCoinClass",
        data: {
          id: id,
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              coinType: res.data,
              coinId: res.data[0].coinId,
              componay: res.data[0].coinName
            })
          }
        }
      })
      call.getData({
        url: "coupon/selectOfflineCoupon?pageNum=" + 1 + "&pageSize=" + 1 + "&id=" + id,
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              details: res.data.list[0]
            })
          }
        }
      })
    } else if (options.type == 2) {
      let id = parseInt(options.id)
      console.log(id)
      call.postData_token({
        url: "shop/shopCouponCoinClass",
        data: {
          id: id,
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              coinType: res.data,
              coinId: res.data[0].coinId,
              componay: res.data[0].coinName
            })
          }
        }
      })
      call.getData({
        url: "shop/selectShopCoupon?pageNum=" + 1 + "&pageSize=" + 1 + "&id=" + id,
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              details: res.data.list[0]
            })
          }
        }
      })
    }
  },

  goToBuysuccess() {
    let that = this;
    that.setData({
      show: true
    });
    console.log(111)
    // let that = this;
    // call.postData_token({
    //   url: "coupon/receiveOfflineCoupon",
    //   data: {
    //     couponId: that.data.id,
    //     coinId: that.data.coinId
    //   },
    //   success(res) {
    //     console.log(res)
    //     if (res.code == 0) {
    //       wx.showToast({
    //         icon: "none",
    //         title: '兑换成功',
    //         duration: 1000
    //       })
    //     } else {
    //       wx.showToast({
    //         icon: "none",
    //         title: res.message,
    //       })
    //     }
    //   }
    // })
  },
  submit() {
    let that = this;
    console.log(111)
    that.setData({
      show: true
    });
    // call.postData_token({
    //   url: "shop/receiveShopCoupon",
    //   data: {
    //     couponId: that.data.id,
    //     coinId: that.data.coinId
    //   },
    //   success(res) {
    //     console.log(res)
    //     if (res.code == 0) {
    //       wx.showToast({
    //         icon: "none",
    //         title: '兑换成功',
    //         duration: 1000
    //       })
    //     } else {
    //       wx.showToast({
    //         icon: "none",
    //         title: res.message,
    //       })
    //     }
    //   }
    // })
  },

  onClickLeft: function () {
    wx.navigateBack();
  },

  changeRadios(e) {
    let that = this;
    console.log(e.detail)
    that.setData({
      radios: e.detail,
    });
    call.postData_token({
      url: "coupon/couponCoinClass",
      data: {
        id: that.data.id
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            coinType: res.data,
            componay: res.data[e.detail - 1].coinName,
            coinId: res.data[e.detail - 1].coinId
          })
        }
      }
    })
  },
  changeRadio(e) {
    let that = this;
    console.log(e.detail)
    that.setData({
      radios: e.detail,
    });
    call.postData_token({
      url: "shop/shopCouponCoinClass",
      data: {
        id: that.data.id
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            coinType: res.data,
            componay: res.data[e.detail - 1].coinName,
            coinId: res.data[e.detail - 1].coinId
          })
        }
      }
    })
  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {
    let that = this;
    that.setData({
      showPayPwdInput: true,
      payFocus: true
    });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    let that = this;
    that.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    }, function () {
      wx.showToast({
        title: "已取消",
        icon: "none"
      })
    });

  },
  /**
   * 获取焦点
   */
  getFocus: function () {
    this.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
      console.log(222)
      let that = this;
      that.setData({
        pwdVal: e.detail.value
      });

      if (e.detail.value.length >= 6) {
        call.postData_token({
          url: "coupon/receiveOfflineCouponByPwd",
          data: {
            couponId: that.data.id,
            coinId: that.data.coinId,
            tpassword: e.detail.value
          },
          success(res) {
            console.log(res)
            if (res.code == 0) {
              wx.showToast({
                icon: "none",
                title: '兑换成功',
                duration: 1000
              })
            } else if (res.code == 40010) {
              wx.showToast({
                icon: "none",
                title: '请前往个人中心设置密码',
                duration: 1000
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.message,
              })
            }
            that.setData({
              showPayPwdInput:false
            })
          }
        })
      }
    }

    ,
  /**
   * 输入密码监听
   */
  inputPwds: function (e) {
      console.log(111)
      let that = this;
      that.setData({
        pwdVal: e.detail.value
      });

      if (e.detail.value.length >= 6) {
        call.postData_token({
          url: "shop/receiveShopCouponByPwd",
          data: {
            couponId: that.data.id,
            coinId: that.data.coinId,
            tpassword: e.detail.value
          },
          success(res) {
            console.log(res)
            if (res.code == 0) {
              wx.showToast({
                icon: "none",
                title: '兑换成功',
                duration: 1000
              })
            
            } else if (res.code == 40010) {
              wx.showToast({
                icon: "none",
                title: '请前往个人中心设置密码',
                duration: 1000
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.message,
              })
            }
            that.setData({
              showPayPwdInput: false
            })
          }
        })
      }
    }

    ,
  onClose() {
    this.setData({
      show: false
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