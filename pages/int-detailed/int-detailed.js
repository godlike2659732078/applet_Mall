// pages/success/success.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    boxHeight: 0,
    categoryList: [{
        id: '',
        title: '全部'
      },
      {
        id: 1,
        title: '收入'
      },
      {
        id: 2,
        title: '支出'
      },

    ],
    detailList: [],
    active_type: "all",
    coinId: null,
    pageNum: 1,
    pageSize: 10,
    allPages: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
      coinId: options.coinId
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.15;
    that.setData({
      'boxHeight': boxHeight
    });
    call.postData_token({
      url: "token/record",
      data: {
        type: that.data.active_type,
        pageNum: that.data.pageNum,
        pageSize: that.data.pageSize,
        coinId: options.coinId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            detailList: res.data.items,
            allPages: res.data.total
          })
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  onChange: function (e) {
    console.log(e.detail)
    let that = this;
    that.setData({
      pageNum:1
    })
    let obj = {
      type: that.data.active_type,
      pageNum: that.data.pageNum,
      pageSize: that.data.pageSize,
      coinId: that.data.coinId
    }
    console.log(obj)
    if (e.detail.index == 0) {
      that.setData({
        active_type: "all"
      })
    } else if (e.detail.index == 1) {
      that.setData({
        active_type: "in"
      })
    } else {
      that.setData({
        active_type: "out"
      })
    }
    call.postData_token({
      url: "token/record",
      data: {
        type: that.data.active_type,
        pageNum: that.data.pageNum,
        pageSize: that.data.pageSize,
        coinId: that.data.coinId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            detailList: res.data.items
          })
        }
      }
    })
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
        icon: "none",
        title: '玩命加载中',
        duration: 200
      })
      call.postData_token({
        url: "token/record",
        data: {
          type: that.data.active_type,
          pageNum: that.data.pageNum,
          pageSize: that.data.pageSize,
          coinId: that.data.coinId
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              detailList: that.data.detailList.concat(res.data.items),
              allPages: res.data.total
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