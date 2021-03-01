const app = getApp();
const call = require("../../utils/request")
import WxParse from '../../wxParse/wxParse.js';
Page({
    data: {
        navH: "",
        details: "",
        title:"",
        url:null
    },
    getGoods(e) {
        console.log(e)
    },
    onLoad: function (options) { 
        console.log(options)
        let that = this
        let url=decodeURIComponent(options.url)
        that.setData({
            navH: app.globalData.navHeight,
            url:url
        });
    },

    onClickLeft: function () {
        wx.navigateBack();
    },



})