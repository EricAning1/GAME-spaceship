const hit = document.getElementById('hits');
const over = document.getElementById('gameover');
const shoot = document.querySelector('.shoot');
shoot.style.marginTop = '40px';
shoot.style.backgroundColor = '#ffaaa5';
const container = document.querySelector('.bodyContainer');
const attack = document.getElementById('attack');
const reload = document.querySelector('.restart');
reload.style.backgroundColor = '#6c5b7c';
reload.style.marginTop = '40px';

let playing = true;
let ships = [];

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
  //create a fleet of  alien ships

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

for (let i = 0; i < 6; i++) {
  const Alien = new AlienShip();
  ships.push(Alien);
}

console.log(ships);
console.log(ships[0].hull);

function attackAliens() {
  if (playing) {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].hull >= 1) {
        if (Math.random() <= earthShip.accuracy) {
          console.log('Alienship just got hit');
          ships[i].hull -= earthShip.firepower;
          hit.textContent = `Alienship just got hit: have ${ships[i].hull} hits left`;
        } else {
          console.log('You missed, prepare for an attack');
          attack.textContent = 'You missed, prepare for an attack';
        }
      } else if (ships[i].hull <= 0) {
        ships.shift();
        console.log(
          `You destroyed another alien ship: only ${ships.length} ships left`
        );
        over.textContent = `You destroyed another alien ship: only ${ships.length} ships left`;
      }
    }
  }
}
attackAliens();

function attackHumans() {
  if (playing) {
    if (earthShip.hull >= 1) {
      if (Math.random() <= ships[0].accuracy) {
        earthShip.hull -= ships[0].firepower;
        console.log(
          `The aliens just hit you: You have ${earthShip.hull} hits left`
        );

        hit.textContent = `The aliens just hit you: You have ${earthShip.hull} hits left`;
      } else {
        console.log('The aliens missed: Time to attack');
        attack.textContent = 'The aliens missed: Time to attack';
      }
    }
  }
}
attackHumans();

function gameOver() {
  if (playing) {
    if (ships.length === 0) {
      console.log('GAME OVER');
      over.textContent = 'GAME OVER';
      container.style.backgroundColor = '#feffdf';
      playing = false;
      attack.textContent = 'YOU WIN!';
    } else if (earthShip.hull <= 0) {
      console.log('GAME OVER');
      over.textContent = 'GAME OVER';
      container.style.backgroundColor = '#feffdf';
      playing = false;
      attack.textContent = 'ALIENS WIN!';
    }
  }
}
//click on the SHOOT button to begin fight
shoot.addEventListener('click', function () {
  attackAliens();
  gameOver();
  attackHumans();
});

function refresh() {
  setTimeout(function () {
    location.reload();
  }, 100);
}

reload.addEventListener('click', function () {
  return refresh();
});
