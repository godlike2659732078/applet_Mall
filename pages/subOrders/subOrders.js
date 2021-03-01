// pages/subOrder/subOrder.js
const app = getApp();
const call = require("../../utils/request")
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
    goodsId: null,
    goodsNum: null,
    coinId: null,
    coinType: null,
    componay: null,
    orderNo: ""
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
      orderNo: options.orderNo
    });
    call.postData_token({
      url: "address/index",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          for (let item of res.data) {
            if (item.isDefault == 1) {
              that.setData({
                address: item
              })
            } else {
              that.setData({
                address: res.data[0]
              })
            }
          }
        }

      }
    })
    let goodsNum = parseInt(options.goodsNum);
    let goodsId = parseInt(options.goodsId)
    let attrId = parseInt(options.attrId)
    if (options.coinName) {
      if (options.coinName == "CMT") {
        that.setData({
          coinId: 30
        })
      } else {
        that.setData({
          coinId: 31
        })
      }
    } else if (options.coinId) {
      that.setData({
        coinId: options.coinId
      })
    }
    console.log(goodsId, goodsNum, attrId)
    call.postData_token({
      url: "exchange/order/payment/coinClass",
      data: {
        goodsId: goodsId,
        specificationsId: attrId,
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            coinType: res.data,
          })
        }
      }
    })

    call.postData_token({
      url: "exchange/order/create",
      data: {
        goodsId: goodsId,
        attrId: attrId,
        goodsNum: goodsNum
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          if (res.data.goodsInfo.coin == "CMT") {
            that.setData({
              radios: 1
            })
          } else if (res.data.goodsInfo.coin == "BT") {
            that.setData({
              radios: 2
            })
          }
          that.setData({
            componay: res.data.goodsInfo.coin,
            goodsDetail: res.data.goodsInfo,
            goodsAttr: res.data.goodsAttrs[0],
            totalMoney: res.data.goodsInfo.price * res.data.goodsInfo.goodsNum,
            attrId: attrId,
            goodsId: goodsId,
            attrId: attrId,
            goodsNum: goodsNum,
          })

        }
      }
    })
    if (options.id) {
      call.postData_token({
        url: "order/view",
        method: "POST",
        data: {
          id: options.id
        },
        success(res) {
          console.log(res)
          that.setData({
            totalMoney: res.data.originalAmount
          })
        }
      })
    } else {
      call.postData_token({
        url: "exchange/order/create",
        data: {
          goodsId: goodsId,
          attrId: attrId,
          goodsNum: goodsNum
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            if (res.data.goodsInfo.coin == "CMT") {
              that.setData({
                radios: 1
              })
            } else if (res.data.goodsInfo.coin == "BT") {
              that.setData({
                radios: 2
              })
            }
            that.setData({

              totalMoney: res.data.goodsInfo.price * res.data.goodsInfo.goodsNum,

            })

          }
        }
      })
    }


  },
  goToAddress() {
    let that = this;
    wx.navigateTo({
      url: '/pages/address/address?goodsId=' + that.data.goodsId + "&attrId=" + that.data.attrId + "&goodsNum=" + that.data.goodsNum,
    })
  },

  goToBuysuccess() {
    let that = this;
    let obj = {
      addressId: that.data.address.id,
      goodsId: that.data.goodsId,
      attrId: that.data.attrId,
      coinId: that.data.coinId,
      goodsNum: that.data.goodsDetail.goodsNum,
      type: "wx"
    }
    console.log(obj)
    if (that.data.radios == 1 && that.data.orderNo) {
      console.log(1111111111111111111111111111)
      call.postData_token({
        url: "exchange/order/paymentByOrderApplet",
        data: {
          orderNo: that.data.orderNo,
          coinId: that.data.coinId,
          type: "wx"
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            wx.requestPayment({
              appId: res.data.appId,
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success(res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 2,
                })
              },
              fail(res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 1,
                })
              }
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.message,
            })
          }
        }
      })
    } else if (that.data.radios == 1) {
      console.log('正常支付')
      call.postData_token({
        url: "exchange/order/paymentApplet",
        data: {       
          addressId: that.data.address.id,
          goodsId: that.data.goodsId,
          attrId: that.data.attrId,
          coinId: that.data.coinId,
          goodsNum: that.data.goodsDetail.goodsNum,
          type: "wx"
        },
        success(res) {
          console.log(res)

          if (res.code == 0) {
            wx.requestPayment({
              appId: res.data.appId,
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success(res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 2,
                })
              },
              fail(res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 1,
                })
              }
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.message,
            })
          }
        }
      })
    } else if (that.data.radios == 2 && that.data.orderNo) {
      console.log(21222222222222222)
      call.postData_token({
        url: "exchange/order/paymentByOrderApplet",
        data: {
          orderNo: that.data.orderNo,
          coinId: that.data.coinId,
          type: "wx"
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            wx.requestPayment({
              appId: res.data.appId,
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '支付成功',
                  icon: "none"
                })
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 2,
                })
              },
              fail(res) {
                console.log(res)
                wx.showToast({
                  title: '取消支付',
                  icon: "none"
                })
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 1,
                })
              }
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.message,
            })
          }
        }
      })
    } else if (that.data.radios == 2) {
      console.log(that.data)
      call.postData_token({
        url: "exchange/order/paymentApplet",
        data: {
          addressId: that.data.address.id,
          goodsId: that.data.goodsId,
          attrId: that.data.attrId,
          coinId: that.data.coinId,
          goodsNum: that.data.goodsDetail.goodsNum,
          type: "wx"
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            wx.requestPayment({
              appId: res.data.appId,
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success(res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 2,
                })
              },
              fail(res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/order/order?index=' + 1,
                })
              }
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.message,
            })
          }
        }
      })
    }

    // wx.navigateTo({
    //   url: '/pages/buySucess/buySucess',
    // })
  },


  onClickLeft: function () {
    wx.navigateBack();
  },
  onChange(event) {
    this.setData({
      radio1: event.detail,
    });
  },
  changeRadio(e) {
    this.setData({
      radio: e.detail,
    });
  },
  changeRadios(e) {
    let that = this;
    console.log(e.detail)
    that.setData({
      radios: e.detail,
    });
    call.postData_token({
      url: "exchange/order/payment/coinClass",
      data: {
        goodsId: that.data.goodsId,
        specificationsId: that.data.attrId,
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