const hit = document.getElementById('hits');
const over = document.getElementById('gameover');
const start = document.querySelector('.start');
start.style.marginTop = '40px';
start.style.backgroundColor = '#ffaaa5';
const attack = document.getElementById('attack');
const reload = document.querySelector('.restart');
reload.style.backgroundColor = '#6c5b7c';
reload.style.marginTop = '40px';

class Spaceship {
  constructor() {
    this.name = 'Spaceship';
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }
}

class EarthShip extends Spaceship {
  constructor() {
    super();
    this.name = 'USS Assembly';
  }
}

const earthShip = new EarthShip();
console.log(earthShip);

class AlienShip extends Spaceship {
  constructor() {
    super();
    this.name = 'Aliens';
    this.hull = this.randomHull(6, 3);
    this.firepower = this.randomFirepower(4, 2);
    this.accuracy = this.randomAccuracy(0.8, 0.6);
  }
  //create a random list of alien ships
  alienFleet() {
    let alienNumber = Math.ceil(Math.random() * 6);
    let ships = [];
    for (let i = 0; i < alienNumber; i++) {
      ships.push(Alien);
    }
    return ships;
  }

  randomHull(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  randomFirepower(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  randomAccuracy(max, min) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }
}

const Alien = new AlienShip();
console.log(Alien.hull);
console.log(Alien.alienFleet());
console.log(Alien.alienFleet()[0].hull);

//rules of engagement

function attackAliens() {
  if (Alien.alienFleet()[0].hull >= 1) {
    if (Math.random() <= earthShip.accuracy) {
      console.log('Alienship just got hit');

      Alien.alienFleet()[0].hull -= earthShip.firepower;
      hit.textContent = `Alienship just got hit: have ${
        Alien.alienFleet()[0].hull
      } hits left`;
    } else {
      console.log('Earthship missed, prepare for an attack');
      attack.textContent = 'Earthship missed, prepare for an attack';
    }
  } else if (Alien.alienFleet()[0].hull <= 0) {
    if (
      Alien.alienFleet().indexOf(
        Alien.alienFleet()[0] < Alien.alienFleet().length - 1
      )
    ) {
      Alien.alienFleet().shift();
      console.log(
        `You destroyed 1 alien ship: only ${
          Alien.alienFleet().length - 1
        } ships left`
      );
      over.textContent = `You destroyed 1 alien ship: only ${
        Alien.alienFleet().length - 1
      } ships left`;
    }
  } else {
    console.log('All alien ships have been destroyed: Game Over');
    over.textContent = 'All alien ships have been destroyed: Game Over';
  }
}
attackAliens();

function attackHumans() {
  if (earthShip.hull >= 1) {
    if (Math.random() <= Alien.alienFleet()[0].accuracy) {
      earthShip.hull -= Alien.alienFleet()[0].firepower;
      console.log(
        `The aliens just hit you: You have ${earthShip.hull} hits left`
      );

      hit.textContent = `The aliens just hit you: You have ${earthShip.hull} hits left`;
    } else {
      console.log('The aliens missed: Time to attack');
      attack.textContent = 'The aliens missed: Time to attack';
    }
  } else if (earthShip.hull <= 0) {
    console.log('Earth ship is destroyed: Game over');
    over.textContent = 'Earth ship is destroyed: Game over';
  }
}
attackHumans();

start.addEventListener('click', function () {
  attackAliens();
});

start.addEventListener('click', function () {
  return attackHumans();
});

//when game is over click on restart button to restart game

function refresh() {
  setTimeout(function () {
    location.reload();
  }, 100);
}

reload.addEventListener('click', function () {
  return refresh();
});
