import { Asset, AssetManager, assetManager, instantiate, isValid, Prefab, resources, Sprite, SpriteFrame, UITransform } from "cc";
import {gameConfigs} from "../ui/gamelist/pq_GameList"
import { log } from "cc";

export default class PQAssetRepository {
    private static _instance: PQAssetRepository;

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

    public static getInstance(): PQAssetRepository {
        this._instance || (this._instance = new PQAssetRepository());
        return this._instance;
    }

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
                // return new Promise<AssetManager.Bundle>((resolve, reject) => {
                //     assetManager.loadBundle(bundleName, (err, bundle) => {
                //         this.bundleByName.set(bundleName, bundle);
                //         (async () => {
                //             if (shouldPreloadAssets) {
                //                 await this.preloadAssets(bundleName, shouldShowLoading);
                //             }
                //             resolve(bundle);
                //             loadBundleCompletedCallbacks.forEach(loadBundleCompletedCallback => {
                //                 loadBundleCompletedCallback(bundle);
                //             });
                //             loadBundleCompletedCallbacks.length = 0;
                //             this.loadBundleCompletedCallbacksByBundleName.delete(bundleName);
                //         })();
                //     });
                // });
            } catch (error) {
                console.log(`[AssetRepository] ${error}`);
            }
        }
    }

    public async getAsset<T extends Asset>(url: string, type: new () => T): Promise<T> {
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
                let assetUrl = url;
                // let assetUrl = url.replace(`${bundleName}/`, "");
                // gameConfigs.forEach((data,i)=>{
                //     if(data.gameName == bundleName){
                //         assetUrl = 'game/'+url;
                //     }
                // });
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

    public async preloadAssets(assetUrl: string | string[], onProgress: Function, onComplete: Function) {
        console.log(`[AssetRepository] preloadAssets: ${assetUrl}`);
        hqq['pq'].preload(assetUrl, (finished, total, item) => onProgress(finished, total, item), onComplete.bind(this));
    }

    /**
     * 
     * @param dir 预加载文件夹下资源
     * @param onProgress 
     * @param onComplete 
     */
    public preloadAssetsDir(dir: string, onProgress: Function, onComplete: Function) {
        // console.log(`[AssetRepository] preloadDir: ${dir}`);
        hqq['pq'].preloadDir(dir, (finished, total, item) => onProgress(finished, total, item), onComplete.bind(this));
    }

    public async loadSpriteFrame(url:string, onComplete: Function = null): Promise<SpriteFrame> {
        var spriteFrame = await PQAsset.getAsset<SpriteFrame>(url, SpriteFrame)
        return spriteFrame;
    }

    public async loadPrefab(url:string): Promise<Prefab> {
        var prefab = await PQAsset.getAsset<Prefab>(url, Prefab);
        return prefab.data;
    }
}


export const PQAsset = PQAssetRepository.getInstance();