System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
    "use strict";
  
    var _reporterNs, _cclegacy, NetManagerBase, commonEvent, maskCarnivalNetManager, _crd;
  
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
    function _reportPossibleCrUseOfINetManager(extras) {
      _reporterNs.report("INetManager", "../../../../script/subgame/base/NetManagerBase", _context.meta, extras);
    }
  
    function _reportPossibleCrUseOfNetManagerBase(extras) {
      _reporterNs.report("NetManagerBase", "../../../../script/subgame/base/NetManagerBase", _context.meta, extras);
    }
  
    function _reportPossibleCrUseOfcommonEvent(extras) {
      _reporterNs.report("commonEvent", "../../../../script/event/CommonEventManage", _context.meta, extras);
    }
  
    function _reportPossibleCrUseOfCommonEventManage(extras) {
      _reporterNs.report("CommonEventManage", "../../../../script/event/CommonEventManage", _context.meta, extras);
    }
  
    function _reportPossibleCrUseOfmaskCarnivalModel(extras) {
      _reporterNs.report("maskCarnivalModel", "./maskCarnivalModel", _context.meta, extras);
    }
  
    _export("maskCarnivalNetManager", void 0);
  
    return {
      setters: [function (_unresolved_) {
        _reporterNs = _unresolved_;
      }, function (_cc) {
        _cclegacy = _cc.cclegacy;
      }, function (_unresolved_2) {
        NetManagerBase = _unresolved_2.NetManagerBase;
      }, function (_unresolved_3) {
        commonEvent = _unresolved_3.commonEvent;
      }],
      execute: function () {
        _crd = true;
  
        _cclegacy._RF.push({}, "e1bb9p+J4VDjI8d+I+lvVkG", "maskCarnivalNetManager", undefined);
  
        _export("maskCarnivalNetManager", maskCarnivalNetManager = class maskCarnivalNetManager extends (_crd && NetManagerBase === void 0 ? (_reportPossibleCrUseOfNetManagerBase({
          error: Error()
        }), NetManagerBase) : NetManagerBase) {
          static get inst() {
            if (!this.instance) {
              this.instance = new maskCarnivalNetManager();
            }
  
            return this.instance;
          }
          /**
           * 预留更换事件监听对象方法
           */
  
  
          static get evRepo() {
            return _crd && commonEvent === void 0 ? (_reportPossibleCrUseOfcommonEvent({
              error: Error()
            }), commonEvent) : commonEvent;
          }
  
          get model() {
            return this._model;
          }
  
          constructor() {
            /**
             * 传后端定义的gamecode 
             */
            super('mahjong-ways');
          }
  
        });
  
        _defineProperty(maskCarnivalNetManager, "instance", void 0);
  
        _cclegacy._RF.pop();
  
        _crd = false;
      }
    };
  });
  //# sourceMappingURL=maskCarnivalNetManager.js.map