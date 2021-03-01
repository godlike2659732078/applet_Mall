// pages/sign/sign.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    bg_set: "",
    levels: 10,
    datearray: [],
    signRequire: [],

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    that.dateInit();
    that.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
    call.getData_token({
      url: "user/signRecord",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            signRequire: res.data.byUserId
          })
          console.log(that.data.signRequire)
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  signClick() {
    let that = this;
    call.postData_token({
      url: "user/sign",
      success(res) {
        console.log(res)
        if (res.code == 0 && res.data != 1) {
          wx.showToast({
            icon: "none",
            title: '签到成功',
          })
          that.onLoad()
        } else if (res.code == 0 && res.data == 1) {
          wx.showToast({
            icon: "none",
            title: '不要重复签到',
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.message,
          })
        }
      }
    })

  },
  dateInit: function (setYear, setMonth) {
    let that = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year, month, 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr.push(obj);
    }
    that.setData({
      dateArr: dateArr
    })
    console.log(that.data)

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      that.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      that.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    let that = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = that.data.month - 2 < 0 ? that.data.year - 1 : that.data.year;
    let month = that.data.month - 2 < 0 ? 11 : that.data.month - 2;
    that.setData({
      year: year,
      month: (month + 1)
    })
    that.dateInit(year, month);
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    let that = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = that.data.month > 11 ? that.data.year + 1 : that.data.year;
    let month = that.data.month > 11 ? 0 : that.data.month;
    that.setData({
      year: year,
      month: (month + 1)
    })
    that.dateInit(year, month);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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