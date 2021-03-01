const app = getApp();
const call = require("../../../utils/request")
Page({
  data: {
    navH: "",
    active: 0,
    boxHeight: 0,
    categoryList: [{
      id: 1,
      title: "特价秒杀"
    }, {
      id: 2,
      title: "链下优惠券"
    }, {
      id: 3,
      title: "链上优惠券"
    }],
    goodsList: [],
    offline_dis: [],
    pageNum: 1,
    pageSize: 10,
    allPage: null
  },

  onLoad: function () {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.18;
    that.setData({
      'boxHeight': 2 * boxHeight
    });
    call.getData({
      url: "exchange/getSeckillGoods?pageNum=" + 1 + "&pageSize=" + 10,
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            goodsList: res.data.list,
            allPage: res.data.total
          })
        }
      }
    })
  },
  getList(e) {

    console.log(e.detail)
    let that = this;
    that.setData({
      active: e.detail.index,
      pageNum: 1,
      pageSize: 10
    })
    if (that.data.active == 0) {
      call.getData({
        url: "exchange/getSeckillGoods?pageNum=" + 1 + "&pageSize=" + 10,
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              goodsList: res.data.list,
              allPage: res.data.total
            })
          }
        }
      })
    } else if (that.data.active == 1) {
      call.getData({
        url: "coupon/selectOfflineCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageSize,
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              offline_dis: res.data.list,
              allPage: res.data.isLastPage
            })
          }
        }
      })
    } else if (that.data.active == 2) {
      call.getData({
        url: "shop/selectShopCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageSize,
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              offline_dis: res.data.list,
              allPage: res.data.isLastPage
            })
          }
        }
      })
    }
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  gotoShopDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pageBox/pages/int-details/int-details?id=' + id,
    })
  },
  gotoCoupon(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pageBox/pages/coupon/coupon?id=' + id + "&type=1",
    })
  },
  gotoCoupons(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pageBox/pages/coupon/coupon?id=' + id + "&type=2",
    })
  },
  loadMore() {
    let that = this;
    if (that.data.active == 0) {
      let pageNum = that.data.pageNum
      pageNum++;
      that.setData({
        pageNum: pageNum
      })
      if (pageNum <= that.data.allPage) {
        
        call.getData({
          url: "exchange/getSeckillGoods?pageNum=" + pageNum + "&pageSize=" + 10,
          success(res) {
            console.log(res)
            if (res.code == 0) {
              wx.showLoading({
                title: '玩命加载中',
                duration: 200
              })
              that.setData({
                goodsList: that.data.goodsList.concat(res.data.list),
                allPage: res.data.total
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
    } else if (that.data.active == 1) {
      let pageNum = that.data.pageNum
      pageNum++;
      that.setData({
        pageNum: pageNum
      })
      if (that.data.allPage != true) {
        wx.showLoading({
          title: '玩命加载中',
          duration: 200
        })
        call.getData({
          url: "coupon/selectOfflineCoupon?pageNum=" + pageNum + "&pageSize=" + that.data.pageSize,
          success(res) {
            console.log(res)
            if (res.code == 0) {
              that.setData({
                offline_dis: that.data.offline_dis.concat(res.data.list),
                allPage: res.data.isLastPage
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
    } else if (that.data.active == 2) {
      let pageNum = that.data.pageNum
      pageNum++;
      that.setData({
        pageNum: pageNum
      })
      if (that.data.allPage != true) {
        wx.showLoading({
          title: '玩命加载中',
          duration: 200
        })
        call.getData({
          url: "shop/selectShopCoupon?pageNum=" + pageNum + "&pageSize=" + that.data.pageSize,
          success(res) {
            console.log(res)
            if (res.code == 0) {
              that.setData({
                offline_dis: that.data.offline_dis.concat(res.data.list),
                allPage: res.data.isLastPage
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
    }
  },
})