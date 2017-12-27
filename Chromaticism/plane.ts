class Plane{
    rounds:number;
    rows:number;
    context;
    mainColor:string;
    offsetColor:string;
    constructor(public width:number,public canvasDom){
        canvasDom.width=width;
        canvasDom.height=width;
        this.context=canvasDom.getContext("2d");
    }

    public drawRect(rows:number,offset:number){
        this.rows=rows;
        let eachWidth:number=this.width/rows;
        // 获取真实的RGB值和假的RGB值
        let red=Math.floor(Math.random()*255);
        let offsetRed=Math.max(255,red+Math.floor(Math.random()*offset));
        let green=Math.floor(Math.random()*255);
        let offsetGreen=Math.max(255,green+Math.floor(Math.random()*offset));
        let blue=Math.floor(Math.random()*255);
        let offsetBlue=Math.max(255,blue+Math.floor(Math.random()*offset));
        this.mainColor="rgb("+red+","+green+","+blue+")";
        this.offsetColor="rgb("+offsetRed+","+offsetGreen+","+offsetBlue+")";

        for(let i=0;i<=rows;i++){
            let initx=eachWidth*i;
            let inity=eachWidth*i;
            this.context.moveTo(0,this.width*i);
            this.context.lineTo(this.width,eachWidth*i);
            this.context.stroke();
            this.context.moveTo(eachWidth*i,0);
            this.context.lineTo(eachWidth*i,this.width);
            this.context.stroke();
        }
    }
}