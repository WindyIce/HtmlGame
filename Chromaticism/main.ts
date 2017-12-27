let plane;
let offset=100;
let correct=0;
const numToUpdate=10;
window.onload=function () {

    let canvas=document.getElementById("planeCanvas");
    plane=new Plane1(500,canvas);
    plane.drawRect(3+Math.floor(correct/numToUpdate),offset);
    window.onclick=function (e) {

        let x=getCanvasPosition(canvas,e).x;
        let y=getCanvasPosition(canvas,e).y;
        if(plane.isRightClick(x,y)){
            ++correct;
            document.getElementById("Score").innerText="Score: "+correct;
            plane.drawRect(3+Math.floor(correct/numToUpdate),offset);
            offset=Math.max(10,offset-Math.floor(Math.log(correct)));
        }
    };
};

function getCanvasPosition(canvas,e)
{//获取鼠标在canvas上的坐标
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left * (canvas.width / rect.width),
        y: e.clientY - rect.top * (canvas.height / rect.height)
    };
}

class Plane1{
    rounds:number;
    rows:number;
    context;
    mainColor:string;
    offsetColor:string;
    wrongx:number;
    wrongy:number;
    constructor(public width:number,public canvasDom){
        canvasDom.width=width;
        canvasDom.height=width;
        this.context=canvasDom.getContext("2d");
    }

    public drawRect(rows:number,offset:number){
        this.rows=rows;
        let eachWidth:number=this.width/this.rows;
        // 获取要出错的坐标值
        this.wrongx=Math.floor(Math.random()*this.rows);
        this.wrongy=Math.floor(Math.random()*this.rows);
        // 获取真实的RGB值和假的RGB值
        let red=Math.floor(Math.random()*255);
        let offsetRed=Math.min(255,red+Math.floor(Math.random()*offset));
        let green=Math.floor(Math.random()*255);
        let offsetGreen=Math.min(255,green+Math.floor(Math.random()*offset));
        let blue=Math.floor(Math.random()*255);
        let offsetBlue=Math.min(255,blue+Math.floor(Math.random()*offset));
        this.mainColor="rgb("+red+","+green+","+blue+")";
        this.offsetColor="rgb("+offsetRed+","+offsetGreen+","+offsetBlue+")";

        //this.context.clearRect(0,0,this.width,this.width);
        this.context.fillStyle=this.mainColor;
        this.context.fillRect(0,0,this.width,this.width);
        this.context.fillStyle=this.offsetColor;
        this.context.fillRect(this.wrongx*eachWidth,this.wrongy*eachWidth,eachWidth,eachWidth);
        for(let i=0;i<=this.rows;i++){
            let initx=eachWidth*i;
            let inity=eachWidth*i;
            this.context.beginPath();
            this.context.moveTo(0,initx);
            this.context.lineTo(this.width,initx);
            this.context.stroke();
            this.context.moveTo(inity,0);
            this.context.lineTo(inity,this.width);
            this.context.stroke();
            this.context.closePath();
        }
    }

    public isRightClick(absoluteX:number,absoluteY:number):boolean{
        let eachW=this.width/this.rows;
        let x=Math.floor(absoluteX/eachW);
        let y=Math.floor(absoluteY/eachW);
        return x == this.wrongx && y == this.wrongy;

    }
}