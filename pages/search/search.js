// pages/about/about.js
const app = getApp();
const call = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    value: "",
    boxHeight: 0,
    categoryList: [
      {
        id: '0',
        title: '链上优选'
      },
      {
        id: 1,
        title: '链下优选'
      },

    ],
    orderList: [],
    searchHotList: [],
    active: 0,
    a: 0,
    allPage: "",
    pageNum: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.16;
    that.setData({
      'boxHeight': 2 * boxHeight
    });
    call.getData_token({
      url: "search/index",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            searchHotList: res.data.searchHot
          })
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  searchAction(e) {
    let that = this;
    that.setData({
      serchName: e.currentTarget.dataset.name
    })
    console.log(e.currentTarget.dataset.name)
    call.getData({
      url: "search/filter?key=" + that.data.serchName + "&type=" + "all" + "&sort=" + "asc" + "&pageNum=" + 1 + "&pageSize=" + 6,
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            orderList: res.data.goodsList,
            allPage: res.data.allPage
          })
        }
      }
    })
    that.setData({
      a: 1
    })
  },
  onChange(e) {
    let that = this;
    that.setData({
      active: e.detail.index,
      pageNum:1
    })
    if (that.data.active == 1) {
      that.setData({
        orderList: ""
      })
      call.postData({
        url: 'shop/findOfflineShopByClassIdAndName',
        data: {
          name: that.data.serchName,
          pageNum: 1,
          pageSize: 6,
        },
        success(res) {
          console.log(res);
          if (res.code == 0) {
            that.setData({
              orderList: res.data.list,
              allPage: res.data.pages
            })
          }
        }
      });
    } else if (that.data.active == 0) {
      that.setData({
        orderList: ""
      })
      call.getData({
        url: "search/filter?key=" + that.data.serchName + "&type=" + "all" + "&sort=" + "asc" + "&pageNum=" + 1 + "&pageSize=" + 6,

        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              orderList: res.data.goodsList,
              allPage: res.data.allPage
            })
          }
        }
      })
    } 
    
    // else if (that.data.active == 0) {
    //   that.setData({
    //     orderList: ""
    //   })
    //   call.getData({
    //     url: "searchGoods/searchGoods?key=" + that.data.serchName + "&type=" + 1 + "&sort=" + "asc",
    //     success(res) {
    //       console.log(res)
    //       if (res.code == 0) {
    //         that.setData({
    //           orderList: res.data.integralGoods.list,
    //         })
    //       }
    //     }
    //   })
    // }

  },
  onSearch(e) {
    let that = this;
    console.log(e.detail)
    that.setData({
      a: 1,
      serchName: e.detail
    })
    if (that.data.active == 1) {
      that.setData({
        orderList: ""
      })
      call.postData({
        url: 'shop/findOfflineShopByClassIdAndName',
        data: {
          name: that.data.serchName,
          pageNum: 1,
          pageSize: 6,
        },
        success(res) {
          console.log(res);
          if (res.code == 0) {
            that.setData({
              orderList: res.data.list,
              allPage: res.data.pages
            })
          }
        }
      });
    } else if (that.data.active == 0) {
      that.setData({
        orderList: ""
      })
      call.getData({
        url: "search/filter?key=" + that.data.serchName + "&type=" + "all" + "&sort=" + "asc" + "&pageNum=" + 1 + "&pageSize=" + 6,
        success(res) {
          console.log(res)
          if (res.code == 0) {
            that.setData({
              orderList: res.data.goodsList,
              allPage: res.data.allPage
            })
          }
        }
      })
    } 
    // else if (that.data.active == 0) {
    //   that.setData({
    //     orderList: ""
    //   })
    //   call.getData({
    //     url: "searchGoods/searchGoods?key=" + that.data.serchName + "&type=" + 1 + "&sort=" + "asc" + "&pageNum=" + 1 + "&pageSize=" + 10,
    //     success(res) {
    //       console.log(res)
    //       if (res.code == 0) {
    //         that.setData({
    //           orderList: res.data.integralGoods.list,
    //           allPage: res.data.allPage
    //         })
    //       }
    //     }
    //   })
    // }

  },
  loadMore() {
    let that = this;
    if (that.data.active == 0) {
      console.log(that.data.pageNum)
      let pageNum = that.data.pageNum
      pageNum++;
      that.setData({
        pageNum: pageNum
      })
      if (pageNum <= that.data.allPage) {
        wx.showLoading({
          icon: "none",
          title: '玩命加载中',
          duration:200
        })
        call.getData({
          url: "search/filter?key=" + that.data.serchName + "&type=" + "all" + "&sort=" + "asc" + "&pageNum=" + pageNum + "&pageSize=" + 6,
          success(res) {
            console.log(res)
            if (res.data.allPage == pageNum) {
              that.setData({
                orderList: that.data.orderList.concat(res.data.goodsList)
              })
            } else {
              that.setData({
                orderList: that.data.orderList.concat(res.data.goodsList)
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
      if (pageNum <= that.data.allPage) {
        wx.showLoading({
          icon: "none",
          title: '玩命加载中',
          duration:200
        })
        call.postData({
          url: 'shop/findOfflineShopByClassIdAndName',
          data: {
            name: that.data.serchName,
            pageNum: pageNum,
            pageSize: 6,
          },
          success(res) {
            console.log(res);
            if (res.data.pages == pageNum) {
              that.setData({
                orderList: that.data.orderList.concat(res.data.list)
              })
            } else {
              that.setData({
                orderList: that.data.orderList.concat(res.data.list)
              })
            }
          }
        });
      } else {
        wx.showToast({
          icon: "none",
          title: '已经到底了',
        })
      }
    } 
    
    // else if (that.data.active == 0) {
    //   let pageNum = that.data.pageNum
    //   pageNum++;
    //   that.setData({
    //     pageNum: pageNum
    //   })
    //   call.getData({
    //     url: "searchGoods/searchGoods?key=" + that.data.serchName + "&type=" + 1 + "&sort=" + "asc" + "&pageNum=" + pageNum + "&pageSize=" + 6,
    //     success(res) {
    //       console.log(res)
    //       if (res.code == 0) {

    //         if (res.data.integralGoods.list.length == 0) {
    //           wx.showToast({
    //             icon: "none",
    //             title: '已经到底了',
    //             duration:300
    //           })
    //         } else {
    //           wx.showLoading({
    //             icon: "none",
    //             title: '玩命加载中',
    //             duration:200
    //           })
    //           that.setData({
    //             orderList: that.data.orderList.concat(res.data.integralGoods.list),
    //           })
    //         }
    //       }
    //     }
    //   })
    // }
  },
  gointDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: '/pages/int-details/int-details?id=' +id,
    })
},
  goDetail: function (e) {
    // console.log(e.currentTarget.dataset.items.goodsId);
    let item = e.currentTarget.dataset.items;
    wx.navigateTo({
      url: '/pages/goods-details/goods-details?id=' + item.uuid,
    })
  },
  gotoShopDetails(e) {
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id=' + e.currentTarget.dataset.id,
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
  onShow: function () {},

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