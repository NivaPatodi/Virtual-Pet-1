var dog, dogSprite, happyDog; 
var foodS, foodStock;
var database;
var score = 0;
var bgIMG;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  bgIMG = loadImage("bg.png");
}

function setup() 
{
	createCanvas(500, 500);
  
  dogSprite = createSprite(250, 300, 30, 30);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.35;
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }

  else
  {
    x=x-1;
  } 
  
  database.ref('/').update
  (
    {
      Food : x
    }
  )
}

function draw() 
{
  //background(46, 139, 87);

  if(bgIMG)
    background(bgIMG);

  console.log(foodS);
  
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }

  textSize(25);
  fill("black");
  text("Food Remaining : "+foodS, 130, 150);

  drawSprites();

  textSize(21);
  fill("black");
  text("Note : Press UP_ARROW Key To Feed Drago Milk!", 10,40);
}