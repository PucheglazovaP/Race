import config from '../config.js';
import {Vehicle, Car, Truck, Bike} from './Vehicle.js';
/* import './Circle.js'; */

//наполнение массива данными о тс из конфиг-файла
let list =JSON.parse(JSON.stringify(config));

let vehicles =[];
for (let i=0;i<list['vehicles']['cars'].length;i++) {
  let car = list['vehicles']['cars']
  vehicles.push(new Car(car[i].name,car[i].speed, car[i].tireFlatProbability, car[i].numOfPeople));
}
for (let i=0;i<list['vehicles']['trucks'].length;i++) {
  let truck = list['vehicles']['trucks']
  vehicles.push(new Truck(truck[i].name, truck[i].speed, truck[i].tireFlatProbability, truck[i].cargoWeight));
}
for (let i=0;i<list['vehicles']['bikes'].length;i++) {
  let bike = list['vehicles']['bikes']
  vehicles.push(new Bike(bike[i].name, bike[i].speed, bike[i].tireFlatProbability, bike[i].hasSidecar));
}

let starButton = document.querySelector("#start");
//Запуск всех авто
starButton.addEventListener('click', () => {
  for (let i=0;i<vehicles.length;i++)
    requestAnimationFrame(vehicles[i].move.bind(vehicles[i]));//Привязывание контекста вызова к объектам
});
