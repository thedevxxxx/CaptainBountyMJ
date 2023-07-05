import { SymbolRes } from "../../../../script/subgame/ui/game/CommonSymbol";

export class MahjongWaysConfig {
    private static _instance: MahjongWaysConfig;

    public static getInstance(): MahjongWaysConfig {
        this._instance || (this._instance = new MahjongWaysConfig());
        return this._instance;
    }

    public SYMBOL_DIR:string = "game/mahjong-ways/images/symbols";

    
    public readonly symbolFame: SymbolRes[] = [
        {//0
            NORMAL: ``,
            BLUR: ``
        },
        {//1
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_baida`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_baida_blur`
        },
        {//2
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_hu`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_hu_blur`
        },
        {//3
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_greenFa`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_greenFa_blur`
        },
        {//4
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_redMid`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_redMid_blur`
        },
        {//5
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_whiteBoard`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_whiteBoard_blur`
        },
        {//6
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_8characters`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_8characters_blur`
        },
        {//7
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_5dots`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_5dots_blur`
        },
        {//8
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_5bamboos`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_5bamboos_blur`
        },
        {//9
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_2dots`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_2dots_blur`
        },
        {//10
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_2bamboos`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_2bamboos_blur`
        },
        {//11
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_greenFa`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_greenFa_blur`
        },
        {//12
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_redMid`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_redMid_blur`
        },
        {//13
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_whiteBoard`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_whiteBoard_blur`
        },
        {//14
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_8characters`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_8characters_blur`
        },
        {//15
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_5dots`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_5dots_blur`
        },
        {//16
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_5bamboos`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_5bamboos_blur`
        },
        {//17
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_2dots`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_2dots_blur`
        },
        {//18
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_2bamboos`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_2bamboos_blur`
        }
    ]

    public readonly bgFame: SymbolRes[] = [
        {//0
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_blank`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_blank_s_blur`
        },
        {//1
            NORMAL: `game/mahjong-ways/images/symbols/mjhl_blank_gold`,
            BLUR: `game/mahjong-ways/images/symbols/mjhl_blank_gold_s_blur`
        }
    ];

    public readonly symbolRates: any = {
        1: "百搭符号可替代除夺宝符号外的所有符号。", 
        2: "3个夺宝符号可触发免费旋转。", 
        3: [5, 4, 3, 100, 60, 15], 
        4: [5, 4, 3, 80, 40, 10], 
        5: [5, 4, 3, 60, 20, 8],
        6: [5, 4, 3, 40, 15, 6],
        7: [5, 4, 3, 20, 10, 4],
        8: [5, 4, 3, 20, 10, 4],
        9: [5, 4, 3, 10, 5, 2],
        10: [5, 4, 3, 10, 5, 2],
        11: [5, 4, 3, 100, 60, 15],
        12: [5, 4, 3, 80, 40, 10],
        13: [5, 4, 3, 60, 20, 8],
        14: [5, 4, 3, 40, 15, 6],
        15: [5, 4, 3, 20, 10, 4],
        16: [5, 4, 3, 20, 10, 4],
        17: [5, 4, 3, 10, 5, 2],
        18: [5, 4, 3, 10, 5, 2]
    };
}

export const mahjongWaysConfig = MahjongWaysConfig.getInstance();