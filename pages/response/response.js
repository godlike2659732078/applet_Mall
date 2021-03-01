// pages/subOrder/subOrder.js
const app = getApp();
const call = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    orderNo: "",
    orderDetail: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    let that = this;
    that.setData({
      orderNo: options.orderNo,
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.15;
    that.setData({
      'boxHeight': boxHeight,
    });
    call.postData_token({
      url: "order/refund/detail",
      data: {
        orderNo: that.data.orderNo
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          
        }
      }
    })
    call.postData_token({
      url: "order/reject",
      data: {
        orderNo: that.data.orderNo
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            orderDetail: res.data
          })
        }
      }
    })
  },
  // 修改申请
  gotoApply() {
    let that=this;
    wx.navigateTo({
      url: '/pages/apply/apply?orderId='+that.data.orderDetail[0].id,
    })
  },
  // 联系客服
  gotoCustom(res){
    let that=this;
    wx.navigateTo({
      url: '/pages/customer/customer',
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
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