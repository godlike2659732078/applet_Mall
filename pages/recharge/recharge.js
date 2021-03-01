const app = getApp();
const call=require("../../utils/request")
Page({
    data: {
        navH: "",
        radio: '1',
    },
    onLoad: function () {
        this.setData({
            navH: app.globalData.navHeight,
        });
    },
    onClickLeft: function () {
        wx.navigateBack();
    },
    onChange(e) {
        console.log(e.detail)
        let that=this
        that.setData({
            radio: e.detail,
        });
    },
    formSubmit(e) {
        console.log(e.detail)
        let that=this;
        console.log(that.data.radio)
        call.postData_token({
            url:"applet/submit",
            data:{
                amount:e.detail.value.nums,
                payType:"wxpay"
            },
            success(res){
                console.log(res)
                if(res.code==0){
                    wx.requestPayment({
                        appId: res.data.appId,
                        timeStamp: res.data.timeStamp,
                        nonceStr: res.data.nonceStr,
                        package: res.data.package,
                        signType: res.data.signType,
                        paySign: res.data.paySign,
                        success(res) {
                          console.log(res)
                        },
                        fail(res) {
                          console.log(res)
                        }
                      })
                }else{
                    wx.showToast({
                        icon:"none",
                      title: '请输入充值金额',
                    })
                }
            }
        })
    },
    goToAgreement(){
            wx.navigateTo({
            url: '/pages/agreement/agreement',
        })
    }
    // goToSuccess() {
    //     wx.navigateTo({
    //         url: '/pages/recharge-success/recharge-success',
    //     })
    // }
})