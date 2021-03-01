const app = getApp();
const call = require("../../../utils/request")
Page({
    data: {
        navH: "",
        boxHeight: 0,
        categoryList: [],
        pageItems: [],

        active: null,
        pageNum: 1,
        pages: null
    },
   
    onLoad: function () {
        let that = this
        that.setData({
            navH: app.globalData.navHeight,
        });
        let res = wx.getSystemInfoSync();
        let boxHeight = res.windowHeight-res.windowHeight*0.18;
        that.setData({
            'boxHeight': 2 * boxHeight
        });
        let obj = {
            id: 0,
            title: "全部",

        }
        call.getData({
            url: 'goods/search/goods',
            method: 'GET',
            success(res) {
                let allTitle = res.data.unshift(obj)
                let id = res.data[0].id
               
                if (res.code == 0) {
                    that.setData({
                        categoryList: res.data
                    })
                   
                    call.getData({
                        url: 'goods/search/appletClassId' + '?pageNum=' + that.data.pageNum + '&pageSize=' +8 + '&classId=' + that.data.categoryList[0].id,
                        method: 'GET',
                        success(res) {
                        console.log(res)
                            if (res.code == 0) {
                                that.setData({
                                    pageItems: res.data.goodsList,
                                    active: id,
                                    pages: res.data.pages,
                                })
                            }
                        }
                    })
                }
            }
        })

    },

    onClickLeft: function () {
        wx.navigateBack();
    },
    getGoods: function (e) {
        let that = this
        that.setData({
            pageItems: "",
            pageNum: 1
        })
      
        let classId = that.data.categoryList[e.detail.index].id
        call.getData({
            url: 'goods/search/appletClassId' + '?pageNum=' + that.data.pageNum + '&pageSize=' +8 + '&classId=' + classId,
            method: 'GET',
            success(res) {
            
                if (res.code == 0) {
                    that.setData({
                        pageItems: res.data.goodsList,
                        pages: res.data.pages,
                        active: classId
                    })
                }
            }
        })
    },
    loadMore() {
        let that = this;
        // console.log(that.data.pages)
        let pageNum = that.data.pageNum
        pageNum++;
        that.setData({
            pageNum: pageNum
        })
        // console.log(pageNum)
        if (pageNum <= that.data.pages) {

            call.getData({
                url: 'goods/search/appletClassId' + '?pageNum=' + that.data.pageNum + '&pageSize=' + 8 + '&classId=' + that.data.active,
                method: "GET",
                success(res) {
                    // console.log(res);

                    if (res.data.pages == pageNum) {
                        that.setData({
                            pageNum: pageNum,
                            pageItems: that.data.pageItems.concat(res.data.goodsList),
                        })

                    } else {
                        wx.showLoading({
                            title: '玩命加载中',
                            duration: 100
                        })
                        that.setData({
                            pageNum: pageNum,
                            pageItems: that.data.pageItems.concat(res.data.goodsList),
                        })
                    }
                }
            });
        } else {
            wx.showToast({
                icon: "none",
                title: '已经到底了',
                duration: 500
            })
        }
        // 显示加载图标

    },
    goDetail: function (e) {
        // console.log(e.currentTarget.dataset.items.goodsId);
        let item = e.currentTarget.dataset.items;
        wx.navigateTo({
            url: '/pages/goods-details/goods-details?id=' + item.goodsId,
        })
    },
    onShareAppMessage: function (res) {
        let that = this;
        return {
          title: '链上商城',
          path: "pageBox/pages/goods-list/goods-list",
          success: function (res) {
            // console.log("分享成功！:" + JSON.stringify(res));
            that.shareClick();
          },
          fail: function (res) {
            // console.log("分享失败！:" + JSON.stringify(res));
          }
        }
      },
})