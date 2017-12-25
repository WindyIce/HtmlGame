class Map{
    constructor(width,height,position,color,relativelyDom){
        this.width=width;
        this.height=height;
        this.position=position;
        this.color=color;
        this.dom=null;
        this.relativelyDom=relativelyDom;

    }
    show(){
        this.dom=document.createElement("div");
        this.dom.style.width=this.width+'px';
        this.dom.style.height=this.height+'px';
        this.dom.style.position=this.position;
        this.dom.style.backgroundColor=this.color;
        this.relativelyDom.appendChild(this.dom);
    }
}