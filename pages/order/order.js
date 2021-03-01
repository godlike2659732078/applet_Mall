// pages/order/order.js
const app = getApp();
const call = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    categoryList: [{
        id: '1',
        title: '全部'
      },
      {
        id: 2,
        title: '待支付'
      },
      {
        id: 3,
        title: '待收货'
      },
      {
        id: 4,
        title: '已完成'
      },
      {
        id: 5,
        title: '售后'
      },

    ],
    orderList: [],
    columns: ['买家重拍', '缺货', '买家拍错'],
    active: 0,
    show: false,
    status: "",
    accessToken: "",
    status_num: [],
    allPage: "",
    pageNum: 1,
    showJifen: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let actives = parseInt(options.index)
    that.setData({
      navH: app.globalData.navHeight,
      active: actives,
    });
    if (actives == 1) {
      that.setData({
        status_num: that.data.status_num.concat(["0"])
      })
    } else if (actives == 2) {
      that.setData({
        status_num: that.data.status_num.concat(["3", "1"])
      })
      console.log(that.data.status_num)
    } else if (actives == 3) {
      that.setData({
        status_num: that.data.status_num.concat(["4"])
      })
      console.log(that.data.status_num)
    } else if (actives == 4) {
      that.setData({
        status_num: that.data.status_num.concat(["2", "12"])
      })
      console.log(that.data.status_num)
    }
    // console.log(options.status)
    if (options.index != "") {
      that.setData({
        active: options.index
      })
    }
    // console.log(wx.getStorageSync('user'))
    call.getData({
      url: "rule/getAppletParam",
      success(res) {
        console.log(res.data)
        if (res.code == 0) {
          that.setData({
            showJifen: res.data
          })
        }
      }
    })
    call.postData_token({
      //  'Authorization':'Bearer '+wx.getStorageSync('userToken').access_token,
      url: "order/index",
      method: "POST",
      data: {
        pageNum: 1,
        pageSize: 6,
        status: that.data.status_num,
      },
      success(res) {
        console.log(res.data.allPage)
        console.log(res)
        if (res.code == 0) {
          that.setData({
            orderList: res.data.orderList,
            allPage:res.data.allPage
          })
          for (let item of res.data.orderList) {
            if (item.status == 0) {
              let statuss = "待支付";
              that.setData({
                status: statuss
              })
            } else if (item.status == 3 || item.status == 1) {
              let statuss = "待收货";
              that.setData({
                status: statuss
              })
            } else if (item.status == 4) {
              let statuss = "已收货";
              that.setData({
                status: statuss
              })
            } else if (item.status == 2 || item.status == 12) {
              let statuss = "退款中";
              that.setData({
                status: statuss
              })
            }
          }
        } else {
          wx.showToast({
            icon: "none",
            title: '加载失败',
          })
        }

      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  showPopup() {
    this.setData({
      show: true
    });
  },

  onChange(e) {
    let that = this
    // console.log(that.data.status_num)

    // console.log(e.detail)
    if (e.detail.index == 0) {
      that.setData({
        status_num: [],
      })
    } else if (e.detail.index == 1) {
      that.setData({
        status_num: ["0"]
      })
    } else if (e.detail.index == 2) {
      that.setData({
        status_num: ["3", "1"]
      })
    } else if (e.detail.index == 3) {
      that.setData({
        status_num: ["4", 9]
      })
    } else if (e.detail.index == 4) {
      that.setData({
        status_num: ["2", "12"]
      })
    }
    call.postData_token({
      //  'Authorization':'Bearer '+wx.getStorageSync('userToken').access_token,
      url: "order/index",
      method: "POST",
      data: {
        pageNum: 1,
        pageSize: 6,
        status: that.data.status_num,
      },
      success(res) {
        console.log(res.data.allPage)
        if (res.code == 0) {
          that.setData({
            orderList: res.data.orderList,
            allPage:res.data.allPage
          })
        };

        for (let item of res.data.orderList) {

          if (item.status == 0) {
            let status = "待支付";
            that.setData({
              status: status
            })
          } else if (item.status == 3 || item.status == 1) {
            let status = "待收货";
            that.setData({
              status: status
            })
          } else if (item.status == 4) {
            let status = "已收货";
            that.setData({
              status: status
            })
          } else if (item.status == 2 || item.status == 12) {
            let status = "退款中";
            that.setData({
              status: status
            })
          }


        }
      }
    })
  },
  change(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // console.log(event)
  },
  goToOrderdetail(e) {
    let that=this;
    console.log(that.data.listItems)
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/orderDetails/orderDetails?id=' + e.currentTarget.dataset.id + "&orderNo=" + e.currentTarget.dataset.orderno,
    })
  },
  delBack(e) {
    let that = this;
    call.postData_token({
      url: "order/refund/cancel",
      data: {
        orderNo: e.currentTarget.dataset.orderno
      },
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: '操作成功！',
          })
          call.postData_token({
            //  'Authorization':'Bearer '+wx.getStorageSync('userToken').access_token,
            url: "order/index",
            method: "POST",
            data: {
              pageNum: 1,
              pageSize: 6,
              status: that.data.status_num,
            },
            success(res) {
              // console.log(res)
              if (res.code == 0) {
                that.setData({
                  orderList: res.data.orderList,
                  allPage:res.data.allPage
                })
              };

              for (let item of res.data.orderList) {

                if (item.status == 0) {
                  let status = "待支付";
                  that.setData({
                    status: status
                  })
                } else if (item.status == 3 || item.status == 1) {
                  let status = "待收货";
                  that.setData({
                    status: status
                  })
                } else if (item.status == 4) {
                  let status = "已收货";
                  that.setData({
                    status: status
                  })
                } else if (item.status == 2 || item.status == 12) {
                  let status = "退款中";
                  that.setData({
                    status: status
                  })
                }
              }
            }
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '操作失败!',
          })
        }
      }
    })
  },
  goToresPonse(e) {
    // console.log(e.currentTarget.dataset.orderno)
    wx.navigateTo({
      url: '/pages/response/response?orderNo=' + e.currentTarget.dataset.orderno,
    })
  },
  goToSub(e) {
    if (e.currentTarget.dataset.buyType == 'cash') {
      call.postData_token({
        url: "order/create/orderItemsByOrderNo",
        data: {
          orderNo: e.currentTarget.dataset.orderno
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            let attrId = res.data[0].product[0].attrId;
            let goodsId = res.data[0].product[0].goodsId;
            let goodsNum = res.data[0].product[0].proNum
            wx.navigateTo({
              url: '/pages/subOrder/subOrder?goodsId=' + goodsId + "&attrId=" + attrId + "&goodsNum=" + goodsNum,
            })
          } else {
            wx.showToast({
              icon: "none",
              title: '操作失败',
            })
          }
        }
      })
    } else {
      call.postData_token({
        url: "order/create/orderItems",
        data: {
          orderNo: e.currentTarget.dataset.orderno
        },
        success(res) {
          console.log(res)
          if (res.code == 0) {
            let attrId = res.data[0].product[0].attrId;
            let goodsId = res.data[0].product[0].goodsId;
            let goodsNum = res.data[0].product[0].proNum;
            let coinName = res.data[0].product[0].coinName
            wx.navigateTo({
              url: '/pages/subOrders/subOrders?goodsId=' + goodsId + "&attrId=" + attrId + "&goodsNum=" + goodsNum+'&id=' + e.currentTarget.dataset.id + "&orderNo=" + e.currentTarget.dataset.orderno+ "&coinName=" + coinName,
            })
          } else {
            wx.showToast({
              icon: "none",
              title: '操作失败',
            })
          }
        }
      })
    }
  },
  goToSubs(e) {
    console.log(e)
    call.postData_token({
      url: "order/create/orderItems",
      data: {
        orderNo: e.currentTarget.dataset.orderno
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          let attrId = res.data[0].product[0].attrId;
          let goodsId = res.data[0].product[0].goodsId;
          let goodsNum = res.data[0].product[0].proNum
          wx.navigateTo({
            url: '/pages/subOrder_/subOrder_?goodsId=' + goodsId + "&attrId=" + attrId + "&goodsNum=" + goodsNum,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '操作失败',
          })
        }
      }
    })
  },
  goToSuborders(e) {
    console.log(e)
    call.postData_token({
      url: "order/create/orderItems",
      data: {
        orderNo: e.currentTarget.dataset.orderno
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          let attrId = res.data[0].product[0].attrId;
          let goodsId = res.data[0].product[0].goodsId;
          let goodsNum = res.data[0].product[0].proNum
          wx.navigateTo({
            url: '/pages/subOrders/subOrders?goodsId=' + goodsId + "&attrId=" + attrId + "&goodsNum=" + goodsNum,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '操作失败',
          })
        }
      }
    })
  },
  // 确认收货
  goToconfirm(e) {
    call.postData_token({
      url: "order/confirm",
      data: {
        id: e.currentTarget.dataset.id
      },
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          call.postData_token({
            //  'Authorization':'Bearer '+wx.getStorageSync('userToken').access_token,
            url: "order/index",
            method: "POST",
            data: {
              pageNum: 1,
              pageSize: 6,
              status: that.data.status_num,
            },
            success(res) {
              // console.log(res)
              if (res.code == 0) {
                that.setData({
                  orderList: res.data.orderList
                })
              };
              for (let item of res.data.orderList) {
                if (item.status == 0) {
                  let statuss = "待支付";
                  that.setData({
                    status: statuss
                  })
                } else if (item.status == 3) {
                  let statuss = "待收货";
                  that.setData({
                    status: statuss
                  })
                } else if (item.status == 4) {
                  let statuss = "已收货";
                  that.setData({
                    status: statuss
                  })
                } else if (item.status == 2 || item.status == 12) {
                  let statuss = "退款中";
                  that.setData({
                    status: statuss
                  })
                }
              }
            }
          })
        }
      }
    })
  },
  loadMore() {
    let that = this;
    let pageNum = that.data.pageNum
    pageNum++;
    that.setData({
      pageNum: pageNum
    })
    console.log(pageNum)
    console.log(that.data.allPage)
    if (pageNum <= that.data.allPage) {
      call.postData_token({
        url: "order/index",
        data: {
          pageNum: pageNum,
          pageSize: 6,
          status: that.data.status_num,
        },
        success(res) {
          console.log(res)
          if (res.data.allPage == pageNum) {
            that.setData({
              orderList: that.data.orderList.concat(res.data.orderList)
            })
          } else {
            that.setData({
              orderList: that.data.orderList.concat(res.data.orderList)
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