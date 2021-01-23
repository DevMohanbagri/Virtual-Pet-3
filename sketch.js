//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var foodObj;
var feedDog, feed;
var lastFed;
var addFood, addFoods;
var fedTime;
var x;
var currentTime;
var bedroomImg, gardenImg, washroomImg;
var gameState = "Hungry";
var changeState, readState;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  sadDogImg = loadImage("deadDog.png");
  bedroomImg = loadImage("Bed Room.png");
  gardenImg = loadImage("Garden.png");
  washroomImg = loadImage("Wash Room.png");
  livingroomImg = loadImage("Living Room.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(400,300,50,50);
  dog.scale = 0.15;
  //dog.addImage(dogImg);

  foodObj = new Food();

  feed = createButton("Feed the dog")
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750, 95);
  addFood.mousePressed(addFoods);



    foodStock = database.ref('food');
    foodStock.on("value",readStock);

    lastFed = database.ref('lastFed');
    lastFed.on("value",readLastFed);

    readState = database.ref('gameState');
    readState.on("value",function(data){
      gameState = data.val();
    })
}

function draw() {  
  background(46,139,87);

  //if(foodS === 0)


  foodObj.display();
  drawSprites();
  //add styles here
  textSize(25);
  fill("black")
  text("Food Remaining : "+foodObj.getFoodStock(),10,65)

  textSize(10);
  text("Last Fed : "+foodObj.getLastFed(), 550,95)

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
    console.log("not hungry");
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  currentTime = hour();
  if(currentTime===(foodObj.lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime===(foodObj.lastFed+2)||currentTime===(foodObj.lastFed+5)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(foodObj.lastFed+2) && currentTime<=(foodObj.lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else if(currentTime>(foodObj.lastFed+5) && currentTime<=(foodObj.lastFed+6)){
    update("Resting");
    foodObj.livingroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  console.log(gameState);
  //console.log(lastFed);
  }


function readStock(data){
  var food = data.val();
  foodObj.setFoodStock(food);
}


function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.deductFood();
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    lastFed : hour()

  })

}

function addFoods(){
  dog.addImage(dogImg);
  foodObj.addFoodStock()
  database.ref('/').update({
    food: foodObj.getFoodStock()
  })

}

function readLastFed(data){
  foodObj.setLastFed(data.val());

}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

