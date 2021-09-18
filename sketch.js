var player;
var bulletGroup;
var time = 0;
var gameState;
var obstacle;

function preload(){
bulletImg = loadImage("bullet.png");
groundImg = loadImage("ground.png");
playerImg = loadImage("giphy.gif");
coinImg = loadImage("coin.png")
obstacleImg = loadImage("obstacle.png")
}

function setup() {
canvas = createCanvas(1500, 750);

spawnCoin()

edges=createEdgeSprites();

gameState = "play"

bulletGroup = new Group();
obstacleGroup = new Group()

ground = createSprite(680, 830);
ground.addImage("ground", groundImg);
ground.scale = 3;
ground.velocityX = -20

invGround = createSprite(750, 630, 1500, 10);

player = createSprite(200, 450);
player.addImage("player", playerImg);
player.scale = 0.5;
player.setCollider("rectangle", 0, 30, 190, 320);
}

function draw() {
    background("cyan");
    player.velocityY = player.velocityY + 3
    player.collide(invGround);
    player.collide(edges)
    time = time + Math.round(getFrameRate()/10)


if(gameState === "play"){
    if(ground.x < ground.width/4){
        ground.x = 680;
    }
    if(keyWentDown("space")){
        player.velocityY = -30
    }
    if(mouseWentDown()){
        shoot()
    }
    if(time%50 === 0){
        obstacle.visible = true;
        obstacle.x = 1500;
        obstacle.y = Math.round(random(0, 600));
    }
    if(player.collide(obstacle)){
        gameState = "end"
        obstacleGroup.destroyEach()
        bulletGroup.destroyEach()
        ground.velocityX = 0
    }
} else if(gameState === "end"){

}
 drawSprites();

}

function shoot(){
    var bullet = createSprite();
    bullet.addImage("bullet", bulletImg);
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.velocityX = 25;
    bullet.scale = 0.1;
    bullet.lifetime = 50;
    bulletGroup.add(bullet);
}

function spawnCoin(){
    var coin = createSprite()
    coin.addImage("coin", coinImg)
    coin.scale = 0.1
}

function spawnObstacle(){
    var obstacle = createSprite(1500, Math.round(random(0, 600)));
    obstacle.addImage("obstacle", obstacleImg);
    obstacle.velocityX = -25;
    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle);
}