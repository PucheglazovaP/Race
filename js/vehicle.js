export class Vehicle {
    constructor(name, speed, tireFlatProbability) {
      this.name = name; //имя транспортного средства(тс)
      this.speed = speed; //скорость тс, измеряется в радианах
      this.tireFlatProbability = tireFlatProbability; //вероятность прокола шины
      this.vehicle = document.createElement('div'); //инициализация DOM объекта
      this.currentAngle = 0; //текущее местоположение тс на круге
      this.createVehicle(); //метод создания тс на странице
      this.idOfFrame; //id анимации объекта
    }
    //в данном методе объъекту тс(div) назначаются атрибуты класса, ид, вычисляются координаты, далее объект добавляется в обертку round(круг)
    createVehicle() {
        this.vehicle.className=this.constructor.name.toLowerCase();
        this.vehicle.id=this.name;
        let wrapper = document.querySelector('#round');
        wrapper.append(this.vehicle);

        this.vehicle.style.top =  `calc((${250}px + ${250 * Math.sin(this.currentAngle)}px) - ${this.vehicle.offsetHeight}px)`; // меняем координаты элемента. В данном случае используется полярная система координат, изменяя угол, меняем положение объекта
        this.vehicle.style.left = `calc((${250}px + ${250 * Math.cos(this.currentAngle)}px) - ${this.vehicle.offsetWidth/2}px)`;
    }
    move() {
        this.currentAngle += this.speed;
        if (this.currentAngle>=2*Math.PI) {
            this.currentAngle = 0;
            return};
        this.vehicle.style.top =  `calc((${250}px + ${250 * Math.sin(this.currentAngle)}px) - ${this.vehicle.offsetHeight}px)`; 
        this.vehicle.style.left = `calc((${250}px + ${250 * Math.cos(this.currentAngle)}px) - ${this.vehicle.offsetWidth/2}px)`;
        if(this.checkForFlatTire()){
            this.stop();
            return;
        }//проверка на прокол шины
        this.idOfFrame = requestAnimationFrame(this.move.bind(this)); 
    }
    checkForFlatTire(){
        if (Math.random()<=this.tireFlatProbability)
        return true; //если рандомное число попадает в диапазон вероятности
        //тс совершает остановку  
    }
    stop() {
        setTimeout(this.move.bind(this),1500);//Остановка авто после прокола 1,5с
      }
  }

export class Car extends Vehicle {
    constructor(name, speed, tireFlatProbability, numOfPeople) {
        super(name, speed, tireFlatProbability);
        this.numOfPeople = numOfPeople;
      }
  }

export class Truck extends Vehicle {
    constructor(name, speed, tireFlatProbability, cargoWeight) {
        super(name, speed, tireFlatProbability);
        this.cargoWeight = cargoWeight;
      }
  }

export class Bike extends Vehicle {
    constructor(name, speed, tireFlatProbability, hasSidecar) {
        super(name, speed, tireFlatProbability);
        this.hasSidecar = hasSidecar;
      }
  }

