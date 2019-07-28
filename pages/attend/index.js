const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    date: '2016-09-01',
    time1: '08:01',
    time2: '09:01'
  },
  bindTime1Change(e) {
    console.log(e.detail.value);
    this.setData({
      time1: e.detail.value
    })
  },
  bindTime2Change(e) {
    console.log(e.detail.value);
    this.setData({
      time2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.login({
      success (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.xiaomutong.com.cn/web/index.php?r=wechat/getinfo',
            method: 'post',
            data: {
              code: res.code
            },
            success (res) {
              console.log(res.data);
              if(res.data && res.data.code == 0){
                let result = JSON.parse(res.data.result);
                console.log(result);
                _this.setData({
                  openid: result.openid
                })
              }
            },
            fail (err){
              console.log(err);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    console.log(options);
    let id = options.id;
    let title = options.title;
    console.log(app.globalData.userInfo);
    this.setData({
      id: id,
      title: title,
      userInfo: app.globalData.userInfo
    })
  },
  bindOrder: function(){
    let openid = this.data.openid;
    let projectid = this.data.id;
    let title = this.data.title;
    let userInfo = this.data.userInfo;
    let nickname = userInfo.nickName;
    let time1 = this.data.time1+':00';
    let time2 = this.data.time2+':00';
    let data = {
      openid: openid,
      nickname: nickname,
      projectid: projectid,
      title: title,
      time1: time1,
      time2: time2,
      userInfo: JSON.stringify(userInfo)
    };
    console.log(data);
    wx.request({
      url: 'https://www.xiaomutong.com.cn/web/index.php?r=orders/addorder',
      method: 'post',
      data: {
        openid: openid,
        nickname: nickname,
        projectid: projectid,
        title: title,
        time1: time1,
        time2: time2,
        userInfo: JSON.stringify(userInfo)
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        if(res.data.code == 1){
          wx.showToast({
            title: res.data.message,
            icon: 'warn',
            image: '/icons/icon-warn.png',
            duration: 2000
          })
        }
        if(res.data.code==0){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            success: function(){
              wx.redirectTo({
                url: '/pages/orders/index?id='+projectid+'&title='+title
              })
            }
          })

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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