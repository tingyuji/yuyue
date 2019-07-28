// pages/create/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    input: true,
    textarea: false
  },
  bindCreate: function(){
    let title = this.data.title;
    let content = this.data.content;
  },
  bindKeyInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      title: e.detail.value
    })
  },
  bindTextAreaInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      content: e.detail.value
    })
  },
  bindfocus: function(e){
    textarea: true
  },
  bindCreate: function(){
    let title = this.data.title;
    let content = this.data.content;
    let _this = this;
    wx.request({
      url: 'https://www.xiaomutong.com.cn/web/index.php?r=wechat/checkcontent',
      method: 'post',
      data: {
        content: content
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        //{"code":0,"message":"","result":"{\"errcode\":0,\"errmsg\":\"ok\"}"}
        let result = res.data.result;
        let info = JSON.parse(result);
        console.log(info);
        if(res.data.code == 0 && info.errcode == 0 ){
          _this.create();
        }else{
          //{"code":0,"message":"","result":"{\"errcode\":87014,\"errmsg\":\"risky content hint: [D7iWOA0406b464]\"}"}
          wx.showToast({
            title: '信息敏感',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  create: function(){
    let title = this.data.title;
    let content = this.data.content;
    wx.request({
      url: 'https://www.xiaomutong.com.cn/web/index.php?r=projects/addproject',
      method: 'post',
      data: {
        title: title,
        content: content
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/home/index',
          success: res => {
            console.log(res);
          },
          fail: err => {
            console.log(err);
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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