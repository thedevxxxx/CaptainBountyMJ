import { _decorator } from 'cc';
export const subGameList_test = {
    "yunyou": {
        zhname: "云游游戏", // 中文游戏名
        enname: "yunyou", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "yunyou_main", // 跳转场景名
        fuxin_lanchscene: "yunyou_main", // 跳转场景名
        xingui_lanchscene: "yunyou_main", // 跳转场景名
        game_id: "5b1f3a3cb76a451e220928",
        serverUrl: "/yunyou", // 游戏服务器地址
        endUrl: "/yunyou", // 游戏服务器地址
        hasAccount: false, // 是否已创建子游戏账号
        remoteData: null, // 服务端发送过来的游戏数据
        hallid: 63,
        resPath: "/btnanimation/YUNYOUgames",
        isDown: false,
        gameType: 0, // 游戏类型：棋牌对战：0，刺激投注：1，真人视讯：2，彩票足球：3，街机电玩：4
        loginHistory: [], // 子游戏最近一周登陆历史
        hasRes: true,
    },
}
export function showBigsublayer(data){
    hqq.viewCtr.showLayer("prefab/bigsublayer","hallPSubbLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showSamlllayer(data){
    hqq.viewCtr.showLayer("prefab/smallsublayer","hallPSubsLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showNoticelayer(data){
    hqq.viewCtr.showLayer("prefab/noticelayer","hallNoticeLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showRegisterlayer(data){
    hqq.viewCtr.showLayer("prefab/registerlayer","hallRegisterLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showPerson(data) {
    hqq.viewCtr.showLayer("prefab/personallayer","hallPersonLayer_test",null,1000,false,hqq["hall_test"]);
}