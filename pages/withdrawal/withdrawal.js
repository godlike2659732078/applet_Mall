// pages/share/share.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    aliPay: "",
    moneys: "",
    remark: "",
    amount:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.getData_token({
      url: "/my/alipay/index",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            aliPay: res.data[0]
          })
        }
      }
    })
    call.postData_token({
      url:"my/account",
      success(res){
        console.log(res)
        that.setData({
          amount:res.data.amount
        })
      }
    })
    call.getData({
      url: "withdraw/params",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: "每日可提现" + res.data.withdraw_times_limit + "次,单次最高" + res.data.withdraw_money_max + "最低" + res.data.withdraw_money_min,
          })
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  // 申请提现
  goToIncome() {
    // wx.navigateTo({
    //   url: '/pages/income-detailed/income-detailed',
    // })
  },
  // 提现协议
  gotoAgreement(){
wx.navigateTo({
  url: '/pageBox/pages/agreement/agreement',
})
  },
  gotoAlipay() {
    wx.navigateTo({
      url: '/pages/Alipay/Alipay?type=chooseAli',
    })
  },
  getMoneys(e) {
    let that = this;
    that.setData({
      moneys: e.detail.value
    })
  },
  getRemark(e) {
    let that = this;
    that.setData({
      remark: e.detail.value
    })
  },
  gotoWithrawal() {
    let that = this;
    console.log(that.data)
    if (!(/(^[0-9]*$)/.test(that.data.moneys))) {
      wx.showToast({
        icon: "none",
        title: '提现金额只能输入数字',
      })
    }else{
      call.postData_token({
        url: "withdraw/submit",
        data: {
          amount: that.data.moneys,
          bankId: "1",
          remark: that.data.remark
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            wx.showToast({
              icon: "none",
              title: '提现申请成功',
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