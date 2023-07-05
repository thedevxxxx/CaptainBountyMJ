import mahjongWays_Config from "../config/mahjongWays_Config";
import mahjongWays_DataRepository from "../data/mahjongWays_DataRepository";
import SenderBase from "../../../../script/base/SenderBase";

export default class mahjongWays_Sender extends SenderBase {
    constructor(cfg: mahjongWays_Config, dataRepo: mahjongWays_DataRepository) {
        super(cfg, dataRepo);
    }
}