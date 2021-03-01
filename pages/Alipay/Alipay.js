// pages/about/about.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    aliPayList: [],
    type_chooseAli: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    if (options.type != undefined && options.type != undefined != "") {
      that.setData({
        type_chooseAli: options.type,
      })
    }
    call.getData_token({
      url: "/my/alipay/index",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            aliPayList: res.data
          })
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack({
    })
  },
  delAli(e) {
    let that = this;
    console.log(e)
    call.postData_token({
      url: "/my/alipay/del",
      data: {
        id: e.currentTarget.dataset.id
      },
      success(res) {
        if (res.code == 0) {
          call.getData_token({
            url: "/my/alipay/index",
            success(res) {
              console.log(res)
              if (res.code == 0) {
                that.setData({
                  aliPayList: res.data
                })
              }
            }
          })
          wx.showToast({
            icon: "none",
            title: res.data,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data,
          })
        }
        console.log(res)
      }
    })
  },

  gotoAdd() {
    wx.navigateTo({
      url: '/pages/AlipayAdd/AlipayAdd',
    })
  },
  // 携带参数回到提现
  gotoWithdrawal(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.type_chooseAli != "") {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        aliPay: that.data.aliPayList[index],
      })
      wx.navigateBack({
        delta: 1
      })
    }
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