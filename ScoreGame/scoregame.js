var p1button = document.querySelector("#p1");
var p2button = document.querySelector("#p2");
var reset = document.querySelector("#reset");
var p1display = document.getElementById("p1display");
var p2display = document.getElementById("p2display");
var playto = document.querySelector("p span");
var p1score=0;
var p2score=0;
var gameover = false;
var winingscore=5;
var numInput = document.querySelector("input");




p1button.addEventListener("click",function(){
	if(!gameover){
	p1score++;
	if(p1score===winingscore){
		gameover=true;
		p1display.classList.add("winner");
	}
	p1display.textContent = p1score;
}

})
p2button.addEventListener("click",function(){
		if(!gameover){
	p2score++;
	if(p2score===winingscore){
		gameover=true;
		p2display.classList.add("winner");
	}
	p2display.textContent = p2score;
}
});

reset.addEventListener("click",function(){
	resetb();

});
function resetb(){
	p1score=0;
	p2score=0;
	p1display.textContent = 0;
	p2display.textContent = 0;
	p1display.classList.remove("winner");
	p2display.classList.remove("winner");
	gameover=false;
}

numInput.addEventListener("change",function(){
playto.textContent = numInput.value;
winingscore=Number(numInput.value);
resetb();
})
