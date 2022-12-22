// Get the necessary elements from the HTML
const fundsElement = document.getElementById("funds");
const currentBetElement = document.getElementById("current-bet");
const enterBetElement = document.getElementById("enter-bet");
const placeBetElement = document.getElementById("place-bet");
const bettingSectionElement = document.getElementById("betting-section");
const fireElement = document.getElementById("fire");
const profitElement = document.getElementById("profit");
const chambersElement = document.getElementById("chambers");
const gunElement = document.querySelector("#gun");



// Set the initial values
fundsElement.innerHTML = 100;
currentBetElement.innerHTML = 0;
chambersElement.innerHTML = 6;

// Initialize variables to keep track of game state
let bulletChamber = 0;
let remainingChambers = 6;
let currentBet = 0;
let funds = 100;
let originalBet = 0;
// Set the initial rotation of the gun to 0 degrees
let currentRotation = 0;

// Define the winnings for each shot based on the percentages given
const winnings = [1.2, 1.25, 4 / 3, 1.5, 2, 1];

// Get the big element
const bigElement = document.querySelector("#big");

// Hide the big element by default
bigElement.style.display = "none";



// Add an event listener to the enter bet element
enterBetElement.addEventListener("focus", function () {
  // Check if the value is "Enter Bet..."
  if (this.value === "Enter Bet...") {
    // Clear the value
    this.value = "";
  }
});


placeBetElement.addEventListener("click", function () {
  // Get the bet amount from the input field
  const bet = parseInt(enterBetElement.value, 10);

  // Make sure the bet is valid (not more than the available funds and not negative)
  if (bet > funds || bet < 0 || isNaN(bet)) {
    alert("Invalid bet amount.");
    return;
  }

  // Store the original bet
  originalBet = bet;

  // Subtract the bet amount from the available funds and update the funds element
  funds -= bet;
  fundsElement.innerHTML = funds;

  // Set the current bet amount and update the current bet element
  currentBet = bet;
  currentBetElement.innerHTML = currentBet;

  // Hide the betting section
  bettingSectionElement.style.display = "none";

  // Show the big element
  bigElement.style.display = "flex";

  // Determine the chamber with the bullet
  bulletChamber = Math.floor(Math.random() * 6) + 1;

  // Add 720 degrees to the current rotation of the gun
  currentRotation += 720;

  // Set the transition duration and timing function for the place-bet button
  gunElement.style.transition = "transform 1s ease-out";

  // Rotate the gun by the current rotation
  gunElement.style.transform = "rotate(" + currentRotation + "deg)";

  // Create an audio element and set the source to the sound file
  const loadSound = document.getElementById("load-sound");

  // Play the sound effect
  loadSound.play();
});


fireElement.addEventListener("click", function () {
  // Decrement the remaining chambers
  remainingChambers--;

  // Update the chambers element
  chambersElement.innerHTML = remainingChambers;

  // Add the flip class to the element
  chambersElement.classList.add("flip");

  // Remove the flip class after the animation is finished
  setTimeout(() => {
    chambersElement.classList.remove("flip");
  }, 500); // 500ms is the duration of the flip animation

  // Check if the player survived this shot
  if (remainingChambers === bulletChamber) {

    // Create an audio element and set the source to the sound file
    const loseSound = document.getElementById("lose-sound");

    // Play the sound effect
    loseSound.play();

    // After the audio has finished playing, force it to load again
    loseSound.addEventListener("ended", () => {
      loseSound.load();
    });

    // Create the flash element and add it to the page
    const flashElement = document.createElement("div");
    flashElement.style.position = "absolute";
    flashElement.style.top = 0;
    flashElement.style.left = 0;
    flashElement.style.width = "100%";
    flashElement.style.height = "100%";
    flashElement.style.backgroundColor = "white";
    flashElement.style.zIndex = 10;
    document.body.appendChild(flashElement);

    // Apply the fade-in class to the flash element
    flashElement.classList.add("fade-in");



    // Wait for the fade-in animation to finish before showing the alert
    setTimeout(() => {
      alert("You were shot! Try Again.");
    }, 1000); // 1000ms is the duration of the fade-in animation

    // Remove the flash element from the page after the alert is shown
    setTimeout(() => {
      document.body.removeChild(flashElement);
    }, 2000); // 2000ms is the duration of the fade-in animation plus the time it takes for the alert to be shown

    // Reset the game state
    currentBet = 0;
    currentBetElement.innerHTML = 0;
    remainingChambers = 6;
    chambersElement.innerHTML = 6;
    bettingSectionElement.style.display = "flex";
    bigElement.style.display = "none";
  } else if (remainingChambers === 1) {  // Check if the player won the game

    // Increase the current bet by the corresponding percentage
    currentBet *= winnings[winnings.length - remainingChambers - 1];

    // Update the current bet element
    currentBetElement.innerHTML = currentBet;

    // Calculate the profit
    const profit = currentBet - originalBet;

    // Create an audio element and set the source to the sound file
    const winSound = document.getElementById("win-sound");

    // Play the sound effect
    winSound.play();

    // After the audio has finished playing, force it to load again
    winSound.addEventListener("ended", () => {
      winSound.load();
    });

    alert("You won Russian Roulette! You won: $" + profit);

    // Add the winnings to the available funds and update the funds element
    funds += currentBet;
    fundsElement.innerHTML = funds;

    // Reset the game state
    currentBet = 0;
    currentBetElement.innerHTML = 0;
    remainingChambers = 6;
    chambersElement.innerHTML = 6;
    bettingSectionElement.style.display = "flex";
    bigElement.style.display = "none";
  } else {
    // Increase the current bet by the corresponding percentage
    currentBet *= winnings[winnings.length - remainingChambers - 1];

    // Update the current bet element
    currentBetElement.innerHTML = currentBet;

    // Set the transition duration and timing function for the fire button
    gunElement.style.transition = "transform .1s ease-in-out";

    // Add 30 degrees to the current rotation of the gun
    currentRotation += 60;

    // Rotate the gun by the current rotation
    gunElement.style.transform = "rotate(" + currentRotation + "deg)";

    // Create an audio element and set the source to the sound file
    const fireSound = document.getElementById("fire-sound");

    // Reset the audio file to the start
    fireSound.currentTime = 0;

    // Play the sound effect
    fireSound.play();

    // After the audio has finished playing, force it to load again
    fireSound.addEventListener("ended", () => {
      fireSound.load();
    });

    }
});

profitElement.addEventListener("click", function () {
  // Add the current bet to the available funds and update the funds element
  funds += currentBet;
  fundsElement.innerHTML = funds;

  // Calculate the profit
  const profit = currentBet - originalBet;

  // Create an audio element and set the source to the sound file
  const winSound = document.getElementById("win-sound");

  // Play the sound effect
  winSound.play();

  // After the audio has finished playing, force it to load again
  winSound.addEventListener("ended", () => {
    winSound.load();
  });

  // Alert the player to the profit they made
  alert("You won: $" + profit);



  // Reset the game state
  currentBet = 0;
  currentBetElement.innerHTML = 0;
  remainingChambers = 6;
  chambersElement.innerHTML = 6;
  bettingSectionElement.style.display = "flex";
  bigElement.style.display = "none";
});


