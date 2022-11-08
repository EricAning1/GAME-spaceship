class EarthShip {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}
const earthShip = new EarthShip('USS Assembly', 20, 5, 0.7);

function randomHull(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomFirepower(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomAccuracy(max, min) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

class AlienShip {
  constructor() {
    this.name = `AlienShip`;
    this.hull = randomHull(6, 3);
    this.firepower = randomFirepower(4, 2);
    this.accuracy = randomAccuracy(0.8, 0.6);
  }
}
//create an array of alien ships
let shipFleet = [];

for (let i = 0; i < 6; i++) {
  shipFleet.push(new AlienShip());
}

//DOM manipulation
const alienHull = document.getElementById('hull');
alienHull.innerHTML = `Hull: ${shipFleet[0].hull}`;

const alienFirepower = document.getElementById('firepower');
alienFirepower.innerHTML = `Firepower: ${shipFleet[0].firepower}`;
const alienAccuracy = document.getElementById('accuracy');
alienAccuracy.innerHTML = `Accuracy: ${shipFleet[0].accuracy}`;

const btnEl = document.querySelector('button');
btnEl.style.cursor = 'pointer';
btnEl.style.backgroundColor = 'grey';

//Refresh game console when clicked
const enemyStats = document.querySelector('.enemyStats');
enemyStats.style.cursor = 'pointer';

enemyStats.addEventListener('click', function () {
  location.reload();
});

//Apply game functionalities when clicked
console.log(btnEl.innerText);
btnEl.addEventListener('click', function () {
  while (earthShip.hull >= 1 && shipFleet[0].hull >= 1) {
    if (Math.random < shipFleet[0].accuracy) {
      earthShip.hull -= shipFleet[0].firepower;
      document.querySelector(
        '#hits'
      ).innerText = `<-Alien Ship just hit you: You have ${earthShip.hull} hits left->`;
    } else if (shipFleet[0].accuracy < Math.random()) {
      shipFleet[0].hull -= earthShip.firepower;
      document.querySelector(
        '#hits'
      ).innerText = `<-Earth Ship just hit you: You have ${shipFleet[0].hull} hits left->`;
    }
  }

  if (shipFleet[0].hull <= 0) {
    document.querySelector('#attack').innerText = '👺Alien ship is destroyed👺';
  } else if (earthShip.hull <= 0) {
    document.querySelector('#attack').innerText = 'Earth ship is destroyed';
  }
});

function fleetDestroyed() {
  shipFleet.forEach((ship) => {
    while (ship.hull <= 0) {
      shipFleet.shift();
    }
  });
}
console.log(shipFleet);
