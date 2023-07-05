import { IBuildTaskOption, BuildHook, IBuildResult } from '../@types';
import * as Fs from "fs";
import * as Path from "path";
import * as crypto from "crypto";
import * as child_process from "child_process";
import * as Os from "os";

interface IOptions {
    commonTest1: number;
    commonTest2: 'opt1' | 'opt2';
    webTestOption: boolean;
}

interface IHQQBuildReult extends IBuildResult{
    __task:any;
}
const PACKAGE_NAME = 'hqq';

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        'hqq': IOptions;
    };
}

function log(...arg: any[]) {
    let str = "[" + PACKAGE_NAME+"]";
    for(let i = 0;i<arg.length;i++){
        str += arg[i];
    }
    console.log(str);
}

let allAssets = [];

//配置资源所属模块，仅需要配置scene 和 resources文件夹中文件,会自动计算依赖
//支持一个文件配置多个模块 以 & 连接
//配置文件迁移，具体配置建项目中 project.txt文件
let m_projectPath = ''
let m_pngPath = ''
let m_icnsPath = ''
let m_icoPath = ''
let m_projPath = ''
let m_packageName = ''
let m_plateform = '' // web-mobile android
let m_gamename = ''
let m_pinpai = ''
let m_huanjin = ''
let m_versionjson = null
let m_language = 'CN'
let m_country = 'china'
let m_currency = 'rmb'
let m_buildPath = ''
let m_gitPath = "D:\\Burt\\cocos_game\\hotupdate\\upgrade-server\\"
let m_webGitPath = 'D:\\Burt\\cocos_game\\hotupdate\\web-mobile\\'
let m_pathTag = "/"
//有分皮肤加载的大厅
let hallPinPaiList=["fuxin","xingui","xinsheng","xinlong"];
//有分皮肤加载的子游戏品牌
let subGamePinPaiList = ["fuxin"];
//有分皮肤加载的子游戏资源
let subGamePinPaiResList = { 
                            "fuxin":{
                                        "bjl":["bjl_fuxin","bjlRes"],
                                        "lhd":["lhd_fuxin","lhdRes_fuxin"],
                                    }
                        };

export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function() {
    log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
    allAssets = await Editor.Message.request('asset-db', 'query-assets');
};

export const onBeforeBuild: BuildHook.onBeforeBuild = async function(options:IBuildTaskOption, result:IHQQBuildReult) {
    // Todo some thing
    log(`${PACKAGE_NAME}.webTestOption`+ 'onBeforeBuild');

    log("onBeforeBuild"+ options+" result="+result + " Editor.Project.path="+Editor.Project.path)
    m_projectPath = Editor.Project.path
    m_buildPath = Editor.Project.path + m_pathTag + "build" + m_pathTag + "jsb-link"
    m_pngPath = Editor.Project.path + '/extensions/hqq/icon/icon.png'
    m_icnsPath = Editor.Project.path + '/extensions/hqq/icon/Icon.icns'
    m_icoPath = Editor.Project.path + '/extensions/hqq/icon/game.ico'
    m_projPath = Editor.Project.path
    
    m_plateform = options.platform
    m_gamename = options.name
    if (m_plateform == "android") {
        let tempstrArray = options.packages.android.packageName.split(".");
        if( tempstrArray.length > 4 ){
            tempstrArray.splice(4,tempstrArray.length - 4 )
        }
        m_packageName = tempstrArray[0]+"."+tempstrArray[1]+"."+tempstrArray[2]+"."+tempstrArray[3];
        log("onBuildStart m_packageName"+ m_packageName)

        if (m_packageName.match('dev') || m_packageName.match('Dev')) {
            m_huanjin = 'dev'
        } else if (m_packageName.match('pre') || m_packageName.match('Pre')) {
            m_huanjin = 'pre'
        } else {
            m_huanjin = 'online'
        }
        if (m_packageName.match("AG") || m_packageName.match("Test") || m_packageName.match("test")) {
            m_pinpai = 'test'
        } else if (m_packageName.match("debi") || m_gamename.match("Debi")) {
            m_pinpai = 'debi'
        } else if (m_packageName.match("xingba") || m_packageName.match("Xingba")) {
            m_pinpai = 'xingba'
        } else if (m_packageName.match("yuyu") || m_packageName.match("Yuyu")) {
            m_pinpai = 'yuyu'
        } else if (m_packageName.match("xinsheng") || m_packageName.match("Xinsheng")) {
            m_pinpai = 'xinsheng'
        } else if (m_packageName.match("xingui") || m_packageName.match("Xingui")) {
            m_pinpai = 'xingui'
        } else if (m_packageName.match("fuxin") || m_packageName.match("Fuxin")) {
            m_pinpai = 'fuxin'
        } else if (m_packageName.match("xinhao") || m_packageName.match("Xinhao")) {
            m_pinpai = 'xinhao'
        } else if (m_packageName.match("xinlong") || m_packageName.match("Xinlong")) {
            m_pinpai = 'xinlong'
        } else if (m_packageName.match("nineone") ) {
            m_pinpai = 'nineone'
        } else if (m_packageName.match("Huangshi") || m_packageName.match("huangshi")) {
            m_pinpai = 'huangshi'
        } else if (m_packageName.match("Juding") || m_packageName.match("juding")) {
            m_pinpai = 'juding'
        } else if (m_packageName.match("Huaxing") || m_packageName.match("huaxing")) {
            m_pinpai = 'huaxing'
        } else if (m_packageName.match("Ninetwo") || m_packageName.match("ninetwo")) {
            m_pinpai = 'ninetwo'
        } else if (m_packageName.match("Tianqi") || m_packageName.match("tianqi")) {
            m_pinpai = 'tianqi'
        } else if (m_packageName.match("Chaofan") || m_packageName.match("chaofan")) {
            m_pinpai = 'chaofan'
        } else if (m_packageName.match("Wansheng") || m_packageName.match("wansheng")) {
            m_pinpai = 'wansheng'
        } else if (m_packageName.match("Jiaxing") || m_packageName.match("jiaxing")) {
            m_pinpai = 'jiaxing'
        } else if (m_packageName.match("Fiveone") || m_packageName.match("fiveone")) {
            m_pinpai = 'fiveone'
        } else if (m_packageName.match("Letian") || m_packageName.match("letian")) {
            m_pinpai = 'letian'
        } else if (m_packageName.match("Xingyao") || m_packageName.match("xingyao")) {
            m_pinpai = 'xingyao'
        } else if (m_packageName.match("Quyou") || m_packageName.match("quyou")) {
            m_pinpai = 'quyou'
        }

        m_packageName = options.packages.android.packageName
        
    } else if (m_plateform == "web-mobile" || m_plateform == "web-desktop") {
        if (m_gamename.match('dev') || m_gamename.match('Dev')) {
            m_huanjin = 'dev'
        } else if (m_gamename.match('pre') || m_gamename.match('Pre')) {
            m_huanjin = 'pre'
        } else {
            m_huanjin = 'online'
        }
        if (m_gamename.match("Tst") || m_gamename.match("Test") || m_packageName.match("test")) {
            m_pinpai = 'test'
        } else if (m_gamename.match("debi") || m_gamename.match("Debi")) {
            m_pinpai = 'debi'
        } else if (m_gamename.match("xingba") || m_packageName.match("Xingba")) {
            m_pinpai = 'xingba'
        } else if (m_gamename.match("yuyu") || m_packageName.match("Yuyu")) {
            m_pinpai = 'yuyu'
        } else if (m_packageName.match("xinsheng") || m_packageName.match("Xinsheng")) {
            m_pinpai = 'xinsheng'
        } else if (m_packageName.match("xingui") || m_packageName.match("Xingui")) {
            m_pinpai = 'xingui'
        } else if (m_packageName.match("fuxin") || m_packageName.match("Fuxin")) {
            m_pinpai = 'fuxin'
        } else if (m_packageName.match("xinhao") || m_packageName.match("Xinhao")) {
            m_pinpai = 'xinhao'
        } else if (m_packageName.match("xinlong") || m_packageName.match("Xinlong")) {
            m_pinpai = 'xinlong'
        } else if (m_packageName.match("nineone") ) {
            m_pinpai = 'nineone'
        } else if (m_packageName.match("Huangshi") || m_packageName.match("huangshi")) {
            m_pinpai = 'huangshi'
        } else if (m_packageName.match("Juding") || m_packageName.match("juding")) {
            m_pinpai = 'juding'
        } else if (m_packageName.match("Huaxing") || m_packageName.match("huaxing")) {
            m_pinpai = 'huaxing'
        } else if (m_packageName.match("Ninetwo") || m_packageName.match("ninetwo")) {
            m_pinpai = 'ninetwo'
        } else if (m_packageName.match("Tianqi") || m_packageName.match("tianqi")) {
            m_pinpai = 'tianqi'
        } else if (m_packageName.match("Chaofan") || m_packageName.match("chaofan")) {
            m_pinpai = 'chaofan'
        } else if (m_packageName.match("wansheng") || m_packageName.match("wansheng")) {
            m_pinpai = 'wansheng'
        } else if (m_packageName.match("Jiaxing") || m_packageName.match("jiaxing")) {
            m_pinpai = 'jiaxing'
        } else if (m_packageName.match("Fiveone") || m_packageName.match("fiveone")) {
            m_pinpai = 'fiveone'
        } else if (m_packageName.match("Letian") || m_packageName.match("letian")) {
            m_pinpai = 'letian'
        } else if (m_packageName.match("Xingyao") || m_packageName.match("xingyao")) {
            m_pinpai = 'xingyao'
        } else if (m_packageName.match("Quyou") || m_packageName.match("quyou")) {
            m_pinpai = 'quyou'
        }
    }
    
    log("<--Myplugin--> onBuildStart 包名="+ m_packageName+"品牌="+m_pinpai+ "环境="+ m_huanjin)
    if (Os.platform() == "win32") {
        m_pathTag = "\\"
    } else {
        m_pathTag = "/"
    }
    let tversionjson = Fs.readFileSync(m_projectPath + "/version.json", 'utf8')
    m_versionjson = JSON.parse(tversionjson)
    if (m_plateform == "android") {
        if (!Fs.existsSync(m_projPath) || !(Fs.statSync(m_projPath).isDirectory()) ) {
            _changeTemplatesPackageName(options,result)
        } else {
            _checkPackageName(options,result)
        }
        _replaceIcons()
        _changePackageInfoInJava(options,result)
        _changeApkName()
    }
};

export const onBeforeCompressSettings: BuildHook.onBeforeCompressSettings = async function(options, result) {
    const pkgOptions = options.packages[PACKAGE_NAME];
    if (pkgOptions.webTestOption) {
        console.debug('webTestOption', true);
    }
    // Todo some thing
    console.debug('get settings test', result.settings);
};

export const onAfterCompressSettings: BuildHook.onAfterCompressSettings = async function(options, result) {
    // Todo some thing
    log('webTestOption'+ 'onAfterCompressSettings');
};

export const onAfterBuild: BuildHook.onAfterBuild = async function(options:IBuildTaskOption, result:IHQQBuildReult) {
    
    log("onAfterBuild options="+ options + " result=",result)
    m_buildPath = result.dest;
    _replaceSearchPaths(m_buildPath)
    if (m_plateform == "android") {
        _changegradleproperties();
        _changebuildgradle();
        _buildHotUpdata243(options,result)
    }
    else if( m_plateform == "web-mobile"){
        log('<--Myplugin--> onBuildFinish call _replaceIndexHTML')
        _replaceIndexHTML(result.__task.result.paths.dir);
    }
    log('<--Myplugin--> onAfterBuild')
};
/**
 * @param dest 
 */
 function _replaceIndexHTML(dest){
    log('<--Myplugin--> _replaceIndexHTML start')
    var root = Path.normalize(dest);
    var url = Path.join(root, "/index.html");
    log('<--Myplugin--> _replaceIndexHTML url='+url)
    Fs.readFile(url, "utf8", function (err, data) {
        log('<--Myplugin--> _replaceIndexHTML111111111111111')
        if (err) {
            log('<--Myplugin--> _replaceIndexHTML error1 end')
            return err
        }
        log('<--Myplugin--> _replaceIndexHTML222222222222222')
        let i0 = data.indexOf("console.error(err); })") + 22
        log('<--Myplugin--> _replaceIndexHTML i0='+i0 + " indexof="+ data.indexOf("(function () {"))
        var newData = data.substring(0, i0)+"\n"
        + "        let url = window.location.search;\n"
        + "        let headcom = document.getElementsByTagName(\"head\")[0];\n"
        + "        if(headcom){\n"
        + "            let linkcom = document.createElement(\"link\");\n"
        + "            headcom.appendChild(linkcom)\n"
        + "            linkcom.setAttribute(\"rel\",\"icon\");\n"
        + "            linkcom.setAttribute(\"href\",\"favicon.8de18.ico\");\n"
        + "        }\n"
        + "        if (url.includes(\"?\")) {\n"
        + "            let strs = url.split(\"?\")[1].split(\"&\");\n"
        + "            for (let i = 0; i < strs.length; i++) {\n"
        + "              let temp = strs[i].split(\"=\")[1];\n"
        + "              if (strs[i].split(\"=\")[0] == \"gametype\") {\n"
        + "                if(headcom){\n"
        + "                  let linkcom = document.getElementsByTagName(\"link\")[1];\n"
        + "                  linkcom.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/favicon.8de18.ico\");\n"
        + "                  let linkcom1 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom1)\n"
        + "                  linkcom1.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom1.setAttribute(\"sizes\",\"20x20\");\n"
        + "                  linkcom1.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-20-ipad.png\");\n"
        + "\n"
        + "                  let linkcom2 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom2)\n"
        + "                  linkcom2.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom2.setAttribute(\"sizes\",\"40x40\");\n"
        + "                  linkcom2.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-40.png\");\n"
        + "\n"    
        + "                  let linkcom3 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom3)\n"
        + "                 linkcom3.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom3.setAttribute(\"sizes\",\"60x60\");\n"
        + "                  linkcom3.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-20@3x.png\");\n"
        + "\n"    
        + "                  let linkcom4 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom4)\n"
        + "                  linkcom4.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom4.setAttribute(\"sizes\",\"29x29\");\n"
        + "                  linkcom4.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-29.png\");\n"
        + "\n"    
        + "                  let linkcom5 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom5)\n"
        + "                  linkcom5.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom5.setAttribute(\"sizes\",\"58x58\");\n"
        + "                  linkcom5.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-29@2x.png\");\n"
        + "\n"    
        + "                  let linkcom6 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom6)\n"
        + "                  linkcom6.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom6.setAttribute(\"sizes\",\"87x87\");\n"
        + "                  linkcom6.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-29@3x.png\");\n"
        + "\n"    
        + "                  let linkcom7 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom7)\n"
        + "                  linkcom7.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom7.setAttribute(\"sizes\",\"80x80\");\n"
        + "                  linkcom7.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-40@2x.png\");\n"
        + "\n"                  
        + "                  let linkcom8 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom8)\n"
        + "                  linkcom8.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom8.setAttribute(\"sizes\",\"120x120\");\n"
        + "                  linkcom8.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-40@3x.png\");\n"
        + "\n"    
        + "                  let linkcom9 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom9)\n"
        + "                  linkcom9.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom9.setAttribute(\"sizes\",\"50x50\");\n"
        + "                  linkcom9.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-50.png\");\n"
        + "\n"    
        + "                  let linkcom10 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom10)\n"
        + "                  linkcom10.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom10.setAttribute(\"sizes\",\"100x100\");\n"
        + "                  linkcom10.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-50@2x.png\");\n"
        + "\n"    
        + "                  let linkcom11 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom11)\n"
        + "                  linkcom11.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom11.setAttribute(\"sizes\",\"57x57\");\n"
        + "                  linkcom11.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-57.png\");\n"
        + "\n"    
        + "                  let linkcom12 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom12)\n"
        + "                  linkcom12.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom12.setAttribute(\"sizes\",\"114x114\");\n"
        + "                  linkcom12.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-57@2x.png\");\n"
        + "\n"    
        + "                  let linkcom13 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom13)\n"
        + "                 linkcom13.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom13.setAttribute(\"sizes\",\"180x180\");\n"
        + "                  linkcom13.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-60@3x.png\");\n"
        + "\n"   
        + "                  let linkcom14 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom14)\n"
        + "                  linkcom14.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom14.setAttribute(\"sizes\",\"72x72\");\n"
        + "                  linkcom14.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-72.png\");\n"
        + "\n"    
        + "                  let linkcom15 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom15)\n"
        + "                  linkcom15.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom15.setAttribute(\"sizes\",\"144x144\");\n"
        + "                  linkcom15.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-72@2x.png\");\n"
        + "\n"    
        + "                  let linkcom16 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom16)\n"
        + "                  linkcom16.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom16.setAttribute(\"sizes\",\"76x76\");\n"
        + "                  linkcom16.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-76.png\");\n"
        + "\n"   
        + "                  let linkcom17 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom17)\n"
        + "                  linkcom17.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom17.setAttribute(\"sizes\",\"152x152\");\n"
        + "                  linkcom17.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-76@2x.png\");\n"
        + "\n"    
        + "                  let linkcom18 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom18)\n"
        + "                  linkcom18.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom18.setAttribute(\"sizes\",\"167x167\");\n"
        + "                  linkcom18.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-83.5@2x.png\");\n"
        + "\n"    
        + "                  let linkcom19 = document.createElement(\"link\");\n"
        + "                  headcom.appendChild(linkcom19)\n"
        + "                  linkcom19.setAttribute(\"rel\",\"apple-touch-icon-precomposed\");\n"
        + "                  linkcom19.setAttribute(\"sizes\",\"1024x1024\");\n"
        + "                  linkcom19.setAttribute(\"href\",strs[i].split(\"=\")[1]+\"/icon-1024.png\");\n"
        + "                }\n"
        + "              }\n"
        + "            }\n"
        + "        }\n"
        + data.substring(i0)
        log('<--Myplugin--> _replaceIndexHTML333333333333333')
        Fs.writeFile(url, newData, function (error) {
            log('<--Myplugin--> _replaceIndexHTML444444444444444')
            if (error) {
                log('<--Myplugin--> _replaceIndexHTML error2 end')
                return error;
            }
            log('<--Myplugin--> _replaceIndexHTML5555555555555')
            log('<--Myplugin--> _replaceIndexHTML end')
        });
    });
}

export const unload: BuildHook.unload = async function() {
    log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
};

/**
 * @Description: 替换 index.html 中的title标签
 */
 function _replaceTitle(dest) {
    log("<--Myplugin--> _replaceTitle"+ dest)
    var root = Path.normalize(dest);
    var url = Path.join(root, "index.html");
    Fs.readFile(url, "utf8", function (err, data) {
        if (err) {
            return err
        }
        let i0 = data.indexOf("<title>") + 7
        let i1 = data.indexOf("</title>") + 8
        var newData = data.substring(0, i0) + m_gamename
            + "</title>\n" + '  <meta http-equiv="Content-Security-Policy" content="connect-src * " />'
            + data.substring(i1)
        Fs.writeFile(url, newData, function (error) {
            if (error) {
                return error;
            }
            _changeCss(root)
        });
    });
}
/**
 * @Description: 修改网页版css文件
 */
function _changeCss(root) {
    log("<--Myplugin--> changeCss"+ root)
    // var readDir = Fs.readdirSync("./build/web-mobile/")
    var readDir = Fs.readdirSync(root)
    let desktoppath = ""
    let mobilepath = ""
    for (let i = 0; i < readDir.length; i++) {
        if (readDir[i].match('style-desktop')) {
            desktoppath = root + m_pathTag + readDir[i]
        } else if (readDir[i].match('style-mobile')) {
            mobilepath = root + m_pathTag + readDir[i]
        }
    }
    Fs.readFile(desktoppath, 'utf8', function (err, files) {
        if (!err) {
            let newfiles = files.replace("url(./splash.85cfd.png)", "")
            Fs.writeFile(desktoppath, newfiles, function (error) {
                if (error) {
                    return error;
                } else {
                    log("<--Myplugin--> style-desktop修改成功")
                    Fs.readFile(mobilepath, 'utf8', function (err, files) {
                        if (!err) {
                            let newfiles = files.replace("url(./splash.85cfd.png)", "")
                            Fs.writeFile(mobilepath, newfiles, function (error) {
                                if (error) {
                                    return error;
                                } else {
                                    log("<--Myplugin--> style-mobile修改成功")
                                    _copyWebMobileToGitPath()
                                }
                            });
                        } else {
                            log("<--Myplugin--> 读取style-mobile文件报错", err)
                        }
                    })
                }
            });
        } else {
            log("<--Myplugin--> 读取style-desktop文件报错", err)
        }
    })
}
// 复制打包好的web版本到指定路径的git仓库
function _copyWebMobileToGitPath() {
    // let gitpath = m_webGitPath + m_pinpai + '_' + m_huanjin
    // delDir(gitpath)
    // copyFile(m_projectPath + m_pathTag + "packages" + m_pathTag + "hqq" + m_pathTag + "index.html", gitpath + m_pathTag + "index.html")
    // copyDir(m_projectPath + m_pathTag + "build" + m_pathTag + "web-mobile", gitpath + m_pathTag + "webgame", (err) => {
    //     log("复制文件报错", err)
    // })
    log("<--Myplugin--> pack_web 成功 打包完成！！！✿✿ヽ(°▽°)ノ✿")
    // child_process.execFile("pack_web.bat", [m_pinpai, m_huanjin], { cwd: m_projectPath, maxBuffer: 1024 * 1024 * 20 }, function (error, stdout, stderr) {
    //     if (error !== null) {
    //         log("<--Myplugin--> exec error" + error)
    //     }
    //     if (stderr !== null) {
    //         log("<--Myplugin--> stderr " + stderr)
    //     }
    //     log("<--Myplugin--> pack_web 成功 打包完成！！！✿✿ヽ(°▽°)ノ✿")
    // })
}
/**
 * @Description: 替换 mian.js 中的文件读取路径
 */
function _replaceSearchPaths(dest) {
    log("<--Myplugin--> _replaceSearchPaths")
    var root = Path.normalize(dest+m_pathTag+"assets/");
    var url = Path.join(root, "main.js");
    Fs.readFile(url, "utf8", function (err, data) {
        if (err)
            return err

        var newStr =
            "if (window.jsb) {\n" +
            "    window.__errorHandler = function (file, line, error) {\n" +
            "        if (file.indexOf('subGame') >= 0) {\n" +
            "            jsb.fileUtils.removeDirectory(jsb.fileUtils.getWritablePath() + 'subGame/res/')\n" +
            "            jsb.fileUtils.removeDirectory(jsb.fileUtils.getWritablePath() + 'subGame/src/')\n" +
            "            jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath() + 'subGame/hall_project.manifest')\n" +
            "            __restartVM();\n" +
            "        }\n" +
            "    };\n" +
            "    var searchPaths = jsb.fileUtils.getSearchPaths();\n" +
            "    var _storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'subGame/');\n" +
            "    searchPaths.unshift(_storagePath);\n" +
            "    jsb.fileUtils.setSearchPaths(searchPaths); \n" +
            "}\n";
        var newData = newStr + data
        Fs.writeFile(url, newData, function (error) {
            if (error) {
                return error;
            }
        });
    });
}
/**
 * @Description: 热更新打包 bat
 */
function _runPackgenBat() {
    log("<--Myplugin--> _runPackgenBat")
    child_process.execFile("243update.bat", [m_pinpai, m_huanjin, m_versionjson.version["hall"]], { cwd: m_projectPath, maxBuffer: 1024 * 1024 * 20 }, function (error, stdout, stderr) {
        if (error !== null) {
            log("<--Myplugin--> exec error" + error)
        }
        if (stderr !== null) {
            log("<--Myplugin--> stderr " + stderr)
        }
        log("<--Myplugin--> 243update 成功 打包完成！！！✿✿ヽ(°▽°)ノ✿")
    })
}
// 构建manifest文件中的 assets 内容
function manifestReadDir(dir, obj, src) {
    var stat = Fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = Fs.readdirSync(dir), subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = Path.join(dir, subpaths[i]);
        stat = Fs.statSync(subpath);
        if (stat.isDirectory()) {
            manifestReadDir(subpath, obj, src);
        } else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            // md5 = crypto.createHash('md5').update(Fs.readFileSync(subpath, 'binary')).digest('hex');
            md5 = crypto.createHash('md5').update(Fs.readFileSync(subpath)).digest('hex');
            compressed = Path.extname(subpath).toLowerCase() === '.zip';
            // log("manifestReadDir relative=",relative)
            // log("manifestReadDir src=",src)
            // log("manifestReadDir subpath=",subpath)
            relative = Path.relative(src, subpath);
            // log("manifestReadDir after Path.relative relative=",relative)
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size': size,
                'md5': md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}
// 根据完整的 manifest 构建 version.manifest
var getVersion = function (d) {
    return {
        packageUrl: d.packageUrl,
        remoteManifestUrl: d.remoteManifestUrl,
        remoteVersionUrl: d.remoteVersionUrl,
        version: d.version,
        module: d.module
    }
}
// 构建热更manifest文件
function _buildHotUpdata243(options:IBuildTaskOption, result:IHQQBuildReult) {
    let remoteUrl = "https://upgrade.gzzfhz.com"
    if (m_huanjin == "dev") {
        remoteUrl = "http://upgrade.0717996.com"
    } else if (m_huanjin == "pre") {
        remoteUrl = "https://upgrade.gzzfhz.com"
    }
    let manifestList = {}
    for (let k in m_versionjson.version) {
        manifestList[k] = {
            packageUrl: remoteUrl,
            remoteManifestUrl: remoteUrl + '/project.manifest',
            remoteVersionUrl: remoteUrl + '/version.manifest',
            version: m_versionjson.version[k],
            assets: {},
            searchPaths: [],
            module: k,
        };
    }
    let mainbundleincludelist = ["src","jsb-adapter"];
    for(let tempmainindex = 0; tempmainindex < mainbundleincludelist.length; tempmainindex++){
        manifestReadDir(result.__task.result.paths.dir+m_pathTag+mainbundleincludelist[tempmainindex], manifestList["hall"].assets, result.__task.result.paths.dir)
    }
    result.__task.result.bundles.forEach(bundle => {
        if (!bundle.name) {
            return
        } else {
            let subGame = bundle.name
            let hasBundle = false
            log("bundle.name="+bundle.name);
            if (bundle.name == "main" || bundle.name == "resources" || bundle.name == "internal") {// 基础包
                subGame = "hall"
                hasBundle = true
            } /* else if(bundle.name.match("hall_")){// 大厅品牌包
                for (let k in manifestList) {
                    if (bundle.name.match(k) ) {
                        subGame = k
                        hasBundle = true
                    }
                }
                subGame = bundle.name.replace("Res","");
            } */ else {
                if( !hasBundle ) // 子游戏包
                {
                    for (let k in manifestList) {
                        if (bundle.name.match(k) ) {
                            subGame = k
                            hasBundle = true
                        }
                    }
                }

                // for(let i; i<= subGamePinPaiList.length;i++)
                // {
                //     if( bundle.name.match("_"+subGamePinPaiList[i]))
                //     {
                //         for (let k in manifestList) {
                //             if (bundle.name.match(k) || bundle.name.replace("Res","").match(k) ) {
                //                 subGame = k
                //                 log("分品牌子游戏 subGame=",subGame);
                //                 hasBundle = true
                //                 break;
                //             }
                //         }
                //     }
                // }
            }
            log("<--Myplugin-->manifestList "+ subGame+ " bundle.name"+ bundle.name)
            if (!hasBundle) {
                log("在version.json文件中没有匹配这个子游戏", subGame)
                return
            }
            
            if (bundle.name == "main") {
                // log("main====================start")
                // log(bundle.dest + "/")
                // log(manifestList[subGame].assets)
                // log(bundle.dest + "/")
                // log(result.__task.result.paths.dir)
                // log("main====================end")
                manifestReadDir(bundle.dest + "/", manifestList[subGame].assets, result.__task.result.paths.dir)
                // for( let i = 0;i<hallPinPaiList.length;i++)
                // {
                //     manifestReadDir(options.dest + "/src/", manifestList["hall_"+hallPinPaiList[i] ].assets, options.dest + "/")
                // }
            }
            // log("not main====================start")
            // log(bundle.dest + "/")
            // log(manifestList[subGame].assets)
            // log(bundle.dest + "/")
            // log(result.__task.result.paths.dir)
            // log("not main====================end")
            manifestReadDir(bundle.dest + "/", manifestList[subGame].assets, result.__task.result.paths.dir)
            // for( let key in subGamePinPaiResList ){
            //     let key2 = null;
            //     for( key2 in subGamePinPaiResList[key] ){
            //         if( key2 == subGame ){
            //             for( let tempindex = 0; tempindex < subGamePinPaiResList[key][key2].length;tempindex++){
            //                 if( bundle.name == subGamePinPaiResList[key][key2][tempindex]){
            //                     if( manifestList[subGame+"_"+key] ){
            //                         manifestReadDir(options.dest + "/assets/" + bundle.name + "/", manifestList[subGame+"_"+key].assets, options.dest + "/")
            //                     } else{
            //                         log("在manifestList没有匹配这个子游戏", subGame+"_"+key)
            //                     }
            //                 }
            //             }
            //             break;
            //         }
            //     }
            //     if( key2 == subGame ){
            //         break;
            //     }
            // }
            // if(subGame=="hall")
            // {
            //     for( let i = 0;i<hallPinPaiList.length;i++)
            //     {
            //         manifestReadDir(options.dest + "/assets/" + bundle.name + "/", manifestList["hall_"+hallPinPaiList[i]].assets, options.dest + "/")
            //     }
            // }
        }
    });
    result.__task.result.bundles.forEach(bundle => {
        if (!bundle.name || bundle.name == "resources" || bundle.name == "internal") {
            return
        } else {
            let subGame = bundle.name
            if (bundle.name == "main") {
                subGame = "hall"
            } else {
                for (let k in manifestList) {
                    if (bundle.name.match(k)) {
                        subGame = k
                    }
                }
            }
            log("subGame="+subGame);
            if(manifestList[subGame]){
                log("1111111111subGame="+subGame);
                Fs.writeFile(m_buildPath + m_pathTag + "assets" + m_pathTag + subGame + "_project.manifest", JSON.stringify(manifestList[subGame]), (err) => {
                    if (err){
                        log("22222222222subGame="+subGame);
                        log(m_buildPath + m_pathTag + "assets" + m_pathTag + subGame + "_project.manifest writeFile fail err="+err);
                        return err;
                    }
                    log("33333333subGame="+subGame);
                    Fs.writeFile(m_buildPath + m_pathTag + "assets" + m_pathTag + subGame + "_version.manifest", JSON.stringify(getVersion(manifestList[subGame])), (err2) => {
                        if (err2){
                            log("44444444444subGame="+subGame);
                            log(m_buildPath + m_pathTag + "assets" + m_pathTag + subGame + "_version.manifest writeFile fail err2="+err2);
                            return err2;
                        }
                        log("55555555subGame="+subGame);
                    });
                    log("6666666666subGame="+subGame);
                });
            } else{
                log("version.json not existed subGame=",subGame);
            }
        }
    })
}
/**
 * @Description: 检查包名并修改
 */
function _checkPackageName(options:IBuildTaskOption, result:IHQQBuildReult) {
    var root = Path.normalize(Editor.Project.path);
    var url = Path.join(root, m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "app");
    var url0 = Path.join(url, m_pathTag + "res" + m_pathTag + "xml" + m_pathTag + "file_paths.xml");
    log("<--Myplugin--> _checkPackageName url="+url+" url0="+url0)
    Fs.readFile(url0, "utf8", function (err, data) {
        if (err) {
            return err
        }
        var packageNameindex = data.indexOf(m_packageName)
        if (packageNameindex == -1) {
            _changeTemplatesPackageName(options,result)
        }
    });
}
// 改变 Templates 下模板文件的包名
function _changeTemplatesPackageName(options:IBuildTaskOption, result:IHQQBuildReult) {
    // log("<--Myplugin--> _changeTemplatesPackageName")
    var root = Path.normalize(Editor.Project.path);
    var url = Path.join(root, m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android" + m_pathTag + "app");

    var url0 = Path.join(url, m_pathTag + "res" + m_pathTag + "xml" + m_pathTag + "file_paths.xml");
    
    Fs.readFile(url0, "utf8", function (err, data) {
        if (err) {
            return err
        }
        var newStr =
            "<?xml version='1.0' encoding='utf-8'?>\n" +
            "<resources>\n" +
            "    <paths>\n" +
            "        <external-path path='Android/data/" + m_packageName + "/' name='files_root'/>\n" +
            "        <external-path path='.' name='external_storage_root'/>\n" +
            "    </paths>\n" +
            "    <path>\n" +
            "\n" +
            "        <root-path name='root_path' path='.'/>\n" +
            "\n" +
            "    </path>\n" +
            "</resources>"
        Fs.writeFile(url0, newStr, function (error) {
            if (err) {
                return err;
            }
        });
    });

    var url2 = Path.join(url, m_pathTag + "AndroidManifest.xml");
    Fs.readFile(url2, "utf8", function (err, data) {
        if (err) {
            return err
        }
        var newFile = data
        var n0 = newFile.indexOf('package=') + 8
        var n1 = newFile.indexOf('android:installLocation', n0)
        newFile = newFile.substring(0, n0) + "'" + m_packageName + "'" + "\n\t" + newFile.substring(n1)
        var v0 = newFile.indexOf('authorities=', n1) + 12
        var v1 = newFile.lastIndexOf('android:exported=')
        newFile = newFile.substring(0, v0) + "'" + m_packageName + ".fileProvider'" + "\n\t\t\t" + newFile.substring(v1)
        Fs.writeFile(url2, newFile, function (error) {
            if (err) {
                return err;
            }
        });
    });

    var url3 = Path.join(url, m_pathTag + "build.gradle");
    log("<--Myplugin--> _changeTemplatesPackageName url="+url+" url0="+url0+" url2="+url2+" url3="+url3)
    Fs.readFile(url3, "utf8", function (err, data) {
        if (err) {
            return err
        }
        var n0 = data.indexOf('applicationId') + 13
        var n1 = data.indexOf('minSdkVersion', n0)
        var newFile = data.substring(0, n0) + " " + "'" + m_packageName + "'" + "\n\t\t" + data.substring(n1)
        Fs.writeFile(url3, newFile, function (error) {
            if (err) {
                return err;
            }
        });
    });
}
/**
 * @Description: 替换icon图片
 */
function _replaceIcons() {
    // log("<--Myplugin--> _replaceIcons")
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"mipmap-hdpi"+m_pathTag+"ic_launcher.png",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"mipmap-hdpi"+m_pathTag+"ic_launcher.png")
    
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"mipmap-mdpi"+m_pathTag+"ic_launcher.png",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"mipmap-mdpi"+m_pathTag+"ic_launcher.png")
    
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"mipmap-xhdpi"+m_pathTag+"ic_launcher.png",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"mipmap-xhdpi"+m_pathTag+"ic_launcher.png")
    
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"mipmap-xxhdpi"+m_pathTag+"ic_launcher.png",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"mipmap-xxhdpi"+m_pathTag+"ic_launcher.png")
    
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"mipmap-ldpi"+m_pathTag+"ic_launcher.png",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"mipmap-ldpi"+m_pathTag+"ic_launcher.png")
    
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"mipmap-xxxhdpi"+m_pathTag+"ic_launcher.png",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"mipmap-xxxhdpi"+m_pathTag+"ic_launcher.png")
    
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"Icon.icns",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"Icon.icns")
    
    copyFile(m_projectPath + m_pathTag+"extensions"+m_pathTag+"hqq"+m_pathTag+"icon"+m_pathTag + m_pinpai + ""+m_pathTag+"game.ico",
        m_projectPath + m_pathTag+"native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"res"+m_pathTag+"game.ico")
}
/**
 * @Description: 修改保存在java代码中的包信息
 */
function _changePackageInfoInJava(options:IBuildTaskOption, result:IHQQBuildReult) {
    // log("<--Myplugin--> _changePackageInfoInJava")
    Fs.readFile(m_projectPath + "/package.json", 'utf8', function (err, files0) {
        if (!err) {
            let packagejson = JSON.parse(files0)
            let cccversion = packagejson.version
            Fs.readFile(m_projectPath + "/version.json", "utf8", function (err, files) {
                if (err) {
                    log("<--Myplugin--> _changePackageInfoInJava version.json"+ err)
                    return err
                }
                let jsonConfig = JSON.parse(files)
                let apkversion = jsonConfig.apkversion
                if(!jsonConfig[m_pinpai]){
                    log("m_pinpai="+m_pinpai+" nod data ==============================")
                    return;
                }
                if(!jsonConfig[m_pinpai][m_huanjin]){
                    log("m_pinpai="+m_pinpai+" m_huanjin="+m_huanjin+" nod data ==============================")
                    return;
                }
                let proxyid = jsonConfig[m_pinpai][m_huanjin].proxyUserID
                let str = '\"{\\\"pinpai\\\":\\\"' + m_pinpai
                    + '\\\",\\\"huanjin\\\":\\\"' + m_huanjin
                    + '\\\",\\\"system\\\":\\\"android\\\",\\\"version\\\":\\\"' + apkversion
                    + '\\\",\\\"proxyid\\\":\\\"' + proxyid
                    + '\\\",\\\"language\\\":\\\"' + m_language
                    + '\\\",\\\"country\\\":\\\"' + m_country
                    + '\\\",\\\"currency\\\":\\\"' + m_currency
                    + '\\\",\\\"engine_version\\\":\\\"' + cccversion + '\\\"}\"'
                let path = m_projectPath + m_pathTag+ "native"+m_pathTag+"engine"+m_pathTag+"android"+m_pathTag+"app"+m_pathTag+"src"+m_pathTag+"com"+m_pathTag+"cocos"+m_pathTag+"game"+m_pathTag+"AppActivity.java"
                Fs.readFile(path, "utf8", function (err, data) {
                    if (err) {
                        log("<--Myplugin--> _changePackageInfoInJava readFile"+ err)
                        return err
                    }
                    let i0 = data.indexOf("getHqqPackageInfo")
                    let i1 = data.indexOf("return ", i0) + 7
                    let i2 = data.indexOf(";", i1)
                    let ndata = data.substring(0, i1) + str + data.substring(i2)
                    Fs.writeFile(path, ndata, function (error) {
                        if (err) {
                            log("<--Myplugin--> _changePackageInfoInJava writeFile"+ err)
                            return err;
                        }
                    });
                });
            });
        } else{
            log("<--Myplugin--> _changePackageInfoInJava package.json"+ err)
            return err;
        }
    })       
}
/**
 * @Description: 修改app的名字
 */
function _changeApkName() {
    let path = m_projectPath + m_pathTag + "native" + m_pathTag + "engine" + m_pathTag + "android"+m_pathTag+"res"+m_pathTag+"values"+m_pathTag+"strings.xml"
    let end = ""
    if (m_huanjin == "dev" || m_huanjin == "pre") { // || m_huanjin == "pre"
        end = m_huanjin
    }
    let name = ""
    if (m_pinpai == 'test') {
        name = "特斯特游戏"
    } else if (m_pinpai == 'debi') {
        name = "金城娱乐"
    } else if (m_pinpai == 'xingba') {
        name = "杏吧娱乐"
    } else if (m_pinpai == 'yuyu') {
        // name = "渔鱼游戏"
        name = "富鑫II测试版"
    } else if (m_pinpai == "xinsheng") {
        name = "大喜发"
    } else if (m_pinpai == "xingui") {
        name = "新贵游戏"
    } else if (m_pinpai == "fuxin") {
        name = "富鑫II"
    } else if (m_pinpai == "xinhao") {
        name = "新豪游戏"
    } else if (m_pinpai == "xinlong") {
        name = "乐派游戏"
    } else if (m_pinpai == "nineone") {
        name = "91游戏"
    } else if (m_pinpai == "huangshi") {
        name = "皇室游戏"
    } else if (m_pinpai == "juding") {
        name = "聚鼎娱乐"
    } else if (m_pinpai == "huaxing") {
        name = "华兴娱乐"
    } else if (m_pinpai == "ninetwo") {
        name = "92游戏"
    } else if (m_pinpai == "tianqi") {
        name = "天启游戏"
    } else if (m_pinpai == "chaofan") {
        name = "超凡娱乐"
    } else if (m_pinpai == "wansheng") {
        name = "万盛娱乐"
    } else if (m_pinpai == "jiaxing") {
        name = "嘉兴娱乐"
    } else if (m_pinpai == "fiveo") {
        name = "51游戏"
    } else if (m_pinpai == "letian") {
        name = "乐天游戏"
    } else if (m_pinpai == "xingyao") {
        name = "杏耀娱乐"
    } else if (m_pinpai == "tetu") {
        name = "特兔游戏"
    } else if (m_pinpai == "quyou") {
        name = "趣游"
    }
    name += end
    let data = '<resources>\n' +
        '<string name="app_name" translatable="false">' + name + '</string>\n' +
        '</resources>'
    Fs.writeFile(path, data, function (error) {
        if (error) {
            return error;
        }
    });
}
/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    Fs.access(dist, function (err) {
        if (err) {
            // 目录不存在时创建目录
            Fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if (err) {
            callback(err);
        } else {
            Fs.readdir(src, function (err, paths) {
                if (err) {
                    callback(err)
                } else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        Fs.stat(_src, function (err, stat) {
                            if (err) {
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if (stat.isFile()) {
                                    Fs.writeFileSync(_dist, Fs.readFileSync(_src));
                                } else if (stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}
/**
 * @Description: 删除文件夹下所有内容
 */
function delDir(path) {
    if (Fs.existsSync(path)) {
        let files = Fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (Fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                Fs.unlinkSync(curPath); //删除文件
            }
        });
        // Fs.rmdirSync(path);
    }
}
/**
 * @Description: 复制文件
 */
function copyFile(src, dist) {
    Fs.stat(src, function (err,stats) {
        if(!err){
            Fs.writeFileSync(dist, Fs.readFileSync(src));
        } else{
            log(src + "no file!")
        }
      });
}
/**
 * @Description: 复制更新文件到指定目录
 */
function moveFileToGitPath() {
    Fs.readFile(m_projectPath + "/project.json", 'utf8', function (err, files) {
        if (!err) {
            let projectjson = JSON.parse(files)
            let cccversion = projectjson.version
            Fs.access(m_gitPath, function (err) {
                if (err) {
                    log("不存在git仓库路径，请在插件面板设置git仓库路径"+ err)
                    return
                }
            })
            let gitPath = m_gitPath + "com." + m_pinpai + "." + m_huanjin + ".android"
            let destpath = gitPath + m_pathTag
            if (cccversion != '2.1.3') {
                destpath = gitPath + m_pathTag + "ccc" + cccversion + m_pathTag
            }
            Fs.access(destpath, function (err) {
                if (err) {
                    Fs.mkdirSync(destpath);
                }
                Fs.access(destpath + m_pathTag + m_versionjson.version["hall"], function (err) {
                    if (err) {
                        Fs.mkdirSync(destpath + m_pathTag + m_versionjson.version["hall"]);
                    }
                    Fs.readdir(m_buildPath, function (err, paths) {
                        paths.forEach(function (path) {
                            if (path.match("manifest")) {
                                copyFile(m_buildPath + m_pathTag + path, destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + path)
                                copyFile(m_buildPath + m_pathTag + path, destpath + m_pathTag + path)
                            } else if (path.match("assets") || path.match("remote") || path.match("src")) {
                                copyDir(m_buildPath + m_pathTag + path, destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + path, (err) => {
                                    log("复制文件报错"+ err)
                                })
                                copyDir(m_buildPath + m_pathTag + path, destpath + m_pathTag + path, (err) => {
                                    log("复制文件报错"+ err)
                                })
                            }
                        })
                    })
                    copyFile(m_projectPath + m_pathTag + "version.json", destpath + m_pathTag + m_versionjson.version["hall"] + m_pathTag + "version.json")
                    copyFile(m_projectPath + m_pathTag + "version.json", destpath + m_pathTag + "version.json")
                });
            });
        } else {
            log(err);
        }
    })
}

/**
 * @description: 修改gradle.properties
 */
function _changegradleproperties(){
    let path = m_buildPath + m_pathTag + "proj" + m_pathTag + "gradle.properties"
    Fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            log("<--Myplugin--> _changegradleproperties readFile"+ err)
            return err
        }
        
        let ndata = data;
        if(ndata.indexOf("android.useAndroidX=true") === -1 ){
            ndata += "\nandroid.useAndroidX=true";
        }
        if(ndata.indexOf("android.enableJetifier=true") === -1 ){
            ndata += "\nandroid.enableJetifier=true";
        }
        Fs.writeFile(path, ndata, function (error) {
            if (err) {
                log("<--Myplugin--> _changegradleproperties writeFile"+ err)
                return err;
            }
        });
    });
}
/**
 * @description: 修改buildgradle
 */
 function _changebuildgradle(){
    let path = m_buildPath + m_pathTag + "proj" + m_pathTag + "build.gradle";
    Fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            log("<--Myplugin--> _changebuildgradle readFile" +err)
            return err
        }
        
        let ndata = "// Top-level build file where you can add configuration options common to all sub-projects/modules.\n"
        +"\n"
        +"buildscript {\n"
        +"\n"
        +"    repositories {\n"
        +"        google()\n"
        +"        jcenter()\n"
        +"    }\n"
        +"    dependencies {\n"
        +"        classpath 'com.android.tools.build:gradle:4.1.0'\n"
        +"\n"
        +"        // NOTE: Do not place your application dependencies here; they belong\n"
        +"        // in the individual module build.gradle files\n"
        +"        classpath 'com.google.gms:google-services:4.3.10'\n"
        +"    }\n"
        +"}\n"
        + "\n"
        +"apply from: NATIVE_DIR +'/build.gradle'"
        Fs.writeFile(path, ndata, function (error) {
            if (err) {
                log("<--Myplugin--> _changebuildgradle writeFile", err)
                return err;
            }
        });
    });
 }