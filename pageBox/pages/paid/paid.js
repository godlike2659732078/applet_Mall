const app = getApp();
const call = require("../../../utils/request")
Page({
  data: {
    navH: "",
    currentTab: 0,
    active: 0,
    boxHeight: 0,
    categoryLists: [{
      id: 1,
      title: "链下优选"
    }, {
      id: 2,
      title: "链上优选"
    }],
    categoryList: [{
      id: 1,
      title: "未使用"
    }, {
      id: 2,
      title: "已使用"
    }, {
      id: 3,
      title: "已过期"
    }],
 
    offline_dis: [],
    shop_dis: [],
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
    call.getData_token({
      url: "coupon/selectOfflineCusCoupon?pageNum=" + 1 + "&pageSize=" + 10 + "&status=" + 0,
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            offline_dis: res.data.list,
            allPage: res.data.isLastPage
          })
        }
      }
    })
  },
  // 
  swichNav: function (e) {
    let that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
// 改变链下列表子标签
  bindChange(e) {
    let that = this;
    that.setData({
      currentTab: e.detail.current,
      pageNum: 1,
      pageSize: 10
    });
    call.getData_token({
      url: "coupon/selectOfflineCusCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageSize + "&status=" + e.detail.current,
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            offline_dis: res.data.list,
            allPage: res.data.isLastPage
          })
        }
      }
    })
  },
  // 改变链上列表子标签
  bindChanges(e) {
    let that = this;
    that.setData({
      currentTab: e.detail.current,
      pageNum: 1,
      pageSize: 10
    });
    call.getData_token({
      url: "shop/selectShopCusCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageSize + "&status=" + e.detail.current,
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            shop_dis: res.data.list,
            allPage: res.data.isLastPage
          })
        }
      }
    })
  },
  // 链上链下切换
  getList(e) {
    // console.log(e.detail)
    let that = this;
    that.setData({
      active: e.detail.index,
      currentTab: 0,
      pageNum: 1,
      pageSize: 10
    })
    if (that.data.active == 0) {
      call.getData_token({
        url: "coupon/selectOfflineCusCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageSize + "&status=" + 0,
        success(res) {
          // console.log(res)
          if (res.code == 0) {
            that.setData({
              offline_dis: res.data.list,
            })
          }
        }
      })
    } else if (that.data.active == 1) {
      call.getData_token({
        url: "shop/selectShopCusCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageSize + "&status=" + 0,
        success(res) {
          // console.log(res)
          if (res.code == 0) {
            that.setData({
              shop_dis: res.data.list,
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
  // 点击优惠券调转到详情
  gotoShopDetails(e) {
    let id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id=' + id+"&offlineId="+e.currentTarget.dataset.offlineid,
    })
  },
  // 点击跳转到商品详情
  gotoGoodsDetails(e) {
    let id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '/pages/goods-details/goods-details?id=' + id,
    })
  },
  // 上拉加载更多
  loadMore() {
    let that = this;
    if (that.data.active == 0) {
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
            url: "coupon/selectOfflineCusCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageNum + "&status=" + that.data.currentTab,
            success(res) {
              // console.log(res)
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
          call.getData_token({
            url: "shop/selectShopCusCoupon?pageNum=" + that.data.pageNum + "&pageSize=" + that.data.pageSize + "&status=" + that.data.currentTab,
            success(res) {
              // console.log(res)
              if (res.code == 0) {
                that.setData({
                  shop_dis: that.data.shop_dis.concat(res.data.list),
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