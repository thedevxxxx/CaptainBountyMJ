
import { _decorator} from 'cc';

 
export class CommonModeInfo {
    //音效是否开启
    public sound:boolean = true;

    //极速是否开启
    public turbo:boolean = false;

    //自动模式次数
    public auto:number = 0;

    //自动模式次数可选次数
    public autoArr = [10, 30, 50, 80, 1000];
}