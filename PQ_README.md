# PQ游戏说明 (PQ Game Introduction)

# 目录结构 (Directory Structure)
```typescript
├──assets 
|   |──subgame
|   |   |──pq                     PQ游戏目录  (PQ Game Directory)
|   |   |   |──game               子游戏目录  (Sub-Game Directory)
|   |   |   |   |──mjhl           - 麻将胡了  (Mahjong)
|   |   |   |   └──example        - 范例(可参考)  (Example for reference)
|   |   |   |──bigimage              大图素材  (Huge Photo Material)
|   |   |   |   └──gameloading    - 载入场景与背景图  (Load scene and background photo)
|   |   |   |──image              素材  (Materials)
|   |   |   |   |──gameloading    - 载入场景与背景图  (Load scene and background photo)
|   |   |   |   └──icons          - 列表ICON图  (Icon list photo)
|   |   |   |──pqui               公用介面  (Public Interface)
|   |   |   └──script
|   |   |   |   |──config         从hqqhub中取得资料设置资料(例:token)  (Obtain data setting data from "hqqhub" (ex: token))
|   |   |   |   |──event          事件(与原型)  (events and prototypes)
|   |   |   |   |──gameloading    子游戏加载处理  (Sub-game loading process)
|   |   |   |   |──hqqhub         开发预设环境与账号(###补充说明)  (Developing default setting environment account (TBD))
|   |   |   |   |──network        网路传输与proto协议(参考)  (Network transmission and proto protocol (reference))
|   |   |   |   |──ui             
|   |   |   |   |   └──gamelist   游戏列表  (Game list)
```    

# 新增PQ的子游戏  (Added PQ sub-games)

1. 子游戏路径: pq/game/${gameName}/
Sub-game path:pq/game/${gameName}/

2. 加载图片路径与命名方式
Load image path and naming method

路径(加载背景图): pq/bigImages/gameloading/background/${gameName}_loding_background
Path (load background image):pq/bigImages/gameloading/background/${gameName}_loding_background

路径(加载模糊背景图): pq/images/gameloading/background/${gameName}_background
Path (load blur background image):pq/images/gameloading/background/${gameName}_background

路径(ICON图): pq/images/icons/${spriteFrameName}
Path (ICON map): pq/images/icons/${spriteFrameName}

3. 新增子游戏入口资讯 (gameConfigs)
Added sub-game entry information (gameConfigs)

路径: pq/script/ui/gamelist/gameList.ts
Path: pq/script/ui/gamelist/gameList.ts

4. 参考pg/game/example, 调整公用部份
See pg/game/example as reference, adjust common parts

 a. 准备主场景并将mainLoop挂在节点canvas, 并创建节点pqui_UI
    Prepare the main scene and hang the mainLoop on the node canvas, and create the node pqui_UI

 b. 将sender繼承覆寫  (Override sender inheritance)
   - onSpinButtonClicked
   - onAutoSpinOnce
   - onStartFreeGameButtonClicked
   - onFreeGame

 c. 将receiver繼承覆寫  (Override receiver inheritance)
   - EnumSubSpinResp              下注回传  (Bet return)
   - EnumSubEnterGameResp         进入游戏  (Enter game)
   - EnumSubUserRefreshTokenResp  更新token  (Update Token)

 d. 补齐eventRepository特定事件  (Complete eventRepository specific events)
   - onShowRules                  显示规则  (Show rules)
   - onShowPaytable               显示赔付  (Show Odds)
   ...                            ...

## 补充说明(Additional information): 
# 特别、特别、特别注意 (Please be aware, be cautios)
复制专案请在COCOS CREATOR资源管理器內复制後再进行修改  (To copy a project, please copy it in the COCOS CREATOR explorer and then modify it)

# 子游戏资源动态加载与释放(Dynamic loading and release of sub-game resources)
建议多使用动态加载及释放资源
It is recommended to use more dynamic loading and releasing resources

# 图片加入自动图集 (Add Picture to Automatic Atlas)
1. 加入COCOS CREATOR的自动图集尺寸1024x1024
Adding Automatic Atlas to COCOS CREATOR, size 1024x1024
  auto-atlas.meta:
  - "filterUnused": false,
  - "removeTextureInBundle": false,
  - "removeImageInBundle": false,
  - "removeSpriteAtlasInBundle": false,
2. 以下情况都需分开放置,不应该在自动图集与其下层资料夹内
The following situations needs to be placed separately, and should not be in the automatic atlas and its lower folders
  - 单边尺寸超过1024
  Unilateral size exceeding 1024
  - 已引用素材 例如: label-atlas、spine..
  Used materials such as: label-atlas、spine.. etc.

# 事件查询方式(搜索全域)  (Event query method (searching the whole domain) "Entire domain" 
1. 从pq_EventRepository中查询特定事件  (Query specific events from pq_EventRepository)
2. files to include: assets/subgame/pq/
3. 判断方式:来源为pqui与mjhl, 代表有互相交互行为  (Judgment method: the source is "pqui" and "mjhl", which means, there is mutual interaction)

# PQ进入子游戏时, 预加载在deBug模式中会关闭  (When PQ enters a sub-game, pre-loading will be turned off in debug mode)
uri: pq/script/gameloading/pq_GameLoading.ts#preloadAssets()

# 更新allGame, 若入口没开, 以开发模式关闭进入游戏方式  （Update "allGame", if the entrance is not open, close the game mode in development mode)
uri: pq/script/hallScene_test#initSubGameBtn() //子游戏初始化  (Sub-game initialization)
1. 查找hotUpdateMgr.getSubGameIsOnUp
Search/lookup hotUpdateMgr.getSubGameIsOnUp
2. 留下else内容其他隐藏
Leave "else" content, hide others
