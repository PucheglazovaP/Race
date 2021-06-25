import config from '../config.js';
import {Vehicle,list, Car, Truck, Bike} from './Vehicle.js';

//наполнение массива данными о тс из конфиг-файла и вывод информации в список
/* let list =JSON.parse(JSON.stringify(config)); */



let vehicles =[];
for (let i=0;i<list['vehicles']['cars'].length;i++) {
  let car = list['vehicles']['cars']
  vehicles.push(new Car(car[i].name,car[i].speed, car[i].tireFlatProbability,vehicles.length, car[i].numOfPeople));
  vehicles[vehicles.length-1].printToList();
}
for (let i=0;i<list['vehicles']['trucks'].length;i++) {
  let truck = list['vehicles']['trucks']
  vehicles.push(new Truck(truck[i].name, truck[i].speed, truck[i].tireFlatProbability, vehicles.length, truck[i].cargoWeight));
  vehicles[vehicles.length-1].printToList();
}
for (let i=0;i<list['vehicles']['bikes'].length;i++) {
  let bike = list['vehicles']['bikes']
  vehicles.push(new Bike(bike[i].name, bike[i].speed, bike[i].tireFlatProbability, vehicles.length, bike[i].hasSidecar));
  vehicles[vehicles.length-1].printToList();
}

let starButton = document.querySelector("#start");
let count = document.querySelector("#count_f");

starButton.addEventListener('click', () => {
  start();//Запуск всех авто
});

function start () {
  document.querySelector('.results__list').textContent = '';//очистка списка результатов перед стартом
  count.value=0;//очистка кол-ва финишировавших авто
  for (let i=0;i<vehicles.length;i++)
  requestAnimationFrame(vehicles[i].move.bind(vehicles[i]));//Привязывание контекста вызова к объектам
}
count.addEventListener('input', () => {
  if (count.value==vehicles.length) {
    setTimeout(()=>{
      let isAgree = confirm("Отправить авто еще на один круг?");
      if (isAgree) start();
    },500);

  }
});