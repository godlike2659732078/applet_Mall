//index.js
//获取应用实例
const app = getApp();
let call = require("../../utils/request")
const forMat = require("../../utils/util")
Page({
  data: {
    navH: "",
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    imgUrls: [],
    menuList: [],
    navList: [{
      url: '/pageBox/pages/goods-list/goods-list'
    }, {
      url: '/pageBox/pages/optimization/optimization'
    }, {
      url: '/pageBox/pages/college/college'
    }, {
      url: '/pages/order/order'
    }],
    snipingGoodsList: [{
        id: 1,
        price: 234
      },
      {
        id: 2,
        price: 235
      },
      {
        id: 3,
        price: 236
      },
      {
        id: 4,
        price: 237
      }
    ],
    noticeList: [],
    recommendGoodsList: [],
    intList: [],
    liveList: [],
    liveArrar: [],
    actionTime: "",
    bindType: 0,
    image_dis: null
  },
  onLoad: function () {
    let that = this
    wx.getStorage({
      key: '0',
      success: function (res) {
        // console.log(res)
      }
    })
    that.setData({
      navH: app.globalData.navHeight,
      statusBarHeight: app.globalData.statusBarHeight
    });
    call.getData({
        url: 'nav/appletHome',
        method: 'GET',
        success(res) {
          // console.log(res)
          if (res.code == 0) {
            that.setData({
              menuList: res.data
            })
          }
        }
      }),
      call.getData({
        url: "goods/findAppletSeckillPhoto",
        success(res) {
          if (res.code == 0) {
            that.setData({
              image_dis: res.data.seckillPhoto
            })
          }
        }
      })
    call.getData({
      url: "rule/getAppletParam",
      success(res) {
        that.setData({
          showJifen: res.data
        })
        // console.log(res)
        if (res.data == 0) {
          that.setData({
            bindType: 0
          })
          call.getData({
            url: 'banners/indexApplet',
            method: 'GET',
            success(res) {
              // console.log(res)
              that.setData({
                imgUrls: res.data
              })
            }
          })
        } else if (res.data == 1) {
          that.setData({
            bindType: 1
          })
          call.getData({
            url: 'banners/index?num=' + 5,
            method: 'GET',
            success(res) {
              // console.log(res)
              that.setData({
                imgUrls: res.data
              })
            }
          })
        }
      }
    })

    call.getData({
      url: "applet/getWeChatAppletAccessToken",
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          call.getData({
            url: "applet/getDirectBroadcastingRoom?start=" + 0 + "&limit=" + 1 + "&accessToken=" + res.data.accessToken,
            success(res) {
              // console.log(res)
              if (res.code == 0) {
                that.setData({
                  liveList: res.data.room_info
                })
                for (let item in that.data.liveList) {
                  var liveArrar = 'liveList[' + item + ']';
                  if (that.data.liveList[item].live_status == 102) {
                    that.setData({
                      //viparray
                      [liveArrar + 'actionTime']: forMat.formatTimeTwo(that.data.liveList[item].start_time, 'Y-M-D h:m:s'),

                    })
                  }
                }
              }
            }
          })
        }
      }
    })
    call.getData({
      url: "goods/findShopSixGoods",
      method: "GET",
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            recommendGoodsList: res.data.shopGoods
          })
        }
      }
    })
    call.getData({
      url: 'exchange/exchangeGoods' + '?pageNum=' + 1 + '&pageSize=' + 6 + "&type=" + "latest",
      method: "GET",
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            intList: res.data.list
          })
        }
      }
    })
    call.getData({
      url: "order/selectVipOrder",
      method: "GET",
      success(res) {
        // console.log(res)
        that.setData({
          noticeList: res.data
        })
      }
    })

  },
  gotoOutper(){
wx.navigateTo({
  url: '/pages/outoper/outoper',
})
  },
  onShow() {
    let that = this;
    call.getData({
      url: "applet/getWeChatAppletAccessToken",
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          call.getData({
            url: "applet/getDirectBroadcastingRoom?start=" + 0 + "&limit=" + 1 + "&accessToken=" + res.data.accessToken,
            success(res) {
              // console.log(res)
              if (res.code == 0) {
                that.setData({
                  liveList: res.data.room_info
                })
                for (let item in that.data.liveList) {
                  var liveArrar = 'liveList[' + item + ']';
                  if (that.data.liveList[item].live_status == 102) {
                    that.setData({
                      //viparray
                      [liveArrar + 'actionTime']: forMat.formatTimeTwo(that.data.liveList[item].start_time, 'Y-M-D h:m:s'),

                    })
                  }
                }
              }
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: '链上商城',
      path: "/pages/index/index",
      success: function (res) {
        // console.log("分享成功！:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        // console.log("分享失败！:" + JSON.stringify(res));
      }
    }
  },
  //用户点击右上角分享朋友圈
onShareTimeline: function () {

},
  // 跳转
  gotoBannerDetail(e) {
    // console.log(e.currentTarget)
    let a = encodeURIComponent(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: '/pages/bannerDetail/bannerDetail?id=' + e.currentTarget.dataset.id + "&type=" + e.currentTarget.dataset.type + "&url=" + a,
    })
  },
  gotoDis() {
    wx.navigateTo({
      url: '/pageBox/pages/discount/discount',
    })
  },
  gotoIntegral() {
    wx.navigateTo({
      url: '/pageBox/pages/integral-list/integral-list'
    })
  },
  gotoUnion() {
    wx.navigateTo({
      url: '/pageBox/pages/union/union',
    })
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods-details/goods-details?id=' + id,
    })
  },
  goDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../int-details/int-details?id=' + id,
    })
  },
  setGoodsSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  goToPages(e) {
    wx.navigateTo({
      url: this.data.navList[e.currentTarget.dataset.index].url,
    })
  },
  gotoLivebox() {
    wx.navigateTo({
      url: '/pageBox/pages/liveAll/liveAll',
    })
  }


})