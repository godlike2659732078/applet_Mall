import Notify from '@vant/weapp/notify/notify';
// let request = require("../../utils/request")
const call = require("../../../utils/request.js");
const app = getApp();
Page({
  data: {
    navH: "",
    curNav: null,
    categoryList: [],
    placeList: [],
    activeKey: 0,
    pageNum: 1,
    pages: null,
  },
  onLoad: function () {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.getData({
      url: 'shop/findAllOfflineShopClass',
      data: {},
      success(res) {
        console.log(res);
        let title_first = {
          id: null,
          name: "全部"
        }
        let allTitles = res.data.list.unshift(title_first)
        that.setData({
          categoryList: res.data.list,
          curNav: res.data.list[0].id
        })
        call.postData({
          url: 'shop/findOfflineShopByClassIdAndName',
          data: {
            pageNum: that.data.pageNum,
            pageSize: 8,
            classId: that.data.categoryList[0].id,
          },
          success(res) {
            console.log(res);
            that.setData({
              placeList: res.data.list,
              pages: res.data.pages
            })
          }
        });
      }
    });
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  // onChange:function (e){
  //     console.log(e);
  // }
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    let that = this;
    that.setData({
      placeList: "",
      pageNum: 1
    })
    call.postData({
      url: '/shop/findOfflineShopByClassIdAndName',
      data: {
        classId: id,
        pageNum: that.data.pageNum,
      },
      success(res) {
        // console.log(res);
        that.setData({
          placeList: res.data.list,
          curNav: id,
          pages: res.data.pages
        })
      }
    });
  },
  loadMore() {
    let that = this;
    if (that.data.pages > 1) {
      let pageNum = that.data.pageNum
      pageNum++;
      call.postData({
        url: '/shop/findOfflineShopByClassIdAndName',
        data: {
          pageNum: pageNum,
          classId: that.data.curNav
        },
        success(res) {
          // console.log(res);

          if (res.data.pages == pageNum) {
            wx.showToast({
              icon: "none",
              title: '已经到底了',
              duration: 500
            })
          } else {
            wx.showLoading({
              title: '玩命加载中',
              duration: 500
            })
            that.setData({
              pageNum: pageNum,
              placeList: that.data.placeList.concat(res.data.list),
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
  },
  // 店铺信息
  gotoOpDetails(e) {
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id='+e.currentTarget.dataset.id+"&offlineId="+e.currentTarget.dataset.offlineid,
    })
  },
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: '链上商城',
      path: "pageBox/pages/optimization/optimization",
      success: function (res) {
        // console.log("分享成功！:" + JSON.stringify(res));
        
      },
      fail: function (res) {
        // console.log("分享失败！:" + JSON.stringify(res));
      }
    }
  },
})