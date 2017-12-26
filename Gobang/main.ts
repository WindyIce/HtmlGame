let chessboard;
let canvas;
window.onload=function () {

    canvas=document.getElementById('chessboard');
    chessboard=new ChessBoard1(495,495,'absolute','yellow',
        document.getElementsByTagName('body')[0],canvas,15);
    chessboard.show("images/wood.jpg");

    let quitFunction=function (winner:string) {
        alert(winner.toUpperCase()+'  WINS');
        location.reload();
    };
    window.onclick=function (e) {
        let x=getCanvasPos(canvas,e).x;
        let y=getCanvasPos(canvas,e).y;
        chessboard.move(x,y,quitFunction);
    }

};

function getCanvasPos(canvas,e)
{//获取鼠标在canvas上的坐标
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left * (canvas.width / rect.width),
        y: e.clientY - rect.top * (canvas.height / rect.height)
    };
}

class ChessBoard1{
    context;
    chesses=[];
    step:number;
    eachChess=[];
    textureSrc:string;
    image;
    constructor(public width:number,public height:number,public position:string,
                public color:string,public relativelyDom,public canvasDom,public numOfchess:number){
        this.context=canvasDom.getContext("2d");
        for(let i=0;i<numOfchess;i++){
            this.chesses[i]=[];
            for(let j=0;j<numOfchess;j++){
                this.chesses[i][j]=new chess(i,j,null,this.context,
                    width/numOfchess,height/numOfchess);
            }
        }
        this.step=0;
    }
    public back1(){
        //设置高和宽
        this.canvasDom.width=this.width;
        this.canvasDom.height=this.height;
        //获取棋盘材质
        this.context=this.canvasDom.getContext("2d");
        this.context.strokeStyle="black";
        this.context.strokeRect(0,0,this.width,this.height);
        let pattern=this.context.createPattern(this.image, 'repeat');
        this.context.fillStyle=pattern;
        this.context.fillRect(0,0,this.width,this.height);
        this.drawChessBoardLines(15);

        let last=this.eachChess.pop();
        let x=last.x;
        let y=last.y;
        this.chesses[x][y].color=null;
        this.step=0;
        for(let i=0;i<this.eachChess.length;i++){
            this.eachChess[i].draw(this.context);
            this.step++;
        }
    }
    private checkWinner(x:number, y:number):string{
        for(let i=-4;i<=0;i++){
            try {
                // 防止越界
                if (x + 4 < 15) {
                    // 横着连成五个
                    if (this.chesses[x + i][y].color === this.chesses[x + i + 1][y].color &&
                        this.chesses[x + i][y].color === this.chesses[x + i + 2][y].color &&
                        this.chesses[x + i][y].color === this.chesses[x + i + 3][y].color &&
                        this.chesses[x + i][y].color === this.chesses[x + i + 4][y].color) {
                        if (this.step % 2 == 0) return 'black';
                        else return 'white';
                    }
                }
                if (y + 4 < 15) {
                    // 竖着连成五个
                    if (this.chesses[x][y + i].color === this.chesses[x][y + i + 1].color &&
                        this.chesses[x][y + i].color === this.chesses[x][y + i + 2].color &&
                        this.chesses[x][y + i].color === this.chesses[x][y + i + 3].color &&
                        this.chesses[x][y + i].color === this.chesses[x][y + i + 4].color) {
                        if (this.step % 2 == 0) return 'black';
                        else return 'white';
                    }
                }
                if (x + 4 < 15 && y + 4 < 15) {
                    // 左上到右下
                    if (this.chesses[x + i][y + i].color === this.chesses[x + i + 1][y + i + 1].color &&
                        this.chesses[x + i][y + i].color === this.chesses[x + i + 2][y + i + 2].color &&
                        this.chesses[x + i][y + i].color === this.chesses[x + i + 3][y + i + 3].color &&
                        this.chesses[x + i][y + i].color === this.chesses[x + i + 4][y + i + 4].color) {
                        if (this.step % 2 == 0) return 'black';
                        else return 'white';
                    }
                }
                if (x - 4 >= 0 && y + 4 < 15) {
                    // 左下到右上
                    if (this.chesses[x - i][y + i].color === this.chesses[x - i - 1][y + i + 1].color &&
                        this.chesses[x - i][y + i].color === this.chesses[x - i - 2][y + i + 2].color &&
                        this.chesses[x - i][y + i].color === this.chesses[x - i - 3][y + i + 3].color &&
                        this.chesses[x - i][y + i].color === this.chesses[x - i - 4][y + i + 4].color) {
                        if (this.step % 2 == 0) return 'black';
                        else return 'white';
                    }
                }
            }
            catch (e){

            }
        }
        return 'no';
    }
    public move(absoluteX:number,absoluteY:number,quitFunction){
        //获得真实的XY
        let x=Math.floor(absoluteX/(this.width/this.numOfchess));
        console.log('x'+x);
        let y=Math.floor(absoluteY/(this.height/this.numOfchess));
        console.log('y'+y);
        let color;
        //判断是黑棋还是白
        if(this.step%2==0) color='black';
        else color='white';
        this.chesses[x][y].color=color;
        this.chesses[x][y].draw(this.context);
        let winner=this.checkWinner(x,y);//TODO: finish the winner checker
        if(winner!='no')quitFunction(winner);
        let theChess=new chess(x,y,color,this.context,this.width/this.numOfchess,
            this.height/this.numOfchess);
        this.eachChess[this.eachChess.length]=theChess;

        ++this.step;
    }
    public show(src:string):void{
        //设置高和宽
        this.canvasDom.width=this.width;
        this.canvasDom.height=this.height;
        //获取棋盘材质
        this.textureSrc=src;
        let img=new Image();
        img.src=src;
        this.image=img;
        this.context=this.canvasDom.getContext("2d");
        this.context.strokeStyle="black";
        this.context.strokeRect(0,0,this.width,this.height);
        let pattern=this.context.createPattern(img, 'repeat');
        this.context.fillStyle=pattern;
        this.context.fillRect(0,0,this.width,this.height);
        this.drawChessBoardLines(15);
    }
    private drawChessBoardLines(rows:number):void{
        let eachWidth=this.width/rows;
        let eachHeight=this.height/rows;
        for(let i=0;i<rows;i++){
            this.context.moveTo(0,eachHeight*i);
            this.context.lineTo(this.width,eachHeight*i);
            this.context.stroke();
            this.context.moveTo(eachWidth*i,0);
            this.context.lineTo(eachHeight*i,this.height);
            this.context.stroke();
        }
    }
}

class chess{
    //color 可以为空，就是该位置没有棋子
    constructor(public x:number,public y:number,public color,public context,
                public width:number,public height:number){

    }
    public draw(context){
        if (this.color === null) {
            return;
        }
        let left = this.x * this.width + this.width / 2;
        let top = this.y * this.height + this.height / 2;
        if (this.color == "black") {
            context.strokeStyle = "#000000";
            context.fillstyle = "#000000";
        }
        else if (this.color == "white") {
            context.strokeStyle = "#ffffff";
            context.fillstyle = "#ffffff";
        }
        context.beginPath();
        context.arc(left, top, this.width / 4-1,
            0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.lineWidth=this.width / 2-1;
        context.stroke();
    }
}
