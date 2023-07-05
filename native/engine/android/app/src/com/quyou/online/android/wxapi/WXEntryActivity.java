package com.quyou.online.android.wxapi;

import android.util.Log;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

//#region opensdk
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelbiz.SubscribeMessage;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessView;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessWebview;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;
import com.tencent.mm.opensdk.modelmsg.WXAppExtendObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
//#endregion

import com.cocos.game.AppActivity;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler{

    private String TAG = "WxLogin_WXEntryActivity";
    private IWXAPI api;
    private final String APP_ID = "wx6a2424acc9407666"; //Constants.APP_ID;    //wx id
    private final String App_Secret = "23a7b7e711a42d670f30376bde58cf58";
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        Log.d(TAG,">>>> In wxEntryActivity onCreate");
        super.onCreate(savedInstanceState);
        
        api = WXAPIFactory.createWXAPI(this, APP_ID, false);
        api.registerApp(APP_ID);
        // handler = new MyHandler(this);
        Log.d(TAG,">>>> In wxEntryActivity api is " + api);
        
        try {
            Intent intent = getIntent();
            api.handleIntent(intent, this);
            Log.d(TAG,">>>> api is handleIntent");
        } catch (Exception e) {
            Log.e(TAG, ">>>> Error: handleIntent init fail;");
            e.printStackTrace();
        }
	}

    @Override
    protected void onNewIntent(Intent intent) {
        Log.d(TAG,">>>> In intent is " + intent);
        super.onNewIntent(intent);
        setIntent(intent);
        api.handleIntent(intent, this);
    }

    @Override
	public void onReq(BaseReq req) {
        Log.d(TAG, ">>>> BaseReq, errCode: " + 1);

        switch (req.getType()) {
            case ConstantsAPI.COMMAND_GETMESSAGE_FROM_WX:
                goToGetMsg();		
                break;
            case ConstantsAPI.COMMAND_SHOWMESSAGE_FROM_WX:
                // goToShowMsg((ShowMessageFromWX.Req) req);
                break;
            default:
                break;
        }
            finish();
    }

    //向微信傳送的請求的響應資訊回撥該方法
	@Override
	public void onResp(BaseResp resp) {
        Log.d(TAG, ">>>> onResp, apis is " + api);
        String code = ((SendAuth.Resp) resp).code;
        //Log.d(TAG, ">>>> BaseResp type: " + code);
        
        String result;
        switch (resp.errCode) 
        {
            case BaseResp.ErrCode.ERR_OK: 
                Log.d(TAG, ">>>> 发送成功");
                AppActivity.code = code;
                result = "ERR_OK";
                break;
            case BaseResp.ErrCode.ERR_USER_CANCEL:
                Log.d(TAG, ">>>> 发送取消");
                result = "ERR_USER_CANCEL";
                break;
            case BaseResp.ErrCode.ERR_AUTH_DENIED:
                Log.d(TAG, ">>>> 发送被拒绝");
                result = "ERR_AUTH_DENIED";
                break;
            case BaseResp.ErrCode.ERR_UNSUPPORT:
                Log.d(TAG, ">>>> 不支持错误");
                result = "ERR_UNSUPPORT";
                break;
            default:
                Log.d(TAG, ">>>> 发送返回");
                result = "ERR_SENT_FAILED";
                break;
        }
        
        AppActivity.wx_errCode = result;
        AppActivity.isGetCode = true;
        AppActivity.numErrCode = resp.errCode;
        Log.d(TAG, "result:" + resp.errCode);

        finish();
    }

    private void goToGetMsg() {
        Log.d(TAG,">>>> go to get msg.");
        Intent intent = new Intent(this, AppActivity.class);
        intent.putExtras(getIntent());
        startActivity(intent);
        finish();
    }
}