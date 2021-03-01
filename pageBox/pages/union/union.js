// pages/about/about.js
const app = getApp();
const call = require("../../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    shopList: [],
    pageNum: 1,
    pageSize: 6,
    allPages: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.postData({
      url: "shop/findAllCmtShop",
      data: {
        pageNum: 1,
        pageSize: 6
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            shopList: res.data.list,
            allPages: res.data.pages
          })
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  loadMore() {
    let that = this;
    let pageNum = that.data.pageNum
    pageNum++;
    that.setData({
      pageNum: pageNum
    })
    if (pageNum <= that.data.allPages) {
      wx.showLoading({
        title: '玩命加载中',
        duration: 200
      })
      call.postData_token({
        url: "shop/findAllCmtShop",
        data: {
          pageNum: pageNum,
          pageSize: 6,
        },
        success(res) {
          // console.log(res)
          if (res.data.pages == pageNum) {
            that.setData({
              shopList: that.data.shopList.concat(res.data.list)
            })
          } else {
            that.setData({
              shopList: that.data.shopList.concat(res.data.list)
            })
          }
        }
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '已经到底了',
      })
    }
  },
  gotoDetails(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pageBox/pages/union-details/union-details?id=' + e.currentTarget.dataset.id,
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