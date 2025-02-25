 // Input variables and constants
let inputDir = {x:0 , y:0}
const foodSound = new Audio('food.mp3')
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3')
// const musicSound = new Audio('music.mp3')
let speed = 8;
let LevelUp = 30;
let score = 0;
let level = 1;

let lastPaintTime = 0;
let snakeArr = [
    { x:13 , y:15}
]
food = { x:10 , y:14}

// Collide function
function isCollide(snake) {
    
    // If snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // If snake collides with wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
            return true;
        }
        
    return false
}

// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime
    gameEngine();
}

// Game over 
function endgame() {
    window.cancelAnimationFrame(main)
    gameOver = document.getElementById("endgame")
    gameOver.style.visibility = 'visible';
    gameOver.innerHTML = "Game over!"
    resButton = document.createElement('button')
    resButton.innerHTML = "Restart"
    resButton.addEventListener("click", function(){
        window.location.reload()
        })
        gameOver.appendChild(resButton)



}
function showLevel(params) {
    let seeLevel = document.getElementById("seelevel")
    seeLevel.innerHTML = "Level : " + level
    console.log(speed)
    
}    

function levelUp(score) {
    let mul = 10;
    for (let i = 1; i <= score; i++) {
        if(score === mul * i){    // 3  6  9 
        // window.cancelAnimationFrame(main)
        // document.getElementById("levelup").style.visibility = "visible" 
        // document.getElementById("levelup").innerHTML = "Congratulations! You have leveled Up ..."
        level = level + 1;
        speed +=2;
        // document.getElementById("levelup").style.visibility = "hidden" 
        // score = 0;
        // console.log("LEvel up")
        // console.log(score)
        showLevel(); 
        // return score
    }
    // console.log(score)
}
}
function gameEngine(){
    // 1. Updating the snake array & Food
    if(isCollide(snakeArr)){
        // musicSound.pause();
        inputDir = {x:0 , y:0}
        gameOverSound.play();
        endgame();
        // alert("Game is over .Press any key to continue ...")
        snakeArr = [{ x:13 , y:15}]
        // musicSound.play();
        score = 0
    }

    // If snake has eaten the food , increment the scrore and regenerte the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score : "+ hiscoreval
        }
        scoreBox.innerHTML = "Score : " + score;

        // Changing the level after a particular points achieved
        if(score >= 5){
            levelUp(score);
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a)* Math.random()), y : Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]} 
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // 2. Display the snake and food
    board.innerHTML = "";
    showLevel();

    // Displaying the snake
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add('head')
        }else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    // Displaying the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y; 
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement)
}

// Main loginc starts here
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null){
    hiscoreval = 0
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "High Score : "+hiscore
}

window.requestAnimationFrame(main) // Takes a method and runs it on a loop
window.addEventListener('keydown',e=>{
    inputDir = { x:0 , y:1}
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break; 

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1 ;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

    }
})