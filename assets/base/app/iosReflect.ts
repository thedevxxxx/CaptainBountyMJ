import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('IosReflect')
export class IosReflect extends Component {
    callback:Function = null;
    
    ctor () {
    }

    setCallback (callback: any) {
        this.callback = callback
    }

    testWebSpeedAction (url: any) {
        if (url) {
           if (this.callback) {
               this.callback(url);
           }
        }
    }
    /** 设置设备id */
    setDeviceId(deviceid) {
        if(deviceid){
            hqq.app.deviceID = deviceid;
        }
    }
}
