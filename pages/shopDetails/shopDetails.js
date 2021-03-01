import WxParse from '../../wxParse/wxParse.js';
const call = require("../../utils/request")
const app = getApp();
Page({
  data: {
    navH: "",
    show: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    radio: "1",
    radio_quan: "",
    nums: "",
    coinType: [{
      coinId: 30,
      coinName: "CMT"
    }, {
      coinId: 31,
      coinName: "BT"
    }],
    coinId: null,
    radios: 1,
    detailsBox: [

    ],
    categoryList: [{
        id: '1',
        title: '店铺信息'
      },
      {
        id: 2,
        title: '线下消费'
      },
    ],
    active: 0,
    offline_dis: null,
    offlineId: null,
    fullAmount: null,
    chooseId:"",
    chooselower:"",
    subCouponId:"",
    lowerMoney:""
  },

  onLoad: function (option) {
    let that = this
    console.log(option)
    that.setData({
      navH: app.globalData.navHeight,
      offlineId: option.offlineId
    });
    console.log(option.id)
    call.postData({
      url: "shop/findAllOfflineShop",
      data: {
        id: option.id
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            detailsBox: res.data.list[0]
          })
          WxParse.wxParse('particulars', 'html', that.data.detailsBox.particulars, that, 0);
        }
      }
    })

    // 获取币种和币种id
    // call.getDatas({
    //   url:"offline/selectOfflineShopCoinAndName?offlineId="+"d2xyywkyzoieyngbose58ekzncmamudjvet2",
    //   success(res){
    //     console.log(res)
    //     if(res.code==0){
    //       that.setData({
    //         coinType:res.data,
    //         coinId:res.data[0].coinId
    //       })
    //     }
    //   }
    // })
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  // 获取优惠券所需价目
  getNums(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      fullAmount: e.detail.value
    })
    call.getData_token({
      url: "coupon/selectOfflineCusCouponWithShop?pageNum=" + 1 + "&pageSize=" + 10 + "&offlineId=" + that.data.offlineId + "&fullAmount=" + that.data.fullAmount,
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            offline_dis: res.data.list
          })
        }
      }
    })
  },
  // 拨打电话
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  // 切换页面
  changeDetail(e) {
    let that = this;
    console.log(e.detail)
    that.setData({
      active: e.detail.index
    })
  },
  // 选择抵扣币种
  changeRadios(e) {
    let that = this;
    console.log(e.detail)
    that.setData({
      radios: e.detail,
    });
    // 切换抵扣币种调接口
    // call.getDatas({
    //   url:"offline/selectOfflineShopCoinAndName?offlineId="+"d2xyywkyzoieyngbose58ekzncmamudjvet2",
    //   success(res){
    //     console.log(res)
    //     if(res.code==0){
    //       that.setData({
    //         coinType:res.data,
    //         coinId: res.data[e.detail - 1].coinId
    //       })
    //     }
    //   }
    // })
  },
  changeRadio(e) {
    let that = this;
    console.log(e.currentTarget.dataset)
    that.setData({
      radio_quan: e.detail,
      chooseId: e.currentTarget.dataset.couponid,
      chooselower:e.currentTarget.dataset.loweramount
    })
  },
  // 提交支付
  formSubmit(e) {
    console.log(e.detail)
    console.log()
    let that = this;
    console.log(that.data.radio)
    call.postData_token({
      url: "applet/payForOfflineOrder",
      data: {
        offlineId: e.detail.target.dataset.offlineid,
        amount: e.detail.value.nums,
        payTypeCode: e.detail.value.radio,
        couponId:that.data.subCouponId
        // coinId:that.data.coinId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.requestPayment({
            appId: res.data.appId,
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success(res) {
              wx.showToast({
                icon: "none",
                title: '支付成功！',
              })
            },
            fail(res) {
              wx.showToast({
                icon: "none",
                title: '支付失败',
              })

            }
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '请输入充值金额',
          })
        }
      }
    })
  },
  showDis() {
    let that = this;
    that.setData({
      show: true
    });
    // 查询商家与用户关联优惠券
    call.getData_token({
      url: "coupon/selectOfflineCusCouponWithShop?pageNum=" + 1 + "&pageSize=" + 10 + "&offlineId=" + that.data.offlineId + "&fullAmount=" + that.data.fullAmount,
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            offline_dis: res.data.list
          })
        }
      }
    })
  },
  subQuan(){
    let that=this;
    that.setData({
      show:false,
      subCouponId:that.data.chooseId,
      lowerMoney:that.data.chooselower
    })
  },
  onClose() {
    let that = this;
    that.setData({
      show: false
    });
  },
})