import mjhl_Config from "../config/mjhl_Config";
import mjhl_DataRepository from "../data/mjhl_DataRepository";
import SenderBase from "../../../../script/base/SenderBase";

export default class mjhl_Sender extends SenderBase {
    constructor(cfg: mjhl_Config, dataRepo: mjhl_DataRepository) {
        super(cfg, dataRepo);
    }
}