var randomNumber1 = Math.round(Math.random() * 5) + 1;  // First random number generated 1-6
var randomNumber2 = Math.round(Math.random() * 5) + 1;  // Second random number generated 1-6
var randomImageSource1 = "images/dice" + randomNumber1 + ".png";    // Insert First random number into the img source
var randomImageSource2 = "images/dice" + randomNumber2 + ".png";    // Insert Second random number into the img source
var h1Text = "";

// Change the cube images depending on the random numbers

document.querySelector(".img1").setAttribute("src", randomImageSource1);    
document.querySelector(".img2").setAttribute("src", randomImageSource2);


// Change the main text depending on which number is higher

if (randomNumber1 > randomNumber2){
    document.querySelector("h1").textContent = "🎇Player 1 Wins!";
} else if (randomNumber2 > randomNumber1){
    document.querySelector("h1").textContent = "Player 2 Wins!🎇";
} else{
    document.querySelector("h1").textContent = "Draw!";
}

