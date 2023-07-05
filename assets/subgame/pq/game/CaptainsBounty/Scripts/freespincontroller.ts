
import {  _decorator, Animation, animation, Component, macro, Node, repeat,RichText,tween, v3, Vec2  } from 'cc';
import { gamemanager } from './gamemanager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = freespincontroller
 * DateTime = Fri Jun 23 2023 00:02:21 GMT+0530 (India Standard Time)
 * Author = DevSudhakar
 * FileBasename = freespincontroller.ts
 * FileBasenameNoExtension = freespincontroller
 * URL = db://assets/Scripts/freespincontroller.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('freespincontroller')
export class freespincontroller extends Component {
    @property(Node)
    frontBg:Node = null;
    @property(Node)
    frontbgTextContainer:Node = null;
    @property(Node)
    progressnode:Node = null;
    @property(Node)
    nextbutton:Node = null;
    @property(Node)
    lowercontainer1:Node = null;
    @property(Node)
    lowercontainer2:Node = null;
    @property(Node)
    backBg:Node = null;

    @property(RichText)
    spincounttext:RichText = null;

    @property(gamemanager)
    gameManager:gamemanager;
    

    progresscircle:Node;
    progressText:RichText;
     
    frontbgAnim:Animation;
     frontbgTextAnimation:Animation;


     maxspincount = 10;
     currentspincount = 0;
   

    start () {
        // [3]
        this.frontbgTextAnimation = this.frontbgTextContainer.getComponent(Animation);
        this.progresscircle = this.progressnode.children[0];
        this.progressText = this.progressnode.children[1].getComponent(RichText);
        this.frontbgAnim = this.frontBg.getComponent(Animation);
       // this.onclickinitialize();
       
    }

    onclickinitialize()
    {
        this.frontBg.active = true;
        this.gameManager.freespin = true;
      //  this.frontBg.children[0].getComponent(Sprite).color = new Color(255,255,255,255);
      this.nextbutton.active = false;
      this.progressnode.active = true;     
      this.frontbgTextAnimation.play();
      this.progresscircle.angle = 0;
      this.progressText.string = "0";
      this.scheduleOnce(()=>
      {
         this.progressnode.active = false;
         this.nextbutton.active = true;
         this.nextbutton.getComponent(Animation).play();
      },3.5)
      
      tween(this.progresscircle) 
        .to(4,{angle:-1080})
        .start()
     let progress = 0;
    this.schedule(()=>
    {
        progress+=1;
        this.progressText.string = progress.toString();
    },0.03,99,0);
      
    }
    onclicknextbtn()
    {
      //this.frontbgAnim.play();
      this.lowercontainer1.active = false;
      this.lowercontainer2.active = true;
      this.spincounttext.string = "10";
      this.scheduleOnce(()=>{
        this.frontBg.active = false;
        this.freespininit(); 
      },0.1);
    }

    changefornormalgameplay()
    {
        this.currentspincount = 0;
        this.gameManager.freespin = false;
        this.lowercontainer1.active = true;
        this.lowercontainer2.active = false;
        this.backBg.active = true;
    }

    freespininit()
    {
        this.scheduleOnce(()=>
        {
         this.freespinstart();
        },2)
      
    }
    freespinstart()
    {
        this.gameManager.spinforfreespin();
    }

    spinendedacknowledgment()
    {
      this.currentspincount ++;
      if(this.currentspincount < this.maxspincount)
      {
        this.spincounttext.string = (this.maxspincount-this.currentspincount).toString();
         this.scheduleOnce(()=>
         {
            this.freespinstart();
         },1)
      }
      else{
           this.changefornormalgameplay();
      }
    }
    onclickendbutton()
    {
        this.backBg.active = false;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
