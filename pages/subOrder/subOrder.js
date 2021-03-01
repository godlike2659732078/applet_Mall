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
    address: "",
    goodsDetail: "",
    goodsAttr: "",
    totalMoney: null,
    attrId: null,
    goodsId: null,
    goodsNum: null,
    coinId: null,
    shop_dis:null,
    radio_quan: "",
    chooseId:"",
    chooselower:"",
    subCouponId:"",
    lowerMoney:""
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
      type: options.type
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
    let coinId = parseInt(options.coinId)
    console.log(goodsId, goodsNum, attrId, coinId)

    call.postData_token({
      url: "goods/order/create",
      data: {
        goodsId: goodsId,
        attrId: attrId,
        goodsNum: goodsNum
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            goodsDetail: res.data.goodsInfo,
            goodsAttr: res.data.goodsAttrs[0],
            totalMoney: res.data.goodsAttrs[0].attrPrice * res.data.goodsInfo.quantity,
            attrId: attrId,
            goodsId: goodsId,
            attrId: attrId,
            goodsNum: goodsNum,

          })
          // 查询商家与用户关联优惠券
          call.getData_token({
            url: "shop/selectCusCouponWithGood?pageNum=" + 1 + "&pageSize=" + 10 + "&goodId=" + goodsId + "&fullAmount=" + that.data.totalMoney,
            success(res) {
              console.log(res)
              if (res.code == 0) {
                that.setData({
                  shop_dis: res.data.list
                })
              }
            }
          })
        }
      }
    })


  },
  goToAddress() {
    let that = this;
    wx.navigateTo({
      url: '/pages/address/address?goodsId=' + that.data.goodsId + "&attrId=" + that.data.attrId + "&goodsNum=" + that.data.goodsNum,
    })
  },

  goToBuysuccess() {
    let that = this;
    if (that.data.radio == 1) {
      call.postData_token({
        url: "goods/order/payment",
        data: {
          addressId: that.data.address.id,
          goodsId: that.data.goodsDetail.goodsId,
          attrId: that.data.attrId,
          goodsNum: that.data.goodsDetail.quantity,
          couponId:that.data.subCouponId
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            call.postData_token({
              url: "applet/doPay",
              method: "POST",
              data: {
                orderNo: res.data,
                payType: "wxpay",
                code: "order",
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
                }
              }
            })
          }
        }
      })
    } else if (that.data.radio == 2) {
      wx.showLoading({
        title: '支付中，请稍候',
        duration:1000
      })
      call.postData_token({
        url: "goods/order/payment",
        data: {
          addressId: that.data.address.id,
          goodsId: that.data.goodsDetail.goodsId,
          attrId: that.data.attrId,
          goodsNum: that.data.goodsDetail.quantity
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            call.postData_token({
              url: "exchange/dopay",
              data: {
                orderNo: res.data,
                type: "order"
              },
              success(res) {
                console.log(res)
                if (res.code == 0) {
                  wx.showToast({
                    icon: "none",
                    title: '支付成功',
                    duration:1500
                  })
                  wx.navigateTo({
                    url: '/pages/order/order?index=' + 2,
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
        }
      })
    }
    // wx.navigateTo({
    //   url: '/pages/buySucess/buySucess',
    // })
  },
  // 选择优惠券
  changeRadios(e) {
    let that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      radio_quan: e.detail,
      chooseId: e.currentTarget.dataset.couponid,
      chooselower:e.currentTarget.dataset.loweramount
    })
  },
  subQuan(){
    let that=this;
    that.setData({
      show:false,
      subCouponId:that.data.chooseId,
      lowerMoney:that.data.chooselower
    })
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
  showDis() {
    let that = this;
    that.setData({
      show: true
    });

  },
  subQuan() {
    let that = this;
    that.setData({
      show: false,
      subCouponId: that.data.chooseId,
      lowerMoney: that.data.chooselower
    })
  },
  onClose() {
    let that = this;
    that.setData({
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