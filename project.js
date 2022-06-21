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
        // console.log("MOVING")
        this.int = setInterval(this.changeDirection, 1000);
    }

    cancelInterval=()=>{
        clearInterval(this.int)
        this.int = null
    }

    changeDirection = () => {
        // setInterval(changeDirection, 4000);
        if (this.speedX === 0){
            this.speedX = (Math.round(Math.random() * 2) - 1) * cowSpeed;
        } else { //this changes direction
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
// let cow = new Cow();


//FIGHT
function pvm(target){
    console.log(attacking)
    // attacking = true
    cowDead = false
    if (attacking){
        target.receiveDamage(player.attack())
        // ctx.fillRect(target.x, target.y - 15, target.health*5, 10)

        player.receiveDamage(target.attack())
        // ctx.fillRect(player.x - player.w, player.y - 15, player.health*5, 10)

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
            // click = false
        }
    }
    // if (!attacking){
    //     return
    // }
    
//     if (click) {
//         cow.move()
//    }
}



//MOVING TO COW WHEN CLICKED
function moveToCow(target) {
    // console.log(click)
    target.speedX = 0
    target.speedY = 0
    // console.log(click)
    // console.log("cow x: "+target.x)
    // console.log("cow y: "+target.y)
    // console.log("player x: "+(player.x+player.w))
    // console.log("player y: "+player.y)


    // if (player.x+player.w !== target.x){
        //|| player.y+player.h !== target.y+target.h){
            //if player touches cow, move to correct position
    if (player.x+player.w < target.x){
        // console.log("first work")
        player.x += playerSpeed
        // target.x -= cowSpeed
    } 
    if (player.x+player.w > target.x){
        player.x -= playerSpeed
        // target.x += cowSpeed
    }
    // }
    // if (player.y+player.h !== target.y+target.h){
    if (player.y+player.h > target.y+target.h){
        player.y -= playerSpeed
        // target.y += cowSpeed
    }
    if (player.y+player.h < target.y+target.h){
        player.y += playerSpeed
        // target.y -= cowSpeed
    }
    // }
    if (player.x+player.w === target.x && player.y+player.h === target.y+target.h && click){
        click = false
        attacking = true
        attackingCow = target
        att = setInterval(()=>pvm(target), 1000)
        // if (cowDead === true){
        //     console.log(
        //         "THE COW IS NOW DEAD"
        //     )
        //     clearInterval(att)
        // }
    } 
}

//MOVING TO MOUSE POSITION ON CANVAS WHEN CLICKED
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if (mouseX + player.w > canvas.width){
        mouseX = canvas.width - player.w
        
    }
    if (mouseY + player.h > canvas.height){
        mouseY = canvas.height - player.h
    }

    // console.log(mouseX)
    clickOnCow = false

    for (let i = 0; i<cowArr.length; i++){
        if (mouseX > cowArr[i].x && mouseX < cowArr[i].x+cowArr[i].w && mouseY > cowArr[i].y && mouseY < cowArr[i].y+cowArr[i].h){
            clickOnCow = true
            // console.log(clickOnCow)
            moveToCow(cowArr[i])
            // console.log(clickOnCow)
            cowArr[i].cancelInterval()
        }   
    }
    if (clickOnCow === false){
        // console.log(clickOnCow)
        clearInterval(att)
        attacking = false
        for (let i = 0; i<cowArr.length; i++){
            if (!cowArr[i].int){
                cowArr[i].move()
            }
        }
        if (player.x < mouseX){
            player.x += player.speedX;
        }
        if (player.x > mouseX){
            player.x -= player.speedX;
        }
        if (player.y < mouseY){
            player.y += player.speedY;
        }
        if (player.y > mouseY){
            player.y -= player.speedY;
        }
        if (player.x === mouseX && player.y === mouseY){
            click = false
        }
    }
    // click = false   
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
                //   console.log("BUMP")
                  cowArr[i].speedX = -cowArr[i].speedX
                  cowArr[i].speedY = -cowArr[i].speedY
                //   cowArr[cowArr.indexOf(cowArrJ[j])].speedX = -cowArr[cowArr.indexOf(cowArrJ[j])].speedX
                //   cowArr[cowArr.indexOf(cowArrJ[j])].speedY = -cowArr[cowArr.indexOf(cowArrJ[j])].speedX
              }
        }
    }
    if(click){
        getMousePosition(canvas, click)
        // console.log("clicking")
        
    }
    if (attacking){
        ctx.fillStyle = "Red"
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

// canvas.addEventListener("click", function(e){
//     getMousePosition(canvas, e);
// });

// console.log(#canvas)

animate();