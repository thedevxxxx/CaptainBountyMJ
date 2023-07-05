export class MaskCarnivalPreloadConfig {
    private static _instance: MaskCarnivalPreloadConfig;

    public static getInstance(): MaskCarnivalPreloadConfig {
        this._instance || (this._instance = new MaskCarnivalPreloadConfig());
        return this._instance;
    }

    public SYMBOL_DIR:string = "game/maskCarnival/image/symbol";
}

export const MaskCarnivalPreloadAssetConfig = MaskCarnivalPreloadConfig.getInstance();