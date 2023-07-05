
import { _decorator, animation, Component, macro, Node, repeat, RichText, tween, v3, Vec2 } from 'cc';
import { freespincontroller } from './freespincontroller';
import { free } from './free';

const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gamemanager
 * DateTime = Thu Jun 15 2023 21:27:40 GMT+0530 (India Standard Time)
 * Author = DevSudhakar
 * FileBasename = gamemanager.ts
 * FileBasenameNoExtension = gamemanager
 * URL = db://assets/Scripts/gamemanager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('gamemanager')
export class gamemanager extends Component {
    // [1]
    // dummy = '';
    @property(Node)
    slot1:Node = null;
    @property(Node)
    slot2:Node = null;
    @property(Node)
    slot3:Node = null;
    @property(Node)
    slot4:Node = null;
    @property(Node)
    slot5:Node = null;

  

   

   


    // [2]
    // @property
    // serializableDummy = 0;
     startPosX = -584;
     moveFrom = -1898;// both movefrom and moveto has same elemets so to chnaging the pos b/w them give illusion of infinte loop 
     moveTo = -146;
     posForFirstSlot1 = 0;
     posForFirstSlot2 = 0;
     posForFirstSlot3 = 0;
     posForFirstSlot4 = 0;
     posForFirstSlot5 = 0;
     elementinSlot = 7;
     preRotMul = 3;
     currentRotMul1 = 0;
     currentRotMul2 = 0;
     currentRotMul3 = 0;
     currentRotMul4 = 0;
     currentRotMul5 = 0;
     diffBwElem = 146;

     @property(freespincontroller)
     fsc:freespincontroller;

     @property(free)
     fr:free;
    


     freespin:Boolean = false;
    start () {
        // [3]

      
       
        }
    public spinforfreespin()
     {
      this.onClickSlotButton();
     }
   onClickSlotButton()
   {
     this.calculateStopDist();
    this.schedule(this.rotateSlot1,0.01,macro.REPEAT_FOREVER,0)
    this.schedule(this.rotateSlot2,0.01,macro.REPEAT_FOREVER,0.2)
    this.schedule(this.rotateSlot3,0.01,macro.REPEAT_FOREVER,0.4)
    this.schedule(this.rotateSlot4,0.01,macro.REPEAT_FOREVER,0.5)
    this.schedule(this.rotateSlot5,0.01,macro.REPEAT_FOREVER,0.6)
   }
   calculateStopDist()
   {
     let randnNum1 = Math.round(Math.random()*(this.elementinSlot))+3;
     let randnNum2 = Math.round(Math.random()*(this.elementinSlot))+3;
     let randnNum3 = Math.round(Math.random()*(this.elementinSlot))+3;
     let randnNum4 = Math.round(Math.random()*(this.elementinSlot))+3;
     let randnNum5 = Math.round(Math.random()*(this.elementinSlot))+3;
     this.posForFirstSlot1 = randnNum1*this.moveTo;
     this.posForFirstSlot2 = randnNum2*this.moveTo;
     this.posForFirstSlot3 = randnNum3*this.moveTo;
     this.posForFirstSlot4 = randnNum4*this.moveTo;
     this.posForFirstSlot5 = randnNum5*this.moveTo;
   }

   rotateSlot1()
   {
    this.slot1.position = v3(this.slot1.position.x,this.slot1.position.y-(this.diffBwElem/4),0);
     if(this.currentRotMul1<this.preRotMul)
     {
       
       if(this.slot1.position.y <= this.moveFrom)       
       {
        this.slot1.position = v3(this.slot1.position.x,this.moveTo,0);
        this.currentRotMul1++;
       }
     }
     else
     { 
          if(this.slot1.position.y == this.posForFirstSlot1)
          {
           
            this.slot1.position = v3(this.slot1.position.x,this.posForFirstSlot1,0);
            this.currentRotMul1 = 0;
            this.unschedule(this.rotateSlot1);
           
          }
     }
   }
   rotateSlot2()
   {
    this.slot2.position = v3(this.slot2.position.x,this.slot2.position.y-(this.diffBwElem/4),0);
     if(this.currentRotMul2<this.preRotMul)
     {
       
       if(this.slot2.position.y <= this.moveFrom)       
       {
        this.slot2.position = v3(this.slot2.position.x,this.moveTo,0);
        this.currentRotMul2++;
       }
     }
     else
     { 
          if(this.slot2.position.y == this.posForFirstSlot2)
          {
           
            this.slot2.position = v3(this.slot2.position.x,this.posForFirstSlot2,0);
            this.currentRotMul2 = 0;
            this.unschedule(this.rotateSlot2);
           
          }
     }
   }
   rotateSlot3()
   {
    this.slot3.position = v3(this.slot3.position.x,this.slot3.position.y-(this.diffBwElem/4),0);
     if(this.currentRotMul3<this.preRotMul)
     {
       
       if(this.slot3.position.y <= this.moveFrom)       
       {
        this.slot3.position = v3(this.slot3.position.x,this.moveTo,0);
        this.currentRotMul3++;
       }
     }
     else
     { 
          if(this.slot3.position.y == this.posForFirstSlot3)
          {
           
            this.slot3.position = v3(this.slot3.position.x,this.posForFirstSlot3,0);
            this.currentRotMul3 = 0;
            this.unschedule(this.rotateSlot3);
           
          }
     }
   }
   rotateSlot4()
   {
    this.slot4.position = v3(this.slot4.position.x,this.slot4.position.y-(this.diffBwElem/4),0);
     if(this.currentRotMul4<this.preRotMul)
     {
       
       if(this.slot4.position.y <= this.moveFrom)       
       {
        this.slot4.position = v3(this.slot4.position.x,this.moveTo,0);
        this.currentRotMul4++;
       }
     }
     else
     { 
          if(this.slot4.position.y == this.posForFirstSlot4)
          {
           
            this.slot4.position = v3(this.slot4.position.x,this.posForFirstSlot4,0);
            this.currentRotMul4 = 0;
            this.unschedule(this.rotateSlot4);
           
          }
     }
   }
   rotateSlot5()
   {
    this.slot5.position = v3(this.slot5.position.x,this.slot5.position.y-(this.diffBwElem/4),0);
     if(this.currentRotMul5<this.preRotMul)
     {
       
       if(this.slot5.position.y <= this.moveFrom)       
       {
        this.slot5.position = v3(this.slot5.position.x,this.moveTo,0);
        this.currentRotMul5++;
       }
     }
     else
     { 
          if(this.slot5.position.y == this.posForFirstSlot5)
          {
           
            this.slot5.position = v3(this.slot5.position.x,this.posForFirstSlot5,0);
            this.currentRotMul5 = 0;
            this.unschedule(this.rotateSlot5);
            if(this.freespin)
              this.fsc.spinendedacknowledgment();
          }
     }
   }
    // update (deltaTime: number) {
    //     // [4]
    // }
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
