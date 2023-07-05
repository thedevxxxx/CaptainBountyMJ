import mahjongWays2_Config from "../config/mahjongWays2_Config";
import mahjongWays2_DataRepository from "../data/mahjongWays2_DataRepository";
import SenderBase from "../../../../script/base/SenderBase";

export default class mahjongWays2_Sender extends SenderBase {
    constructor(cfg: mahjongWays2_Config, dataRepo: mahjongWays2_DataRepository) {
        super(cfg, dataRepo);
    }
}