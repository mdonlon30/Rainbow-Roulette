// Get the necessary elements from the HTML
const fundsElement = document.getElementById("funds");
const currentBetElement = document.getElementById("current-bet");
const enterBetElement = document.getElementById("enter-bet");
const placeBetElement = document.getElementById("place-bet");
const bettingSectionElement = document.getElementById("betting-section");
const fireElement = document.getElementById("fire");
const profitElement = document.getElementById("profit");
const chambersElement = document.getElementById("chambers");

// Set the initial values
fundsElement.innerHTML = 100;
currentBetElement.innerHTML = 0;
chambersElement.innerHTML = 6;

// Initialize variables to keep track of game state
let bulletChamber = 0;
let remainingChambers = 6;
let currentBet = 0;
let funds = 100;

// Define the winnings for each shot based on the percentages given
const winnings = [1.2, 1.25, 4/3, 1.5, 2, 1];

// Get the big element
const bigElement = document.querySelector("#big");

// Hide the big element by default
bigElement.style.display = "none";


placeBetElement.addEventListener("click", function() {
  // Get the bet amount from the input field
  const bet = parseInt(enterBetElement.value, 10);
  
  // Make sure the bet is valid (not more than the available funds and not negative)
  if (bet > funds || bet < 0 || isNaN(bet)) {
    alert("Invalid bet amount. Please enter a valid amount.");
    return;
  }
  
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
});


fireElement.addEventListener("click", function() {
  // Decrement the remaining chambers
  remainingChambers--;
  
  // Update the chambers element
  chambersElement.innerHTML = remainingChambers;
  
  // Check if the player survived this shot
  if (remainingChambers === bulletChamber) {
    alert("You were shot! Game over.");
    
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
    
    // Check if the player won the game
    if (remainingChambers === 1) {
      alert("You won Russian Roulette! You profit: " + currentBet);
      
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

    profitElement.addEventListener("click", function() {
      // Add the current bet to the available funds and update the funds element
      funds += currentBet;
      fundsElement.innerHTML = funds;
    
      // Alert the player to the profit they made
      alert("You profit: " + currentBet);
    
      // Reset the game state
      currentBet = 0;
      currentBetElement.innerHTML = 0;
      remainingChambers = 6;
      chambersElement.innerHTML = 6;
      bettingSectionElement.style.display = "flex";
      bigElement.style.display = "none";
    });

    // Get the image element
const imageElement = document.querySelector("#gun");

// Set the initial rotation to 0 degrees
let rotation = 0;

// Add an event listener to the fire button
fireElement.addEventListener("click", function() {
  // Increment the rotation by 30 degrees
  rotation += 30;
  
  // Set the transform property of the image element to rotate the image
  imageElement.style.transform = "rotate(" + rotation + "deg)";
});