import * as cc from "cc";
declare global {
	export interface netStateInterface{
		outstanding: number,
		good: number,
		kind: number,
		bad: number,
	}
	
	export interface officialWebsiteInterface{
		test:string,
		debi:string,
		xingba:string,
		yuyu:string,
		xinsheng:string
	}
	
	export interface GeneralAgencyInfoInterface{
		dev:number;
		pre:number;
		online:number;
	}
	export interface GeneralAgencyInterface{
		/**
		 * 是否从java代码中获得代理信息
		 */
		isgetFromJava:boolean;
	
		/** 
		 * 特斯特
		*/
		test:GeneralAgencyInfoInterface;
		
		/** 
		 * 德比
		*/
		debi:GeneralAgencyInfoInterface;
		
		/** 
		 * 七宝
		*/
		qibao:GeneralAgencyInfoInterface;
		
		/**
		 * 杏吧娱乐
		 */
		xingba:GeneralAgencyInfoInterface;
		
		/** 
		 * 渔鱼游戏
		 */
		yuyu:GeneralAgencyInfoInterface;
		
		/** 
		 * 新盛更名为大喜发
		 */
		xinsheng:GeneralAgencyInfoInterface;
		
		/** 
		 * 新贵
		 */
		xingui:GeneralAgencyInfoInterface;
		
		/** 
		 * 富鑫
		 */
		fuxin:GeneralAgencyInfoInterface;
		
		/** 
		 * 新豪
		 */
		xinhao:GeneralAgencyInfoInterface;
		
		/** 
		 * 新隆
		 */
		xinlong:GeneralAgencyInfoInterface;
		
		/** 
		 * 91游戏
		 */
		nineone:GeneralAgencyInfoInterface;
		
		/**
		 * 皇室游戏
		 */
		huangshi:GeneralAgencyInfoInterface;
		
		/**
		 * 聚鼎娱乐
		 */
		juding:GeneralAgencyInfoInterface;
		
		/**
		 * 华兴娱乐
		 */
		huaxing:GeneralAgencyInfoInterface;
		
		/**
		 * 92游戏
		 */
		ninetwo:GeneralAgencyInfoInterface;
		
		/**
		 * 天启
		 */
		tianqi:GeneralAgencyInfoInterface;
		
		/**
		 * 超凡娱乐
		 */
		chaofan:GeneralAgencyInfoInterface;
		
		/**
		 * 万盛娱乐
		 */
		wansheng:GeneralAgencyInfoInterface;
		
		/**
		 * 嘉兴娱乐
		 */
		jiaxing:GeneralAgencyInfoInterface;
		
		/**
		 * 51游戏
		 */
		fiveone:GeneralAgencyInfoInterface;
		
		/**
		 * 乐天游戏
		 */
		letian:GeneralAgencyInfoInterface;
		
		/**
		 * B2B--杏耀娱乐
		 */
		xingyao:GeneralAgencyInfoInterface;
		
		/**
		 * 特兔游戏
		 */
		tetu:GeneralAgencyInfoInterface;
		
		/**
		 * 93游戏
		 */
		ninethree:GeneralAgencyInfoInterface;
		
		/**
		 * B2B--摩登娱乐
		 */
		modeng:GeneralAgencyInfoInterface;
		
		/**
		 * B2B--杏彩娱乐
		 */
		xingcai:GeneralAgencyInfoInterface;
		
		/**
		 * B2B--杏吧游戏
		 */
		xingbyx:GeneralAgencyInfoInterface;
		
		/**
		 * 蓝天游戏
		 */
		lantian:GeneralAgencyInfoInterface;
		
		/**
		 * B2B--KGAME
		 */
		kgame:GeneralAgencyInfoInterface;
		
		/**
		 * 冠赢国际娱乐
		 */
		guanying:GeneralAgencyInfoInterface;
		
		/**
		 * B2B--金杯游戏
		 */
		jinbei:GeneralAgencyInfoInterface;
		
		/** */
		quyou:GeneralAgencyInfoInterface;
		
		/**
		 * 金马娱乐(信用盘）
		 */
		jinma:GeneralAgencyInfoInterface;
	
		/**
		 * 葡胜（俱乐部模式）
		 */
		pusheng:GeneralAgencyInfoInterface;
	
		 /**
		 * 新银河（包网模式）
		 */
		xinyinhe:GeneralAgencyInfoInterface;
	
		/**
		 * 富彩娱乐--信用盘
		 */
		fucaiyule:GeneralAgencyInfoInterface;

		/**
		 * 云顶娱乐城--信用盘
		 */
		yunding:GeneralAgencyInfoInterface;

		/**
		 * 富旺--信用盘
		 */
		fuwang:GeneralAgencyInfoInterface;

		/**
		 * 富汇--信用盘
		 */
		fuhui:GeneralAgencyInfoInterface;

		/**
		 * 星星娱乐--信用盘
		 */
		xingxing:GeneralAgencyInfoInterface;

		/**
		 * B2B--TGGROUP
		 */
		tggroup:GeneralAgencyInfoInterface;

		/**
		 * niuwang(俱乐部—牛王俱乐部)
		 */
		niuwang:GeneralAgencyInfoInterface;

		/**
		 * bos(B2B-BOS)
		 */
		bos:GeneralAgencyInfoInterface;

		/**
		 * bos(B2B-KING)
		 */
		king:GeneralAgencyInfoInterface;
	}
	
	export interface platforminfoInterface{
		app_down_url:string;
		app_version:string;
		hall_down_url:string;
		hall_version:string;
		house_down_url:string;
		house_version:string;
		im_down_url:string;
		im_version:string;
		package_name:string;
		pay_down_url:string;
		pay_version:string;
		proxy_down_url:string;
		proxy_version:string;
		update_desc:string;
		update_title:string;
	}
	export interface remoteServerinfoInterface{
		android:platforminfoInterface; 
		default_proxy_user_id:number;
		desktop:platforminfoInterface;
		entry_host:string;
		get_game_list:string;
		get_online_code:string;
		id:number; 
		im_host:string;
		ios:platforminfoInterface
		jump_host:string;
		name:string;
		pay_host:string;
		proxy_host:string;
		server_host:string;
		source_host:string;
		temp_host:string;
		_id:string;
	}
	export interface remoteGameDataInterface{
		canvas:string;
		dev_id:number;
		down_canvas:string;
		down_webgl:string;
		game_host:string
		game_id:string;
		game_img:string;
		game_name:string;
		height:string;
		open:number;
		package_id:number;
		sort:number;
		tag:number;
		type:number;
		version:string;
		web_down_webgl:string;
		web_game_img:string;
		webgl:string;
		width:string;
		_id:string;
	}
	export interface versionInterface{
		hall:string,
		hall_test:string,
		hall_fuxin:string,
		hall_xingui:string,
		hall_xinsheng:string,
		hall_xinlong:string,
		hall_juding:string,
		hall_huaxing:string,
		hall_ninetwo:string,
		hall_chaofan:string,
		hall_wansheng:string,
		hall_debi:string,
		hall_jiaxing:string,
		hall_letian:string,
		hall_fiveone:string,
		hall_ninethree:string,
		hall_lantian:string,
		hall_guanying:string,
		hall_quyou:string,
		pay_test:string,
		pay_fuxin:string,
		pay_xingui:string,
		pay_xinsheng:string,
		pay_tianqi:string,
		pay_juding:string,
		pay_huaxing:string,
		pay_ninetwo:string,
		pay_wansheng:string,
		pay_jiaxing:string,
		pay_jincheng:string,
		pay_fiveone:string,
		pay_letian:string,
		pay_ninethree:string,
		pay_quyou:string,
		proxy_fuxin:string,
		proxy_huangshi:string,
		proxy_huaxing:string,
		proxy_juding:string,
		proxy_nineone:string,
		proxy_ninetwo:string,
		proxy_test:string,
		proxy_xingba:string,
		proxy_xingui:string,
		proxy_xinhao:string,
		proxy_xinlong:string,
		proxy_xinsheng:string,
		proxy_tianqi:string,
		proxy_chaofan:string,
		proxy_wansheng:string,
		proxy_jiaxing:string,
		proxy_debi:string,
		proxy_fiveone:string,
		proxy_letian:string,
		proxy_ninethree:string,
		proxy_quyou:string,
		IM_test:string,
		bcbm:string,
		bjl:string,
		brnn:string,
		ddz:string,
		ebg:string,
		hbld:string,
		hbsl:string,
		hh:string,
		hwby:string,
		jbpby:string,
		lhd:string,
		lp:string,
		pdk:string,
		pccp:string,
		qznn:string,
		sgj:string,
		sss:string,
		zjh:string,
		zrsx:string,
		"21d":string,
		dzpk:string,
		ermj:string,
		shaibao:string,
		sbty:string,
		cyqp:string,
		cbzb:string,
		ygxb:string,
		szwg:string,
		caishendao:string,
		suoha:string,
		duofuduocai:string,
		cylhd:string,
		cdx:string,
		ag:string,
		cq9:string,
		fkxw:string,
		pt:string,
		jdb:string,
		pg:string,
		pg2:string,
		fctbj:string,
		zhibo:string,
		mg:string,
		szffc:string,
		qt:string,
		ppdz:string,
		sanshengtiyu:string,
		pq:string,
		od:string,
		mjhl:string,
		jingdiandoudizhu:string,
		wanrenpanshi:string,
		pengpengche:string,
		bairenlonghu:string,
		tuitongzi:string,
		yingsanzhang:string,
		huanlesanshimiao:string,
		shisanzhang:string,
		wurenniuniu:string,
		liangrenmajiang:string,
		dezhoujulebu:string,
		dougongniu:string,
		sangongdachixiao:string,
		qilainiu:string;
	}
	export interface reginIpDataInterface{
		status:string,
		country:string,
		countryCode:string,
		region:string,
		regionName:string,
		city:string,
		zip:string,
		lat:number,
		lon:number,
		timezone:string,
		isp:string,
		org:string,
		as:string,
		query:string
	}
	
	export interface reginIpData2Interface{
		ip:string,
		hostname:string,
		city:string,
		region:string,
		country:string,
		loc:string,
		org:string,
		postal:string,
		timezone:string,
		readme:string;
	}
	
	export interface packagInfoInterface{
		/**
		 * 是否是版本发布状态
		 */
		pinpai:string,
		huanjin:string,
		system:string,
		version:string,
		proxyid:string,
		language:string,
		country:string,
		currency:string,
		engine_version:string
	}
	export interface appGlobalInterface{
		/**
		 * 是否是版本发布状态
		 */
		isRelease:boolean;
	
		/**
		 * 渠道 test （特斯特） fuxin(富鑫) xingui (新贵)
		 * debi （德比） qibao （七宝） xingba （杏吧娱乐）
		 * yuyu （渔鱼游戏） nineone （91游戏） xinsheng （新盛更名为大喜发）
		 * xinhao (新豪) xinlong(新隆) huangshi(皇室游戏) juding(聚鼎娱乐)
		 * huaxing(华兴娱乐) ninetwo(92游戏) tianqi(天启) chaofan(超凡娱乐)
		 * wansheng(万盛娱乐) jiaxing(嘉兴娱乐) tetu(特兔游戏) fiveone(51游戏)
		 * letian(乐天游戏)  xingyao(B2B--杏耀娱乐) ninethree(93游戏)
		 * modeng(B2B--摩登娱乐) xingcai(B2B--杏彩娱乐) xingbyx(B2B--杏吧游戏)
		 * lantian(蓝天游戏) kgame guanying(冠贏國際) jinbei(B2B--金杯游戏) 
		 * quyou(趣游（俱乐部模式）) jinma(金马娱乐(信用盘）) pusheng(葡胜（俱乐部模式）)
		 * fucaiyule(富彩娱乐--信用盘) yunding(云顶娱乐城--信用盘) fuwang(富旺--信用盘)
		 * fuhui (富汇--信用盘) xingxing(星星娱乐--信用盘) tggroup(B2B--TGGROUP)
		 * niuwang(俱乐部—牛王俱乐部)
		 */
		pinpai:string;
	
		/**
		 * 环境(dev pre online)
		 */
		huanjin:string;
	
		/**
		 *  账号
		 */
		account_name?:string|null,
		
		/**
		 * 密码
		 */
		account_pass?:string|null,
	
		/**
		 * 装置ＩＤ
		 */
		deviceID:string;
	
		/**
		 * 平台 android ios
		 */
		os:string;
	
		/**
		 * 密码本
		 */
		secretlist:Array<string>;
	
		/**
		 * APK版本 LocalStorage紀錄的ＫＥＹ值
		 */
		apkVersionKey:string;
	
		/**
		 * APK版本
		 */
		apkVersion:string;
	
		/**
		 * 热更新版本 LocalStorage紀錄的ＫＥＹ值
		 */
		versionKey:string;
	
		/**
		 * 热更新版本
		 */
		version:string;
	
		/** 
		 * 基础包版号
		*/
		hallVersion:string;
	
		/**
		 * 密码本 LocalStorage紀錄的ＫＥＹ值
		 */
		secretBookKey:string;
	
		/**
		 * 密码本
		 */
		secretBook:string;
	
		/**
		 * 转接服务器 LocalStorage紀錄的ＫＥＹ值
		 */
		selectServerListKey:string;
	
		/**
		 * 转接服务器
		 */
		selectServerList:number;
	
		/**
		 * 转接服务器索引 LocalStorage紀錄的ＫＥＹ值
		 */
		selectServerIndexKey:string;
	
		/**
		 * 转接服务器索引
		 */
		selectServerIndex:number;
	
		/**
		 * 长连接服务器列表 LocalStorage紀錄的ＫＥＹ值
		 */
		serverListKey:string;
	
		/**
		 * 长连接服务器列表
		 */
		serverList:Array<string>;
	
		/**
		 * 长连接服务器 LocalStorage紀錄的ＫＥＹ值
		 */
		serverKey:string;
	
		/**
		 * 长连接服务器
		 */
		server:string;
	
		/**
		 * 长连接服务器索引 LocalStorage紀錄的ＫＥＹ值
		 */
		serverIndexKey:string;
	
		/**
		 * 长连接服务器索引
		 */
		serverIndex:number;
	
		/**
		 * 热更服务器列表 LocalStorage紀錄的ＫＥＹ值
		 */
		hotServerListKey:string;
	
		/**
		 * 热更服务器列表
		 */
		hotServerList:string;
	
		/**
		 * 热更服务器 LocalStorage紀錄的ＫＥＹ值
		 */
		hotServerKey:string;
	
		/**
		 * 热更服务器
		 */
		hotServer:Array<string>;
	
		/**
		 * 热更服务器 LocalStorage紀錄的ＫＥＹ值
		 */
		canHotServerKey:string;
	
		/**
		 * 热更服务器
		 */
		canHotServer:string;
	
		/**
		 * 热更服务器列表索引 LocalStorage紀錄的ＫＥＹ值
		 */
		hotServerIndexKey:string;
	
		/**
		 * 热更服务器列表索引
		 */
		hotServerIndex:number;
	
		/**
		 * temp服务器列表索引 LocalStorage紀錄的ＫＥＹ值
		 */
		tempServerIndexKey:string;
	
		/**
		 * temp服务器列表索引
		 */
		tempServerIndex:number;
	
		/**
		 * 充提服务器列表索引 LocalStorage紀錄的ＫＥＹ值
		 */
		payServerIndexKey:string;
	
		/**
		 * 充提服务器列表索引
		 */
		payServerIndex:number;
	
		/**
		 * 恒定检测热更服务器列表 LocalStorage紀錄的ＫＥＹ值
		 */
		stableServerListKey:string;
	
		/**
		  * 恒定检测热更服务器列表
		  */
		stableServerList:string;
	
		/**
		 * 恒定检测热更服务器列表 LocalStorage紀錄的ＫＥＹ值
		 */
		stableHotServerListKey:string;
	
		/**
		 * 恒定检测热更服务器列表
		 */
		stableHotServerList:string;
	
		/**
		 * 公告已读 LocalStorage紀錄的ＫＥＹ值
		 */
		noticeKey:string;
	
		/**
		 * 公告删除 LocalStorage紀錄的ＫＥＹ值
		 */
		noticeDeleteKey:string;
	
		/**
		 * 邮件已读 LocalStorage紀錄的ＫＥＹ值
		 */
		emailKey:string;
	
		/**
		 * 邮件删除 LocalStorage紀錄的ＫＥＹ值
		 */
		emailDeleteKey:string;
	
		/**
		 * 注册ip信息 LocalStorage紀錄的ＫＥＹ值
		 */
		reginIpDataKey:string;
	
		/**
		 * 注册ip信息
		 */
		reginIpData:reginIpDataInterface;
	
		/**
		 * 注册ip信息2 LocalStorage紀錄的ＫＥＹ值
		 */
		reginIpData2Key:string;
	
		/**
		 * 注册ip信息2
		 */
		 reginIpData2:reginIpData2Interface;
	
		/**
		 * 包名
		 */
		packgeName:string;
	
		/**
		 * 热更服务器下的资源路径
		 */
		hotupdatePath:string;
	
		 /**
		 * 包名
		 */
		remotePath:string;
	
		/**
		 * 包名
		 */
		 remoteGetSeverInfo:string;
	
		 /**
		 * 包名
		 */
		remoteGetGameList:string;
	
		/**
		 * 包名
		 */
		 remoteToken:string;
	
		/**
		 * 远程后端资讯 LocalStorage紀錄的ＫＥＹ值
		 */
		remoteSeverinfoKey:string;
	
		/**
		 * 远程后端资讯
		 */
		remoteSeverinfo:remoteServerinfoInterface;
	
		/**
		 * 远程后端资讯 LocalStorage紀錄的ＫＥＹ值
		 */
		remoteGamelistKey:string;
	
		/**
		  * 远程后端资讯
		  */
		remoteGamelist:Array<remoteGameDataInterface>;
	
		/**
		 * 剪贴板
		 */
		clipboard:string;
	
		/**
		 * 代理档位
		 */
		unique_id:string;
	
		/**
		 * 官网
		 */
		 officialWebsite:officialWebsiteInterface;
	
		/**
		 * 总代
		 */
		GeneralAgency:GeneralAgencyInterface;
	
		/**
		 * version.json
		 */
		versionJson:Object;
	
		/**
		 * version.json 中的version部分
		 */
		subGameVersion:versionInterface;
	
		/**
		 * 代理id
		 */
		proxyUserID:number;
	
		/**
		 * 包体id
		 */
		packageID:number;
	
		/**
		 * 网络状态分级
		 */
		netState:netStateInterface;
	
		/**
		 * app下载地址
		 */
		downloadUrl:string;
	
		/**
		 * 包体内嵌的游戏信息
		 */
		packageInfo:packagInfoInterface;
	
		/**
		 * 线路检测界面是否已添加
		 */
		hasLineChoiceLayer:boolean;
	
		/**
		 * 是否需要显示免费金币界面
		 */
		needShowFree:boolean;
	
		/**
		 * 密码本选线线路
		 */
		codeBook?:Object|null;
	
		/**
		 * 密码本选线线路 LocalStorage紀錄的ＫＥＹ值
		 */
		codeBookKey?:string|null;
	
		/**
		 * 中心服返回的玩家信息
		 */
		gameUser?:any|null;
	
		idDownApk:boolean;
		/**
		 * 根据安装包及系统初始化游戏配置
		 * @param sys 0=android 1=ios 2=windows 其他android
		 */
		init(sys:number);
	
		/**
		 * 获取向中心服get的接口及组合参数
		 * @param gettype   0=账号密码登陆 1=uuid 登陆 2=首次登陆 3=token 登陆 
		 *                  4=获取公告 5=获取下次可发送手机验证码的时间
		 *                  6=微信登陆
		 */
		getIpGetEndurl(gettype:number):string;
	
		/**
		 * 获取所有子游戏资金接口
		 */
		GetGameAccountsInfo();
	
		/**
		 * 获取向中心服post的接口
		 * @param gettype   1=设置昵称 2=创建子游戏账号 3=设置代理id
		 *                  4=设置账号密码 5=绑定手机 6=创建图形验证码
		 *                  7=请求发送手机验证码 8=修改头像 9=账号注册
		 */
		getIpPostEndUrl(gettype:number):string;
	
		/**
		 * 获取总代号
		 */
		getGeneralAgency():number;
	
		/**
		 * 根据热更version.json设置本地总代
		 */
		setGeneralAgency(data:Object);
	
		/**
		 * 根据确定的中心服地址，组合出各模块及子游戏的服务器地址
		 */
		checkSubServer();
	
		/**
		 * 根据中心服返回设置游戏相关信息
		 * @param game_user 
		 * @param proxy_user 
		 * @param prev_proxy 
		 */
		setGameInfo(game_user:any, proxy_user?:any, prev_proxy?:any);
	
		/**
		 * 设置玩家数据
		 * @param info 玩家数据
		 */
		setPlayerinfo(info:any);

		/**
		 * 是否是b2b品牌
		 */
		isB2BList():boolean;
	}

	export interface hqqinterface {
		/**b2b网页版 */
		isOtherGame?:boolean|null;
		/**是否需要自动显示公告 */
		needShowNotice?:boolean|null;
		/**当前语言 */
		language?:string|null;
		/**开发模式(可以用这判断隔开正式环境) */
		isDebug?:boolean|null;
		/**是否是跳轉場景中 */
		isShowJumpScene?:boolean|null;
		gameGlobal?:any|null;
		agaGame?:any|null;
		agaSubGameList?:any|null;
		subGameList?:any|null;
		hallConfig?:any|null;
		subModel?:any|null;
		oldGameList?:any|null;
		delaySub?:any|null;
		unusestrlist?:any|null;
		webAcconunt?:any|null;
		webAcconuntPass?:any|null;
		webDeviceid?:any|null;
		webUpAgent?:any|null;
		webToken?:any|null;
		webGameID?:any|null;
		setFuxinHallIdType();
		setJudingHallIdType();
		getSpriteFrame(path:string,Res?:cc.AssetManager.Bundle);
		imgLoad(node:cc.Node, path:string);
		getTip(tipname:string);
		btnLoad(node:cc.Node, normal:any, pressed?:any, interactable?:boolean);
		editboxTipLoad(node:cc.Node, tipname:string);
		skeletonLoad(node:cc.Node, path:any, aniname:string, loop:boolean,Res?:any);
		setWidget(node:cc.Node, config:any);
		addNode(node:cc.Node, cfg:any);
		setSprite(node:cc.Node, cfg:any);
		setBtn(node:cc.Node, cfg:any);
		setToggle(node:cc.Node, cfg:any);
		setLabel(node:cc.Node, cfg:any);
		setSkeleton(node:cc.Node, cfg:any);
		setEditbox();
		setScrollView(node:cc.Node, cfg:any);
		checkNode(node:cc.Node);
		setNode(node:cc.Node, cfg:any);
		checkIsAgaSubgame(key:string);
		circleBy(duration:number, dot:any, r:number, angle:number, initangle:number)
		setVideoPlayer(node:cc.Node, cfg:any);
		hotUpdateMgr?:any|null;
		loginMgr?:any|null;
		eventMgr?:any|null;
		audioMgr?:any|null;
		reflect?:any|null;
		commonTools?:any|null;
		languageTip?:any|null;
		base64?:any|null;
		app?:appGlobalInterface;
		iosReflect?:any|null;
		http?:any|null;
		localStorage?:any|null;
		logMgr?:any|null;
		viewCtr?:any|null;
		HBYTick?:any|null;
		hallWebSocket?:any|null;
		HBYinfo?:any|null;
		JFCJinfo?:any|null;
		hallactivitybtn?:any|null;
		FenQudao?:boolean|null;
		pinpaiSubGameList?:any|null;
		game2to1?:any|null;
		game1to2?:any|null;
		spriteResMap?:Map<string,cc.SpriteFrame>|null;
		needShowBubble?:boolean|null;
		hasLineChoiceLayer?:boolean|null;
		open_chongzhi?:boolean;
		open_tixian?:boolean;
		open_back_hall?:boolean;
		open_im?:boolean;
		open_proxy?:boolean;
		resetNineTwoSort?:boolean;
		gameType?:string|null;
		isWexin?:boolean|null;

		//子游戏Bundle
		/**二人麻将 */
		ermj?:cc.AssetManager.Bundle|null;
		/**21点 */
		"21d"?:cc.AssetManager.Bundle|null;
		/**二八杠 */
		ebg?:cc.AssetManager.Bundle|null;
		/**奔驰宝马 */
		bcbm?:cc.AssetManager.Bundle|null;
		/**百家乐 */
		bjl?:cc.AssetManager.Bundle|null;
		/**百人牛牛 */
		brnn?:cc.AssetManager.Bundle|null;
		/**海王捕鱼 */
		hwby?:cc.AssetManager.Bundle|null;
		/**彩源棋牌 */
		cyqp?:cc.AssetManager.Bundle|null;
		/**斗地主 */
		ddz?:cc.AssetManager.Bundle|null;
		/**德州扑克 */
		dzpk?:cc.AssetManager.Bundle|null;
		/**红包乱斗 */
		hbld?:cc.AssetManager.Bundle|null;
		/**红包扫雷 */
		hbsl?:cc.AssetManager.Bundle|null;
		/**红黑大战 */
		hh?:cc.AssetManager.Bundle|null;
		/**城堡争霸 */
		cbzb?:cc.AssetManager.Bundle|null;
		/**聚宝盆捕鱼 */
		jbpby?:cc.AssetManager.Bundle|null;
		/**狮子王国 */
		szwg?:cc.AssetManager.Bundle|null;
		/**龙虎斗 */
		lhd?:cc.AssetManager.Bundle|null;
		/**轮盘 */
		lp?:cc.AssetManager.Bundle|null;
		/**派彩彩票 */
		pccp?:cc.AssetManager.Bundle|null;
		/**跑得快 */
		pdk?:cc.AssetManager.Bundle|null;
		/**抢庄牛牛 */
		qznn?:cc.AssetManager.Bundle|null;
		/**沙巴体育 */
		sbty?:cc.AssetManager.Bundle|null;
		/**水果机 */
		sgj?:cc.AssetManager.Bundle|null;
		/**十三水 */
		sss?:cc.AssetManager.Bundle|null;
		/**骰宝 */
		shaibao?:cc.AssetManager.Bundle|null;
		/**真人视讯 */
		zrsx?:cc.AssetManager.Bundle|null;
		/**云谷寻宝 */
		ygxb?:cc.AssetManager.Bundle|null;
		/**炸金花 */
		zjh?:cc.AssetManager.Bundle|null;
		/**财神到 */
		caishendao?:cc.AssetManager.Bundle|null;
		/**梭哈 */
		suoha?:cc.AssetManager.Bundle|null;
		/**多福多财 */
		duofuduocai?:cc.AssetManager.Bundle|null;
		/**彩源龙虎斗 */
		cylhd?:cc.AssetManager.Bundle|null;
		/**彩源猜大小 */
		cdx?:cc.AssetManager.Bundle|null;
		/**疯狂漩涡 */
		fkxw?:cc.AssetManager.Bundle|null;
		/**AG电子 */
		ag?:cc.AssetManager.Bundle|null;
		/**CQ9电子 */
		cq9?:cc.AssetManager.Bundle|null;
		/**PT电子 */
		pt?:cc.AssetManager.Bundle|null;
		/**JDB电子 */
		jdb?:cc.AssetManager.Bundle|null;
		/**PG电子 */
		pg?:cc.AssetManager.Bundle|null;
		/**PG电子2 */
		pg2?:cc.AssetManager.Bundle|null;
		/**发财推币机 */
		fctbj?:cc.AssetManager.Bundle|null;
		/**直播 */
		zhibo?:cc.AssetManager.Bundle|null;
		/**上庄分分彩 */
		szffc?:cc.AssetManager.Bundle|null;
		/**MG电子 */
		mg?:cc.AssetManager.Bundle|null;
		/**QT电子 */
		qt?:cc.AssetManager.Bundle|null;
		/**三昇体育 */
		sanshengtiyu?:cc.AssetManager.Bundle|null;
		/**PP电子 */
		ppdz?:cc.AssetManager.Bundle|null;
		/**PQ电子 */
		pq?:cc.AssetManager.Bundle|null;
		/**奧丁电子 */
		od?:cc.AssetManager.Bundle|null;
		/**百人龙虎(龙虎斗_俱乐部)*/
		bairenlonghu?:cc.AssetManager.Bundle|null;
		/**推筒子(二八杠_俱乐部)*/
		tuitongzi?:cc.AssetManager.Bundle|null;
		/**万人拼十(百人牛牛_俱乐部)*/
		wanrenpanshi?:cc.AssetManager.Bundle|null;
		/**欢乐30秒(百家乐_俱乐部)*/
		huanlesanshimiao?:cc.AssetManager.Bundle|null;
		/**碰碰车(奔驰宝马_俱乐部)*/
		pengpengche?:cc.AssetManager.Bundle|null;
		/**经典斗地主(斗地主_俱乐部)*/
		jingdiandoudizhu?:cc.AssetManager.Bundle|null;
		/**赢三张(扎金花_俱乐部)*/
		yingsanzhang?:cc.AssetManager.Bundle|null;
		/**十三张(十三水_俱乐部)*/
		shisanzhang?:cc.AssetManager.Bundle|null;
		/**五人牛牛(抢庄牛牛_俱乐部)*/
		wurenniuniu?:cc.AssetManager.Bundle|null;
		/**两人麻将(二人麻将_俱乐部)*/
		liangrenmajiang?:cc.AssetManager.Bundle|null;
		/**德州(德州扑克_俱乐部)*/
		dezhoujulebu?:cc.AssetManager.Bundle|null;

		// 大厅Bundle
		/**超凡品牌大厅 */
		hall_chaofan?:cc.AssetManager.Bundle|null;
		/**金城品牌大厅 */
		hall_debi?:cc.AssetManager.Bundle|null;
		/**富鑫品牌大厅 */
		hall_fuxin?:cc.AssetManager.Bundle|null;
		/**华兴品牌大厅 */
		hall_huaxing?:cc.AssetManager.Bundle|null;
		/**嘉兴品牌大厅 */
		hall_jiaxing?:cc.AssetManager.Bundle|null;
		/**聚鼎品牌大厅 */
		hall_juding?:cc.AssetManager.Bundle|null;
		/**乐天品牌大厅 */
		hall_letian?:cc.AssetManager.Bundle|null;
		/*93品牌大厅 */
		hall_ninethree?:cc.AssetManager.Bundle|null;
		/**92品牌大厅 */
		hall_ninetwo?:cc.AssetManager.Bundle|null;
		/**特斯特品牌大厅 */
		hall_test?:cc.AssetManager.Bundle|null;
		/**新贵品牌大厅 */
		hall_xingui?:cc.AssetManager.Bundle|null;
		/**乐派品牌大厅 */
		hall_xinlong?:cc.AssetManager.Bundle|null;
		/**大喜发品牌大厅 */
		hall_xinsheng?:cc.AssetManager.Bundle|null;
		/**万盛娱乐品牌大厅 */
		hall_wansheng?:cc.AssetManager.Bundle|null;
		/**51游戏品牌大厅 */
		hall_fiveone?:cc.AssetManager.Bundle|null;
		/**冠赢国际娱乐品牌大厅 */
		hall_guanying?:cc.AssetManager.Bundle|null;
		/**趣游品牌大厅 */
		hall_quyou?:cc.AssetManager.Bundle|null;
		/**金马娱乐(信用盘）品牌大厅 */
		hall_jinma?:cc.AssetManager.Bundle|null;
		/**葡胜（俱乐部模式）品牌大厅 */
		hall_pusheng?:cc.AssetManager.Bundle|null;
		/**新银河（包网模式）品牌大厅 */
		hall_xinyinhe?:cc.AssetManager.Bundle|null;
		/**富彩娱乐--信用盘品牌大厅 */
		hall_fucaiyule?:cc.AssetManager.Bundle|null;

		// 全民代理Bundle
		/**超凡品牌全民代理 */
		proxy_chaofan?:cc.AssetManager.Bundle|null;
		/**富鑫品牌全民代理 */
		proxy_fuxin?:cc.AssetManager.Bundle|null;
		/**皇室品牌全民代理 */
		proxy_huangshi?:cc.AssetManager.Bundle|null;
		/**嘉兴品牌全民代理 */
		proxy_jiaxing?:cc.AssetManager.Bundle|null;
		/**聚鼎品牌全民代理 */
		proxy_juding?:cc.AssetManager.Bundle|null;
		/*91品牌全民代理 */
		proxy_nineone?:cc.AssetManager.Bundle|null;
		/**92品牌全民代理 */
		proxy_ninetwo?:cc.AssetManager.Bundle|null;
		/**特斯特品牌全民代理 */
		proxy_test?:cc.AssetManager.Bundle|null;
		/**天启品牌全民代理 */
		proxy_tianqi?:cc.AssetManager.Bundle|null;
		/**万盛品牌全民代理 */
		proxy_wansheng?:cc.AssetManager.Bundle|null;
		/**杏吧品牌全民代理 */
		proxy_xingba?:cc.AssetManager.Bundle|null;
		/**新贵品牌全民代理 */
		proxy_xingui?:cc.AssetManager.Bundle|null;
		/**新豪品牌全民代理 */
		proxy_xinhao?:cc.AssetManager.Bundle|null;
		/**大喜发品牌全民代理 */
		proxy_xinsheng?:cc.AssetManager.Bundle|null;
		/**51游戏品牌全民代理 */
		proxy_fiveone?:cc.AssetManager.Bundle|null;
		/**冠赢国际娱乐品牌全民代理 */
		proxy_guanying?:cc.AssetManager.Bundle|null;
		/**趣游品牌全民代理 */
		proxy_quyou?:cc.AssetManager.Bundle|null;
		/**金马娱乐(信用盘）品牌全民代理 */
		proxy_jinma?:cc.AssetManager.Bundle|null;
		/**葡胜（俱乐部模式）品牌全民代理 */
		proxy_pusheng?:cc.AssetManager.Bundle|null;
		/**新银河（包网模式）品牌全民代理 */
		proxy_xinyinhe?:cc.AssetManager.Bundle|null;
		/**富彩娱乐--信用盘品牌全民代理 */
		proxy_fucaiyule?:cc.AssetManager.Bundle|null;
	}
	let hqq:hqqinterface;
	
	export interface APIAPP {
		closeWebview:Function;
	}
	
	export interface Window{
		$APIAPP:APIAPP;
		hqq:hqqinterface;
	}

	export class hqqNode extends cc.Node {
		customIndex: number;
		dpr: number;
		downflag: cc.Node;
		downflag2: cc.Node;
		progress: cc.Node;
		jiantou: cc.Node;
		tempdata: any;
		progresslabel: cc.Label;
	}
	export interface hqqSubgame {
		zhname: string, // 中文游戏名 
		enname: string, // 英文游戏名 （子游戏文件路径，更新子路径） 
		lanchscene: string, // 跳转场景名 
		fuxin_lanchscene: string, // 跳转场景名 
		xingui_lanchscene: string, // 跳转场景名 
		game_id: string,
		serverUrl: string, // 游戏服务器地址 
		endUrl: string, // 游戏服务器地址 
		hasAccount: boolean, // 是否已创建子游戏账号 
		remoteData: any, // 服务端发送过来的游戏数据 
		hallid: number,
		resPath: string,
		isDown: boolean,
		gameType: number, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4 
		loginHistory: Array<number>, // 子游戏最近一周登陆历史
		hasRes: boolean,
		istwo: boolean,
	}
	export interface noticeItem{
		text:string;
		time:number;
		rollforver:boolean;
	}
	export interface upgrade{
		url: string,
		index:number,
		time:number,
		err: any
	}
}

declare module "cc"{
	interface Node{
		zIndex:number;
		_myIndex_:number;
		get x():number;
		set x(value:number);
		get y():number;
		set y(value:number);
		// height:number;
		// width:number;
		setPositionEx(...args):void;
		setScaleEx(...args):void;
		addChildEx(child:Node, zIndex?:number, name?:string):void;
	}
	interface Scene{
		zIndex:number;
		addChildEx(child:Node, zIndex?:number, name?:string):void;
	}
	interface Button{
		_myinfo:upgrade;
		_hqqDelay:boolean;
		_hqqDelayTime:number;
		hqqsetDelay(on:boolean);
		hqqDelay(event?: EventTouch);

		_hqqSoundon:boolean;
		tocheEndClose(...args):void;
		setSoundEffect(on:boolean):void;
		hqqEffect():void;
		_onTouchEnded(...args):void;
	}
}
