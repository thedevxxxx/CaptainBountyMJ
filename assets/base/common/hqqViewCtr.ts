import * as cc from 'cc';
// import { screenAdapter } from 'pal/screen-adapter';
export let hqqViewCtr = {
    parentNode: null,
    personalcenterIndex:Math.pow(2, 15) - 1 - 18,
    netpanelIndex: Math.pow(2, 15) - 1 - 17,
    noticelayerIndex: Math.pow(2, 15) - 1 - 16,
    registerlayerIndex: Math.pow(2, 15) - 1 - 15,
    personlayerIndex: Math.pow(2, 15) - 1 - 14,
    bigsublayerIndex: Math.pow(2, 15) - 1 - 13,
    smallsublayerIndex: Math.pow(2, 15) - 1 - 12,
    congratulationIndex: Math.pow(2, 15) - 1 - 11, // 恭喜获得金币层级
    consoleIndex: Math.pow(2, 15) - 1 - 10,
    tipPanelIndex: Math.pow(2, 15) - 1 - 1,
    publicalertIndex: Math.pow(2, 15) - 1 - 1,
    peekCardIndex: Math.pow(2, 15) - 1 - 10,

    nodelist:{},

    config: {
        smallsublayer: { path: "base/prefab/smallsublayer", scriptName: "hallPSubsLayer" },
        bigsublayer: { path: "base/prefab/bigsublayer", scriptName: "hallPSubbLayer" },
        tippanel: { path: "base/prefab/tippanel", scriptName: "hallTipPanel" },
        registerlayer: { path: "base/prefab/registerlayer", scriptName: "hallRegisterLayer" },
        personallayer: { path: "base/prefab/personallayer", scriptName: "hallPersonLayer" },
        noticelayer: { path: "base/prefab/noticelayer", scriptName: "hallNoticeLayer" },
        congratulation: { path: "base/prefab/congratulation", scriptName: "hallCongratulation" },
        downtip: { path: "base/prefab/downtip", scriptName: "hallDownTip" },
        console: { path: "base/prefab/Console", scriptName: "hqqConsole" },
        ioswebtip: { path: "base/prefab/ioswebtip", scriptName: "ioswebtip" },
        iostiplayer: { path: "base/prefab/iostiplayer", scriptName: "iostiplayer" },
        netpanel: { path: "base/prefab/netpanel", scriptName: "hqqNetPanel" },
        netnode: { path: "base/prefab/netnode", scriptName: "hqqNetNode" },
        hby: { path: "base/prefab/hbylayer", scriptName: "hallHBY" },
        aga: { path: "base/prefab/agalayer", scriptName: "hallAgaLayer" },
        payactivityweb: { path: "base/prefab/PayActivityWeb", scriptName: "" },
        zhibopanel: { path: "base/prefab/zhibopanel", scriptName: "" },
        publicalert: { path: "base/prefab/publicalert", scriptName: "hallPublicAlert" },
        kefulayer: { path: "prefab/kefulayer", scriptName: "" },
        personalcenter: { path: "prefab/personalcenter", scriptName: "" },
        subgamePanel: { path: "prefab/quyou", scriptName: "hqqSubgamePanel_" },
        peekCard: { path: "base/prefab/peekCard", scriptName: "DrawCard" },
    },
    setParentNode(node) {
        this.parentNode = node;
    },

    showLayer(path, script, data, zindex, ispersist,tempRes=null,isCanvas=false) {
        zindex = zindex || 1000
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        cc.log("this.nodelist[nodename]=",this.nodelist[nodename]," isCanvas=",isCanvas)
        if (cc.isValid(this.nodelist[nodename])){
            cc.log("已经存在节点", nodename)
            if (nodename == "tippanel" || nodename == "downtip" || nodename == "publicalert" || nodename == "smallsublayer" || nodename == "personalcenter" || nodename == "peekCard" || nodename == "safetydepositbox" || nodename == "rulepanel" ) {
                this.nodelist[nodename].getComponent(script).init(data)
            }
        } else {
            let Res = cc.resources;
            if(tempRes){
                Res = tempRes;
            }
            cc.log("不存在节点", nodename)
            Res.load(path, cc.Prefab, (err, prefab) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                if(cc.isValid(this.nodelist[nodename])){
                    cc.log("已存在节点", nodename,"不产生新的",this.nodelist[nodename])
                    return;
                }
                let node:cc.Node = cc.instantiate(prefab)
                if (data && data.position) {
                    node.setPositionEx(data.position)
                }
                if (data && data.scale) {
                    node.setScaleEx(data.scale)
                }/*  else if (screenAdapter.orientation == cc.macro.ORIENTATION_PORTRAIT && nodename == "smallsublayer") {
                    let scale = cc.view.getVisibleSize().width * 1.4 / node.getComponent(cc.UITransform).width
                    node.setScaleEx(scale)
                } */
                if (data && cc.isValid( data.parent ) ) {
                    data.parent.addChildEx(node, zindex)
                } else if ( cc.isValid( this.parentNode ) ) {
                    this.parentNode.addChildEx(node, zindex)
                } else if (cc.isValid( cc.director.getScene() )) {
                    if(isCanvas){
                        cc.find("Canvas").addChildEx(node, zindex)
                    } else{
                        cc.director.getScene().addChildEx(node,zindex);
                    }
                }
                else
                {
                    node.destroy();
                    return;
                }
                this.nodelist[nodename] = node;
                let comp = node.getComponent(script);
                if(!comp){
                    comp = node.addComponent(script);
                }
                comp.init(data)
                if (ispersist) {
                    cc.game.addPersistRootNode(node);
                }

                if(cc.director.getScene()){
                    let Noticelayer = cc.find("Canvas").getChildByName("noticelayer");
                    let PayActivityWeb = cc.find("Canvas").getChildByName("PayActivityWeb");
                    if( cc.isValid(Noticelayer) && cc.isValid(PayActivityWeb) ){
                        if(Noticelayer.zIndex > PayActivityWeb.zIndex ){
                            let zIndex = Noticelayer.zIndex;
                            Noticelayer.zIndex = PayActivityWeb.zIndex;
                            PayActivityWeb.zIndex = zIndex;
                        } else if( Noticelayer.zIndex == PayActivityWeb.zIndex ){
                            let zIndex = Noticelayer.zIndex;
                            Noticelayer.zIndex = PayActivityWeb.zIndex;
                            PayActivityWeb.zIndex = zIndex + 1;
                        }
                    }
                }
            })
        }
    },
    init() {
        this.oldpinpailist = ["test","fuxin","xingui","xingba","nineone","xinsheng",
                              "xinhao","xinlong","huangshi","juding","huaxing",
                              "ninetwo","tianqi","tetu","xingyao"];

        hqq.eventMgr.register(hqq.eventMgr.showSamlllayer, "hqqViewCtr", this.showSmallsublayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showBiglayer, "hqqViewCtr", this.showBigsublayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showTip, "hqqViewCtr", this.showTippanel.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showRegister, "hqqViewCtr", this.showRegisterlayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPerson, "hqqViewCtr", this.showPersonallayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showNotice, "hqqViewCtr", this.showNoticelayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showCongratulation, "hqqViewCtr", this.showCongratulation.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPayScene, "hqqViewCtr", this.showPayScene.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showDownTip, "hqqViewCtr", this.showDownTip.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showConsole, "hqqViewCtr", this.showConsole.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showIosWebTip, "hqqViewCtr", this.showIosWebTip.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showIosTipLayer, "hqqViewCtr", this.showIosTipLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showLineChoiceLayer, "hqqViewCtr", this.showLineChoiceLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showNetStateNode, "hqqViewCtr", this.showNetStateNode.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showHBYLayer, "hqqViewCtr", this.showHBYLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showAgaLayer, "hqqViewCtr", this.showAgaLayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPayActivityWeb, "hqqViewCtr", this.showPayActivityWeb.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showJumpScene, "hqqViewCtr", this.showJumpScene.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.openZhiBoPanel, "hqqViewCtr", this.openZhiBoPanel.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPublicAlert, "hqqViewCtr", this.showPublicAlert.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showKeFuPanel, "hqqViewCtr", this.showKeFuPanel.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPersonalCenter, "hqqViewCtr", this.showPersonalCenter.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showSubGamePanel, "hqqViewCtr", this.showSubGamePanel.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showPeekCard, "hqqViewCtr", this.showPeekCard.bind(this))
        return this
    },
    showSmallsublayer(data) {
        let path = this.config.smallsublayer.path
        let scriptname = this.config.smallsublayer.scriptName
        this.showLayer(path, scriptname, data, this.smallsublayerIndex)
    },
    showBigsublayer(data) {
        let path = this.config.bigsublayer.path
        let scriptname = this.config.bigsublayer.scriptName
        this.showLayer(path, scriptname, data, this.bigsublayerIndex)
    },
    showTippanel(data) {
        let path = this.config.tippanel.path
        let scriptname = this.config.tippanel.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showRegisterlayer(data) {
        let path = this.config.registerlayer.path
        let scriptname = this.config.registerlayer.scriptName
        this.showLayer(path, scriptname, data, this.registerlayerIndex)
    },
    showPersonallayer(data) {
        if( hqq.app.pinpai == "ninetwo"  || hqq.app.pinpai == "ninethree"){
            this.showPersonalCenter(true);
        } else{
            let path = this.config.personallayer.path
            let scriptname = this.config.personallayer.scriptName
            this.showLayer(path, scriptname, data, this.personlayerIndex)
        }
    },
    showNoticelayer(data) {
        let path = this.config.noticelayer.path
        let scriptname = this.config.noticelayer.scriptName
        this.showLayer(path, scriptname, data, this.noticelayerIndex);
    },
    showCongratulation(data) {
        let payactivitywebpath = this.config.payactivityweb.path
        let payactivitywebnodename = payactivitywebpath.substring(payactivitywebpath.lastIndexOf('/') + 1)
        if (cc.director.getScene() && cc.find("Canvas").getChildByName(payactivitywebnodename))
        {
            //活动网页开启时不显示恭喜获得金币
            return;
        }
        let path = this.config.congratulation.path
        let scriptname = this.config.congratulation.scriptName
        this.showLayer(path, scriptname, data, this.congratulationIndex)
    },
    showPayScene(data) {
        if (hqq.gameGlobal.pay.pay_host == "") {
            hqq.logMgr.time("最快的pay地址")
            let callback = (mdata, url) => {
                hqq.logMgr.timeEnd("最快的pay地址", url)
                hqq.gameGlobal.pay.pay_host = url;
                if (hqq.subModel.pay.lanchscene != "") {
                    hqq.gameGlobal.pay.from_scene = data
                    
                    cc.assetManager.loadBundle(hqq.loginMgr.payStr, (err)=> {
                        if (err) {
                            return cc.log('load subpackage script fail.', hqq.loginMgr.payStr + "_" + hqq.app.pinpai);
                        }
                        hqq[hqq.loginMgr.payStr] = cc.assetManager.getBundle(hqq.loginMgr.payStr);
                        cc.log('load subpackage script successfully.', hqq.loginMgr.payStr);
                        for(let i = 0; i < hqq.loginMgr.newpaypinpailist.length; i++ ){
                            if(hqq.app.pinpai === hqq.loginMgr.newpaypinpailist[ i ] ){
                                hqq[hqq.loginMgr.payStr].loadScene(hqq.subModel.pay.lanchscene,(err8,scene)=>{
                                    if(err8){
                                        cc.log(err8);
                                        return;
                                    }
                                    cc.director.runScene(scene);
                                });
                                return;
                            }
                        }
                        cc.director.preloadScene(hqq.subModel.pay.lanchscene, (err, scene) => {
                            if (err) {
                                cc.log(err)
                                hqq.logMgr.logerror(err)
                                return
                            }
                            cc.director.loadScene(hqq.subModel.pay.lanchscene);
                        })
                    })
                } else {
                    cc.log("请配置充值场景")
                }
            }
            hqq.http.requestFastestUrlLine({
                urllist: hqq.app.remoteSeverinfo.pay_host,
                endurl: "/checked",
                callback: callback,
                needJsonParse: false,
            })
        } else {
            if (hqq.subModel.pay.lanchscene != "") {
                hqq.gameGlobal.pay.from_scene = data
                
                cc.assetManager.loadBundle(hqq.loginMgr.payStr, (err)=> {
                    if (err) {
                        return cc.log('load subpackage script fail.', hqq.loginMgr.payStr + "_" + hqq.app.pinpai);
                    }
                    hqq[hqq.loginMgr.payStr] = cc.assetManager.getBundle(hqq.loginMgr.payStr);
                    cc.log('load subpackage script successfully.', hqq.loginMgr.payStr);
                    for(let i = 0; i < hqq.loginMgr.newpaypinpailist.length; i++ ){
                        if(hqq.app.pinpai === hqq.loginMgr.newpaypinpailist[ i ] ){
                            hqq[hqq.loginMgr.payStr].loadScene(hqq.subModel.pay.lanchscene,(err8,scene)=>{
                                if(err8){
                                    cc.log(err8);
                                    return;
                                }
                                cc.director.runScene(scene);
                            });
                            return;
                        }
                    }
                    cc.director.preloadScene(hqq.subModel.pay.lanchscene, (err, scene) => {
                        if (err) {
                            cc.log(err)
                            hqq.logMgr.logerror(err)
                            return
                        }
                        cc.director.loadScene(hqq.subModel.pay.lanchscene);
                    })
                })
            } else {
                cc.log("请配置充值场景")
            }
        }
    },
    showDownTip(data) {
        let path = this.config.downtip.path
        let scriptname = this.config.downtip.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showConsole(data) {
        /*let path = this.config.console.path
        let scriptname = this.config.console.scriptName
        this.showLayer(path, scriptname, data, this.consoleIndex, true,null,false)*/
        let nodename = "MainLogCanvas";
        if(cc.isValid(this.nodelist[nodename])){

        } else{
            cc.resources.load("logPrefab/MainLogCanvas", cc.Prefab, function(err, prefab) {
                if(err) {
                    cc.log("[showConsole] loadPrefab : " + err);
                    return;
                }
                if(prefab) {
                    let logNode = cc.instantiate(prefab);
                    let root: cc.Scene = cc.director.getScene();
                    root.addChildEx(logNode);
                    logNode.name = "MainLogCanvas";
                    cc.game.addPersistRootNode(logNode);
                    this.nodelist[nodename] = logNode;
                }
            }.bind(this));
        }
    },
    showIosWebTip(data) {
        let path = this.config.ioswebtip.path
        let scriptname = this.config.ioswebtip.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex, true)
    },
    showIosTipLayer(data) {
        let path = this.config.iostiplayer.path
        let scriptname = this.config.iostiplayer.scriptName
        this.showLayer(path, scriptname, data, this.tipPanelIndex)
    },
    showLineChoiceLayer(data) {
        hqq.app.hasLineChoiceLayer = true
        let path = this.config.netpanel.path
        let scriptname = this.config.netpanel.scriptName
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showNetStateNode(data) {
        return;
        let path = this.config.netnode.path
        let scriptname = this.config.netnode.scriptName
        cc.log("=================== showNetStateNode 11111111111111")
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showHBYLayer(data) {
        let path = this.config.hby.path
        let scriptname = this.config.hby.scriptName
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showAgaLayer(data) {
        let path = this.config.aga.path
        let scriptname = this.config.aga.scriptName
        this.showLayer(path, scriptname, data, this.netpanelIndex)
    },
    showPayActivityWeb(data,forcedelete=false,prefabpath = "",script="" ){
        let path = this.config.payactivityweb.path;
        if(prefabpath){
            path = prefabpath;
        }
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let payactivityweb = null;
        if (cc.director.getScene() && cc.find(nodename)) {
            payactivityweb = cc.find(nodename);
        }
        if( !data ){
            if(forcedelete || (cc.sys.isBrowser && cc.sys.browserType === cc.sys.BrowserType.SAFARI)){
                if(cc.isValid(payactivityweb)){
                    payactivityweb.destroy();
                }
            } else{
                if(cc.isValid(payactivityweb)){
                    payactivityweb.active = false;
                    // payactivityweb.destroy();
                }
            }
        } else{
            let setpayactivityweb = ( node )=>{
                let tempurl = "";
                if(hqq.app.huanjin=="pre"){
                    tempurl = hqq.app.canHotServer+"/com.test.pre.android/events/index.html";
                }else if(hqq.app.huanjin=="online"){
                    tempurl = hqq.app.canHotServer+"/com.test.online.android/events/index.html";
                }
                
                let dataStr = "?host="+hqq.gameGlobal.pay.pay_host;
                // dataStr += "&imHost=" +  hqq.gameGlobal.im_host;
                dataStr += "&user_id=" + hqq.gameGlobal.pay.user_id;
                dataStr += "&user_name=" + decodeURI(hqq.gameGlobal.pay.user_name);
                dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id;
                dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532";
                dataStr += "&center_auth=" + hqq.gameGlobal.token;
                dataStr += hqq.gameGlobal.ipList[0]?"&login_ip=" + hqq.gameGlobal.ipList[0]:"&login_ip=" + hqq.gameGlobal.regin_ip;
                dataStr += "&regin_ip=" + hqq.gameGlobal.regin_ip;
                dataStr += "&device_id=" + hqq.app.deviceID;
                if(data instanceof Array && data.length > 1 ){
                    dataStr += "&firstPage=" + data[1];
                }
                let webview = node.getChildByName("web").getComponent(cc.WebView);
                webview.url = encodeURI(tempurl+dataStr);
                webview = null;
                if(cc.director.getScene()){
                    let Noticelayer = cc.find("Canvas").getChildByName("noticelayer");
                    let PayActivityWeb = node;
                    if( cc.isValid(Noticelayer) && cc.isValid(PayActivityWeb) ){
                        if(Noticelayer.zIndex > PayActivityWeb.zIndex ){
                            let zIndex = Noticelayer.zIndex;
                            Noticelayer.zIndex = PayActivityWeb.zIndex;
                            PayActivityWeb.zIndex = zIndex;
                        }
                    }
                }
            }
            if(cc.isValid(payactivityweb)){
                payactivityweb.active = true;
                setpayactivityweb(payactivityweb);
            } else{
                let tempRes = cc.resources;
                if(prefabpath){
                    tempRes = hqq["hall_"+hqq.app.pinpai];
                }
                tempRes.load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        node.name = nodename;
                        node.addComponent(cc.Canvas);
                        cc.director.getScene().addChildEx(node,Math.pow(2, 15) - 1);
                    }else{
                        node.destroy();
                        return;
                    }
                    if(script){
                        if(!node.getComponent(script)){
                            node.addComponent(script);
                        }
                    }
                    setpayactivityweb(node);
                })
            }
        }
        payactivityweb = null;
    },
    showJumpScene(data){
        hqq.isShowJumpScene = true;
        if(data === "hall" ){
            if(hqq.isOtherGame && !hqq.open_back_hall ){
                let userAgent = navigator.userAgent;
                if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
                    window.location.href="about:blank";
                    window.open('javascript:window.open("", "_self", "");window.close();', '_self');
                } else {
                        window.opener = null;
                        window.location.href="about:blank";
                        window.open('javascript:window.open("", "_self", "");window.close();', '_self');
                }
        
                if(hqq.hallWebSocket){
                    hqq.hallWebSocket.close();
                    hqq.hallWebSocket = null;
                }
                hqq.isShowJumpScene = false;
                return;
            }
            cc.assetManager.loadBundle(hqq.loginMgr.hallStr, (err)=>{
                if (err) {
                    cc.log(err);
                    hqq.isShowJumpScene = false;
                    return;
                }
                hqq[hqq.loginMgr.hallStr] = cc.assetManager.getBundle(hqq.loginMgr.hallStr);
                
                // for(let i = 0; i < this.oldpinpailist.length; i++ ){
                //     if(hqq.app.pinpai === this.oldpinpailist[ i ] ){
                //         cc.director.preloadScene("hall", (completedCount, totalCount, item)=>{
                //             hqq.eventMgr.dispatch(hqq.eventMgr.hotProgress, completedCount / totalCount, "jiazai")
                //         }, (err6, scene) => {
                //             if (err6) {
                //                 cc.log(err6)
                //                 hqq.logMgr.logerror(err6)
                //                 return
                //             }
                //             cc.director.loadScene("hall");
                //         })
                //         return;
                //     }
                // }
                hqq[hqq.loginMgr.hallStr].preloadScene("hall", (completedCount, totalCount, item)=>{
                    hqq.eventMgr.dispatch(hqq.eventMgr.hotProgress, completedCount / totalCount, "jiazai")
                }, (err7, scene) => {
                    if (err7) {
                        cc.log(err7)
                        hqq.logMgr.logerror(err7)
                        hqq.isShowJumpScene = false;
                        return
                    }
                    hqq[hqq.loginMgr.hallStr].loadScene("hall",(err8,scene)=>{
                        if(err8){
                            cc.log(err8);
                            hqq.isShowJumpScene = false;
                            return;
                        }
                        cc.director.runScene(scene,null,()=>{
                            let Canvas = cc.find("Canvas");
                            let hallscenpinpai = hqq.loginMgr.hallStr.split("hall_")[1];
                            if(!Canvas.getComponent("hallScene_"+hallscenpinpai)){
                                Canvas.addComponent("hallScene_"+hallscenpinpai);
                            }
                            hqq.isShowJumpScene = false;
                        });
                    });
                })
            })
            return;
        } else if( data === "proxy" ){

            cc.assetManager.loadBundle(hqq.loginMgr.proxyStr, (err)=> {
                if (err) {
                    hqq.isShowJumpScene = false;
                    return cc.log('load subpackage script fail.', hqq.loginMgr.proxyStr + "_" + hqq.app.pinpai);
                }
                hqq[hqq.loginMgr.proxyStr] = cc.assetManager.getBundle(hqq.loginMgr.proxyStr);
                cc.log('load subpackage script successfully.', hqq.loginMgr.proxyStr);

                // for(let i = 0; i < this.oldpinpailist.length; i++ ){
                //     if(hqq.app.pinpai === this.oldpinpailist[ i ] ){
                //         if(hqq.app.pinpai === "xinlong") {
                //             hqq[hqq.loginMgr.proxyStr].preloadScene(hqq.loginMgr.proxyStr,  (err7, scene) => {
                //                 if (err7) {
                //                     cc.log(err7)
                //                     hqq.logMgr.logerror(err7)
                //                     return
                //                 }
                //                 hqq[hqq.loginMgr.proxyStr].loadScene(hqq.loginMgr.proxyStr,(err8,scene)=>{
                //                     if(err8){
                //                         cc.log(err8);
                //                         return;
                //                     }
                //                     cc.director.runScene(scene);
                //                 });
                //             })
                //             return
                //         }
                //         cc.director.preloadScene(hqq.subModel.proxy.lanchscene, (err3, scene) => {
                //             if (err3) {
                //                 cc.log(err3)
                //                 hqq.logMgr.logerror(err3)
                //                 return
                //             }
                //             cc.director.loadScene(hqq.subModel.proxy.lanchscene);
                //         })
                //         return;
                //     }
                // }

                hqq[hqq.loginMgr.proxyStr].preloadScene(hqq.loginMgr.proxyStr,  (err7, scene) => {
                    if (err7) {
                        cc.log(err7)
                        hqq.logMgr.logerror(err7)
                        hqq.isShowJumpScene = false;
                        return
                    }
                    hqq[hqq.loginMgr.proxyStr].loadScene(hqq.loginMgr.proxyStr,(err8,scene)=>{
                        if(err8){
                            cc.log(err8);
                            hqq.isShowJumpScene = false;
                            return;
                        }
                        hqq.isShowJumpScene = false;
                        cc.director.runScene(scene);
                    });
                })
            });
            return;
        } else if( data === "cash" ){
            cc.assetManager.loadBundle(hqq.loginMgr.payStr, (err)=> {
                if (err) {
                    hqq.isShowJumpScene = false;
                    return cc.log('load subpackage script fail.', hqq.loginMgr.payStr + "_" + hqq.app.pinpai);
                }
                hqq[hqq.loginMgr.payStr] = cc.assetManager.getBundle(hqq.loginMgr.payStr);
                cc.log('load subpackage script successfully.', hqq.loginMgr.payStr);
                for(let i = 0; i < hqq.loginMgr.newpaypinpailist.length; i++ ){
                    if(hqq.app.pinpai === hqq.loginMgr.newpaypinpailist[ i ] ){
                        hqq[hqq.loginMgr.payStr].loadScene(hqq.subModel.cash.lanchscene,(err8,scene)=>{
                            if(err8){
                                cc.log(err8);
                                hqq.isShowJumpScene = false;
                                return;
                            }
                            hqq.isShowJumpScene = false;
                            cc.director.runScene(scene);
                        });
                        return;
                    }
                }
                cc.director.preloadScene(hqq.subModel.cash.lanchscene, (err, scene) => {
                    if (err) {
                        cc.log(err)
                        hqq.logMgr.logerror(err)
                        hqq.isShowJumpScene = false;
                        return
                    }
                    hqq.isShowJumpScene = false;
                    cc.director.loadScene(hqq.subModel.cash.lanchscene);
                })
            })
            return;
        }
        let GameCode = hqq.gameGlobal.zhibo.GameCode
        if(data)
        {
            GameCode = data;
        }
        if( hqq.subGameList[ GameCode ] ){
            if(hqq.hotUpdateMgr.getSubGameIsOnUp(GameCode)){
                hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                    type: 10,
                    msg: hqq.getTip("str9"),
                })
            } else{
                if (!hqq.app || !hqq.app.remoteGamelist) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("str9"),
                    })
                    hqq.isShowJumpScene = false;
                    return
                }
                let subdata = null;
                for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
                    if (hqq.subGameList[GameCode].game_id === hqq.app.remoteGamelist[i].game_id) {
                        subdata = hqq.app.remoteGamelist[i];
                        break;
                    }
                }

                if(subdata === null ){
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("showtip9") + hqq.subGameList[GameCode].zhname + hqq.getTip("b2bwebtip1"),
                    })
                    hqq.isShowJumpScene = false;
                    return;
                }

                if (subdata && subdata.open == 0) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("str9"),
                    })
                    hqq.isShowJumpScene = false;
                } else {
                    let subgamev;
                    let localsubv = hqq.localStorage.get(GameCode, "versionKey");
                    if (GameCode == 'zrsx1' || GameCode == 'zrsx2') {
                        localsubv = hqq.localStorage.get('zrsx', "versionKey");
                        subgamev = hqq.app.subGameVersion['zrsx'];
                    } else if (GameCode == 'sbty1' || GameCode == 'sbty2') {
                        localsubv = hqq.localStorage.get('sbty', "versionKey");
                        subgamev = hqq.app.subGameVersion['sbty'];
                    } else {
                        subgamev = hqq.app.subGameVersion[GameCode];
                    }
                    // let txt = "local version: " + localsubv + " | remote version:" + subgamev;
                    let needup = hqq.commonTools.versionCompare(localsubv, subgamev);
                    if (needup && !cc.sys.isBrowser && GameCode != "aga") { // && cc.sys.os != "Windows"
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                            type: 10,
                            msg: cc.js.formatStr(hqq.getTip("str10"),hqq.subGameList[ GameCode ].zhname),
                        })
                        hqq.isShowJumpScene = false;
                    } else {
                        let nowd = new Date().getTime()
                        let deletenum = 0
                        let loginHistory = hqq.localStorage.get(GameCode, "loginHistory");
                        if (loginHistory) {
                            for (let i = 0; i < loginHistory.length; i++) {
                                let jumptime = nowd - loginHistory[i]
                                let days = Math.floor(jumptime / (24 * 3600 * 1000))
                                if (days > 7) {
                                    deletenum++
                                }
                            }
                            if (deletenum > 0) {
                                loginHistory.splice(0, deletenum)
                            }
                        } else{
                            loginHistory = [];
                        }
                        loginHistory.push(new Date().getTime())
                        hqq.localStorage.set(GameCode, "loginHistory", loginHistory)
                        if(subdata.hasAccount){
                            this.jumpToSubGame( GameCode );
                        } else{
                            hqq.loginMgr.createSubAccount(GameCode, this.jumpToSubGame.bind(this))
                        }
                    }
                }
            }
        } else{
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                type: 10,
                msg: hqq.getTip("str9"),
            })
            hqq.isShowJumpScene = false;
        }
    },
    // 跳转至子游戏场景
    jumpToSubGame(subgamern) {
        let key = subgamern
        if (subgamern == "sbty1" || subgamern == "sbty2") {
            key = "sbty"
        } else if (subgamern == "zrsx1" || subgamern == "zrsx2") {
            key = "zrsx"
        }
        cc.assetManager.loadBundle(subgamern, (err)=>{
            if(err)
            {
                console.log(err);
                hqq.isShowJumpScene = false;
                return;
            }
            hqq[subgamern] = cc.assetManager.getBundle(subgamern);
            if (hqq.app.pinpai == "fuxin"||hqq.app.pinpai=="juding") {
                cc.director.preloadScene(hqq.subGameList[key].fuxin_lanchscene, (err, scene) => {
                    if (err) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                            type: 10,
                            msg: hqq.getTip("str9"),
                        })
                        hqq.logMgr.logerror(err)
                        hqq.isShowJumpScene = false;
                        return
                    }
                    hqq.isShowJumpScene = false;
                    cc.director.loadScene(hqq.subGameList[key].fuxin_lanchscene);
                })
            } else {
                cc.director.preloadScene(hqq.subGameList[key].lanchscene, (err, scene) => {
                    if (err) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                            type: 10,
                            msg: hqq.getTip("str9"),
                        })
                        hqq.logMgr.logerror(err)
                        hqq.isShowJumpScene = false;
                        return
                    }
                    hqq.isShowJumpScene = false;
                    cc.director.loadScene(hqq.subGameList[key].lanchscene);
                })
            }
        })
    },
    openZhiBoPanel(data){
        let path = this.config.zhibopanel.path;
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let zhibopanel = null;
        if(cc.director.getScene()){
            zhibopanel = cc.find("Canvas").getChildByName(nodename)
        }
        if(data){
            if ( cc.isValid( zhibopanel ) ) {
                
            } else {
                cc.resources.load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        cc.find("Canvas").addChildEx(node,Math.pow(2, 15) - 1)
                    }else{
                        node.destroy();
                        return;
                    }
                    cc.game.addPersistRootNode(node);
                })
            }
        } else{
            if ( cc.isValid( zhibopanel )){
                cc.game.removePersistRootNode(zhibopanel);
                zhibopanel.destroy();
            }
        }
       
        zhibopanel = null;
    },
    showPublicAlert(data){
        let path = this.config.publicalert.path
        let scriptname = this.config.publicalert.scriptName
        this.showLayer(path, scriptname, data, this.publicalertIndex)
    },
    showKeFuPanel(data){
        let path = this.config.kefulayer.path;
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let kefulayer = null;
        if(cc.director.getScene()){
            kefulayer = cc.find("Canvas").getChildByName(nodename)
        }
        if(data){
            if ( cc.isValid( kefulayer ) ) {
                kefulayer.active = true;
            } else {
                hqq["hall_"+hqq.app.pinpai].load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        cc.find("Canvas").addChildEx(node,Math.pow(2, 15) - 1-1)
                    }else{
                        node.destroy();
                        return;
                    }
                })
            }
        } else{
            if ( cc.isValid( kefulayer )){
                kefulayer.active = false;
            }
        }
       
        kefulayer = null;
    },
    showPersonalCenter(data){
        let path = this.config.personalcenter.path;
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let personalcenter = null;
        if(cc.director.getScene()){
            personalcenter = cc.find("Canvas").getChildByName(nodename)
        }
        if(data){
            if ( cc.isValid( personalcenter ) ) {
                personalcenter.active = true;
            } else {
                hqq["hall_"+hqq.app.pinpai].load(path, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    let node = cc.instantiate(prefab)
                    if (cc.isValid( cc.director.getScene() )) {
                        cc.find("Canvas").addChildEx(node,this.personalcenterIndex)
                    }else{
                        node.destroy();
                        return;
                    }
                })
            }
        } else{
            if ( cc.isValid( personalcenter )){
                personalcenter.active = false;
            }
        }
       
        personalcenter = null;
    },
    showSubGamePanel(data){
        let path = this.config.subgamePanel.path
        let scriptname = this.config.subgamePanel.scriptName+hqq.app.pinpai;
        let nodename = path.substring(path.lastIndexOf('/') + 1)
        let subgamepanel = null;
        if(cc.isValid(cc.director.getScene())){
            subgamepanel = cc.director.getScene().getChildByName(nodename);
            
        }
        if(data){
            if(cc.isValid(subgamepanel)){
                subgamepanel.active = true;
            } else{
                this.showLayer(path, scriptname, data, this.publicalertIndex,false,hqq["hall_"+hqq.app.pinpai]);
            }
        } else{
            if(cc.isValid(subgamepanel)){
                subgamepanel.active = false;
            }
        }
    },
    showPeekCard(data){
        let path = this.config.peekCard.path
        let scriptname = this.config.peekCard.scriptName
        this.showLayer(path, scriptname, data, this.peekCardIndex,false,null,true)
    },

}