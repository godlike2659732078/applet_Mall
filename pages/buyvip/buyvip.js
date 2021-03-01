const app = getApp();
const call = require("../../utils/request")
Page({
    data: {
        navH: "",
        radio: '1',
        checked: true,
        lv: "",
        userContent: "",
        vipList: [],
        levels: null,
        active: "",
        type: "",
        price: "",
        vipbtn: "",
        vipType: "",
        price: "",
        oldPrice: "",
        money_btn: "",
        viparray: []
    },
    onLoad: function () {
        let that = this;
        this.setData({
            navH: app.globalData.navHeight,
        });
       
        call.getData_token({
                url: "user/info",
                method: "GET",
                success(res) {
                    console.log(res)
                    that.data.level = res.data.level;
                    if (res.data.level == 1) {
                        that.setData({

                        })
                    } else if (res.data.level == 2) {
                        that.setData({
                            lv: "链粉",
                        })
                    } else if (res.data.level == 3) {
                        that.setData({
                            lv: "链商",
                        })
                    }
                    that.setData({
                        userContent: res.data,
                        levels: res.data.level,
                        active:res.data.level+1
                    })
                    call.getData({
                        url: "user/vipInfo",
                        success(res) {
                            console.log(res)
                            that.setData({
                                vipList: res.data
                            })
                            console.log(that.data)
                            for (let item in that.data.vipList) {
                                console.log(item);
                                if(that.data.vipList[item].level==2){
                                    that.setData({
                                        type:"vip",
                                        price:that.data.vipList[item].fee
                                    })
                                }else if(that.data.vipList[item].level==3){
                                    that.setData({
                                        type:"svip",
                                        price:that.data.vipList[item].fee
                                    })
                                }
                                var viparray = 'vipList[' + item + ']';
                                if (that.data.levels >= that.data.vipList[item].level) {
                                    that.setData({
                                        //viparray
                                        [viparray + 'vipbtn']: "vipbtn_disabled",
                                        //['AccountInfo.'+i]
                                        [viparray + 'vipType']: "vipType_disabled",
                                        [viparray + 'price']: "price_disabled",
                                        [viparray + 'oldPrice']: "oldPrice_disabled",
                                        [viparray + 'money_btn']: "money_btn_disabled"
                                    })
                                    console.log(that.data);
                                } else if (that.data.levels < that.data.vipList[item].level && that.data.active == that.data.vipList[item].level) {
                                    that.setData({
                                        [viparray + 'vipbtn']: "vipbtn",
                                        //['AccountInfo.'+i]
                                        [viparray + 'vipType']: "vipType",
                                        [viparray + 'price']: "price",
                                        [viparray + 'oldPrice']: "oldPrice",
                                        [viparray + 'money_btn']: "money_btn"
                                    })
                                } else {
                                    that.setData({
                                        [viparray + 'vipbtn']: "vipbtn_ready",
                                        //['AccountInfo.'+i]
                                        [viparray + 'vipType']: "vipType",
                                        [viparray + 'price']: "price",
                                        [viparray + 'oldPrice']: "oldPrice",
                                        [viparray + 'money_btn']: "money_btn"
                                    })
                                }
                            }
                        }
            
                    })
                }
            })
           

    },
    onClickLeft: function () {
        wx.navigateBack();
    },
    onChange(e) {
        let that = this
        console.log(e.detail)
        that.setData({
            radio: e.detail,
        });
    },
    getObj(e) {
        let that = this;
        console.log(e.currentTarget.dataset.obj)
        let obj=e.currentTarget.dataset.obj
        that.setData({
            active:obj.level
        })
        if(obj.level==2){
            that.setData({
                type:"vip",
                price:obj.fee
            })
        }else if(obj.level==3){
            that.setData({
                type:"svip",
                price:obj.fee
            })
        }
        for (let item in that.data.vipList) {
            var viparray = 'vipList[' + item + ']';
            if (that.data.levels >= that.data.vipList[item].level) {
                that.setData({
                    //viparray
                    [viparray + 'vipbtn']: "vipbtn_disabled",
                    //['AccountInfo.'+i]
                    [viparray + 'vipType']: "vipType_disabled",
                    [viparray + 'price']: "price_disabled",
                    [viparray + 'oldPrice']: "oldPrice_disabled",
                    [viparray + 'money_btn']: "money_btn_disabled"
                })
               
            } else if (that.data.levels < that.data.vipList[item].level && that.data.active == that.data.vipList[item].level) {
                that.setData({
                    [viparray + 'vipbtn']: "vipbtn",
                    //['AccountInfo.'+i]
                    [viparray + 'vipType']: "vipType",
                    [viparray + 'price']: "price",
                    [viparray + 'oldPrice']: "oldPrice",
                    [viparray + 'money_btn']: "money_btn"
                })
            } else {
                that.setData({
                    [viparray + 'vipbtn']: "vipbtn_ready",
                    //['AccountInfo.'+i]
                    [viparray + 'vipType']: "vipType",
                    [viparray + 'price']: "price",
                    [viparray + 'oldPrice']: "oldPrice",
                    [viparray + 'money_btn']: "money_btn"
                })
            }
        }
        
    },
    gotoAgree_vip() {
        wx.navigateTo({
            url: '/pages/agreement_vip/agreement_vip',
        })
    },
    formSubmit(e) {
        let that = this;
        let obj={
            payTypeCode: e.detail.value.radio,
                type: that.data.type,
                fee: that.data.price,
        }
        console.log(obj)
        console.log(e.detail)
        if(that.data.checked==true){
            call.postData_token({
                url: "applet/becomeVip",
                data: {
                    payTypeCode: e.detail.value.radio,
                    type: that.data.type,
                    fee: that.data.price,
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
                                console.log(res)
                            },
                            fail(res) {
                                console.log(res)
                            }
                        })
                    } else {
                        wx.showToast({
                            icon: "none",
                            title: '支付失败',
                        })
                    }
                }
            })
        }else{
            wx.showToast({
                icon:"none",
              title: '开通前请先勾选同意！',
            })
        }
       
    },

    changeChecked(event) {
        this.setData({
            checked: event.detail,
        });
        console.log(event.detail)
    },
})