var gameState = "PLAY";
var PLAY
var END
var monkey , monkey_running , monkey_stopped
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0; 
var survivalTime = 0;
var ground
var food 
var obstacle

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stopped = loadImage("sprite_7.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400); 
  
  monkey = createSprite(50,320);
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1;

  ground = createSprite(200,350,800,10)
  ground.x = ground.width/2;
  ground.velocityX = -4 ;
  
  foodGroup = new Group();
  
  obstaclesGroup = new Group();
   
 
}


function draw() {
background("white")
  //console.log(monkey.y) 
// obstaclesGroup.debugEach = true;
  
   
  
  
  if(gameState === "PLAY"){
   
   survivalTime = Math.ceil(frameCount/frameRate())
   
  }
  
  
  
 
  
  if (gameState === "PLAY"){
    fill ("black"); 
    textSize(20);
   text("score: "+score,300,50)
  
  
  textSize(20);
   fill ("black");
  text("survivalTime: "+ survivalTime,100,50)
    
    if (ground.x < 0){
    ground.x = ground.width/2;  
  }
  
  if (keyDown("space")&& monkey.y > 314){
    monkey.velocityY = -18 ;
  }
  
  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score = score + 1;
    
    
  }
    if (monkey.isTouching(obstaclesGroup)) {
    gameState = "END"  
  
  }
  
  monkey.velocityY = monkey.velocityY + 0.7; 
   
  spawnFood();
  spawnobstacle();
  } else if (gameState === "END"){
    textSize(50);
    fill("black");
   text("score: "+score,100,250)
    
    textSize(50);
   fill ("black");
  text("survivalTime: "+ survivalTime,30,180)
    
    ground.velocityX= 0;
    
     
    foodGroup.destroyEach ();
    
    obstaclesGroup.destroyEach();
    
    monkey.destroy();
    foodGroup.setLifetimeEach = -1;
    obstaclesGroup.setLifetimeEach = -1;
    
  }
    
  
  
  
  monkey.collide(ground);
  
  drawSprites();
  
}

function spawnFood() {
   
  if (frameCount % 80 === 0){
     food = createSprite(350,Math.round(random(120,200)))
     food.velocityX = -4 ;
     food.lifetime = 100;
     food.addImage(bananaImage)
     food.scale = 0.1; 
     foodGroup.add(food)
  } 
  
}

function spawnobstacle (){
  
  if (frameCount % 300 === 0){
    obstacle = createSprite(390,310)
    obstacle.velocityX = -7 ;
    obstacle.lifetime = 100 ; 
    obstacle.addImage(obstaceImage)
    obstacle.scale = 0.2 ;
    obstaclesGroup.add(obstacle)
  }
}


