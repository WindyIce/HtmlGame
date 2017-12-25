class Snake{
    constructor(width,height,colorHead,colorBody,position,relativelyMap){
        this.width=width;
        this.height=height;
        this.colorHead=colorHead;
        this.colorBody=colorBody;
        this.position=position;
        this.direct='';
        this.dom=relativelyMap.dom;//不要进行任何对这个dom的修改！！这是为了定位
        this.maxX=relativelyMap.width/this.width;
        this.maxY=relativelyMap.height/this.height;
        this.body=[new SnakeBody(6,2,this.colorHead),
            new SnakeBody(5,2,this.colorBody),
            new SnakeBody(4,2,this.colorBody)];
        this.initLength=this.body.length;
        this.nowLength=this.initLength;
        this.isAlive=true;
    }
    setDirection(code){
        switch(code) {
            case 37:
                if(this.direct!=='right')
                    this.direct = 'left';
                break;
            case 38:
                if(this.direct!=='down')
                    this.direct = 'up';
                break;
            case 39:
                if(this.direct!=='left')
                    this.direct = 'right';
                break;
            case 40:
                if(this.direct!=='up')
                    this.direct = 'down';
                break;
        }
    }
    show(){
        for(let i=0;i<this.body.length;i++){
            let eachBody=this.body[i];
            if(eachBody.dom==null){
                eachBody.dom=document.createElement('div');
                eachBody.dom.style.width=this.width+'px';
                eachBody.dom.style.height=this.height+'px';
                eachBody.dom.style.position=this.position;
                eachBody.dom.style.backgroundColor=eachBody.color;
                this.dom.appendChild(eachBody.dom);
            }
            eachBody.dom.style.left=this.width*eachBody.x+'px';
            eachBody.dom.style.top=this.height*eachBody.y+'px';
        }
    }
    move(food){
        //处理除了第一节的所有蛇身，让后面的坐标等于前面的
        for(let i=this.body.length-1;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        //处理第一节蛇身
        switch (this.direct){
            case'up':
                this.body[0].y--;
                break;
            case'down':
                this.body[0].y++;
                break;
            case'left':
                this.body[0].x--;
                break;
            case'right':
                this.body[0].x++;
                break;
            default:return;
        }
        //是否撞墙
        if(this.body[0].x<0||this.body[0].x>=this.maxX||
            this.body[0].y<0||this.body[0].y>=this.maxY){
            this.isAlive=false;
        }
        //是否吃到自己
        for(let i=1;i<this.body.length;i++){
            if(this.body[0].x===this.body[i].x&&
                this.body[0].y===this.body[i].y){
                this.isAlive=false;
                break;
            }
        }
        //是否吃到食物
        if(this.body[0].x===food.x&&this.body[0].y===food.y){
            const x=this.body[this.body.length-1].x;
            const y=this.body[this.body.length-1].y;
            this.nowLength++;
            this.body.push(new SnakeBody(x,y,this.colorBody));
            food.show();
        }
        this.show();
    }
}

class SnakeBody{
    constructor(x,y,color){
        this.x=x;
        this.y=y;
        this.color=color;
        this.dom=null;
    }
}