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
    specials: "",
    // 商品id
    goodsId: "",
    details: [],
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
      url: "goods/view?id=" + option.id,
      method: "GET",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            details: res.data,
          });
          WxParse.wxParse('detailPicture', 'html', that.data.details.detailPicture, that, 0);
        }
      }
    })
    // 规格
    call.getData({
      url: "goods/attrs?goodsId=" + option.id,
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.code == 0) {
          that.setData({
            special: res.data,
            Specifications: res.data[0].value,
            specialId: res.data[0].id
          })
          call.postData_token({
            url: "exchange/shop/findShopGoodsSpecById",
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
    // console.log(that.data.Specifications)
    // console.log(that.data.goodsId)
    // console.log(that.data.num)
    wx.navigateTo({
      url: '/pages/subOrder/subOrder?goodsId=' + that.data.goodsId + "&attrId=" + that.data.specialId + "&goodsNum=" + that.data.num + "&type=" + that.data.details.type,
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
    let that = this
    that.setData({
      show: true
    });
    call.postData_token({
      url: "exchange/shop/findShopGoodsSpecById",
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
    // console.log(e.currentTarget.dataset.items)
    // console.log('每个index',index)
    that.setData({
      idx: index,
      Specifications: e.currentTarget.dataset.items.value,
      specialId: e.currentTarget.dataset.items.id
    })
    call.postData_token({
      url: "exchange/shop/findShopGoodsSpecById",
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
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    let that=this;
    var num = this.data.num;
    // 不作过多考虑自增1  
    if (num < that.data.specials.amount) {
      num++;
    } else {
      wx.showToast({
        icon: "none",
        title: '库存不足',
      })
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
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