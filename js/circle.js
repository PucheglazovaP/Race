export class Circle {
    constructor(circleLength) {
        this.circleLength = circleLength; //длина круга
        this.radius=this.circleLength/(2*Math.PI); //вычисление радиуса
        this.circle = document.querySelector('.round');
        this.baseX;
        this.baseY;
        
        this.createCircle();
    }
    createCircle(){
        this.circle.style.width=2*this.radius + "px";
        this.circle.style.height=2*this.radius + "px";
        this.baseX = (2*this.radius)/2;
        this.baseY = (2*this.radius)/2;
        this.circle.style.display="block";
    }
}