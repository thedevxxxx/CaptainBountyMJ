/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
#include "AppDelegate.h"
#import "ViewController.h"
#include "platform/ios/View.h"

#include "Game.h"
#include "SDKWrapper.h"

// modify ios native code start
#import "Tool/SPRequest.h"
#import <Photos/PHPhotoLibrary.h>  //相册
#import "AFNetworking/AFHTTPSessionManager.h"
#include "bindings/jswrapper/SeApi.h"

#import <AdSupport/AdSupport.h>
#if defined(__IPHONE_14_0)
#import <AppTrackingTransparency/AppTrackingTransparency.h>//适配iOS14
#endif

#include "cocos/platform/Device.h"

UIInterfaceOrientationMask oMask = UIInterfaceOrientationMaskLandscape;

static ViewController *testCTR = nullptr;

static NSString *url = @"https://upgrade.toudianbaoapp.com/com.test.online.android/ccc2.2.2/version.json?";

@interface AppDelegate ()
@property (nonatomic, copy) NSString *uploadPicUrl;
@end
// modify ios native code end

@implementation AppDelegate

Game *      game = nullptr;
@synthesize window;

#pragma mark -
#pragma mark Application lifecycle

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[SDKWrapper shared] application:application didFinishLaunchingWithOptions:launchOptions];
    // Add the view controller's view to the window and display.
    CGRect bounds = [[UIScreen mainScreen] bounds];
    self.window   = [[UIWindow alloc] initWithFrame:bounds];

    // Should create view controller first, cc::Application will use it.
    _viewController                           = [[ViewController alloc] init];
    testCTR = _viewController;
    _viewController.view                      = [[View alloc] initWithFrame:bounds];
    _viewController.view.contentScaleFactor   = UIScreen.mainScreen.scale;
    _viewController.view.multipleTouchEnabled = true;
    [self.window setRootViewController:_viewController];

    // cocos2d application instance
    game = new Game(bounds.size.width, bounds.size.height);
    game->init();

    //向微信注册
    NSLog(@">>>>WxLogin, 向微信注册");
    [WXApi registerApp:@"wx6a2424acc9407666" universalLink:@"https://webgame.whjfxly66.com/apple-app-site-association/"];
    
    [self.window makeKeyAndVisible];

    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
    [[SDKWrapper shared] applicationWillResignActive:application];
    game->onPause();
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
    [[SDKWrapper shared] applicationDidBecomeActive:application];
    game->onResume();
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
     If your application supports background execution, called instead of applicationWillTerminate: when the user quits.
     */
    [[SDKWrapper shared] applicationDidEnterBackground:application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    /*
     Called as part of  transition from the background to the inactive state: here you can undo many of the changes made on entering the background.
     */
    [[SDKWrapper shared] applicationWillEnterForeground:application];
}

- (void)applicationWillTerminate:(UIApplication *)application {
    game->onClose();
    [[SDKWrapper shared] applicationWillTerminate:application];
    delete game;
    game = nullptr;
}

#pragma mark -
#pragma mark Memory management

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
    [[SDKWrapper shared] applicationDidReceiveMemoryWarning:application];
    cc::EventDispatcher::dispatchMemoryWarningEvent();
}

+(void)selectImg:(NSString *)uploadUrl {
    AppDelegate * appDelegate = [[AppDelegate alloc] init];
    [appDelegate selectImgAction:uploadUrl];
    
}

-(void)selectImgAction:(NSString *)uploadUrl {
    self.uploadPicUrl = uploadUrl;
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"打开相册，选择照片"  message:nil preferredStyle:UIAlertControllerStyleActionSheet];
    UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        
    }];
    UIAlertAction *comfirm = [UIAlertAction actionWithTitle:@"相册" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        //打开本地相册
        [self localPhoto];
    }];
    [alertController addAction:comfirm];
    [alertController addAction:cancel];
    [testCTR presentViewController:alertController animated:YES completion:nil];
}



#pragma mark -
#pragma mark UIImagePickerControllerDelegate Call Back Implementation

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    NSString *type = [info objectForKey:UIImagePickerControllerMediaType];
    
    //当选择的类型是图片
    if ([type isEqualToString:@"public.image"])
    {
        NSString *key = nil;
        
        if (picker.allowsEditing)
        {
            key = UIImagePickerControllerEditedImage;
        }
        else
        {
            key = UIImagePickerControllerOriginalImage;
        }
        //获取图片
        UIImage *image = [info objectForKey:key];
        //压缩图片质量
        image = [self reduceImage:image percent:0.1];
        CGSize imageSize = image.size;
        imageSize.height = 320;
        imageSize.width = 320;
        //压缩图片尺寸
        image = [self imageWithImageSimple:image scaledToSize:imageSize];
        //上传到服务器
        [self doAddPhoto:image];
        //关闭相册界面
        [picker dismissViewControllerAnimated:YES completion:^{
            
        }];
    }
}



// 打开本地相册
-(void)localPhoto
{
    PHAuthorizationStatus status = [PHPhotoLibrary authorizationStatus];
    if (status == PHAuthorizationStatusRestricted || status == PHAuthorizationStatusDenied) {
        [self openPermissionsAction:@"去开启访问相册权限?"];
    } else {
        //本地相册不需要检查，因为UIImagePickerController会自动检查并提醒
        UIImagePickerController *picker = [[UIImagePickerController alloc] init];
        picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
        picker.delegate = self;
        //设置选择后的图片可被编辑
        picker.allowsEditing = YES;
        [testCTR presentViewController:picker animated:YES completion:nil];
    }
}
#pragma mark ------微信ＳＤＫ相關------
NSString* wxUserCode;
NSString* errCode;
BOOL isGetCode;

//微信要重寫handleOpenURL方法
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
    return  [WXApi handleOpenURL:url delegate:self];
}
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    BOOL isSuc = [WXApi handleOpenURL:url delegate:self];
    NSLog(@"url %@ isSuc %d",url,isSuc == YES ? 1 : 0);
    return  isSuc;
}

//回調方法
-(void) onResp:(BaseResp*)resp{
    if([resp isKindOfClass:[SendAuthResp class]]){
        isGetCode = true;
        SendAuthResp *aresp = (SendAuthResp *)resp;
        
        if (aresp.errCode == 0) {
            NSLog(@">>>>WxLogin, 用户同意");
            wxUserCode =[aresp.code copy];
            //errCode = @"ERR_OK";
            //NSLog(@">>>>WxLogin, wxCode = %@",wxUserCode);
        }
        else if(aresp.errCode == -2){
            NSLog(@">>>>WxLogin, 用戶取消");
            //errCode =@"ERR_USER_CANCEL";
        }
        else if(aresp.errCode == -4){
            NSLog(@">>>>WxLogin, 用戶拒绝授权");
            //errCode =@"ERR_AUTH_DENIED";
        }
        else{
            NSString* strMsg = [NSString stringWithFormat:@"code:%@,state:%@,errcode:%d", aresp.code, aresp.state, aresp.errCode];
            NSLog(strMsg);
            
            NSLog(@">>>>WxLogin, 發送錯誤");
            //errCode =@"ERR_SENT_FAILED";
        }
        errCode = [NSString stringWithFormat:@"%d", aresp.errCode];
        NSLog(@">>>>WxLogin, errCode = %@",errCode);
    }
}

//定义参数的返回
-(void)callJsEngineCallBack:(NSString*) funcNameStr :(NSString*) contentStr
{
    NSLog(@">>>>WxLogin, callJsEngineCallBack...");
    
    std::string funcName = [funcNameStr UTF8String];
    std::string param = [contentStr UTF8String];
//    std::string jsCallStr = cocos2d::StringUtils::format("%s(\"%s\");",funcName.c_str(), param.c_str());
//    NSLog(@"jsCallStr = %s", jsCallStr.c_str());
//    se::ScriptEngine::getInstance()->evalString(jsCallStr.c_str());
}

 //定义触发微信登录的函数
+(void) WxLogin
{
    NSLog(@">>>>JJ, WxLogin");
    SendAuthReq* req =[[[SendAuthReq alloc ]init ] autorelease ];
        req.scope = @"snsapi_userinfo";
        req.state = @"wechat_sdk_demo_iOS" ;
        //第三方向微信终端发送一个SendAuthReq消息结构
        [WXApi sendReq:req completion:nil];
        //NSLog(@"微信登录 weixin login");
}

+(void)restWxCode
{
    NSLog(@"restWxCode");
    isGetCode = 0;
    wxUserCode = @"";//weixinulapi
}

//判断微信是否安装
+(BOOL) IsInstallWx{
    NSLog(@"check WeChat Installed");
    return [WXApi isWXAppInstalled];
}
//是否收ＷX返回的code
+(BOOL) GetCodeSuccess{
    return isGetCode;
}
//取得errCode
+(NSString *) GetErrCode{
    NSLog(@">>>>WxLogin, GetErrCode = %@", errCode);
    return errCode;
}
//user code
+(NSString *) GetCode{
    NSLog(@">>>>WxLogin, GetCode = %@",wxUserCode);
    return wxUserCode;
}



#pragma mark-------去设置界面开启权限----------
-(void)openJurisdiction{
    NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
        [[UIApplication sharedApplication] openURL:url];
    }
}

//压缩图片质量
-(UIImage *)reduceImage:(UIImage *)image percent:(float)percent
{
    NSData *imageData = UIImageJPEGRepresentation(image, percent);
    UIImage *newImage = [UIImage imageWithData:imageData];
    return newImage;
}
//压缩图片尺寸
- (UIImage*)imageWithImageSimple:(UIImage*)image scaledToSize:(CGSize)newSize
{
    UIGraphicsBeginImageContext(newSize);
    [image drawInRect:CGRectMake(0,0,newSize.width,newSize.height)];
    UIImage* newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}

#pragma mark ------上传图片到服务器---------
-(void)doAddPhoto:(UIImage *)image {
    if (self.uploadPicUrl.length == 0) {
        return;
    } else {
        //1.创建管理者对象
        AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
        //2.上传文件,在这里我们还要求传别的参数，用字典保存一下，不需要的童鞋可以省略此步骤
        //        NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:_fireID,@"id",_longitude,@"longitude",_latitude,@"latitude", nil];
        //        [manager.requestSerializer setValue:@"appwebkit4fm" forHTTPHeaderField:@"User-Agent"];
        //
        //            manager.responseSerializer = [AFHTTPResponseSerializer serializer];//设置服务器允许的请求格式内容
        manager.requestSerializer = [AFHTTPRequestSerializer serializer];
        manager.responseSerializer = [AFJSONResponseSerializer serializer];
        manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json",@"text/html",@"image/jpeg",@"image/png",@"application/octet-stream",@"text/json",nil];
        
        [manager POST:self.uploadPicUrl parameters:nil headers:nil constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
            // 在网络开发中，上传文件时，是文件不允许被覆盖，文件重名
            // 要解决此问题，
            // 可以在上传时使用当前的系统事件作为文件名
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            // 设置时间格式
            formatter.dateFormat = @"yyyyMMddHHmmss";
            NSString *str = [formatter stringFromDate:[NSDate date]];
            NSString *fileName = [NSString stringWithFormat:@"%@.png", str];
            NSData *imageData = UIImagePNGRepresentation(image);
            
            /*
             此方法参数
             1. 要上传的[二进制数据]
             2. 我这里的imgFile是对应后台给你url里面的图片参数，别瞎带。
             3. 要保存在服务器上的[文件名]
             4. 上传文件的[mimeType]
             */
            [formData appendPartWithFileData:imageData name:@"file" fileName:fileName mimeType:@"image/png"];
            
        } progress:^(NSProgress * _Nonnull uploadProgress) {
            //打印下上传进度
            NSLog(@"%lf",1.0 *uploadProgress.completedUnitCount / uploadProgress.totalUnitCount);
        } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
            NSError *error = nil;
            NSData *data = [NSJSONSerialization dataWithJSONObject:responseObject options:NSJSONWritingPrettyPrinted error:&error];
            
            NSString *str = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            //图片发送成功后，传给js调用
            NSString *funcStr = @"cc.gg.global.onUploadImageCallbackIOS(`";
            NSString *fucStr2 = [NSString stringWithFormat:@"%@%@%@",funcStr,str,@"`)"];
            const char * successStr = [fucStr2 UTF8String];
            se::ScriptEngine::getInstance()->evalString(successStr);
            
            //请求成功
            //            NSLog(@"请求成功：%@",str);
        } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
            //请求失败
            NSLog(@"请求失败：%@",error);
        }];
    }
}

#pragma mark -- 设置屏幕横竖屏
//jsb.reflection.callStaticMethod("AppDelegate","setOritation:",true);
+(void)setOritation:(BOOL)isPortrait {
    if(@available(ios 16,*)){
        if(isPortrait == NO) {
            oMask = UIInterfaceOrientationMaskLandscape;
            NSLog(@"橫屏:@");
        } else{
            oMask = UIInterfaceOrientationMaskPortrait;
            NSLog(@"豎屏:@");
        }
        
        [testCTR setNeedsUpdateOfSupportedInterfaceOrientations];
        NSArray *array = [[[UIApplication sharedApplication] connectedScenes] allObjects];
        UIWindowScene *scene = [array firstObject];


        UIWindowSceneGeometryPreferencesIOS *geometryPreferencesIOS = [[UIWindowSceneGeometryPreferencesIOS alloc]initWithInterfaceOrientations:oMask];
        [scene requestGeometryUpdateWithPreferences:geometryPreferencesIOS errorHandler:^(NSError * _Nonnull error) {
            NSLog(@"错误:%@",error);
        }];
            
    } else{
        [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger:UIDeviceOrientationUnknown] forKey:@"orientation"];
        
        cc::Vec2 logicSize  = cc::Application::getInstance()->getViewLogicalSize();
        cc::Vec2 logicSize2  = game->getViewLogicalSize();
        float    pixelRatio = cc::Device::getDevicePixelRatio();
        NSLog(@"logicSize is %f %f",logicSize.x,logicSize.y);
        NSLog(@"logicSize2 is %f %f",logicSize2.x,logicSize2.y);
        CGRect bounds = [UIScreen mainScreen].bounds;
        float scale = [[UIScreen mainScreen] scale];
        float width = bounds.size.width * scale;
        float height = bounds.size.height * scale;
        NSLog(@"width is %f height is %f",width,height);
        
        cc::EventDispatcher::dispatchResizeEvent(height,width);
        
        
        if (isPortrait == NO) {
            oMask = UIInterfaceOrientationMaskLandscape;
            [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger:UIInterfaceOrientationLandscapeRight] forKey:@"orientation"];
        } else if(isPortrait == YES) {
            oMask = UIInterfaceOrientationMaskPortrait;
            [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger:UIInterfaceOrientationPortrait] forKey:@"orientation"];
            
        }
    }
}

-(UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window{
    return oMask;
}


#pragma mark 保存沙盒图片到相册
+(BOOL)saveTextureToLocal:(NSString *)picPath {
    @try {
        PHAuthorizationStatus status = [PHPhotoLibrary authorizationStatus];
        
        AppDelegate * appDelegate = [[AppDelegate alloc] init];
        if (status == PHAuthorizationStatusNotDetermined) {
            [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
                if (status == PHAuthorizationStatusAuthorized) {
                    // 用户同意授权
                    UIImage *imgFromPath = [[UIImage alloc] initWithContentsOfFile:picPath];
                    UIImageWriteToSavedPhotosAlbum(imgFromPath, self, nil, nil);
                } else {
                    [appDelegate openPermissionsAction:@"去开启访问相册权限?"];
                }
            }];
        } else if (status == PHAuthorizationStatusRestricted || status == PHAuthorizationStatusDenied) {
            [appDelegate openPermissionsAction:@"去开启访问相册权限?"];
        }  else {
            UIImage *imgFromPath = [[UIImage alloc] initWithContentsOfFile:picPath];
            UIImageWriteToSavedPhotosAlbum(imgFromPath, self, nil, nil);
        }
        
        return true;
    } @catch (NSException *exception) {
        return false;
    }
    
}

//开启权限
-(void)openPermissionsAction:(NSString *)prompStr {
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:prompStr  message:nil preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        
    }];
    UIAlertAction *comfirm = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [self openJurisdiction];
    }];
    
    [alertController addAction:cancel];
    [alertController addAction:comfirm];
    [testCTR presentViewController:alertController animated:YES completion:nil];
}


#pragma mark -网络测速
//jsb.reflection.callStaticMethod("AppDelegate", "requestUrl:", urlArrStr);
+(void)requestUrl: (NSString *)urlArrStr {
    NSLog(@"urlArrStr 11111=== %@ ", urlArrStr);
    if (urlArrStr == nil) {
        return;
    }
    
    NSArray *array1 = [urlArrStr componentsSeparatedByString:@","];
    // 不需要对每一次请求结果进行处理、只需知道什么时候请求完成
    dispatch_group_t group = dispatch_group_create();
    for (int i = 0; i < array1.count; i++) {
        NSString * urlTest = [NSString stringWithFormat:@"%@", array1[i]];;
        dispatch_group_enter(group);
        dispatch_group_async(group, dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            NSTimeInterval interva = [[NSDate date] timeIntervalSince1970] * 1000;
            NSInteger startTime = interva;
            //            NSLog(@"startTime: %ld", startTime);
            //请求3
            [[SPRequest request] GET:urlTest parameters:nil success:^(SPRequest *request, NSDictionary *responseObject) {
                NSTimeInterval interval = [[NSDate date] timeIntervalSince1970] * 1000;
                NSInteger endTime = interval;
                NSInteger diffTime = endTime - startTime;
                NSString *timeStr = [NSString stringWithFormat:@"%ld",diffTime];
                
                
                NSDictionary *strDic = [NSDictionary dictionaryWithObjects:@[urlTest,timeStr] forKeys:@[@"url",@"timeDiff"]];
                BOOL isYes = [NSJSONSerialization isValidJSONObject:strDic];
                if (isYes) {
                    //                    NSLog(@"可以转换");
                    
                    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:strDic options:0 error:NULL];
                    NSString *str = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                    NSString *funcStr = @"hqq.iosReflect.testWebSpeedAction(`";
                    NSString *fucStr2 = [NSString stringWithFormat:@"%@%@%@",funcStr,str,@"`)"];
                    const char * successStr = [fucStr2 UTF8String];
                    se::ScriptEngine::getInstance()->evalString(successStr);
                }
                
                dispatch_group_leave(group);
                NSLog(@"请求-Success");
            } failure:^(SPRequest *request, NSError *error) {
                NSDictionary *strDic = [NSDictionary dictionaryWithObjects:@[urlTest,@"-1"] forKeys:@[@"url",@"timeDiff"]];
                BOOL isYes = [NSJSONSerialization isValidJSONObject:strDic];
                if (isYes) {
                    //                    NSLog(@"可以转换");
                    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:strDic options:0 error:NULL];
                    NSString *str = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                    
                    NSString *funcStr = @"hqq.iosReflect.testWebSpeedAction(`";
                    NSString *fucStr2 = [NSString stringWithFormat:@"%@%@%@",funcStr,str,@"`)"];
                    const char * successStr = [fucStr2 UTF8String];
                    se::ScriptEngine::getInstance()->evalString(successStr);
                }
                dispatch_group_leave(group);
                NSLog(@"请求-Fail");
                
            }];
        });
    }
    
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        NSLog(@"所有请求完成，进行下一步操作");
    });
}

//获取设备唯一标识
//jsb.reflection.callStaticMethod("AppDelegate","getIDFAAction");
+(NSString *)getIDFAAction {
    if (@available(iOS 14, *)) {
            ATTrackingManagerAuthorizationStatus status = ATTrackingManager.trackingAuthorizationStatus;
            if (status == ATTrackingManagerAuthorizationStatusNotDetermined) {
                // 未提示用户
                [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status2) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        if( status2 == ATTrackingManagerAuthorizationStatusDenied){
                            NSLog(@"======用户拒绝");
                            NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:@"请求跟踪",@"requestFollow",nil];
                            //通过通知中心发送通知
                            [[NSNotificationCenter defaultCenter] postNotificationName:@"trackingNotify" object:dic];

                        } else if(status2 == ATTrackingManagerAuthorizationStatusAuthorized){
                            NSLog(@"======用户允许");
                            NSUUID *IDFA = [[ASIdentifierManager sharedManager] advertisingIdentifier];
                            NSString *funcStr = @"hqq.iosReflect.setDeviceId(`";
                            NSString *fucStr2 = [NSString stringWithFormat:@"%@%@%@",funcStr,[IDFA UUIDString],@"`)"];
                            const char * successStr = [fucStr2 UTF8String];
                            se::ScriptEngine::getInstance()->evalString(successStr);
                        } else if( status2 == ATTrackingManagerAuthorizationStatusNotDetermined ){
                            NSLog(@"======用户为做选择或未弹窗");
                            NSDictionary *dic2 = [NSDictionary dictionaryWithObjectsAndKeys:@"请求跟踪",@"requestFollow",nil];
                            //通过通知中心发送通知
                            [[NSNotificationCenter defaultCenter] postNotificationName:@"trackingNotify" object:dic2];
                        }
                    });
                }];
            };
            if( status == ATTrackingManagerAuthorizationStatusDenied){
                NSLog(@"用户拒绝");
                NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:@"请求跟踪",@"requestFollow",nil];
                //通过通知中心发送通知
                [[NSNotificationCenter defaultCenter] postNotificationName:@"trackingNotify" object:dic];
                return @"";
            } else if( status == ATTrackingManagerAuthorizationStatusAuthorized){
                NSLog(@"用户允许");
                NSUUID *IDFA = [[ASIdentifierManager sharedManager] advertisingIdentifier];
                return  [IDFA UUIDString];
            } else if( status == ATTrackingManagerAuthorizationStatusNotDetermined){
                NSLog(@"用户为做选择或未弹窗");
                NSDictionary *dic2 = [NSDictionary dictionaryWithObjectsAndKeys:@"请求跟踪",@"requestFollow",nil];
                //通过通知中心发送通知
                [[NSNotificationCenter defaultCenter] postNotificationName:@"trackingNotify" object:dic2];
                return @"";
            }
            return  @"";
        } else {
            if([[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled]) {
                NSUUID *IDFA = [[ASIdentifierManager sharedManager] advertisingIdentifier];
                return  [IDFA UUIDString];
            } else {
                return  @"";
            }
        }
}
@end
