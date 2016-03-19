(function gameSetup() {
    'use strict';

var ship = {
  velocity: 0,
  angle: 0,
  element: document.getElementById('ship')
};

var asteroidz = [];

ship.element.style.top = "0px";
ship.element.style.left = "0px";
console.log(ship);

    ship.element.addEventListener('asteroidDetected', function (event) {
      asteroidz.push(event.detail);
      // console.log(asteroidz);

        // You can detect when a new asteroid appears with this event.
        // The new HTML element will be in event.detail

        // What might you need/want to do in here?

    });

    function handleKeys(event) {
        console.log(event.keyCode);
        if (event.keyCode === 38){
          if (ship.velocity >= 10){
            ship.velocity = 10;
            console.log(ship.velocity);
          }
          else {
            ship.velocity = ship.velocity + 1;
            console.log(ship.velocity);
          }
        }
        if (event.keyCode === 40){
          if (ship.velocity <= 0){
            ship.velocity = 0;
            console.log(ship.velocity);
          }
          else {
            ship.velocity = ship.velocity - 1;
            console.log(ship.velocity);
          }
        }
        if (event.keyCode === 37){
            ship.angle = ship.angle - 15;
            ship.element.style.transform = "rotate(" + ship.angle + "deg)";
            console.log(ship.element.style.transform);
            console.log(ship.angle);
        }
        if (event.keyCode === 39){
            ship.angle = ship.angle + 15;
            ship.element.style.transform = "rotate(" + ship.angle + "deg)";
            console.log(ship.angle);
        }

    }



    document.querySelector('body').addEventListener('keyup', handleKeys);

    /**
     * This event handler will execute when a crash occurs, however
     * YOU MUST call the crash() function when you detect a crash (see below).
     *
     * return {void}
     */
    document.querySelector('main').addEventListener('crash', function () {
      ship.velocity = 0;

        // What might you need/want to do in here?

    });

    function gameLoop() {
        var move = getShipMovement(ship.velocity, ship.angle);
        ship.element.style.top = (parseInt(ship.element.style.top) - move.top) + "px";
        ship.element.style.left = (parseInt(ship.element.style.left) + move.left) + "px";

        checkForCollisions(ship.element.getBoundingClientRect(), asteroidz);
    }

    /**
     * This function checks for any collisions between asteroids and the ship.
     * If a collision is detected, the crash method should be called with the
     * asteroid that was hit:
     *    crash(someAsteroidElement);
     *
     * You can get the bounding box of an element using:
     *    someElement.getBoundingClientRect();
     *
     * A bounding box is an object with top, left, width, and height properties
     * that you can use to detect whether one box is on top of another.
     *
     * @return void
     */
    function checkForCollisions(ship, aPos) {
      for (var i = 0; i < asteroidz.length; i++) {
        var asteroidposition = aPos[i].getBoundingClientRect();
        if(!(asteroidposition.left > ship.right ||
            asteroidposition.right < ship.left ||
            asteroidposition.top > ship.bottom ||
            asteroidposition.bottom < ship.top)){
               console.log("crash");
               crash(asteroidz[i]);
            }
      }

    }



    /** ************************************************************************
     *       These functions and code are given to you. DO NOT ALTER THEM.
     ** ************************************************************************/

     var loopHandle = setInterval(gameLoop, 20);

     /**
      * Executes the code required when a crash has occurred. You should call
      * this function when a collision has been detected with the asteroid that
      * was hit as the only argument.
      *
      * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
      * @return {void}
      */
    function crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', { detail: asteroidHit });
        document.querySelector('main').dispatchEvent(event);
    }

    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
