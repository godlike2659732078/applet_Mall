// pages/subOrder/subOrder.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    active: 0,
    steps: [{
        desc: '待支付',
      },
      {
        desc: '待发货',
      },
      {
        desc: '待收货',
      },
      {
        desc: '已收货',
      },
    ],
    status: "",
    detailData: "",
    clock: "",
    orderId: "",
    orderNo: "",
    status_back: "",
    coinType: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.15;
    that.setData({
      navH: app.globalData.navHeight,
      'boxHeight': boxHeight,
      orderId: options.id,
      orderNo: options.orderNo
    });
    console.log(options)
    call.postData_token({
      url: "order/view",
      method: "POST",
      data: {
        id: options.id
      },
      success(res) {
        console.log(res)
        let status = ""
        if (res.code == 0) {
          if (res.data.status == 0) {
            status = "待支付";
            that.setData({
              status: status
            })
          }
          else if (res.data.status == 1) {
            status = "待发货";
            that.setData({
              status: status
            })
          }
          else if (res.data.status == 3) {
            status = "待收货";
            that.setData({
              status: status
            })
          } else if (res.data.status == 4) {
            status = "已收货";
            that.setData({
              status: status
            })
          }

          if (res.data.status == 0) {
            that.setData({
              active: "0"
            })
          } else if (res.data.status == 3 || res.data.status == 2||res.data.status == 1) {
            that.setData({
              active: "1"
            })
          } else if (res.data.status == 4 || res.data.status == 12) {
            that.setData({
              active: "2"
            })
          }
        }

        that.setData({
          status: status,
          detailData: res.data,
          coinType: res.data.paymentType
        })
      }
    })
    console.log(options.orderNo)
    call.postData_token({
      url: "order/refund/detail",
      data: {
        orderNo: that.data.orderNo
      },
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          if (res.data.status == 0) {
            that.setData({
              status_back: "退款处理中"
            })
          } else if (res.data.status == 1) {
            that.setData({
              status_back: "退款申请成功"
            })
          } else if (res.data.status == 1) {
            that.setData({
              status_back: "退款申请被驳回"
            })
          } else if (res.data.status == 1) {
            that.setData({
              status_back: "退款申请已取消"
            })
          }
        }
      }
    })
    call.postData_token({
      url: "order/reject",
      data: {
        orderNo: that.data.orderNo
      },
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            orderDetail: res.data
          })
        }
      }
    })
  },

  onClickLeft: function () {
    wx.navigateBack();
  },
  gotoLogistics() {
    let that = this;
    wx.navigateTo({
      url: '/pages/orderLogs/orderLogs?orderNo=' + that.data.orderNo,
    })
  },
  changeRadio(e) {
    this.setData({
      radio2: e.detail,
    });
  },
  gotoDel() {
    let that = this;
    call.postData_token({
      url: "order/cancel",
      data: {
        id: that.data.orderId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.navigateBack({
            delta: 1,
          })
          wx.showToast({
            icon: "none",
            title: '订单已取消',
          })
        }

      }
    })
  },
  gotoPay(e) {
    let that=this;
    if (e.currentTarget.dataset.goodstype == 1) {
      call.postData_token({
        url: "order/create/orderItemsByOrderNo",
        data: {
          orderNo: e.currentTarget.dataset.orderno
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            let attrId = res.data[0].product[0].attrId;
            let goodsId = res.data[0].product[0].goodsId;
            let goodsNum = res.data[0].product[0].proNum;
            
            wx.navigateTo({
              url: '/pages/subOrder/subOrder?goodsId=' + goodsId + "&attrId=" + attrId + "&goodsNum=" + goodsNum,
            })
          } else {
            wx.showToast({
              icon: "none",
              title: '操作失败',
            })
          }
        }
      })
    } else if (e.currentTarget.dataset.goodstype == 2) {
      call.postData_token({
        url: "order/create/orderItems",
        data: {
          orderNo: e.currentTarget.dataset.orderno
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            let attrId = res.data[0].product[0].attrId;
            let goodsId = res.data[0].product[0].goodsId;
            let goodsNum = res.data[0].product[0].proNum;
            let coinName = res.data[0].product[0].coinName
        
            if (e.currentTarget.dataset.paytype == 2) {
              wx.navigateTo({
                url: '/pages/subOrder_/subOrder_?goodsId=' + goodsId + "&attrId=" + attrId + "&goodsNum=" + goodsNum,
              })
            } else if (e.currentTarget.dataset.paytype == 0) {
              wx.navigateTo({
                url: '/pages/subOrders/subOrders?goodsId=' + goodsId + "&attrId=" + attrId + "&goodsNum=" + goodsNum+'&id=' + that.data.orderId + "&orderNo=" + that.data.orderNo+ "&coinName=" + coinName,
              })
            }

          } else {
            wx.showToast({
              icon: "none",
              title: '操作失败',
            })
          }
        }
      })
    }



  },
  goToApply() {
    let that = this;
    wx.navigateTo({
      url: '/pages/apply/apply?orderId=' + that.data.orderId,
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