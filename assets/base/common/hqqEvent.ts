export let hqqEvent = {
    hotFail: 0, // 热更失败
    hotCheckup: 1, // 热更检查
    hotProgress: 2, // 热更过程
    hotFinish: 3, // 热更结束
    hotUp: 4, // 待更新状态
    hotCheck: 5, // 文件检测阶段
    hotWait: 6, // 暂停更新

    setPlayerinfo: 10, // 设置玩家数据
    refreshPlayerinfo: 11, // 刷新玩家数据显示
    setnoticelist: 12, // 设置公告列表数据
    addSliderNotice: 13, // 显示滚动公告
    refreshBgState: 14, // 刷新背景音乐状态
    refreshEffectState: 15, // 刷新背景音乐状态
    refreshNetState: 16, // 刷新网络状态
    refreshPlayerGold: 17, // 刷新玩家金钱余额
    refreshHallChongFuDenLu:18,//通知子游戏大厅重复登陆
    showQuYouAccountUI:19, // 显示趣游帐号介面

    showSamlllayer: 20, // 显示小的设置界面  修改头像 绑定支付宝 修改昵称 切换账号
    showBiglayer: 21, // 显示大的设置界面 重置密码 绑定银行卡 注册正式账号
    showTip: 22, // 显示浮动提示框
    showLoadingInfo: 23, // loading 页显示
    showRegister: 24, // 注册界面
    showPerson: 25, // 个人信息界面
    showNotice: 26, // 公告界面
    showCongratulation: 27, // 恭喜获得金币
    showPayScene: 28, // 显示充提界面
    showDownTip: 29, // 显示下拉框
    showConsole: 30, // 显示log界面
    showIosWebTip: 31,  // 显示ios网页添加桌面提示
    showIosTipLayer: 32,  // 显示ios添加网页版提示界面
    showLineChoiceLayer: 33, // 显示线路测试界面
    showNetStateNode: 34, // 显示当前线路状态节点
    showHBYLayer: 35, // 显示红包雨界面
    showAgaLayer: 36, // 显示aga子游戏界面
    showPayActivityWeb:37,// 显示活动网页
    showJumpScene:38, // 跳转场景
    showZhiBoPanel:39, // 显示或关闭直播画面

    onReceiveNologin: 40, // 
    onReceiveBroadcast: 41, // 
    onReceiveLogin: 42, // 
    onReceiveNotice: 43, // 
    onReceiveLoginout: 44, // 
    onReceiveChangeBanlance: 45, // 

    getPayInfo: 50,  // 主动获取支付宝银行卡绑定信息

    refreshHallTips: 60, // 刷新大厅提示 广告，聊天，收益
    refreshLoading: 61, // 刷新loading显示
    showPublicAlert:62, // 显示固定提示匡
    openZhiBoPanel:63, // 开启或关闭直播介面
    showKeFuPanel:64, // 显示或关闭客服介面
    showPersonalCenter:65, // 显示或关闭个人中心介面

    eventShowToSetHall: 66, //后台回游戏  界面整理
    showLeaderBoard:67, // 排行榜
    loadHeadRes:68, // 载入头像
    playbg:69,//播放音乐
    secondHallChangeSubgmae:70,//切换子游戏列表子游戏
    showSubGamePanel:71,// 显示子游戏列表
    showPeekCard:72, // 显示眯牌

    init() {
        this.mapReciver = {};
        return this;
    },
    /**
     * 注册监听事件
     * @param event 事件类型
     * @param className 响应函数所属类名
     * @param callback 响应函数
     */
    register: function (event, className, callback) {
        if (!this.mapReciver[event]) {
            this.mapReciver[event] = {};
        }
        this.mapReciver[event][className] = callback
    },

    /**
     * 取消监听事件
     * @param kind 事件类型
     * @param className 响应函数所属类名
     */
    unregister: function (event, className) {
        if (this.mapReciver[event] && this.mapReciver[event][className]) {
            delete this.mapReciver[event][className];
        }
    },

    /**
     * 派发事件
     * @param kind 事件类型
     * @param data 传递的数据 可传递多个参数
     */
    dispatch: function (event, data) {
        if (this.mapReciver[event]) {
            for (let className in this.mapReciver[event]) {
                let paralist = []
                for (let i = 1; i < arguments.length; i++) {
                    paralist.push(arguments[i])
                }
                if (this.mapReciver[event][className]) {
                    this.mapReciver[event][className](...paralist)
                }
            }
        }
    },
}
