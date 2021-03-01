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
        title: '提现'
      },
      {
        id: 2,
        title: '充值'
      },

    ],
    detailList: [
    ],
    active_type:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.15;
    that.setData({
      'boxHeight': boxHeight
    });
    call.postData_token({
      url: "my/account/details",
      data: {
        type: "all",
        pageNum: '1',
        pageSize: "100"
      },
      success(res) {
        console.log(res)
        if(res.code==0){
          that.setData({
           detailList:res.data.items 
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
    let that=this;
    if(e.detail.index==0){
      that.setData({
        active_type:"all"
      })
    }else if(e.detail.index==1){
      that.setData({
        active_type:"out"
      })
    }else{
      that.setData({
        active_type:"in"
      })
    }
    call.postData_token({
      url: "my/account/details",
      data: {
        type: that.data.active_type,
        pageNum: '1',
        pageSize: "100"
      },
      success(res) {
        console.log(res)
        if(res.code==0){
          that.setData({
           detailList:res.data.items 
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