
import { _decorator} from 'cc';

export class CommonSymbolInfo {
    public type: number;    //symbol类型 (后端传的图案索引)
    public index: number;   //索引 (一个列中的第几个)
    public spaceIdx: number;//symbol所占空间索引
}