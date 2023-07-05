import { Asset, AssetManager, assetManager, path } from "cc";
import {gameConfigs} from "../ui/gamelist/pq_GameList"
import { log } from "cc";
import { sp } from "cc";

export default class pq_AssetRepository {
    

    private bundleByName: Map<string, AssetManager.Bundle>;

    private assetByUrl: Map<string, Asset>;

    private loadBundleCompletedCallbacksByBundleName: Map<string, Array<Function>>;

    private loadAssetCompletedCallbacksByUrl: Map<string, Array<Function>>;

    private destroyed: boolean;

    public constructor() {
        this.bundleByName = new Map<string, AssetManager.Bundle>();
        this.assetByUrl = new Map<string, Asset>();
        this.loadBundleCompletedCallbacksByBundleName = new Map<string, Array<Function>>();
        this.loadAssetCompletedCallbacksByUrl = new Map<string, Array<Function>>();
        this.destroyed = false;
    }

    // public static getInstance(): CommonEventManage {
    //     this._instance || (this._instance = new CommonEventManage());
    //     return this._instance;
    // }

    public async init(bundleName: string, shouldPreloadAssets: boolean) {
        await this.loadBundle(bundleName, shouldPreloadAssets);
        return this;
    }

    public destroy() {
        this.loadAssetCompletedCallbacksByUrl.clear();
        this.loadBundleCompletedCallbacksByBundleName.clear();
        this.assetByUrl.clear();
        //this.bundleByName.forEach(bundle => {
        //    console.error(bundle);
        //    bundle.releaseAll();
        //    assetManager.removeBundle(bundle);
        //});
        //this.bundleByName.clear();

        this.bundleByName = null;
        this.assetByUrl = null;
        this.loadAssetCompletedCallbacksByUrl = null;
        this.loadBundleCompletedCallbacksByBundleName = null;
        this.destroyed = true;
    }

    public async loadBundle(bundleName: string, shouldPreloadAssets: boolean = false, shouldShowLoading: boolean = false): Promise<AssetManager.Bundle> {
        let loadBundleCompletedCallbacks = this.loadBundleCompletedCallbacksByBundleName.get(bundleName);
        if (loadBundleCompletedCallbacks != null) {
            return new Promise<AssetManager.Bundle>((resolve) => { loadBundleCompletedCallbacks.push(resolve) });
        } else {
            console.log(`[AssetRepository] loadBundle: ${bundleName}`);
            loadBundleCompletedCallbacks = [];
            this.loadBundleCompletedCallbacksByBundleName.set(bundleName, loadBundleCompletedCallbacks);
            try {
                return hqq["pq"];
                return new Promise<AssetManager.Bundle>((resolve, reject) => {
                    assetManager.loadBundle(bundleName, (err, bundle) => {
                        this.bundleByName.set(bundleName, bundle);
                        (async () => {
                            if (shouldPreloadAssets) {
                                await this.preloadAssets(bundleName, shouldShowLoading);
                            }
                            resolve(bundle);
                            loadBundleCompletedCallbacks.forEach(loadBundleCompletedCallback => {
                                loadBundleCompletedCallback(bundle);
                            });
                            loadBundleCompletedCallbacks.length = 0;
                            this.loadBundleCompletedCallbacksByBundleName.delete(bundleName);
                        })();
                    });
                });
            } catch (error) {
                console.log(`[AssetRepository] ${error}`);
            }
        }
    }

    public async getAsset<T extends Asset>(url: string, type: new () => T, isSp:boolean=false): Promise<T> {
        const asset = this.assetByUrl.get(url);
        if (asset != null) {
            return new Promise(resolve => resolve(asset as T));
        }
        const bundleName = url.split("/")[0];
        
        console.log('getAsset =',url)
        let loadAssetCompletedCallbacks = this.loadAssetCompletedCallbacksByUrl.get(url);
        if (loadAssetCompletedCallbacks != null) {
            return new Promise((resolve) => { loadAssetCompletedCallbacks.push(resolve); });
        } else {
            loadAssetCompletedCallbacks = [];
            this.loadAssetCompletedCallbacksByUrl.set(url, loadAssetCompletedCallbacks);
            return new Promise((resolve, reject) => {
                let assetUrl = url.replace(`${bundleName}/`, "");
                gameConfigs.forEach((data,i)=>{
                    if(data.gameName == bundleName){
                        assetUrl = 'game/'+url;
                    }
                });
                log('[请勿使用skeleton] load assets =',assetUrl);
                hqq['pq'].load<T>(assetUrl, type,
                    (finish, total, item) => {

                    }, (error, asset: T) => {
                        if (this.destroyed) {
                            reject();
                        } else {
                            if (error) {
                                reject(error);
                            }
                            this.assetByUrl.set(url, asset);
                            resolve(asset);
                            loadAssetCompletedCallbacks.forEach(loadAssetCompletedCallback => {
                                loadAssetCompletedCallback(asset);
                            });
                            loadAssetCompletedCallbacks.length = 0;
                            this.loadAssetCompletedCallbacksByUrl.delete(url);
                        }
                    }
                );
            })
        }
    }

    public async preloadAssets(bundleName: string, shouldShowLoading: boolean = false) {
        console.log(`[AssetRepository] preloadAssets: ${bundleName}`);
        const onShowLoading = null;//(shouldShowLoading) ? (() => { this.mainUIEventRepository.onShowLoading.Notify() }) : null;
        const onProgressLoading = null;// (shouldShowLoading) ? ((progress) => { this.mainUIEventRepository.onProgressLoading.Notify(progress) }) : null;
        const onCloseLoading = null;//(shouldShowLoading) ? (() => { this.mainUIEventRepository.onCloseLoading.Notify() }) : null;
        return true;
        onShowLoading?.();
        return new Promise<void>(resolve => {
            let currentProgress = 0;
            const paths: Array<string> = [];
            const bundle = this.bundleByName.get(bundleName);

            bundle.config.paths.forEach(assetInfos => assetInfos.forEach(assetInfo => paths.push(assetInfo.path)));
            //console.error(paths);
            bundle.load(paths,
                (finished: number, total: number, item: AssetManager.RequestItem) => {
                    const progress = Math.floor(((finished / total) * 100));
                    if (progress > currentProgress) {
                        currentProgress = progress;
                        onProgressLoading?.(progress);
                    }
                }, (error: Error, data: Array<Asset>) => {
                    resolve();
                    onCloseLoading?.();
                }
            );
        });
    }
}