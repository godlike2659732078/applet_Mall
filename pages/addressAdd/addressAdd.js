// pages/success/success.js
const app = getApp();
const call = require("../../utils/request");
const chooseAddress = require("../../utils/areaList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    boxHeight: 0,
    userName: "",
    userMobile: "",
    userDetail: "",
    checked: false,
    isDefault: 0,
    show: false,
    address: "请选择省、市、区",
    areaList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
      areaList: chooseAddress.addressList
    });

  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  getName(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  getMobile(e) {
    this.setData({
      userMobile: e.detail.value
    })
  },
  getplace(e) {
    this.setData({
      userDetail: e.detail.value
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  changeChecked({
    detail
  }) {
    let that = this;
    // 需要手动对 checked 状态进行更新
    if (detail == false) {
      that.setData({
        checked: false,
        isDefault: 0

      })
      console.log(that.data.isDefault)
    } else if (detail == true) {
      that.setData({
        checked: true,
        isDefault: 1
      })
      console.log(that.data.isDefault)
    }

  },
  // 打开地址选择器
  showPopup() {
    this.setData({
      show: true
    });
  },
  // 关闭弹窗
  onClose() {
    this.setData({
      show: false
    });
  },
  // 取消选择地址
  cancle() {
    this.setData({
      show: false
    });
  },
  // 确认地址选择
  confirm(e) {
    console.log(e.detail.values)
    this.setData({
      show: false,
      address: e.detail.values[0].name + ',' + e.detail.values[1].name + ',' + e.detail.values[2].name
    });
  },
  // 添加地址
  getObj() {
    let that = this
    console.log(this.data.userName)
    console.log(this.data.userMobile)
    console.log(this.data.userDetail)
    call.postData_token({
      url: "address/create",
      data: {
        name: that.data.userName,
        isDefault: that.data.isDefault,
        address: that.data.address,
        detailAddress: that.data.userDetail,
        phone: that.data.userMobile,
      },
      method: "POST",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: '添加地址成功',
          })
          wx.navigateBack({
          })
        } else {
          console.log(111)
          wx.showToast({
            icon: "none",
            title: res.message,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

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