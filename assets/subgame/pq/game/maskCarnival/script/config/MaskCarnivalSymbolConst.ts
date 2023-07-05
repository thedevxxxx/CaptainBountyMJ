export class MaskCarnivalSymbolConst {
    
    private static _instance: MaskCarnivalSymbolConst;

    public symbols:any[] = [
        {type: 0, url: "game/maskCarnival/image/symbol/h_0/spriteFrame", des: ""},
        {type: 1, url: "game/maskCarnival/image/symbol/h_2/spriteFrame", des: ""},
    ];

    public static getInstance(): MaskCarnivalSymbolConst {
        this._instance || (this._instance = new MaskCarnivalSymbolConst());
        return this._instance;
    }


}
export const SymbolAssets = MaskCarnivalSymbolConst.getInstance();