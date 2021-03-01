import WxParse from '../../wxParse/wxParse.js';
const call = require("../../utils/request")
const app = getApp();
Page({
  data: {
    navH: "",
    contents: null,
    show_share: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    // 商品规格
    Specifications: "",
    specialId: "",
    // 商品id
    goodsId: "",
    details: [],
    specials: {},
    imgUrls: [],
    special: [],
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    show: false,
    idx: 0,
    showJifen: 0
  },

  onLoad: function (option) {
    let that = this
    console.log(option)
    that.setData({
      goodsId: option.id
    })
    // 商品详情
    call.getData({
      url: "exchange/view?id=" + option.id,
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            details: res.data,
          });
          WxParse.wxParse('integralGoodsContent', 'html', that.data.details.integralGoodsContent, that, 0);
        }
      }
    })
    // 规格
    call.getData({
      url: "exchange/view/attr?id=" + option.id,
      method: "GET",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            special: res.data,
            Specifications: res.data[0].value,
            specialId: res.data[0].id
          })
        }
      }
    })
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
    that.setData({
      navH: app.globalData.navHeight,
    });
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  goToSub() {
    let that = this;
    console.log(that.data.details.defaultIntegralId)
    // console.log(that.data.Specifications)
    // console.log(that.data.goodsId)
    // console.log(that.data.num)
    wx.navigateTo({
      url: '/pages/subOrder_/subOrder_?goodsId=' + that.data.goodsId + "&attrId=" + that.data.specialId + "&goodsNum=" + that.data.num + "&type=" + that.data.details.type + "&coinId=" + that.data.details.defaultIntegralId,
    })
  },
  gotoIntsub() {
    let that = this;
    wx.navigateTo({
      url: '/pages/subOrders/subOrders?goodsId=' + that.data.goodsId + "&attrId=" + that.data.specialId + "&goodsNum=" + that.data.num + "&type=" + that.data.details.type + "&coinId=" + that.data.details.defaultIntegralId,
    })
  },
  //客服
  gotoCustom() {
    wx.navigateTo({
      url: '/pages/customer/customer',
    })
  },
  // 分享
  showSharePop() {

    console.log(123456)
    this.setData({
      show_share: true
    })
  },
  // 取消分享
  closeShare() {
    this.setData({
      show_share: false
    })
  },
  // 展开弹窗
  showPopup() {
    let that = this;
    call.postData_token({
      url: "exchange/integral/findSysGoodsSpecById",
      data: {
        id: that.data.specialId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            specials: res.data
          })
        }
      }
    })
    that.setData({
      show: true
    });

  },
  // 关闭弹窗
  onClose() {
    this.setData({
      show: false
    });
  },
  // 选择规格
  chooseGg(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    that.setData({
      specialId: e.currentTarget.dataset.items.id,
      idx: index,
      Specifications: e.currentTarget.dataset.items.value,
    })

    // console.log(e.currentTarget.dataset.items)
    // console.log('每个index',index)
    call.postData_token({
      url: "exchange/integral/findSysGoodsSpecById",
      data: {
        id: that.data.specialId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            specials: res.data
          })
        }
      }
    })

  },
  /* 点击减号 */
  bindMinus: function () {
    let that = this;
    var num = that.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    that.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    let that = this;
    var num = that.data.num;
    // 不作过多考虑自增1  
    if (num < that.data.details.quantity) {
      num++;
    } else {
      wx.showToast({
        icon: "none",
        title: '已达最大限制可购买数量',
      })
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    that.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  }

})