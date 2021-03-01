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
    show: false,
    addressOne: "",
    addressMain: "",
    addressDetail: "",
    name: "",
    mobile: "",
    areaList: "",
    isDefault:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      navH: app.globalData.navHeight,
      areaList: chooseAddress.addressList
    });
    console.log(options.id)
    call.postData_token({
      url: "address/addressOne",
      data: {
        id: options.id
      },
      method: "POST",
      success(res) {
        console.log(res)
        let address_ = res.data.address.split("|")
        that.setData({
          name: res.data.name,
          mobile: res.data.phone,
          addressOne: res.data,
          addressMain: address_[0],
          addressDetail: address_[1],
          isDefault: res.data.isDefault,
        })
      }
    })

  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  getName(e) {
    let that=this;
    that.setData({
      name: e.detail.value
    })
  },
  getMobile(e) {
    let that=this;
    that.setData({
      mobile: e.detail.value
    })
  },
  getplace(e) {
    let that=this;
    that.setData({
      addressDetail:""
    })
    
    that.setData({
      addressDetail: e.detail.value
    })
  },
  onChange(event) {
    let that=this;
    that.setData({
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
        isDefault: 0
      })
    } else if (detail == true) {
      that.setData({
        isDefault: 1
      })
    }
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  cancle() {
    this.setData({
      show: false
    });
  },
  confirm(e) {
    console.log(e.detail.values)
    this.setData({
      show: false,
      addressMain: e.detail.values[0].name + ',' + e.detail.values[1].name + ',' + e.detail.values[2].name
    });
  },
  getObj() {
    let that = this;
    let obj = {
      isDefault: that.data.isDefault,
      address: that.data.addressMain + that.data.addressDetail,
      phone: that.data.mobile
    }
    console.log(obj)
    call.postData_token({
      url: "address/update",
      method: "POST",
      data: {
        name: that.data.name,
        id: that.data.addressOne.id,
        isDefault: that.data.isDefault,
        address: that.data.addressMain,
        detailAddress:that.data.addressDetail,
        phone: that.data.mobile,
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: '修改成功',
          })
          wx.navigateBack({
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