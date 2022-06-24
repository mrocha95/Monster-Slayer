let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.height = 540;
canvas.width = 960;


//GLOBAL VARIABLES
let att;

let playerSpeed = 0.5;
let minionSpeed = 0.5

let minionNumber = 8

let click = false
let attacking = false

let minionDead = false

let attackingMinion;

let playerDead = false;

let deathFrames = 0

let killCount = 0

let levelUpKills = 2

let right = true;

let playerLevel;

//STILL IMAGE LEVEL 1
let imgStill = new Image()
imgStill.src = "images/player/level 1/_Idle.png"

//RUNNING IMAGE LEVEL 1
let imgRun = new Image()
imgRun.src = "images/player/level 1/_Run.png"

//RUNNING IMAGE LEVEL 1 LEFT
let imgRunLeft = new Image()
imgRunLeft.src = "images/player/level 1/_RunLeft.png"

//STILL IMAGE LEVEL 2
let imgStill2 = new Image()
imgStill2.src = "images/player/level 2/_Idle.png"

//RUNNING IMAGE LEVEL 2
let imgRun2 = new Image()
imgRun2.src = "images/player/level 2/_Run.png"


//RUNNING IMAGE LEVEL 2 LEFT
let imgRunLeft2 = new Image()
imgRunLeft2.src = "images/player/level 2/_RunLeft.png"

let numRows = 1
let numColumns = 10

let frameWidth = imgStill.width/numColumns
let frameHeight = imgStill.height/numRows


//RUN RIGHT SPRITE LOOPING
let currentFrame = 0

setInterval(function(){
 //pick frame
 currentFrame++

 //make frames loop
 let maxFrame = numColumns * numRows - 1
 if (currentFrame > maxFrame){
     currentFrame = 0
 }
}, 100)


//RUN LEFT SPRITE LOOPING
let currentFrameLeft = numColumns * numRows - 1

setInterval(function(){
    //pick frame
    currentFrameLeft--
   
    //make frames loop
    let maxFrameLeft = 0
    if (currentFrameLeft < maxFrameLeft){
        currentFrameLeft = numColumns * numRows - 1
    }
   }, 120)

//ATTACKING IMAGE
let imgAtt = new Image()
imgAtt.src = "images/player/level 1/_AttackNoMovement.png"

//ATTACKING IMAGE LEVEL 2
let imgAtt2 = new Image()
imgAtt2.src = "images/player/level 2/_AttackNoMovement.png"

let numRowsAtt = 1
let numColumnsAtt = 4

let frameWidthAtt = imgAtt.width/numColumnsAtt
let frameHeightAtt = imgAtt.height/numRowsAtt

let currentFrameAtt = 0

setInterval(function(){
    //pick frame
    currentFrameAtt++
   
    //make frames loop
    let maxFrameAtt = numColumnsAtt * numRowsAtt - 1
    if (currentFrameAtt > maxFrameAtt){
        currentFrameAtt = 0
    }
   }, 120)

//PLAYER AND minion CLASSES
class Player {
    constructor(health, strength){   
        this.w = 40
        this.h = 50

        this.x = canvas.width/2;
        this.y = canvas.height/2;

        this.speedX = 0.5;
        this.speedY = 0.5;

        this.health = 20;
        this.strength = 2;

        this.health1 = 20
        this.health2 = 30
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health -= damage;
    }

    drawStill() {
        //update columns
        let column = currentFrame % numColumns
        let row = Math.floor(currentFrame / numColumns)

        ctx.drawImage(imgStill, column*frameWidth, row*frameHeight, frameWidth, frameHeight, this.x-110, this.y-110, frameWidth*2, frameHeight*2)
    }

    drawRun() {
        //update columns
        let column = currentFrame % numColumns
        let row = Math.floor(currentFrame / numColumns)

        ctx.drawImage(imgRun, column*frameWidth, row*frameHeight, frameWidth, frameHeight, this.x-110, this.y-110, frameWidth*2, frameHeight*2)
    }
    drawRunLeft(){
        //update columns
        let column = currentFrameLeft % numColumns
        let row = Math.floor(currentFrameLeft / numColumns)

        ctx.drawImage(imgRunLeft, column*frameWidth, row*frameHeight, frameWidth, frameHeight, this.x-110, this.y-110, frameWidth*2, frameHeight*2)
    }


    drawAtt() {
        //update columns
        let column = currentFrameAtt % numColumnsAtt
        let row = Math.floor(currentFrameAtt / numColumnsAtt)

        ctx.drawImage(imgAtt, column*frameWidthAtt, row*frameHeightAtt, frameWidthAtt, frameHeightAtt, this.x-110, this.y-110, frameWidthAtt*2, frameHeightAtt*2)
    }

    drawStill2() {
        //update columns
        let column = currentFrame % numColumns
        let row = Math.floor(currentFrame / numColumns)

        ctx.drawImage(imgStill2, column*frameWidth, row*frameHeight, frameWidth, frameHeight, this.x-110, this.y-110, frameWidth*2, frameHeight*2)
    }

    drawRun2() {
        //update columns
        let column = currentFrame % numColumns
        let row = Math.floor(currentFrame / numColumns)

        ctx.drawImage(imgRun2, column*frameWidth, row*frameHeight, frameWidth, frameHeight, this.x-110, this.y-110, frameWidth*2, frameHeight*2)
    }

    drawRunLeft2(){
        //update columns
        let column = currentFrameLeft % numColumns
        let row = Math.floor(currentFrameLeft / numColumns)

        ctx.drawImage(imgRunLeft2, column*frameWidth, row*frameHeight, frameWidth, frameHeight, this.x-110, this.y-110, frameWidth*2, frameHeight*2)
    }

    drawAtt2() {
        //update columns
        let column = currentFrameAtt % numColumnsAtt
        let row = Math.floor(currentFrameAtt / numColumnsAtt)

        ctx.drawImage(imgAtt2, column*frameWidthAtt, row*frameHeightAtt, frameWidthAtt, frameHeightAtt, this.x-110, this.y-110, frameWidthAtt*2, frameHeightAtt*2)
    }
}

let player = new Player();


//Moving
let imgEye = new Image()
imgEye.src = "images/monsters/eye/Flight.png"

let numRowsEye = 1
let numColumnsEye = 8

let frameWidthEye = imgEye.width/numColumnsEye
let frameHeightEye = imgEye.height/numRowsEye

//Attacking
let imgEyeAtt = new Image()
imgEyeAtt.src = "images/monsters/eye/Attack.png"

let currentFrameEye = numColumnsEye * numRowsEye - 1

setInterval(function(){
    //pick frame
    currentFrameEye--
   
    //make frames loop
    let maxFrameEye = 0
    if (currentFrameEye < maxFrameEye){
        currentFrameEye = numColumnsEye * numRowsEye - 1
    }
   }, 120)

//Death
let imgEyeDeath = new Image()
imgEyeDeath.src = "images/monsters/eye/Death.png"

let numRowsEyeDeath = 1
let numColumnsEyeDeath = 4

let frameWidthEyeDeath = imgEyeDeath.width/numColumnsEyeDeath
let frameHeightEyeDeath = imgEyeDeath.height/numRowsEyeDeath

let currentFrameEyeDeath = numColumnsEyeDeath * numRowsEyeDeath - 1

setInterval(function(){
    //pick frame
    currentFrameEyeDeath--
   
    //make frames loop
    let maxFrameEyeDeath = 0
    if (currentFrameEyeDeath < maxFrameEyeDeath){
        currentFrameEyeDeath = numColumnsEyeDeath * numRowsEyeDeath - 1
    }
   }, 200)

//HP REGEN
setInterval(function() {
    if (killCount < levelUpKills && player.health < player.health1){
        player.health += 1
    }
    if (killCount >= levelUpKills && player.health < player.health2){
        player.health +=1
    }
}, 8000)


class Minion {
    constructor(health, strength){
        this.w = 50;
        this.h = 50;
        this.x = Math.floor(Math.random() * ((canvas.width-2*this.w) - this.w + 1) + this.w);
        this.y = Math.floor(Math.random() * ((canvas.height-2*this.h) - canvas.height/2 + 1) + canvas.height/2);
        this.speedX = 0;
        this.speedY = 0;

        this.health = 10;
        this.strength = 1;
        this.int=null
    }

    move=()=>{
        this.int = setInterval(this.changeDirection, 1000);
    }

    cancelInterval=()=>{
        clearInterval(this.int)
        this.int = null
    }

    changeDirection = () => {
        if (this.speedX === 0){
            this.speedX = (Math.round(Math.random() * 2) - 1) * minionSpeed;
        } else {
            this.speedX = Math.round(Math.random()*2-1) * this.speedX;
        }
        if (this.speedY === 0){
            this.speedY = (Math.round(Math.random() * 2) - 1) * minionSpeed;
        } else {
            this.speedY = Math.round(Math.random()*2-1) * this.speedY;
        }
    }

    attack=()=> {
        return this.strength;
    }

    receiveDamage =(damage)=>{
        this.health -= damage;
    }

    draw=()=> {
        let column = currentFrameEye % numColumnsEye
        let row = Math.floor(currentFrameEye / numColumnsEye)

        ctx.drawImage(imgEye, column*frameWidthEye, row*frameHeightEye, frameWidthEye, frameHeightEye, this.x-115, this.y-130, frameWidthEye*2, frameHeightEye*2)

        this.x += this.speedX
        this.y += this.speedY
    }

    drawAtt=()=> {
        let column = currentFrameEye % numColumnsEye
        let row = Math.floor(currentFrameEye / numColumnsEye)

        ctx.drawImage(imgEyeAtt, column*frameWidthEye, row*frameHeightEye, frameWidthEye, frameHeightEye, this.x-115, this.y-130, frameWidthEye*2, frameHeightEye*2)
    }

    drawDeath=()=> {
        let column = currentFrameEyeDeath % numColumnsEyeDeath
        let row = Math.floor(currentFrameEyeDeath / numColumnsEyeDeath)

        ctx.drawImage(imgEyeDeath, column*frameWidthEyeDeath, row*frameHeightEyeDeath, frameWidthEyeDeath, frameHeightEyeDeath, this.x-115, this.y-130, frameWidthEyeDeath*2, frameHeightEyeDeath*2)
    }
}

let minionArr = [];
for (let i = 0; i<minionNumber; i++){
    minionArr.push(new Minion())
    for (let j=0; j<minionArr.length-1; j++){
        while (
            minionArr[i].x < minionArr[j].x + minionArr[j].w &&
            minionArr[i].x + minionArr[i].w > minionArr[j].x &&
            minionArr[i].y < minionArr[j].y + minionArr[j].h &&
            minionArr[i].y + minionArr[i].h > minionArr[j].y
            ){
                minionArr[i].x += 1
                minionArr[i].y += 1
            }
    }
    minionArr[i].move()
}

//FIGHT
function pvm(target){
    minionDead = false
    if (attacking){
        target.receiveDamage(player.attack())
        player.receiveDamage(target.attack())

        if (target.health <= 0){
            attacking = false
            minionDead = true
            killCount +=1
            clearInterval(att)
        }
        if (player.health <= 0){
            attacking = false
            playerDead = true
        }
    }
}



//MOVING TO minion WHEN CLICKED
function moveToMinion(target) {
    target.speedX = 0
    target.speedY = 0

    if (player.x+player.w < target.x){
        player.x += playerSpeed
        right = true
    } 
    if (player.x+player.w > target.x){
        player.x -= playerSpeed
        right = false
    }
    if (player.y+player.h > target.y+target.h){
        player.y -= playerSpeed
    }
    if (player.y+player.h < target.y+target.h){
        player.y += playerSpeed
    }
    if (player.x+player.w === target.x && player.y+player.h === target.y+target.h && click){
        click = false
        attacking = true
        attackingMinion = target

        att = setInterval(()=>pvm(target), 1000)
    } 
}

//MOVING TO MOUSE POSITION ON CANVAS WHEN CLICKED
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if (mouseX - player.w < 0){
        mouseX = player.w
        
    }
    if (mouseY - player.h< canvas.height/2){
        mouseY = canvas.height/2 + player.h
    }
    clickOnMinion = false

    for (let i = 0; i<minionArr.length; i++){
        if (mouseX > minionArr[i].x && mouseX < minionArr[i].x+minionArr[i].w && mouseY > minionArr[i].y && mouseY < minionArr[i].y+minionArr[i].h){
            clickOnMinion = true
            moveToMinion(minionArr[i])
            minionArr[i].cancelInterval()
        }
    }
    if (clickOnMinion === false){
        clearInterval(att)
        attacking = false
        for (let i = 0; i<minionArr.length; i++){
            if (!minionArr[i].int){
                minionArr[i].move()
            }
        }
        if (player.x + player.w < mouseX){
            player.x += player.speedX;
            right = true
        }
        if (player.x + player.w > mouseX){
            player.x -= player.speedX;
            right = false
        }
        if (player.y + player.h < mouseY){
            player.y += player.speedY;
        }
        if (player.y + player.h > mouseY){
            player.y -= player.speedY;
        }
        if (player.x + player.w === mouseX && player.y + player.h === mouseY){
            click = false
        }
    } 
};



function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText(`Kill Count: ${killCount}`, 10, 30);
    ctx.fillText(`Player Level ${playerLevel}`, 10, 60);


    for (let i = 0; i<minionArr.length; i++){
        if (attacking){
            if (i === minionArr.indexOf(attackingMinion)){
                minionArr[i].drawAtt()
            } else {
                minionArr[i].draw()
            }
        } else if(minionDead){
            if (i === minionArr.indexOf(attackingMinion)){
                minionArr[minionArr.indexOf(attackingMinion)].drawDeath()
                deathFrames++
                if(deathFrames===60){
                    minionArr.splice(minionArr.indexOf(attackingMinion),1, new Minion())
                    deathFrames=0
                    minionDead=false
                }
            } else{
                minionArr[i].draw() 
            }

        } else {
            minionArr[i].draw()
        }
        if (minionArr[i].x + minionArr[i].w >= canvas.width){
            minionArr[i].speedX = -minionArr[i].speedX;
        }
        if (minionArr[i].x <= 0){
            minionArr[i].speedX = -minionArr[i].speedX;
        }
        if (minionArr[i].y + minionArr[i].h >= canvas.height){
            minionArr[i].speedY = -minionArr[i].speedY;
        }
        if (minionArr[i].y <= canvas.height/2){
            minionArr[i].speedY = -minionArr[i].speedY;
        }

        let minionArrJ = [...minionArr]
        minionArrJ.splice(i,1)
        for (let j=0; j<minionArrJ.length; j++){
            if (
                minionArr[i].x < minionArr[minionArr.indexOf(minionArrJ[j])].x + minionArr[minionArr.indexOf(minionArrJ[j])].w &&
                minionArr[i].x + minionArr[i].w > minionArr[minionArr.indexOf(minionArrJ[j])].x &&
                minionArr[i].y < minionArrJ[j].y + minionArr[minionArr.indexOf(minionArrJ[j])].h &&
                minionArr[i].y + minionArr[i].h > minionArr[minionArr.indexOf(minionArrJ[j])].y
              ){
                  minionArr[i].speedX = -minionArr[i].speedX
                  minionArr[i].speedY = -minionArr[i].speedY
              }
        }
    }

    if (killCount < levelUpKills){
        playerLevel = 1
        if (!click && !attacking && !playerDead){
            player.drawStill();
        }
        if(click && right){
            getMousePosition(canvas, click)
            player.drawRun()
        } else if (click && !right){
            getMousePosition(canvas, click)
            player.drawRunLeft()
        }
        if (attacking){
            ctx.fillStyle = "#870007"
            ctx.fillRect(player.x - player.w/3, player.y - 30, player.health*2, 5)
            ctx.fillRect(attackingMinion.x, attackingMinion.y - 10, attackingMinion.health*3, 5)
            player.drawAtt()
        }
    } else if (killCount >= levelUpKills){
        playerLevel = 2
        if (!click && !attacking && !playerDead){
            player.drawStill2();
            ctx.fillStyle = "#870007"
        }
        if(click && right){
            getMousePosition(canvas, click)
            player.drawRun2()
        } else if (click && !right){
            getMousePosition(canvas, click)
            player.drawRunLeft2()
        }
        if (attacking){
            ctx.fillStyle = "#870007"
            ctx.fillRect(player.x - player.w/3, player.y - 30, player.health*2, 5)
            ctx.fillRect(attackingMinion.x, attackingMinion.y - 10, attackingMinion.health*3, 5)
            player.drawAtt2()
        }
    if (playerDead){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "white";
        ctx.font = "32px Arial";
        ctx.fillText("Game Over", canvas.width/2.5, canvas.height/2);
    }
    }
};

canvas.addEventListener("click", function(e){
    click = {clientX: e.clientX, clientY: e.clientY}
});

animate();