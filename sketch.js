  var dog,happyDog,dog2,database,foodS,foodStocke;
  var milk;
  var b1, b2;
  var foodObj;
  var fedTime, lastFed;

  function preload(){

    happyDog = loadImage("dogImg1.png");
    dog2 = loadImage("dogImg.png");
    milk = loadImage("Milk.png");
    
  }

  function setup() {
    createCanvas(1000,500);

    database = firebase.database();

    foodObj = new Food();
    
    dog = createSprite(800,340,10,10);
    dog.addImage(dog2);
    dog.scale = 0.2;

    b1 = createButton("Feed the dog");
    b1.position(500,270);   

    b2 = createButton("Add stocke");
    b2.position(630,270);


  }

  function draw() { 
    background(46, 139, 87);


    drawSprites();

    
  foodObj.getFoodStocke();
  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function (data){
    lastFed = data.val();
  })

  //console.log(lastFed);

  fill(255,255,254);
  textSize(20);

  if(lastFed>=12){
    text("last feed : "+lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30);
  }else{
    text("last Feed : "+lastFed+ "AM",350,30);
  }


      if(foodS != undefined){
      b1.mousePressed(()=>{
        foodS--;
        foodObj.updateFoodStocke();
        feedDog();
       });
      b2.mousePressed(()=>{
        foodS++;
        foodObj.updateFoodStocke();
      });
      }

      if(foodS>=20){
        foodS = 20;
        foodObj.updateFoodStocke();
      }
      

    textSize(20);
    fill("white");
    text(" Food remaining : "+foodS,700,170);
    text("My Doggy game ",450,50);

  

    if(foodS!=undefined&&foodS<=0){
      foodS = 0;
    }

  } 

  function feedDog(){

      dog.addImage(happyDog);

      if(dog.x > 500){
      dog.x = dog.x-7;
    }
     // foodObj.deduct();
     // console.log('this is food '+foodS);


  }


  function addFood(){

      foodS++;
      if(frameCount%80==0){
        console.log('error nahi ayya !...........')}
  }


