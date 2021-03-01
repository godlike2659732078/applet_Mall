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
    checked: true,
    addressList: [],
    checked: true,
    redirect: "",
    // goodsId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    if (options.goodsId != undefined) {
      that.setData({
        goodsId: options.goodsId,
      })
    }
    that.setData({
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.1;
    that.setData({
      'boxHeight': boxHeight
    });
    call.postData_token({
      url: "address/index",
      method: "POST",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            addressList: res.data,
          })
        }
      }
    })
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  goToEdit(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/addressEdit/addressEdit?id=' + id,
    })
  },
  gotoSub(e) {
    console.log(e.currentTarget.dataset.id)
    let that = this;
    // 返回上一页携带参数
    if (that.data.goodsId != ""&&that.data.goodsId!=undefined&&that.data.goodsId!=null) {
      console.log(666)
      call.postData_token({
        url: "address/addressOne",
        data: {
          id: e.currentTarget.dataset.id
        },
        method: "POST",
        success(res) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({
            address: res.data,
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  // 设置默认地址 
  onChange(e) {
    let that = this;
    console.log(e.currentTarget.dataset.id)


    call.postData_token({
      url: "address/address/isDefault",
      data: {
        id: e.currentTarget.dataset.id
      },
      success(res) {
        console.log(res)
        call.postData_token({
          url: "address/index",
          method: "POST",
          success(res) {
            console.log(res)
            if (res.code == 0) {
              that.setData({
                addressList: res.data,
              })
            }
          }
        })
      }
    })

    // this.setData({
    //   checked: event.detail, 
    // });
  },
  // 跳转到添加地址
  foToAdd() {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
    })
  },
  del(e) {
    console.log(e.currentTarget.dataset.index)
    let that = this;
    let a = that.data.addressList
    a.splice(e.currentTarget.dataset.index, 1)
    call.postData_token({
      url: "address/del",
      method: "POST",
      data: {
        id: e.currentTarget.dataset.id
      },
      success(res) {
        console.log(res)
      }
    })
    this.setData({
      addressList: a
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
    let that=this;
    call.postData_token({
      url: "address/index",
      method: "POST",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            addressList: res.data,
          })
        }
      }
    })
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