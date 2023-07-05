
import { _decorator} from 'cc';
import { CommonSymbolInfo } from './CommonSymbolInfo';

 
export class CommonReelInfo {
    
    public quantity:number; //symbol数量

    public index:number;    //reel索引

    public symbolArr:CommonSymbolInfo[] = [];    //符号数组

    public prefabUrl:string;                //符号预制

}