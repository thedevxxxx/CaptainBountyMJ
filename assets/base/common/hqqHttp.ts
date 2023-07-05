import * as cc from "cc";
export let hqqHttp = {
    m_remoteUrl: "",
    /**
     * @Description: 通用的XMLHttpRequest请求函数
     * method           方法
     * contenttype      Content-Type
     * urlto            地址
     * param            参数
     * callback         成功回调
     * failcallback     失败回调
     * needJsonParse    是否需要jsonparse返回值
     * timeout          超时
     * failtimeout      失败超时
     * async            要不要异步执行操作
     */
    sendXMLHttpRequest(mydata) {
        if (!mydata.urlto) {
            return cc.log("url 参数为空")
        }
        if (!mydata.method) {
            return cc.log("method 参数为空")
        }
        let url = mydata.urlto
        if (url.indexOf("http:") == -1 && url.indexOf("https:") == -1) {
            url = "http://" + url;
        }
        url = url.replace(/\s+/g, "");
        if (mydata.head) {
            url = mydata.head + url;
        }
        if (mydata.endurl) {
            url += mydata.endurl;
        }
        let xhr = new XMLHttpRequest();
        let hascall = false
        let timer = setTimeout(() => {
            if (mydata.failcallback) {
                let status = xhr.status;
                let readyState = xhr.readyState;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                mydata.failcallback(status, true, mydata.urlto, "setTimeout", readyState);
            } else {
                xhr.abort();
            }
            mydata = null;
        }, mydata.failtimeout ? mydata.failtimeout : 4000)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(timer);
                if (xhr.status >= 200 && xhr.status < 400) {
                    if (mydata.callback) {
                        if (mydata.needJsonParse) {
                            let responseText = xhr.responseText;
                            if (!responseText) {
                                if (mydata.failcallback) {
                                    mydata.failcallback(xhr.status, false, mydata.urlto, "responseText", xhr.readyState);
                                }
                            }
                            xhr.abort();
                            if (hascall) {
                                return
                            }
                            hascall = true
                            mydata.callback(JSON.parse(responseText), mydata.urlto);
                        } else {
                            let responseText = xhr.responseText;
                            if (!responseText) {
                                if (mydata.failcallback) {
                                    mydata.failcallback(xhr.status, false, mydata.urlto, "responseText", xhr.readyState);
                                }
                            }
                            xhr.abort();
                            if (hascall) {
                                return
                            }
                            hascall = true
                            mydata.callback(responseText, mydata.urlto);
                        }
                    }
                } else {
                    if (mydata.failcallback) {
                        let status = xhr.status;
                        let readyState = xhr.readyState;
                        xhr.abort();
                        if (hascall) {
                            return
                        }
                        hascall = true
                        mydata.failcallback(status, false, mydata.urlto, "statusout", readyState);
                    } else {
                        xhr.abort();
                    }
                }
            }
        }
        xhr.ontimeout = () => {
            if (mydata.failcallback) {
                let status = xhr.status;
                let readyState = xhr.readyState;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                mydata.failcallback(status, false, mydata.urlto, "ontimeout", readyState);
            } else {
                xhr.abort();
            }
        }
        xhr.onerror = () => {
            if (mydata.failcallback) {
                let status = xhr.status;
                let readyState = xhr.readyState;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                mydata.failcallback(status, false, mydata.urlto, "onerror", readyState);
            } else {
                xhr.abort();
            }
        }
        if (mydata.hasOwnProperty('async')) {
            xhr.open(mydata.method, encodeURI(url), mydata.async); // 初始化一个请求 针对特殊字符进行  encodeURIComponent 编码转换 
            if (mydata.async) {
                xhr.timeout = mydata.timeout ? mydata.timeout : 3000 // 超时 xhr.readyState = 4，调用failcallback
            }
        } else {
            xhr.timeout = mydata.timeout ? mydata.timeout : 3000 // 超时 xhr.readyState = 4，调用failcallback
            xhr.open(mydata.method, encodeURI(url), true); // 初始化一个请求 针对特殊字符进行  encodeURIComponent 编码转换 
        }
        if (mydata.contenttype) {
            xhr.setRequestHeader("Content-Type", mydata.contenttype);
        } else {
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
        }
        var str = ''
        if (typeof mydata.param == 'object') {
            for (const key in mydata.param) {
                str += `${key}=${mydata.param[key]}&`
            }
            str = str.slice(0, -1)
        } else {
            str = mydata.param
        }
        xhr.send(mydata.param ? str : null); // 发送请求，默认是异步请求，请求发送后立刻返回
        return xhr
    },
    /**
     * @Description: 通用的XMLHttpRequest请求函数
     * method           方法
     * contenttype      Content-Type
     * urlto            地址
     * param            参数
     * callback         成功回调
     * failcallback     失败回调
     * needJsonParse    是否需要jsonparse返回值
     * timeout          超时
     * failtimeout      失败超时
     * async            要不要异步执行操作
     * index            索引值
     */
    sendXMLHttpRequest2(mydata) {
        return new Promise((resolve,reject)=>{
            if (!mydata.urlto) {
                cc.log("url 参数为空");
                reject([0, false, mydata.urlto, "url 参数为空", 0,mydata.index]);
                return;
            }
            if (!mydata.method) {
                cc.log("method 参数为空");
                reject([0, false, mydata.urlto, "method 参数为空", 0,mydata.index]);
                return;
            }
            let url = mydata.urlto
            if (url.indexOf("http:") == -1 && url.indexOf("https:") == -1) {
                url = "http://" + url;
            }
            url = url.replace(/\s+/g, "");
            if (mydata.head) {
                url = mydata.head + url;
            }
            if (mydata.endurl) {
                url += mydata.endurl;
            }
            let xhr = new XMLHttpRequest();
            let hascall = false
            let timer = setTimeout(() => {
                console.log("============== timer setTimeout")
                let status = xhr.status;
                let readyState = xhr.readyState;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                reject([status, true, mydata.urlto, "setTimeout", readyState,mydata.index]);
                mydata = null;
            }, mydata.failtimeout ? mydata.failtimeout : 4000)
            xhr.onreadystatechange = ()=> {
                console.log("============== onreadystatechange xhr.readyState=",xhr.readyState)
                if (xhr.readyState == 4) {
                    clearTimeout(timer);
                    console.log("============== onreadystatechange 11111111")
                    if (xhr.status >= 200 && xhr.status < 400) {
                        console.log("============== onreadystatechange 2222222")
                        if (mydata.needJsonParse) {
                            console.log("============== onreadystatechange 33333")
                            let responseText = xhr.responseText;
                            if (!responseText) {
                                console.log("============== onreadystatechange 444444")
                                xhr.abort();
                                reject([xhr.status, false, mydata.urlto, "responseText", xhr.readyState,mydata.index]);
                                return;
                            }
                            console.log("============== onreadystatechange 5555555")
                            xhr.abort();
                            if (hascall) {
                                console.log("============== onreadystatechange 6666666")
                                return;
                            }
                            hascall = true;
                            console.log("============== onreadystatechange 7777777")
                            resolve([JSON.parse(responseText), mydata.urlto,mydata.index])
                        } else {
                            console.log("============== onreadystatechange 88888888")
                            let responseText = xhr.responseText;
                            if (!responseText) {
                                console.log("============== onreadystatechange 9999999")
                                xhr.abort();
                                reject([xhr.status, false, mydata.urlto, "responseText", xhr.readyState,mydata.index]);
                                return;
                            }
                            xhr.abort();
                            if (hascall) {
                                return
                            }
                            hascall = true
                            console.log("============== onreadystatechange aaaaaa")
                            resolve([responseText, mydata.urlto,mydata.index]);
                        }
                    } else {
                        console.log("============== onreadystatechange bbbbbbb")
                        let status = xhr.status;
                        let readyState = xhr.readyState;
                        xhr.abort();
                        if (hascall) {
                            console.log("============== onreadystatechange cccccc")
                            return
                        }
                        hascall = true
                        console.log("============== onreadystatechange dddddd")
                        reject([status, false, mydata.urlto, "statusout", readyState,mydata.index]);
                    }
                }
            }
            xhr.ontimeout = () => {
                console.log("============== ontimeout")
                let status = xhr.status;
                let readyState = xhr.readyState;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                reject([status, false, mydata.urlto, "ontimeout", readyState,mydata.index]);
            }
            xhr.onerror = () => {
                console.log("============== onerror")
                let status = xhr.status;
                let readyState = xhr.readyState;
                xhr.abort();
                if (hascall) {
                    return
                }
                hascall = true
                reject([status, false, mydata.urlto, "onerror", readyState,mydata.index]);
            }
            if (mydata.hasOwnProperty('async')) {
                xhr.open(mydata.method, encodeURI(url), mydata.async); // 初始化一个请求 针对特殊字符进行  encodeURIComponent 编码转换 
                if (mydata.async) {
                    xhr.timeout = mydata.timeout ? mydata.timeout : 3000 // 超时 xhr.readyState = 4，调用failcallback
                }
            } else {
                xhr.timeout = mydata.timeout ? mydata.timeout : 3000 // 超时 xhr.readyState = 4，调用failcallback
                xhr.open(mydata.method, encodeURI(url), true); // 初始化一个请求 针对特殊字符进行  encodeURIComponent 编码转换 
            }
            if (mydata.contenttype) {
                xhr.setRequestHeader("Content-Type", mydata.contenttype);
            } else {
                xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
            }
            var str = ''
            if (typeof mydata.param == 'object') {
                for (const key in mydata.param) {
                    str += `${key}=${mydata.param[key]}&`
                }
                str = str.slice(0, -1)
            } else {
                str = mydata.param
            }
            xhr.send(mydata.param ? str : null); // 发送请求，默认是异步请求，请求发送后立刻返回
        })
    },
    /**
     * @Description: ip方式get请求
     */
    sendRequestIpGet(urlto, endurl, callback, failcallback) {
        let data = {
            method: 'GET',
            urlto: urlto,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: false,
        }
        this.sendXMLHttpRequest(data);
    },
    /**
     * @Description: 发送日志
     */
    sendRequestLogPost(urlto, param, filepath, callBack) {
        let xhr = new XMLHttpRequest();
        let m_url = urlto;
        if (urlto.indexOf("http:") == -1 && urlto.indexOf("https:") == -1) {
            m_url = "http://" + urlto
        }
        xhr.open("POST", m_url, true); // 初始化一个请求
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    xhr.abort()
                    callBack && callBack(true, filepath)
                } else {
                    callBack && callBack(false, null, "status:" + xhr.status)
                    xhr.abort()
                }
            }
        }
        xhr.ontimeout = () => {
            xhr.abort();
            callBack && callBack(false, null, "ontimeout")
        }
        xhr.onerror = () => {
            xhr.abort();
            callBack && callBack(false, null, "onerror")
        }
        let str = '';
        xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
        for (const key in param) {
            str += `${key}=${encodeURIComponent(param[key])}&`
        }
        str = str.slice(0, -1)
        xhr.timeout = 7000
        xhr.send(str); // 发送请求，默认是异步请求，请求发送后立刻返回
    },
    /** 单线线路选择
     * @param {array} urllist url列表
     * @param {string} head url前缀
     * @param {string} endurl url尾缀
     * @param {function} callback 回调函数
     * @param {function} merrcallback 失败回调函数
     */
    requestFastestUrlLine2(data) {
        if (!data.urllist) {
            return cc.log("请配置http列表地址")
        }
        let checknum = 0;
        // let hasreceive = false;
        let needJsonParse = data.needJsonParse;
        
        let tempurllist:Array<string> = [];
        let i = 0;
        for(i = 0; i < data.urllist.length;i++){
            tempurllist.push(data.urllist[i]);
        }
        let racelist = [];
        let racelimit = 6;
        let racemaxcount = Math.floor(tempurllist.length/racelimit);
        console.log("tempurllist=",tempurllist)
        for( i = 0; i < racemaxcount;i++){
            console.log("i=",i," i*racelimit=",i*racelimit," ((i+1)*racelimit)-1=",((i+1)*racelimit)-1)
            let urllist = tempurllist.splice(i*racelimit,((i+1)*racelimit)-1);
            const promises = urllist.map((url, index) =>
                this.sendXMLHttpRequest2({
                    method: 'GET',
                    urlto: url,
                    head: data.head,
                    endurl: data.endurl,
                    needJsonParse: needJsonParse,
                    timeout: data.timeout,
                    failtimeout: data.failtimeout,
                    index:index+(i*racelimit),
                })
            );
            let hasreceive = false;
            racelist.push( 
                Promise.race(promises)
                    .then(([responseText, urlto, index]) => {
                        if (!hasreceive && urlto) {
                            hasreceive = true;
                            data.callback && data.callback(responseText, urlto, index)
                        }

                        console.log(`racelist Request ${index} succeeded first responseText=`,responseText, " urlto=",urlto, " data.urllist=",data.urllist ," hasreceive=",hasreceive);

                        // Handle the response here
                    }))
        }
        i = null;
        // let urllist1 = tempurllist.splice(0,Math.floor(tempurllist.length/2))
        // let urllist2 = tempurllist.splice(Math.floor(tempurllist.length/2))
        
        // const promises1 = urllist1.map((url, index) =>
        //         this.sendXMLHttpRequest2({
        //             method: 'GET',
        //             urlto: url,
        //             head: data.head,
        //             endurl: data.endurl,
        //             needJsonParse: needJsonParse,
        //             timeout: data.timeout,
        //             failtimeout: data.failtimeout,
        //             index:index,
        //         })
        //     );

        // const promises2 = urllist2.map((url, index) =>
        //     this.sendXMLHttpRequest2({
        //         method: 'GET',
        //         urlto: url,
        //         head: data.head,
        //         endurl: data.endurl,
        //         needJsonParse: needJsonParse,
        //         timeout: data.timeout,
        //         failtimeout: data.failtimeout,
        //         index:index,
        //     })
        // );

        // let race1 = Promise.race(promises1)
        // .then(([responseText, urlto, index]) => {
        //     if (!hasreceive && urlto) {
        //         hasreceive = true;
        //         data.callback && data.callback(responseText, urlto, index)
        //     }

        //     console.log(`race1 Request ${index + 1} succeeded first responseText=`,responseText);

        //     // Handle the response here
        // })
        
        // let race2 = Promise.race(promises2)
        // .then(([responseText, urlto, index]) => {
        //     if (!hasreceive && urlto) {
        //         hasreceive = true;
        //         data.callback && data.callback(responseText, urlto, index);
        //     }

        //     console.log(`race2 Request ${index + 1} succeeded first responseText=`,responseText);

        //     // Handle the response here
        // })
        
        Promise.allSettled(racelist)
        .then((Rusults)=>{
            let allfailed = true;
            let resultdata = [0,false,"","",0,0];
            Rusults.forEach(result=>{
                console.log("-----------------result=",result);
                if(result.status != "rejected"){
                    allfailed = false;
                } else{
                    resultdata[0] = result.reason[0];
                    resultdata[1] = result.reason[1];
                    resultdata[2] = result.reason[2];
                    resultdata[3] = result.reason[3];
                    resultdata[4] = result.reason[4];
                    resultdata[5] = result.reason[5];
                }
            })
            console.log("-------------allfailed=",allfailed)
            if(allfailed){
                data.failcallback && data.failcallback(resultdata[0],resultdata[1],[2],resultdata[3],resultdata[4],resultdata[5]);
            }
        })
    },
    /** 单线线路选择
     * @param {array} urllist url列表
     * @param {string} head url前缀
     * @param {string} endurl url尾缀
     * @param {function} callback 回调函数
     * @param {function} merrcallback 失败回调函数
     */
    requestFastestUrlLine(data) {
        if (!data.urllist) {
            return cc.log("请配置http列表地址")
        }
        let checknum = 0;
        let hasreceive = false;
        let callback = (responseText, urlto, checknum) => {
            if (!hasreceive && urlto) {
                hasreceive = true;
                data.callback && data.callback(responseText, urlto, checknum)
            }
        }
        let needJsonParse = data.needJsonParse
        let errcallback = (status, forcejump, url, err) => {
            // cc.log("请求失败", checknum, data.urllist.length, data.urllist[checknum])
            checknum++
            if (data.tipcallback) {
                data.tipcallback(checknum)
            }
            if (hasreceive) {
                return
            }
            if (checknum < data.urllist.length) {
                this.sendXMLHttpRequest({
                    method: 'GET',
                    urlto: data.urllist[checknum],
                    head: data.head,
                    endurl: data.endurl,
                    callback: callback,
                    needJsonParse: needJsonParse,
                    failcallback: errcallback,
                    timeout: data.timeout,
                    failtimeout: data.failtimeout,
                })
            } else {
                data.failcallback && data.failcallback(status, forcejump, url, err)
            }
        }
        this.sendXMLHttpRequest({
            method: 'GET',
            urlto: data.urllist[checknum],
            head: data.head,
            endurl: data.endurl,
            callback: callback,
            needJsonParse: needJsonParse,
            failcallback: errcallback,
            timeout: data.timeout,
            failtimeout: data.failtimeout,
        })
    },
    canTestStable: true,
    stopRequestStableUrlLine() {
        this.canTestStable = false
    },
    /**
     * @Description: 线路恒定检测
     */
    requestStableUrlLine(data) {
        this.canTestStable = true
        let checknum = 0;
        let interval = 300000;
        let callback = (returnList, url, isserver) => {
            if (!this.canTestStable) {
                return
            }
            let choiceob = JSON.parse(JSON.stringify(returnList.serverList))
            if (choiceob.length < 4) {
                choiceob = choiceob.slice(0, choiceob.length < 4 ? choiceob.length : 4)
            }
            choiceob.sort(function (a, b) { // 平均时间排序
                if (b.averageTime == 0) {
                    return 1
                } else if (a.averageTime == 0) {
                    return -1
                } else {
                    return a.averageTime - b.averageTime
                }
            })
            returnList.stable = choiceob[0]
            data.callback && data.callback(returnList, choiceob[0].index, isserver)
            checknum++
            for (let k = 0; k < returnList.serverList.length; k++) {
                if (returnList.serverList[k].status == 0) {
                    this.sendrequestStableUrlLine(returnList, checknum, callback, isserver)
                    return // 有线路没有测完
                }
            }
            for (let k = 0; k < returnList.serverList.length; k++) {
                returnList.serverList[k].status = 0
            }
            checknum = 0;
            if (isserver) {
                isserver = !isserver
                this.sendrequestStableUrlLine(data.hotserverList, checknum, callback, isserver)
            } else {
                isserver = !isserver
                setTimeout(() => {
                    this.sendrequestStableUrlLine(data.storageList, checknum, callback, isserver)
                }, interval)
            }
        }
        this.sendrequestStableUrlLine(data.storageList, checknum, callback, true)
    },
    sendrequestStableUrlLine(data, checknum, callback, isserver) {
        let xhr = new XMLHttpRequest()
        xhr.timeout = 3000
        if(data.serverList[checknum]){
            data.serverList[checknum].testnum++
            let timestart
            let info = ""
            xhr.onloadstart = () => {
                info += "xhr.onloadstart  xhr.readyState =" + xhr.readyState + " xhr.status =" + xhr.status
                timestart = Date.now()
            }
            xhr.ontimeout = () => {
                info += "xhr.ontimeout  xhr.readyState =" + xhr.readyState + " xhr.status =" + xhr.status
                let spendtime = 3000
                data.serverList[checknum].averageTime += spendtime
                if (data.serverList[checknum].averageTime > 10000) {
                    data.serverList[checknum].averageTime = 10000
                }
                data.serverList[checknum].status = 1
                data.serverList[checknum].lastTime = spendtime
                data.serverList[checknum].info = info
                xhr.abort()
                callback(data, data.serverList[checknum].url, isserver)
            }
            xhr.onerror = () => {
                info += "xhr.onerror  xhr.readyState =" + xhr.readyState + " xhr.status =" + xhr.status
                let spendtime = 3000
                data.serverList[checknum].averageTime += spendtime
                if (data.serverList[checknum].averageTime > 10000) {
                    data.serverList[checknum].averageTime = 10000
                }
                data.serverList[checknum].status = 1
                data.serverList[checknum].lastTime = spendtime
                data.serverList[checknum].info = info
                xhr.abort()
                callback(data, data.serverList[checknum].url, isserver)
            }
            xhr.onload = () => {
                info += "xhr.onload  xhr.readyState =" + xhr.readyState + " xhr.status =" + xhr.status
                let spendtime = Date.now() - timestart
                let at = data.serverList[checknum].averageTime
                // data.serverList[checknum].averageTime = at > spendtime ? (0.6 * at) : spendtime
                if (spendtime < at && spendtime < (0.6 * at)) {
                    data.serverList[checknum].averageTime = (0.6 * at);
                } else {
                    data.serverList[checknum].averageTime = spendtime;
                }
                data.serverList[checknum].status = 1
                data.serverList[checknum].lastTime = spendtime
                data.serverList[checknum].info = info
                xhr.abort()
                callback(data, data.serverList[checknum].url, isserver)
            }
            let randnum = Math.floor(Math.random() * 1000000)
            if (isserver) {
                let url = data.serverList[checknum].url + "/checked?" + randnum
                // console.log("url", url)
                // xhr.open("GET", url, true);
                // xhr.send();
                xhr.open("POST", url, true);
                xhr.send("key=" + randnum);
            } else {
                let url = data.serverList[checknum].url + "/" + hqq.app.hotupdatePath + "/" + 'version.json?' + randnum
                // console.log("url", url)
                xhr.open("GET", url, true);
                xhr.send();
            }
        }
    },
    canTest: true,
    stopTestLint() {
        this.canTest = false
    },
    testLine(urllist, callback, maxTask, maxTime) {
        this.canTest = true
        maxTask = maxTask || 1
        maxTime = maxTime || 3000
        let testindex = 0
        let mycallback = (url, index, spendtime, err) => {
            callback(url, index, spendtime, err)
            if (testindex < urllist.length && this.canTest) {
                this._testLine(urllist[testindex], testindex, mycallback, maxTime)
                testindex++
            } else {
                // 结束
            }
        }
        for (let i = 0; i < maxTask; i++) {
            if (testindex < urllist.length && this.canTest) {
                this._testLine(urllist[testindex], testindex, mycallback, maxTime)
                testindex++
            }
        }
    },
    _fetchTestList(url, testindex, callback, maxTime) {
        let timestart = Date.now()
        let controller = new AbortController();
        let signal = controller.signal;
        let timeoutPromise = (timeout) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(new Response("timeout", { status: 504, statusText: "timeout " }));
                    controller.abort();
                }, timeout);
            });
        }
        let requestPromise = (url) => {
            return fetch(url, {
                signal: signal
            });
        };
        Promise.race([timeoutPromise(maxTime), requestPromise(url)])
            .then((resp:Response) => {
                return resp.json()
            })
            .then(resp => {
                let spendtime = Date.now() - timestart
                callback(url, testindex, spendtime)
            })
            .catch(error => {
                // cc.log("error", error);
                callback(url, testindex, maxTime, error)
            });
    },
    _testLine(url, testindex, callback, maxTime) {
        let xhr = new XMLHttpRequest()
        xhr.timeout = maxTime
        let timestart = Date.now()
        xhr.ontimeout = () => {
            let spendtime = Date.now() - timestart
            callback(url, testindex, spendtime, "ontimeout")
            xhr.abort()
        }
        xhr.onerror = () => {
            let spendtime = Date.now() - timestart
            callback(url, testindex, spendtime, "onerror")
            xhr.abort()
        }
        xhr.onload = () => {
            let spendtime = Date.now() - timestart
            callback(url, testindex, spendtime)
            xhr.abort()
        }
        xhr.open("GET", url, true);
        xhr.send();
    },

    getRes(url, callback, failcallback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.timeout = 5000
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            if (xhr.status == 200) {
                callback(xhr.response)
                xhr.abort()
            }
        }
        xhr.ontimeout = () => {
            failcallback()
            xhr.abort()
        }
        xhr.onerror = () => {
            failcallback()
            xhr.abort()
        }
        xhr.send();
    }
}
