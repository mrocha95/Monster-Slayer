console.log("Project");

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 1200;


//GLOBAL VARIABLES
let att;

let playerSpeed = 0.5;
let cowSpeed = 0.5

let cowNumber = 10

let click = false
let attacking = false

let cowDead = false

let attackingCow;

let playerDead = false;

//PLAYER AND COW CLASSES
class Player {
    constructor(health, strength){
        this.w = 25;
        this.h = 75;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speedX = 0.5;
        this.speedY = 0.5;

        this.health = 20;
        this.strength = 2;
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health -= damage;
    }

    draw() {
        ctx.fillStyle = "#870007";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
        this.x += 0;
        this.y += 0;
    }
}
 

class Cow {
    constructor(health, strength){
        this.w = 100;
        this.h = 50;
        this.x = Math.floor(Math.random() * ((canvas.width-this.w) - this.w + 1) + this.w);
        this.y = Math.floor(Math.random() * ((canvas.height-this.h) - this.h + 1) + this.h);
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
            this.speedX = (Math.round(Math.random() * 2) - 1) * cowSpeed;
        } else {
            this.speedX = Math.round(Math.random()*2-1) * this.speedX;
        }
        if (this.speedY === 0){
            this.speedY = (Math.round(Math.random() * 2) - 1) * cowSpeed;
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
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        this.x += this.speedX
        this.y += this.speedY
    }
}

let cowArr = [];
for (let i = 0; i<cowNumber; i++){
    cowArr.push(new Cow)
    for (let j=0; j<cowArr.length-1; j++){
        while (
            cowArr[i].x < cowArr[j].x + cowArr[j].w &&
            cowArr[i].x + cowArr[i].w > cowArr[j].x &&
            cowArr[i].y < cowArr[j].y + cowArr[j].h &&
            cowArr[i].y + cowArr[i].h > cowArr[j].y
            ){
                cowArr[i].x += 1
                cowArr[i].y += 1
            }
    }
    cowArr[i].move()
}

let player = new Player();


//FIGHT
function pvm(target){
    cowDead = false
    if (attacking){
        target.receiveDamage(player.attack())
        player.receiveDamage(target.attack())

        console.log(target.health)
        console.log(player.health)

        if (target.health <= 0){
            console.log("MOOOOOOOOOOOOO")
            attacking = false
            cowDead = true
            cowArr.splice(cowArr.indexOf(target),1, new Cow())
            clearInterval(att)
        }
        if (player.health <= 0){
            console.log("Oh dear you're dead!")
            attacking = false
            playerDead = true
        }
    }
}



//MOVING TO COW WHEN CLICKED
function moveToCow(target) {
    target.speedX = 0
    target.speedY = 0

    if (player.x+player.w < target.x){
        player.x += playerSpeed
        // target.x -= cowSpeed
    } 
    if (player.x+player.w > target.x){
        player.x -= playerSpeed
        // target.x += cowSpeed
    }
    if (player.y+player.h > target.y+target.h){
        player.y -= playerSpeed
        // target.y += cowSpeed
    }
    if (player.y+player.h < target.y+target.h){
        player.y += playerSpeed
        // target.y -= cowSpeed
    }
    if (player.x+player.w === target.x && player.y+player.h === target.y+target.h && click){
        click = false
        attacking = true
        attackingCow = target
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
    if (mouseY - player.h < 0){
        mouseY = player.h
    }
    clickOnCow = false

    for (let i = 0; i<cowArr.length; i++){
        if (mouseX > cowArr[i].x && mouseX < cowArr[i].x+cowArr[i].w && mouseY > cowArr[i].y && mouseY < cowArr[i].y+cowArr[i].h){
            clickOnCow = true
            moveToCow(cowArr[i])
            cowArr[i].cancelInterval()
        }   
    }
    if (clickOnCow === false){
        clearInterval(att)
        attacking = false
        for (let i = 0; i<cowArr.length; i++){
            if (!cowArr[i].int){
                cowArr[i].move()
            }
        }
        if (player.x + player.w < mouseX){
            player.x += player.speedX;
        }
        if (player.x + player.w > mouseX){
            player.x -= player.speedX;
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
    player.draw();
    for (let i = 0; i<cowArr.length; i++){
        cowArr[i].draw()

        if (cowArr[i].x + cowArr[i].w >= canvas.width){
            cowArr[i].speedX = -cowArr[i].speedX;
        }
        if (cowArr[i].x <= 0){
            cowArr[i].speedX = -cowArr[i].speedX;
        }
        if (cowArr[i].y + cowArr[i].h >= canvas.height){
            cowArr[i].speedY = -cowArr[i].speedY;
        }
        if (cowArr[i].y - cowArr[i].h <= 0){
            cowArr[i].speedY = -cowArr[i].speedY;
        }

        let cowArrJ = [...cowArr]
        cowArrJ.splice(i,1)
        for (let j=0; j<cowArrJ.length; j++){
            if (
                cowArr[i].x < cowArr[cowArr.indexOf(cowArrJ[j])].x + cowArr[cowArr.indexOf(cowArrJ[j])].w &&
                cowArr[i].x + cowArr[i].w > cowArr[cowArr.indexOf(cowArrJ[j])].x &&
                cowArr[i].y < cowArrJ[j].y + cowArr[cowArr.indexOf(cowArrJ[j])].h &&
                cowArr[i].y + cowArr[i].h > cowArr[cowArr.indexOf(cowArrJ[j])].y
              ){
                  cowArr[i].speedX = -cowArr[i].speedX
                  cowArr[i].speedY = -cowArr[i].speedY
              }
        }
    }
    if(click){
        getMousePosition(canvas, click)
        
    }
    if (attacking){
        ctx.fillStyle = "#870007"
        ctx.fillRect(player.x - player.w, player.y - 15, player.health*5, 10)
        ctx.fillRect(attackingCow.x+10, attackingCow.y - 15, attackingCow.health*7, 10)
    }
    if (playerDead){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "white";
        ctx.font = "64px Arial";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
    }
};

canvas.addEventListener("click", function(e){
    click = {clientX: e.clientX, clientY: e.clientY}
});

animate();