//
//  NativeOcClass.m
//  hello_world-mobile
//
//  Created by HQP-calan on 2019/8/3.
//

#import "NativeOcClass.h"
#import <AdSupport/AdSupport.h>

#import <ifaddrs.h>
#import <arpa/inet.h>
#import <net/if.h>
#import <UIKit/UIKit.h>
#if defined(__IPHONE_14_0)
#import <AppTrackingTransparency/AppTrackingTransparency.h>//适配iOS14
#endif

#define IOS_CELLULAR    @"pdp_ip0"
#define IOS_WIFI        @"en0"
#define IOS_VPN         @"utun0"
#define IP_ADDR_IPv4    @"ipv4"
#define IP_ADDR_IPv6    @"ipv6"
@implementation NativeOcClass
//获取设备唯一标识
//jsb.reflection.callStaticMethod("NativeOcClass","getIDFAAction");
+(NSString *)getIDFAAction {
    if (@available(iOS 14, *)) {
        ATTrackingManagerAuthorizationStatus status = ATTrackingManager.trackingAuthorizationStatus;
        if (status == ATTrackingManagerAuthorizationStatusNotDetermined) {
            // 未提示用户
            [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                dispatch_async(dispatch_get_main_queue(), ^{
                });
            }];
        };
        
        switch (status) {
            case ATTrackingManagerAuthorizationStatusDenied:
                NSLog(@"用户拒绝");
                NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:@"请求跟踪",@"requestFollow",nil];
                //通过通知中心发送通知
                [[NSNotificationCenter defaultCenter] postNotificationName:@"trackingNotify" object:dic];
                return @"";
                break;
            case ATTrackingManagerAuthorizationStatusAuthorized:
                NSLog(@"用户允许");
                NSUUID *IDFA = [[ASIdentifierManager sharedManager] advertisingIdentifier];
                return  [IDFA UUIDString];
                break;
            case ATTrackingManagerAuthorizationStatusNotDetermined:
                NSLog(@"用户为做选择或未弹窗");
                NSDictionary *dic2 = [NSDictionary dictionaryWithObjectsAndKeys:@"请求跟踪",@"requestFollow",nil];
                //通过通知中心发送通知
                [[NSNotificationCenter defaultCenter] postNotificationName:@"trackingNotify" object:dic2];
                return @"";
                break;
            default:
                return  @"";
                break;
        }
    } else {
        if([[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled]) {
            NSUUID *IDFA = [[ASIdentifierManager sharedManager] advertisingIdentifier];
            return  [IDFA UUIDString];
        } else {
            return  @"";
        }
    }
}
//版本号
//jsb.reflection.callStaticMethod("NativeOcClass","getAppBuildVersion");

+(NSString *)getAppBuildVersion {
    NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
    
    // 获取App的版本号 发布版本号
    //    NSString *appVersion = [infoDic objectForKey:@"CFBundleShortVersionString"];
    
    // 获取App的build版本 内部标示
    NSString *appBuildVersion = [infoDic objectForKey:@"CFBundleVersion"];
    
    return appBuildVersion;
}

//获取粘贴板内容
//jsb.reflection.callStaticMethod("NativeOcClass","getClipBoardText");
+(NSString *)getClipBoardText {
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    return [pasteboard string];
}

//粘贴板
//jsb.reflection.callStaticMethod("NativeOcClass","clipBoardAction:","test1111");
+(BOOL)clipBoardAction:(NSString *) str {
    @try {
        UIPasteboard *pastebord = [UIPasteboard generalPasteboard];
        pastebord.string = str;
        return true;
    } @catch (NSException *exception) {
        return false;
    }
}

// 获取App的包名
//jsb.reflection.callStaticMethod("NativeOcClass","getAppPackageName");
+(NSString *)getAppPackageName {
    NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
    NSString *bundleIdentifier = [infoDic objectForKey:@"CFBundleIdentifier"];
    return bundleIdentifier;
}

+(NSString *) getHqqPackageInfo {
    NSDictionary *dic = @{@"pinpai":@"test",@"huanjin":@"online",@"system":@"ios",@"version":@"1.0.13",@"proxyid":@"186959995",@"engine_version":@"2.4.3",@"language":@"CN",@"country":@"china",@"currency":@"rmb"};
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
    NSString *jsonString;
    if (!jsonData) {
        NSLog(@"%@",error);
    }else{
        jsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    
    return jsonString;
    
}


#pragma mark - 获取设备当前网络IP地址
//jsb.reflection.callStaticMethod("NativeOcClass","getIPAddress");
+ (NSString *)getIPAddress
{
    
    BOOL isIPv6 = [self isIpv6];
    
    NSArray *searchArray = !isIPv6 ?
    @[ IOS_VPN @"/" IP_ADDR_IPv4, IOS_VPN @"/" IP_ADDR_IPv6, IOS_WIFI @"/" IP_ADDR_IPv4, IOS_WIFI @"/" IP_ADDR_IPv6, IOS_CELLULAR @"/" IP_ADDR_IPv4, IOS_CELLULAR @"/" IP_ADDR_IPv6 ] :
    @[ IOS_VPN @"/" IP_ADDR_IPv6, IOS_VPN @"/" IP_ADDR_IPv4, IOS_WIFI @"/" IP_ADDR_IPv6, IOS_WIFI @"/" IP_ADDR_IPv4, IOS_CELLULAR @"/" IP_ADDR_IPv6, IOS_CELLULAR @"/" IP_ADDR_IPv4 ] ;
    
    NSDictionary *addresses = [self getIPAddresses];
    NSLog(@"addresses: %@", addresses);
    
    __block NSString *address;
    [searchArray enumerateObjectsUsingBlock:^(NSString *key, NSUInteger idx, BOOL *stop)
     {
        address = addresses[key];
        //筛选出IP地址格式
        if([self isValidatIP:address]) *stop = YES;
    } ];
    return address ? address : @"0.0.0.0";
}

+ (BOOL)isValidatIP:(NSString *)ipAddress {
    if (ipAddress.length == 0) {
        return NO;
    }
    NSString *urlRegEx = @"^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
    "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
    "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
    "([01]?\\d\\d?|2[0-4]\\d|25[0-5])$";
    
    NSError *error;
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:urlRegEx options:0 error:&error];
    
    if (regex != nil) {
        NSTextCheckingResult *firstMatch=[regex firstMatchInString:ipAddress options:0 range:NSMakeRange(0, [ipAddress length])];
        
        if (firstMatch) {
            NSRange resultRange = [firstMatch rangeAtIndex:0];
            NSString *result=[ipAddress substringWithRange:resultRange];
            //输出结果
            NSLog(@"输出结果: %@",result);
            return YES;
        }
    }
    return NO;
}

+ (NSDictionary *)getIPAddresses
{
    NSMutableDictionary *addresses = [NSMutableDictionary dictionaryWithCapacity:8];
    
    // retrieve the current interfaces - returns 0 on success
    struct ifaddrs *interfaces;
    if(!getifaddrs(&interfaces)) {
        // Loop through linked list of interfaces
        struct ifaddrs *interface;
        for(interface=interfaces; interface; interface=interface->ifa_next) {
            if(!(interface->ifa_flags & IFF_UP) /* || (interface->ifa_flags & IFF_LOOPBACK) */ ) {
                continue; // deeply nested code harder to read
            }
            const struct sockaddr_in *addr = (const struct sockaddr_in*)interface->ifa_addr;
            char addrBuf[ MAX(INET_ADDRSTRLEN, INET6_ADDRSTRLEN) ];
            if(addr && (addr->sin_family==AF_INET || addr->sin_family==AF_INET6)) {
                NSString *name = [NSString stringWithUTF8String:interface->ifa_name];
                NSString *type;
                if(addr->sin_family == AF_INET) {
                    if(inet_ntop(AF_INET, &addr->sin_addr, addrBuf, INET_ADDRSTRLEN)) {
                        type = IP_ADDR_IPv4;
                    }
                } else {
                    const struct sockaddr_in6 *addr6 = (const struct sockaddr_in6*)interface->ifa_addr;
                    if(inet_ntop(AF_INET6, &addr6->sin6_addr, addrBuf, INET6_ADDRSTRLEN)) {
                        type = IP_ADDR_IPv6;
                    }
                }
                if(type) {
                    NSString *key = [NSString stringWithFormat:@"%@/%@", name, type];
                    addresses[key] = [NSString stringWithUTF8String:addrBuf];
                }
            }
        }
        // Free memory
        freeifaddrs(interfaces);
    }
    return [addresses count] ? addresses : nil;
}


+ (BOOL)isIpv6{
    NSArray *searchArray =
    @[ IOS_VPN @"/" IP_ADDR_IPv6,
       IOS_VPN @"/" IP_ADDR_IPv4,
       IOS_WIFI @"/" IP_ADDR_IPv6,
       IOS_WIFI @"/" IP_ADDR_IPv4,
       IOS_CELLULAR @"/" IP_ADDR_IPv6,
       IOS_CELLULAR @"/" IP_ADDR_IPv4 ] ;
    
    NSDictionary *addresses = [self getIPAddresses];
    NSLog(@"addresses: %@", addresses);
    
    __block BOOL isIpv6 = NO;
    [searchArray enumerateObjectsUsingBlock:^(NSString *key, NSUInteger idx, BOOL *stop)
     {
        
        NSLog(@"---%@---%@---",key, addresses[key] );
        
        if ([key rangeOfString:@"ipv6"].length > 0  && ![[NSString stringWithFormat:@"%@",addresses[key]] hasPrefix:@"(null)"] ) {
            
            if ( ![addresses[key] hasPrefix:@"fe80"]) {
                isIpv6 = YES;
            }
        }
        
    } ];
    
    return isIpv6;
}




@end
