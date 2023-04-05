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

// Wait for the fade-in animation to finish before showing the alert
setTimeout(() => {
  alert("Welcome to Rainbow Roulette. The game starts with 100 dollars, which allows you to place a bet. Every round, one of the six colors on the color wheel will be randomly chosen to make you lose. In each round, every spin will increase your winnings but also your chances of losing on the next spin, so don't be afraid to take profit. The goal is to make as much money as possible. Good luck!");
}, 1000); // 1000ms is the duration of the fade-in animation


function rainbowFlash() {
  console.log("rainbow called");
  // Create the flash element and add it to the page
  const flashElement = document.createElement("div");
  flashElement.style.position = "absolute";
  flashElement.style.top = 0;
  flashElement.style.left = 0;
  flashElement.style.width = "100%";
  flashElement.style.height = "100%";
  flashElement.style.background = "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)";
  flashElement.style.opacity = 0;
  flashElement.style.zIndex = 10;
  document.body.appendChild(flashElement);

  // Add a transition to the opacity property of the flash element
  flashElement.style.transition = "opacity 1s ease-in-out";

  // Set the opacity of the flash element to 0.7 after a short delay
  setTimeout(function () {
    flashElement.style.opacity = 0.9;
  }, 0);

  // Set the opacity of the flash element back to 0 after another short delay
  setTimeout(function () {
    flashElement.style.opacity = 0;
  }, 1000);

  // Remove the flash element from the DOM after the transition has completed
  setTimeout(function () {
    document.body.removeChild(flashElement);
  }, 2000);
}

function lose() {
  
  const loseAudio = new Audio("./sound/lose.mp3");

    // Preload the audio file
    loseAudio.load();

    // Play the audio file
    loseAudio.play();

    rainbowFlash();

}

let intervalId;
const animationDuration = 1000; // duration of animation in milliseconds
const incrementInterval = 50; // time between each increment in milliseconds

function updateFunds() {
  clearInterval(intervalId);
  const startFunds = funds;
  const targetFunds = funds + currentBet;
  const increment = (targetFunds - startFunds) / (animationDuration / incrementInterval);
  let timeElapsed = 0;
  intervalId = setInterval(function () {
    funds += increment;
    timeElapsed += incrementInterval;
    if (timeElapsed >= animationDuration) {
      funds = targetFunds;
      clearInterval(intervalId);
    }
    fundsElement.innerHTML = Math.round(funds); // display funds value as whole numbers
  }, incrementInterval);
}

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
  if (bet > funds || bet <= 0 || isNaN(bet)) {
    alert("Invalid bet amount.");
    return;
  }

  // Scroll to the top of the page
  window.scrollTo(0, 0);

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

  const numbers = [720, 780, 660, 840];
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const randomNumber = numbers[randomIndex];

  
  // Add 720 degrees to the current rotation of the gun
  currentRotation += randomNumber;

  // Set the transition duration and timing function for the place-bet button
  gunElement.style.transition = "transform 1s ease-out";

  // Rotate the gun by the current rotation
  gunElement.style.transform = "rotate(" + currentRotation + "deg)";

  const betAudio = new Audio("./sound/gunload.mp3");

  // Preload the audio file
  betAudio.load();

  // Play the audio file
  betAudio.play();
});


fireElement.addEventListener("click", function () {
  // Decrement the remaining chambers
  remainingChambers--;

  // Update the chambers element
  chambersElement.innerHTML = remainingChambers;

  if (funds === 0 && remainingChambers === bulletChamber) {
    
    lose();

    // Wait for the fade-in animation to finish before showing the alert
    setTimeout(() => {
      alert("You have run out of money. Play Again.");
    }, 2000); // 1000ms is the duration of the fade-in animation

    // Set the initial values
    fundsElement.innerHTML = 100;
    currentBetElement.innerHTML = 0;
    chambersElement.innerHTML = 6;

    // Initialize variables to keep track of game state
    bulletChamber = 0;
    remainingChambers = 6;
    currentBet = 0;
    funds = 100;
    originalBet = 0;

    bettingSectionElement.style.display = "flex";
    bigElement.style.display = "none";

  } else if (remainingChambers === bulletChamber) {
    lose();

    // Wait for the fade-in animation to finish before showing the alert
    setTimeout(() => {
      alert("You lost the round. Try Again.");
    }, 2000); // 1000ms is the duration of the fade-in animation

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

    const winAudio = new Audio("./sound/win.mp3");

    // Preload the audio file
    winAudio.load();

    // Play the audio file
    winAudio.play();

    // Add the flip class to the element
    chambersElement.classList.add("flip");

    // Remove the flip class after the animation is finished
    setTimeout(() => {
      chambersElement.classList.remove("flip");
    }, 500); // 500ms is the duration of the flip animation

    alert("You won Rainbow Roulette! You won: $" + profit);

    // // Add the winnings to the available funds and update the funds element
    // funds += currentBet;
    // fundsElement.innerHTML = funds;

    updateFunds();

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

    const fireAudio = new Audio("./sound/fire.mp3");

    // Preload the audio file
    fireAudio.load();

    // Play the audio file
    fireAudio.play();

    // Add the flip class to the element
    chambersElement.classList.add("flip");

    // Remove the flip class after the animation is finished
    setTimeout(() => {
      chambersElement.classList.remove("flip");
    }, 500); // 500ms is the duration of the flip animation
    

  }
});



profitElement.addEventListener("click", function () {
  const winAudio = new Audio("./sound/win.mp3");

  // Preload the audio file
  winAudio.load();

  // Play the audio file
  winAudio.play();

  // // Add the current bet to the available funds and update the funds element
  // funds += currentBet;
  // fundsElement.innerHTML = funds;

  updateFunds();

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



// Get all the stylesheets on the page
const stylesheets = document.styleSheets;

// Loop through each stylesheet
for (let i = 0; i < stylesheets.length; i++) {
  const rules = stylesheets[i].cssRules;

  // Loop through each rule in the stylesheet
  for (let j = 0; j < rules.length; j++) {
    const rule = rules[j];

    // If the rule contains the word "aqua", replace it with "red"
    if (rule.cssText.includes("aqua")) {
      const newRule = rule.cssText.replace(/aqua/g, "yellow");
      stylesheets[i].deleteRule(j);
      stylesheets[i].insertRule(newRule, j);
    }
  }
}

// Loop through each stylesheet
for (let i = 0; i < stylesheets.length; i++) {
  const rules = stylesheets[i].cssRules;

  // Loop through each rule in the stylesheet
  for (let j = 0; j < rules.length; j++) {
    const rule = rules[j];

    // If the rule contains the word "aqua", replace it with "red"
    if (rule.cssText.includes("red")) {
      const newRule = rule.cssText.replace(/red/g, "purple");
      stylesheets[i].deleteRule(j);
      stylesheets[i].insertRule(newRule, j);
    }
  }
}