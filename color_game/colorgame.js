var nimSquares = 6;
var colors = generateRandomColors(nimSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1")
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click",function(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	nimSquares = 3;
	colors = generateRandomColors(nimSquares);
	pickedColor = pickColor();
	colorDisplay.textContent=pickedColor;
	for(var i=0; i<squares.length;i++){
	if(colors[i]){
		squares[i].style.backgroundColor = colors[i]
	}else{
		squares[i].style.display="none";
	}
}
})
hardBtn.addEventListener("click",function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	nimSquares = 6;
	colors = generateRandomColors(nimSquares);
	pickedColor = pickColor();
	colorDisplay.textContent=pickedColor;
	for(var i=0; i<squares.length;i++){
		squares[i].style.backgroundColor = colors[i]
		squares[i].style.display="block";
}
})
	


resetButton.addEventListener("click",function(){
	//generate new collors
	colors = generateRandomColors(nimSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match new color
	colorDisplay.textContent=pickedColor;
	//change colors of squeres
	for(var i=0; i<squares.length;i++){
	squares[i].style.backgroundColor = colors[i]
	}
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Color"
	messageDisplay.textContent = "";
})
 
colorDisplay.textContent=pickedColor;

for(var i=0; i<squares.length;i++){
	//add initial colors
	squares[i].style.backgroundColor = colors[i]
	//add click listeners
	squares[i].addEventListener("click", function(){
	//grab color of clicked square
	var clickedColor = this.style.backgroundColor;
	//compare color of pickedcolor
	if(clickedColor===pickedColor){
		messageDisplay.textContent = "Correct!"
		changeColors(clickedColor);
		h1.style.backgroundColor = clickedColor;
		resetButton.textContent = "Play Again?"

	}
    else{
			this.style.backgroundColor="#232323";
			messageDisplay.textContent = "Try again!"
		}

	})
}
function changeColors(color){
//loop through all squares
for(var i=0; i<squares.length;i++){
	//change each color to match given color
	squares[i].style.backgroundColor = color;
}
}

function pickColor(){
 var random = Math.floor(Math.random()*colors.length);
 return colors[random];

}
function generateRandomColors(num){
	//make array
	var arr = []
	//repeat num times
    for(var i=0; i < num; i++){
    	//get random color and push unto arr
    	 arr.push(randomColor())



    }


	//return that array
	return arr;
}
 function randomColor(){
 //pick a red from 0-255
 var r = Math.floor(Math.random()*256)
 //pick green from 0 to 255
 var g = Math.floor(Math.random()*256)
 //picj blue from 0-255
 var b = Math.floor(Math.random()*256)
  return "rgb("+r+", " + g + ", "+ b+ ")";
 }