// pages/success/success.js
const app = getApp();
const call = require("../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    boxHeight: 0,
    result: null,
    place: "",
    nums: "",
    allNums: "",
    link: null,
    password: "",
    customs: [],
    store_type: null,
    showUnOut: "",
    hidden: true,
    useOutPower: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    if(options.coinId){
      call.postData_token({
        url: "token/view",
        data: {
          coinId: options.coinId
        },
        success(res) {
          console.log(res)
          that.setData({
            link: res.data,
            store_type: res.data.coinName
          })
        }
      })
    }else{
      call.postData_token({
        url: "token/view",
        data: {
          coinId: 30
        },
        success(res) {
          console.log(res)
          that.setData({
            link: res.data,
            store_type: res.data.coinName
          })
        }
      })
    }

    call.getData_token({
      url: "prize/findUserPrizeETHNum",
      data: {

      },
      success(res) {
        console.log(res)
        that.setData({
          useOutPower: res.data
        })
      }
    })
    call.postData_token({
      url: "token/integral/index",
      success(res) {
        console.log(res)
        let customs = [];
        for (let item of res.data) {
          customs.push(item.coinName)
        }
        console.log(customs)
        that.setData({
          columns: customs
        })
      }
    })
    call.getData_token({
      url: "user/info",
      method: "GET",
      success(res) {
        if (res.data.level == "1") {
          that.setData({
            showUnOut: true
          })
        } else {
          that.setData({
            showUnOut: false
          })
        }
      }

    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  showTpList() {
    let that = this;
    that.setData({
      showTpList: true
    })
  },
  cancleTp(e) {
    let that = this;
    that.setData({
      showTpList: false
    })
  },
  confirmTp(e) {
    let that = this;
    console.log(e.detail)
    if (e.detail.value == "BT") {
      let coinId = 31
      call.postData_token({
        url: "token/view",
        data: {
          coinId: coinId
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              link: res.data
            })
          }
        }
      })
    } else if (e.detail.value == "CMT") {
      let coinId = 30
      call.postData_token({
        url: "token/view",
        data: {
          coinId: coinId
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              link: res.data
            })
          }
        }
      })
    }
    that.setData({
      store_type: e.detail.value,
      showTpList: false
    })
  },
  getPlace() {
    // 只允许从相机扫码
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        that.setData({
          result: res.result
        })
      }
    })
  },
  getAll() {
    let that = this;
    that.setData({
      allNums: that.data.link.useAmt
    })
  },
  // 提交
  formSubmit(e) {

    let that = this;

    if (that.data.showUnOut == true && that.data.link.coinId == 30) {
      wx.showToast({
        title: '开通会员即可转账CMT',
        icon: "none",
        duration: 2000
      })
      return false;
    }
    that.setData({
      hidden: false
    })
    let obj = {
      coinId: that.data.link.coinId,
      toAddress: e.detail.value.place,
      amount: e.detail.value.nums,
      tpassword: e.detail.value.password,
    }
    console.log(obj)
    call.postData_token({
      url: "token/txOut",
      data: {
        coinId: that.data.link.coinId,
        toAddress: e.detail.value.place,
        amount: e.detail.value.nums,
        tpassword: e.detail.value.password,
      },
      success(res) {
        console.log(res)
        if (res) {
          that.setData({
            hidden: true
          })
        }
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: res.data,
            duration: 1000, //弹出提示框时长
          })
          wx.navigateBack({})
        } else if (res.code == 40006) {
          wx.showToast({
            icon: "none",
            title: '必填项不能为空!',
          })
        } else {
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

})