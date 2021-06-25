import config from '../config.js';
import { Circle } from './circle.js';

export let list =JSON.parse(JSON.stringify(config));
//создание круга
let circle = new Circle(list['circle'].circleLength);

export class Vehicle {
    constructor(name, speed, tireFlatProbability) {
      this.name = name; //имя транспортного средства(тс)
      this.speed = speed; //скорость тс, измеряется в радианах
      this.tireFlatProbability = tireFlatProbability; //вероятность прокола шины
      this.vehicle = document.createElement('div'); //инициализация DOM объекта
      this.listElement= document.createElement('li'); //инициализация лемента информационного списка vehicles__list
      this.currentAngle = 0; //текущее местоположение тс на круге
      this.idOfFrame; //id анимации объекта
      this.rast=0; //пройденное расстояние
      this.createVehicle(); //метод создания тс на странице 
    }
    //в данном методе объъекту тс(div) назначаются атрибуты класса, ид, вычисляются координаты, далее объект добавляется в обертку round(круг)
    createVehicle() {
        this.vehicle.className=this.constructor.name.toLowerCase();
        this.vehicle.id=this.name;
        let wrapper = document.querySelector('.round');
        wrapper.append(this.vehicle);

        this.vehicle.style.top =  `calc((${circle.baseY}px + ${circle.radius * Math.sin(this.currentAngle)}px) - ${(this.vehicle.offsetHeight/2)}px)`; // меняем координаты элемента. В данном случае используется полярная система координат, изменяя угол, меняем положение объекта
        this.vehicle.style.left = `calc((${circle.baseX}px + ${circle.radius * Math.cos(this.currentAngle)}px) - ${(this.vehicle.offsetWidth/2)}px)`;
    }
    //метод вывода информации о тс в список
    printToList() {
        this.listElement.innerHTML=`${this.name} (Скорость: ${this.speed}, P прокола колеса: ${this.tireFlatProbability}) <br> Пройденный путь: <strong class="distance"></strong> <strong class="crush">Прокол шины!</strong>`;
        document.querySelector('.vehicles__list').append(this.listElement);
    }
    move() {
        this.listElement.lastChild.style.display = "none";
        this.rast +=this.speed;
        this.currentAngle=this.rast/circle.radius;
        if (this.rast>=circle.circleLength) {
            this.rast=circle.circleLength;// для корректного вывода пройденного пути
            this.listElement.querySelector('.distance').textContent=this.rast; //вывод в список инф-ии о пройденном пути
            this.finish();
            return;
        };
        this.listElement.querySelector('.distance').textContent=this.rast; //вывод в список инф-ии о пройденном пути
        this.vehicle.style.top =  `calc((${circle.baseY}px + ${circle.radius * Math.sin(this.currentAngle)}px) - ${(this.vehicle.offsetHeight/2)}px)`; 
        this.vehicle.style.left = `calc((${circle.baseX}px + ${circle.radius * Math.cos(this.currentAngle)}px) - ${(this.vehicle.offsetWidth/2)}px)`;
        if(this.checkForFlatTire()){
            return;
        }
        this.idOfFrame = requestAnimationFrame(this.move.bind(this)); 
    }
    //проверка на прокол шины
    checkForFlatTire(){
        if (Math.random()<=this.tireFlatProbability){
        this.stop();//тс совершает остановку  
        return true; //если рандомное число попадает в диапазон вероятности       
        }
    }
    stop() {
        this.listElement.lastChild.style.display = "inline";//появляется уведомление о проколе шины
        setTimeout(this.move.bind(this),1500);//Остановка авто после прокола 1,5с
      }
    finish(){
        this.currentAngle = 0;
        this.rast = 0;
        let resultElement= document.createElement('li');
        resultElement.innerHTML = `${this.name}`;
        document.querySelector('.results__list').append(resultElement);

        //подсчет финишировавших тс
        document.querySelector('#count_f').value++;
        //тригер события изменения кол-ва финишировавших
        document.querySelector('#count_f').dispatchEvent(new Event('input'));
      }
  }

export class Car extends Vehicle {
    constructor(name, speed, tireFlatProbability, id, numOfPeople) {
        super(name, speed, tireFlatProbability,id);
        this.numOfPeople = numOfPeople;
      }
    printToList() {
        this.listElement.innerHTML=`${this.name} (Скорость: ${this.speed}, P прокола колеса: ${this.tireFlatProbability}, Кол-во людей в машине:  ${this.numOfPeople}) <br> Пройденный путь: <strong class="distance"></strong> <strong class="crush">Прокол шины!</strong>`;
        document.querySelector('.vehicles__list').append(this.listElement);
    }
  }

export class Truck extends Vehicle {
    constructor(name, speed, tireFlatProbability, id, cargoWeight) {
        super(name, speed, tireFlatProbability, id);
        this.cargoWeight = cargoWeight;
      }
    printToList() {
        this.listElement.innerHTML=`${this.name} (Скорость: ${this.speed}, P прокола колеса: ${this.tireFlatProbability}, Вес груза:  ${this.cargoWeight}) <br> Пройденный путь: <strong class="distance"></strong> <strong class="crush">Прокол шины!</strong>`;
        document.querySelector('.vehicles__list').append(this.listElement);
    }
  }

export class Bike extends Vehicle {
    constructor(name, speed, tireFlatProbability, id, hasSidecar) {
        super(name, speed, tireFlatProbability, id);
        this.hasSidecar = hasSidecar;
      }
      printToList() {
        let sideCar = (this.hasSidecar) ? 'Да' : 'Нет';
        this.listElement.innerHTML=`${this.name} (Скорость: ${this.speed}, P прокола колеса: ${this.tireFlatProbability}, Наличие коляски:${sideCar}) <br> Пройденный путь: <strong class="distance"></strong> <strong class="crush">Прокол шины!</strong>`;
        document.querySelector('.vehicles__list').append(this.listElement);
    }
  }

