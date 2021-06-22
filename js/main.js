let starButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let car_1 = document.querySelector("#car-1");

let radius = 250;// радиус окружности
let currentAngle = Math.PI/2;//текущий угол в радианах
let baseX = 250; // x координата центра окружности
let baseY = 250; // y координата центра окружности
console.log(car_1.offsetWidth);
car_1.style.top =  `calc((${baseY}px + ${radius * Math.sin(currentAngle)}px) - ${car_1.offsetHeight}px)`; // меняем координаты элемента. В данном случае используется полярная система координат, изменяя угол, меняем положение объекта
car_1.style.left = `calc((${baseX}px + ${radius * Math.cos(currentAngle)}px) - ${car_1.offsetWidth/2}px)`;

starButton.addEventListener('click', () => {
    function move() {

    car_1.style.top = `calc((${baseY}px + ${radius * Math.sin(currentAngle)}px) - ${car_1.offsetHeight}px)`; 
		car_1.style.left = `calc((${baseX}px + ${radius * Math.cos(currentAngle)}px) - ${car_1.offsetWidth/2}px)`;

    currentAngle += 0.03;

    id = requestAnimationFrame(move);
    }
    
    requestAnimationFrame(move);
/*     starButton.disabled = true;
    stopButton.disabled = false; */
});

stopButton.addEventListener('click', () => {
  cancelAnimationFrame(id);
/*   starButton.disabled = false; */
});