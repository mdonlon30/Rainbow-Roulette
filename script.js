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
  gunElement.style.transition = "transform 2s ease-in-out";

  // Rotate the gun by the current rotation
  gunElement.style.transform = "rotate(" + currentRotation + "deg)";
});


fireElement.addEventListener("click", function () {
  // Decrement the remaining chambers
  remainingChambers--;

  // Update the chambers element
  chambersElement.innerHTML = remainingChambers;

  // Check if the player survived this shot
  if (remainingChambers === bulletChamber) {
    
    alert("You were shot! Try Again.");
    // Apply the fade-in animation
    document.body.classList.add("fade-in");
    // Remove the fade-in animation
    document.body.classList.remove("fade-in");
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

    // Check if the player won the game
    if (remainingChambers === 1) {
      // Calculate the profit
      const profit = currentBet - originalBet;

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
    }
  }

});

profitElement.addEventListener("click", function () {
  // Add the current bet to the available funds and update the funds element
  funds += currentBet;
  fundsElement.innerHTML = funds;

  // Calculate the profit
  const profit = currentBet - originalBet;

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


