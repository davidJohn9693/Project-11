// declaring variables
// add walls to collide with (sprites)
var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var score = 0
var lives = 3
var gamestates = "play"
var bomb;



function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  coinImg = loadImage("coin.png");
  bombImg = loadImage("bomb.png");
}

function setup(){
  
  createCanvas(400,400);
  
  // Moving background
  path=createSprite(width/2, height/2);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale=1.2;

  //creating boy running
  boy = createSprite(180,350,30,30);
  boy.scale=0.08;
  boy.addAnimation("JakeRunning",boyImg);

  // creating coins
  // add random spawn

  coin = createSprite(Math.round(random(100, 300)), 20)
  coin.scale=0.3;
  coin.addAnimation("Coins", coinImg);

  bomb = createSprite(Math.round(random(100, 300)), 20)
  bomb.scale=0.07;
  bomb.addAnimation("Bombs", bombImg);



}

function resetCoin(){
  coin.x = Math.round(random(100, 300))
  coin.y = 20
}

function resetBomb(){
  bomb.x = Math.round(random(100, 300))
  bomb.y = 20
}

function death(){
  resetCoin()
  lives = lives - 1
}

function draw() {
  background(30);
  fill("white");
  
  path.velocityY = 4;

  boy.x = World.mouseX;
  
  edges= createEdgeSprites();

  

  if(coin.isTouching(boy)){
    resetCoin()
    score = score + 1
  }

  if(bomb.isTouching(boy)){
    resetBomb()
    death()
    score = score - 5
  }

  //code to reset the background

  if(path.y > 400 ){
    path.y = height/2;
  }

  coin.velocityY = 8
  bomb.velocityY = 8
  
  
  if(coin.isTouching(edges[3])){
    death()
  }

  if(bomb.isTouching(edges[3])){
    score = score + 5
    resetBomb()
  }

  if(coin.isTouching(bomb)){
    resetCoin()
  }


  if(lives <= 0){

    gamestates = "over"
  }

  //difficulty


  drawSprites();
  textSize(12)
  text("Score: " + score, 59, 20)
  text("Lives: " + lives, 59, 40)


  if(gamestates == "over"){
    boy.destroy()
    coin.destroy()
    bomb.destroy()
    gameOver()
  }
}

function gameOver(){
  console.log("Game Over!")
  path.destroy()
  textSize(15)
  text("Game Over!", ((width/2)-60), (height/2))
}