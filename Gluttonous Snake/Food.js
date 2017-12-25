class Food{
    constructor(width,height,position,color,relativelyMap){
        this.width=width;
        this.height=height;
        this.position=position;
        this.color=color;
        this.dom=document.createElement('div');
        this.x=0;
        this.y=0;
        this.maxX=relativelyMap.width/this.width;
        this.maxY=relativelyMap.height/this.height;
        this.relativelyDom=relativelyMap.dom;
    }
    show(){
        this.dom.style.width = this.width+'px';
        this.dom.style.height = this.height+'px';
        this.dom.style.position = this.position;
        this.dom.style.backgroundColor = this.color;
        this.x=Math.floor(Math.random()*this.maxX);
        this.y=Math.floor(Math.random()*this.maxY);
        this.dom.style.left=this.x*this.width+'px';
        this.dom.style.top=this.y*this.height+'px';
        this.relativelyDom.appendChild(this.dom);
    }
}