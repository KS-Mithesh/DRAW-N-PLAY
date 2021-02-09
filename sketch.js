var bg = "#79CAF9";
var gameState="playerMode";

var oneP, onePtint=0, twoP, twoPtint=0, player, black;
var onePchar=Math.random(0,1), onePcolour=Math.random(0,1), twoPchar=Math.random(0,1), twoPcolour=Math.random(0,1);

var eraser, pause, nextButton, blackM, blackP, greenM, greenP, redM, redP;
var drawChosen;

var creation="created";

var p1, p2;
var p1up="released", p2up="released";

var blackSprites=[], redSprites=[], greenSprites=[];

var downCol, upCol, rightCol, leftCol;

var cat, catLeft, catRight;
var horse, horseLeft, horseRight;
var monkey, monkeyLeft, monkeyRight;

var arrowKeys, wsadKeys;

var p1win, p2win, Plose, Pwin;

var oldWidth, oldHeight;

var num=11, numStarter="stopped";

var PdrawIs;

var p1Area ,p2Area;

var lockImage;

var p1X, p1Y, p2X, p2Y;

var dingStart, winSound;

function preload(){

  oneP = loadImage("images/1P.png");
  twoP = loadImage("images/2P.png");
  player = loadImage("images/player.png");

  black = loadImage("images/black.png");

  eraser = loadImage("images/eraser.png");
  nextButton = loadImage("images/next_button.png");

  blackM = loadImage("images/marker/blackmarker.png");
  blackP = loadImage("images/pencil/blackpencil.png");
  greenM = loadImage("images/marker/greenmarker.png");
  greenP = loadImage("images/pencil/greenpencil.png");
  redM   = loadImage("images/marker/redmarker.png");
  redP   = loadImage("images/pencil/redpencil.png");

  catLeft  = loadImage("images/char/cat/sprite_left.png");
  catRight = loadImage("images/char/cat/sprite_right.png");

  horseLeft  = loadImage("images/char/horse/sprite_left.png");
  horseRight = loadImage("images/char/horse/sprite_right.png");

  monkeyLeft  = loadImage("images/char/monkey/sprite_left.png");
  monkeyRight = loadImage("images/char/monkey/sprite_right.png");

  arrowKeys = loadImage("images/arrow_keys.png");
  wsadKeys  = loadImage("images/wsad_keys.png");

  p1win  = loadImage("images/P1win.png");
  p2win  = loadImage("images/P2win.png");

  Plose = loadImage("images/Plose.png");
  Pwin  = loadImage("images/Pwin.png");

  lockImage = loadImage("images/lock.png");

  dingStart = loadSound("images/Ding.mp3");
  winSound  = loadSound("images/win.wav");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  oldWidth  = windowWidth;
  oldHeight = windowHeight;

  eraserSP = createSprite((windowHeight/8)*7,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  eraserSP.visible=false;

  nextSP = createSprite(windowWidth-(windowHeight/8),windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  nextSP.visible=false;
  nextSP.setCollider("circle",0,0,(windowHeight/8)/2);

  blackMSP = createSprite(windowHeight/8,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  blackMSP.visible=false;

  blackPSP = createSprite((windowHeight/8)*9,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  blackPSP.visible=false;

  greenMSP = createSprite((windowHeight/8)*3,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  greenMSP.visible=false;

  greenPSP = createSprite((windowHeight/8)*11,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  greenPSP.visible=false;

  redMSP = createSprite((windowHeight/8)*5,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  redMSP.visible=false;

  redPSP = createSprite((windowHeight/8)*13,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);
  redPSP.visible=false;


  upCol = createSprite(windowWidth/2,0,windowWidth,2);
  upCol.visible=false;
  downCol = createSprite(windowWidth/2,(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2),windowWidth,1);
  downCol.visible=false;
  rightCol = createSprite(windowWidth,windowHeight/2,2,windowHeight);
  rightCol.visible=false;
  leftCol = createSprite(0,windowHeight/2,2,windowHeight);
  leftCol.visible=false;

  jumpLine = createSprite(downCol.x,downCol.y-5,downCol.width,downCol.height);
  jumpLine.visible=false;

  p1 = createSprite(windowWidth/8,windowWidth/8,windowWidth/15,windowWidth/15);
  p1.x=p1.width/2;
  p1.y=p1.height/2;
  p1.visible=false;

  p2 = createSprite((windowWidth-windowWidth/8),(windowWidth-windowWidth/8),windowWidth/15,windowWidth/15);
  p2.x=p2.width/2;
  p2.y=p2.height/2;
  p2.visible=false;

  cat    = catRight;
  horse  = horseRight;
  monkey = monkeyRight;

  p1Area = createSprite(windowWidth/4,windowHeight/2,windowWidth/2,windowHeight);
  p1Area.visible=false;
  p2Area = createSprite((windowWidth/2+windowWidth/4),windowHeight/2,windowWidth/2,windowHeight);
  p2Area.visible=false;

}

function draw() {
  background(bg);

  if(oldWidth!==windowWidth || oldHeight!=windowHeight){
    p1.width  = windowWidth/15;
    p1.height = windowWidth/15;

    p2.width  = windowWidth/15;
    p2.height = windowWidth/15;

    oldWidth  = windowWidth;
    oldHeight = windowHeight;
  }

  if(numStarter==="started"){
    num+=1;
  }

  p1.collide(upCol);
  p1.collide(downCol);
  p1.collide(rightCol);
  p1.collide(leftCol);

  p2.collide(upCol);
  p2.collide(downCol);
  p2.collide(rightCol);
  p2.collide(leftCol);

  if(gameState==="playerMode"){

    p1.visible=false;
    p2.visible=false;

    line(windowWidth/2,0,windowWidth/2,windowHeight);

    imageMode(CENTER);
    image(oneP,windowWidth/4,windowHeight/3,windowWidth/3,windowHeight/2);

    imageMode(CENTER);
    image(player,windowWidth/4,(windowHeight/2+windowHeight/4),windowWidth/5,windowHeight/3);

    imageMode(CENTER);
    image(twoP,(windowWidth/2+windowWidth/4),windowHeight/3,windowWidth/3,windowHeight/2);

    imageMode(CENTER);
    image(player,(windowWidth/2+windowWidth/6+windowWidth/6),(windowHeight/2+windowHeight/4),windowWidth/5,windowHeight/3);

    imageMode(CENTER);
    image(player,(windowWidth/2+windowWidth/6),(windowHeight/2+windowHeight/4),windowWidth/5,windowHeight/3);

    if(mouseX<windowWidth/2){
      onePtint=0;
      twoPtint=100;
    }
    else if(mouseX>windowWidth/2){
      onePtint=100;
      twoPtint=0;
    }

    imageMode(CENTER);tint(255,onePtint);
    image(black,windowWidth/4,windowHeight/2,windowWidth/2,windowHeight);

    imageMode(CENTER);tint(255,twoPtint);
    image(black,(windowWidth/2+windowWidth/4),windowHeight/2,windowWidth/2,windowHeight);

    if(mouseIsPressed && num>10){
      numStarter="stopped";
      if(mouseX<=windowWidth/2){
        gameState="1Phelp";
      }
      else if(mouseX>windowWidth/2){
        gameState="2Phelp";
      }
    }
  }

  if(gameState==="1Phelp"){

    p1.visible=false;
    p2.visible=false;

    bg="white";

    push();
    textSize((windowWidth/40));
    fill("black");
    text("Black is the land where your player run,jump,etc.",windowWidth/6,windowHeight/4);
    fill("red");
    text("Red is the danger zone for the player",windowWidth/6,windowHeight/2);
    fill("green");
    text("Green is the finish line for the player",windowWidth/6,(windowHeight/2+windowHeight/4));
    pop();

    rectMode(CENTER);fill("grey");
    rect((windowWidth/100)*90,(windowHeight/100)*90,(windowWidth/100)*10,(windowWidth/100)*3);

    textSize((windowWidth/55));
    fill("white");
    text("Continue ▶",((windowWidth/100)*90)-(((windowWidth/100)*10)/2),(windowHeight/100)*90.5);

    if(mouseIsPressed && mouseX<(((windowWidth/100)*90)+(((windowWidth/100)*10)/2)) && mouseX>(((windowWidth/100)*90)-(((windowWidth/100)*10)/2)) && mouseY>(((windowHeight/100)*90)-(((windowWidth/100)*3)/2)) && mouseY<(((windowHeight/100)*90)+(((windowWidth/100)*3)/2))){
      p1.visible=true;
      gameState="1Pdraw"
    }

  }

  if(gameState==="2Phelp"){

    p1.x = width/4;
    p1.visible=false;

    p2.x = windowWidth-(width/4);
    p2.visible=false;

    bg="white";

    push();
    textSize((windowWidth/40));
    fill("black");
    text("Black is the land where your player run,jump,etc.",windowWidth/6,windowHeight/4);
    fill("red");
    text("Red is the danger zone for the player",windowWidth/6,windowHeight/2);
    fill("green");
    text("Green is the finish line for the player",windowWidth/6,(windowHeight/2+windowHeight/4));
    pop();

    rectMode(CENTER);fill("grey");
    rect((windowWidth/100)*90,(windowHeight/100)*90,(windowWidth/100)*10,(windowWidth/100)*3);

    textSize((windowWidth/55));
    fill("white");
    text("Continue ▶",((windowWidth/100)*90)-(((windowWidth/100)*10)/2),(windowHeight/100)*90.5);

    if(mouseIsPressed && mouseX<(((windowWidth/100)*90)+(((windowWidth/100)*10)/2)) && mouseX>(((windowWidth/100)*90)-(((windowWidth/100)*10)/2)) && mouseY>(((windowHeight/100)*90)-(((windowWidth/100)*3)/2)) && mouseY<(((windowHeight/100)*90)+(((windowWidth/100)*3)/2))){
      PdrawIs = "p1Is";
      numStarter="started";
      num=0;
      p1.visible=false;
      p1.x=windowWidth/6;
      p2.visible=false;
      p2.x=windowWidth-(windowWidth/6);
      gameState="2Pdraw";
    }

  }

  if(gameState==="1Pdraw"){

    p1.visible=true;
    p2.visible=false;

    p1.velocityX=0;
    p1.velocityY=0;

    p2.velocityX=0;
    p2.velocityY=0;

    if(onePcolour<0.2){
      bg="#3DED98";//sea foam green
    }
    else if(onePcolour<0.4){
      bg="#F69ACD";//ordinary pink
    }
    else if(onePcolour<0.6){
      bg="#E6C27E";//latte yellow
    }
    else if(onePcolour<0.8){
      bg="#48AAAD";//teal blue
    }
    else{
      bg="#FDA172";//cantaloupe orange
    }

    rectMode(CENTER);fill("white");
    rect(windowWidth/2,windowHeight-((windowHeight/6)/4),windowWidth,windowHeight/4);

    imageMode(CENTER);
    image(blackM,windowHeight/8,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    imageMode(CENTER);
    image(greenM,(windowHeight/8)*3,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    imageMode(CENTER);
    image(redM,(windowHeight/8)*5,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    imageMode(CENTER);
    image(eraser,(windowHeight/8)*7,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    imageMode(CENTER);
    image(blackP,(windowHeight/8)*9,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    imageMode(CENTER);
    image(greenP,(windowHeight/8)*11,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    imageMode(CENTER);
    image(redP,(windowHeight/8)*13,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    imageMode(CENTER);
    image(nextButton,windowWidth-(windowHeight/8),windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

    if(mousePressedOver(blackMSP)){
      drawChosen="blackM";
    }
    else if(mousePressedOver(blackPSP)){
      drawChosen="blackP";
    }
    else if(mousePressedOver(greenMSP)){
      drawChosen="greenM";
    }
    else if(mousePressedOver(greenPSP)){
      drawChosen="greenP";
    }
    else if(mousePressedOver(redMSP)){
      drawChosen="redM";
    }
    else if(mousePressedOver(redPSP)){
      drawChosen="redP";
    }
    else if(mousePressedOver(eraserSP)){
      drawChosen="eraser";
    }
    else if(mousePressedOver(p1) && mouseY<downCol.y-(p1.width/2)){
      drawChosen=null;

      p1.x=mouseX;
      p1.y=mouseY;
    }

    if(drawChosen==="blackM"){
      imageMode(CENTER);
      image(blackM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5){
        blackSprites.push(createSprite(mouseX,mouseY,20,15));
        blackSprites.push(createSprite(mouseX,mouseY-2.5,20,20));
      }
    }
    else if(drawChosen==="blackP"){
      imageMode(CENTER);
      image(blackP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5){
        blackSprites.push(createSprite(mouseX,mouseY,10,5));
        blackSprites.push(createSprite(mouseX,mouseY-2.5,10,10));
      }
    }
    else if(drawChosen==="greenM"){
      imageMode(CENTER);
      image(greenM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5){
        greenSprites.push(createSprite(mouseX,mouseY,20,15));
      }
    }
    else if(drawChosen==="greenP"){
      imageMode(CENTER);
      image(greenP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5){
        greenSprites.push(createSprite(mouseX,mouseY,10,5));
      }
    }
    else if(drawChosen==="redM"){
      imageMode(CENTER);
      image(redM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
      
      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5){
        redSprites.push(createSprite(mouseX,mouseY,20,15));
      }
    }
    else if(drawChosen==="redP"){
      imageMode(CENTER);
      image(redP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5){
        redSprites.push(createSprite(mouseX,mouseY,10,5));
      }
    }
    else if(drawChosen==="eraser"){

      for(var i=0;i<blackSprites.length;i++){
        blackSprites[i].destroy();
      }
      for(var i=0;i<greenSprites.length;i++){
        greenSprites[i].destroy();
      }
      for(var i=0;i<redSprites.length;i++){
        redSprites[i].destroy();
      }

      blackSprites=[];
      greenSprites=[];
      redSprites=[];

      drawChosen=null;
    }

    if(mousePressedOver(nextSP)){

      drawChosen=null;

      dingStart.play();

      gameState="1Pplay";
    }

  }

  if(gameState==="2Pdraw"){

    if(onePcolour<0.2){
      bg="#3DED98";//sea foam green
    }
    else if(onePcolour<0.4){
      bg="#F69ACD";//ordinary pink
    }
    else if(onePcolour<0.6){
      bg="#E6C27E";//latte yellow
    }
    else if(onePcolour<0.8){
      bg="#48AAAD";//teal blue
    }
    else{
      bg="#FDA172";//cantaloupe orange
    }

    p1.visible=true;
    p1.collide(p2Area);
    p1.velocityX=0;
    p1.velocityY=0;

    p2.visible=true;
    p2.collide(p1Area);
    p2.velocityX=0;
    p2.velocityY=0;

    if(PdrawIs==="p1Is"){
      
      rectMode(CENTER);fill("white");
      rect(windowWidth/2,windowHeight-((windowHeight/6)/4),windowWidth,windowHeight/4);

      imageMode(CENTER);
      image(blackM,windowHeight/8,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(greenM,(windowHeight/8)*3,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(redM,(windowHeight/8)*5,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(eraser,(windowHeight/8)*7,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(blackP,(windowHeight/8)*9,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(greenP,(windowHeight/8)*11,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(redP,(windowHeight/8)*13,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(nextButton,windowWidth-(windowHeight/8),windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      if(mousePressedOver(blackMSP)){
        drawChosen="blackM";
      }
      else if(mousePressedOver(blackPSP)){
        drawChosen="blackP";
      }
      else if(mousePressedOver(greenMSP)){
        drawChosen="greenM";
      }
      else if(mousePressedOver(greenPSP)){
        drawChosen="greenP";
      }
      else if(mousePressedOver(redMSP)){
        drawChosen="redM";
      }
      else if(mousePressedOver(redPSP)){
        drawChosen="redP";
      }
      else if(mousePressedOver(p2) && mouseY<downCol.y-(p2.width/2) && mouseX>windowWidth/2+(p2.width/2)){
        drawChosen=null;

        p2.x=mouseX;
        p2.y=mouseY;
      }

      if(drawChosen==="blackM"){
      imageMode(CENTER);
      image(blackM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5 && mouseX>(windowWidth/2)+5){
        blackSprites.push(createSprite(mouseX,mouseY,20,15));
        blackSprites.push(createSprite(mouseX,mouseY-2.5,20,20));
      }
    }
    else if(drawChosen==="blackP"){
      imageMode(CENTER);
      image(blackP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5 && mouseX>(windowWidth/2)+2.5){
        blackSprites.push(createSprite(mouseX,mouseY,10,5));
        blackSprites.push(createSprite(mouseX,mouseY-2.5,10,10));
      }
    }
    else if(drawChosen==="greenM"){
      imageMode(CENTER);
      image(greenM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5 && mouseX>(windowWidth/2)+5){
        greenSprites.push(createSprite(mouseX,mouseY,20,15));
      }
    }
    else if(drawChosen==="greenP"){
      imageMode(CENTER);
      image(greenP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5 && mouseX>(windowWidth/2)+2.5){
        greenSprites.push(createSprite(mouseX,mouseY,10,5));
      }
    }
    else if(drawChosen==="redM"){
      imageMode(CENTER);
      image(redM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
      
      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5 && mouseX>(windowWidth/2)+5){
        redSprites.push(createSprite(mouseX,mouseY,20,15));
      }
    }
    else if(drawChosen==="redP"){
      imageMode(CENTER);
      image(redP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5 && mouseX>(windowWidth/2)+2.5){
        redSprites.push(createSprite(mouseX,mouseY,10,5));
      }
    }

    if(mousePressedOver(nextSP) && num>10){
      numStarter="stopped";
      num=0;
      drawChosen=null;
      numStarter="started";
      PdrawIs = "p2Is";
    }

    }

    if(PdrawIs==="p2Is"){

      rectMode(CENTER);fill("white");
      rect(windowWidth/2,windowHeight-((windowHeight/6)/4),windowWidth,windowHeight/4);

      imageMode(CENTER);
      image(blackM,windowHeight/8,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(greenM,(windowHeight/8)*3,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(redM,(windowHeight/8)*5,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(blackP,(windowHeight/8)*9,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(greenP,(windowHeight/8)*11,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(redP,(windowHeight/8)*13,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(nextButton,windowWidth-(windowHeight/8),windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      if(mousePressedOver(blackMSP)){
        drawChosen="blackM";
      }
      else if(mousePressedOver(blackPSP)){
        drawChosen="blackP";
      }
      else if(mousePressedOver(greenMSP)){
        drawChosen="greenM";
      }
      else if(mousePressedOver(greenPSP)){
        drawChosen="greenP";
      }
      else if(mousePressedOver(redMSP)){
        drawChosen="redM";
      }
      else if(mousePressedOver(redPSP)){
        drawChosen="redP";
      }
      else if(mousePressedOver(p1) && mouseY<downCol.y-(p1.width/2)){
        drawChosen=null;

        p1.x=mouseX;
        p1.y=mouseY;
      }

      if(drawChosen==="blackM"){
      imageMode(CENTER);
      image(blackM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5 && mouseX<(windowWidth/2)-5){
        blackSprites.push(createSprite(mouseX,mouseY,20,15));
        blackSprites.push(createSprite(mouseX,mouseY-2.5,20,20));
      }
    }
    else if(drawChosen==="blackP"){
      imageMode(CENTER);
      image(blackP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5 && mouseX<(windowWidth/2)-2.5){
        blackSprites.push(createSprite(mouseX,mouseY,10,5));
        blackSprites.push(createSprite(mouseX,mouseY-2.5,10,10));
      }
    }
    else if(drawChosen==="greenM"){
      imageMode(CENTER);
      image(greenM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5 && mouseX<(windowWidth/2)-5){
        greenSprites.push(createSprite(mouseX,mouseY,20,15));
      }
    }
    else if(drawChosen==="greenP"){
      imageMode(CENTER);
      image(greenP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5 && mouseX<(windowWidth/2)-2.5){
        greenSprites.push(createSprite(mouseX,mouseY,10,5));
      }
    }
    else if(drawChosen==="redM"){
      imageMode(CENTER);
      image(redM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
      
      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-7.5 && mouseX<(windowWidth/2)-5){
        redSprites.push(createSprite(mouseX,mouseY,20,15));
      }
    }
    else if(drawChosen==="redP"){
      imageMode(CENTER);
      image(redP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);

      if(mouseIsPressed && mouseY<(windowHeight-((windowHeight/6)/4))-((windowHeight/4)/2)-2.5 && mouseX<(windowWidth/2)-2.5){
        redSprites.push(createSprite(mouseX,mouseY,10,5));
      }
    }

    if(mousePressedOver(nextSP) && num>10){
      numStarter="stopped";
      num=0;
      drawChosen=null;

      p1.visible=false;

      p2.visible=false;

      p1X = p1.x;
      p1Y = p1.y;

      p2X = p2.x;
      p2Y = p2.y;

      dingStart.play();
      gameState="2Pplay";

    }

    }

  }

  if(gameState==="2Pplay"){

    line(windowWidth/2,0,windowWidth/2,windowHeight);

    p1.visible=false;
    p2.visible=false;

    rectMode(CENTER);fill("white");
    rect(windowWidth/2,windowHeight-((windowHeight/6)/4),windowWidth,windowHeight/4);

    for(var i=0;i<blackSprites.length;i+=2){
      p1.collide(blackSprites[i]);
      p2.collide(blackSprites[i]);
    }
    for(var i=0;i<greenSprites.length;i++){
      if(p1.isTouching(greenSprites[i])){
        winSound.play();
        gameState="P1win";
      }
      else if(p2.isTouching(greenSprites[i])){
        winSound.play();
        gameState="P2win";
      }
    }
    for(var i=0;i<redSprites.length;i++){
      if(p1.isTouching(redSprites[i])){
        p1.x = p1X;
        p1.y = p1Y;
      }
      else if(p2.isTouching(redSprites[i])){
        p2.x = p2X;
        p2.y = p2Y;
      }
    }

    if(blackSprites.length<1){
      if(p1.isTouching(jumpLine)){
        if(keyDown("w")||keyDown("W")){
          if(p1up==="released"){
            p1.velocityY=-13;
            p1up="pressed";
          }
        }
        else{
          if(p1up==="pressed"){
            p1up="released";
          }
        }
      }
    }
    else{
      for(var i=0;i<blackSprites.length;i++){
        if(p1.isTouching(blackSprites[i]) || p1.isTouching(jumpLine)){
          if(keyDown("w")||keyDown("W")){
            if(p1up==="released"){
              p1.velocityY=-13;
              p1up="pressed";
            }
          }
          else{
            if(p1up==="pressed"){
              p1up="released";
            }
          }
        }
      }
    }

    if(blackSprites.length<1){
      if(p2.isTouching(jumpLine)){
        if(keyDown("up_arrow")){
          if(p2up==="released"){
            p2.velocityY=-13;
            p2up="pressed";
          }
        }
        else{
          if(p2up==="pressed"){
            p2up="released";
          }
        }
      }
    }
    else{
      for(var i=0;i<blackSprites.length;i++){
        if(p2.isTouching(blackSprites[i]) || p2.isTouching(jumpLine)){
          if(keyDown("up_arrow")){
            if(p2up==="released"){
              p2.velocityY=-13;
              p2up="pressed";
            }
          }
          else{
            if(p2up==="pressed"){
              p2up="released";
            }
          }
        }
      }
    }

    if(keyDown("d")||keyDown("D")){
      p1.velocityX=10;
    }
    else if(keyDown("a")||keyDown("A")){
      p1.velocityX=-10;
    }
    else{
      p1.velocityX=0;
    }

    if(keyDown("right_arrow")){
      p2.velocityX=10;
    }
    else if(keyDown("left_arrow")){
      p2.velocityX=-10;
    }
    else{
      p2.velocityX=0;
    }

    p1.velocityY = p1.velocityY + 0.8;
    p2.velocityY = p2.velocityY + 0.8;

    p1.collide(p2Area);
    p2.collide(p1Area);

  }

  for(var i=0;i<blackSprites.length;i++){
    blackSprites[i].shapeColor="#000000";
    blackSprites[i].depth=p1.depth-1;
    blackSprites[i].depth=blackSprites[i].depth-1;
  }
  for(var i=1;i<blackSprites.length;i+=2){
    blackSprites[i].visible=false;
  }
  for(var i=0;i<greenSprites.length;i++){
    greenSprites[i].shapeColor="#0ED145";
    greenSprites[i].depth=p1.depth-1;
    greenSprites[i].depth=greenSprites[i].depth-1;
  }
  for(var i=0;i<redSprites.length;i++){
    redSprites[i].shapeColor="#EC1C24";
    redSprites[i].depth=p1.depth-1;
    redSprites[i].depth=redSprites[i].depth-1;
  }

  if(gameState==="1Pplay"){

    p1.visible=false;
    p2.visible=false;

    rectMode(CENTER);fill("white");
    rect(windowWidth/2,windowHeight-((windowHeight/6)/4),windowWidth,windowHeight/4);

    for(var i=0;i<blackSprites.length;i+=2){
      p1.collide(blackSprites[i]);
    }
    for(var i=0;i<greenSprites.length;i++){
      if(p1.isTouching(greenSprites[i])){
        winSound.play();
        gameState="Pwin";
      }
    }
    for(var i=0;i<redSprites.length;i++){
      if(p1.isTouching(redSprites[i])){
        gameState="Plose";
      }
    }

    if(blackSprites.length<1){
      if(p1.isTouching(jumpLine)){
        if(keyDown("up_arrow")){
          if(p1up==="released"){
            p1.velocityY=-13;
            p1up="pressed";
          }
        }
        else{
          if(p1up==="pressed"){
            p1up="released";
          }
        }
      }
    }
    else{
      for(var i=0;i<blackSprites.length;i++){
        if(p1.isTouching(blackSprites[i]) || p1.isTouching(jumpLine)){
          if(keyDown("up_arrow")){
            if(p1up==="released"){
              p1.velocityY=-13;
              p1up="pressed";
            }
          }
          else{
            if(p1up==="pressed"){
              p1up="released";
            }
          }
        }
      }
    }
    if(keyDown("right_arrow")){
      p1.velocityX=10;
    }
    else if(keyDown("left_arrow")){
      p1.velocityX=-10;
    }
    else{
      p1.velocityX=0;
    }

    p1.velocityY = p1.velocityY + 0.8;

  }

  drawSprites();

  if(gameState==="P1win"){
    imageMode(CENTER);
    image(p1win,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

    if(mouseIsPressed){
      num=0;
      numStarter="started";
      
      reset("playerMode");
      
    }
  }
  if(gameState==="P2win"){
    imageMode(CENTER);
    image(p2win,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

    if(mouseIsPressed){
      num=0;
      numStarter="started";
      
      reset("playerMode");
      
    }
  }
  if(gameState==="Plose"){
    imageMode(CENTER);
    image(Plose,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

    if(mouseIsPressed){
      num=0;
      numStarter="started";
      
      reset("playerMode");
      
    }
  }
  if(gameState==="Pwin"){
    imageMode(CENTER);
    image(Pwin,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

    if(mouseIsPressed){
      num=0;
      numStarter="started";
      
      reset("playerMode");
      
    }
  }

  if(gameState==="1Pdraw"){
    imageMode(CENTER);
    image(player,p1.x,p1.y,p1.width,p1.height);
  }

  if(gameState==="2Pdraw"){

    imageMode(CENTER);
    image(player,p1.x,p1.y,p1.width,p1.height);

    imageMode(CENTER);
    image(player,p2.x,p2.y,p2.width,p2.height);

    if(PdrawIs==="p1Is"){
      push();
      imageMode(CENTER);tint(255,230);
      image(black,windowWidth/4,windowHeight/2,windowWidth/2,windowHeight);
      pop();

      push();
      imageMode(CENTER);
      image(lockImage,windowWidth/4,windowHeight/2,windowWidth/8,windowHeight/3);
      pop();
    }
    if(PdrawIs==="p2Is"){
      push();
      imageMode(CENTER);tint(255,230);
      image(black,(windowWidth/2+windowWidth/4),windowHeight/2,windowWidth/2,windowHeight);
      pop();

      push();
      imageMode(CENTER);
      image(lockImage,(windowWidth/2+windowWidth/4),windowHeight/2,windowWidth/8,windowHeight/3);
      pop();
    }

    rectMode(CENTER);fill("white");
    rect(windowWidth/2,windowHeight-((windowHeight/6)/4),windowWidth,windowHeight/4);

    imageMode(CENTER);
      image(blackM,windowHeight/8,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(greenM,(windowHeight/8)*3,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(redM,(windowHeight/8)*5,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(blackP,(windowHeight/8)*9,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(greenP,(windowHeight/8)*11,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(redP,(windowHeight/8)*13,windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

      imageMode(CENTER);
      image(nextButton,windowWidth-(windowHeight/8),windowHeight-((windowHeight/6)/2),windowHeight/8,windowHeight/8);

  }

  if(gameState==="1Pplay"){

    imageMode(CENTER);
    image(arrowKeys,windowWidth/2,eraserSP.y,windowHeight/6.5,windowHeight/6.5);
    
    if(onePchar<0.4){
      imageMode(CENTER);
      image(cat,p1.x,p1.y,p1.width,p1.height);

      if(keyDown("left_arrow")){
        cat = catLeft;
      }
      else if(keyDown("right_arrow")){
        cat = catRight;
      }

    }
    else if(onePchar<0.7){
      imageMode(CENTER);
      image(horse,p1.x,p1.y,p1.width,p1.height);

      if(keyDown("left_arrow")){
        horse = horseLeft;
      }
      else if(keyDown("right_arrow")){
        horse = horseRight;
      }
    }
    else{
      imageMode(CENTER);
      image(monkey,p1.x,p1.y,p1.width,p1.height);

      if(keyDown("left_arrow")){
        monkey = monkeyLeft;
      }
      else if(keyDown("right_arrow")){
        monkey = monkeyRight;
      }
    }
  }

  if(gameState==="2Pplay"){

    imageMode(CENTER);
    image(arrowKeys,windowWidth-(windowWidth/4),eraserSP.y,windowHeight/6.5,windowHeight/6.5);
    imageMode(CENTER);
    image(wsadKeys,windowWidth/4,eraserSP.y,windowHeight/6.5,windowHeight/6.5);
    
    if(onePchar<0.4){
      imageMode(CENTER);
      image(cat,p1.x,p1.y,p1.width,p1.height);

      if(keyDown("a")||keyDown("A")){
        cat = catLeft;
      }
      else if(keyDown("d")||keyDown("D")){
        cat = catRight;
      }

      if(twoPchar<0.4){

        if(twoPchar<0.5){
          imageMode(CENTER);
          image(horse,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            horse = horseLeft;
          }
          else if(keyDown("right_arrow")){
            horse = horseRight;
          }
        }
        else{
          imageMode(CENTER);
          image(monkey,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            monkey = monkeyLeft;
          }
          else if(keyDown("right_arrow")){
            monkey = monkeyRight;
          }
        }

      }
      else{
        if(twoPchar<0.4){
          imageMode(CENTER);
          image(cat,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            cat = catLeft;
          }
          else if(keyDown("right_arrow")){
            cat = catRight;
          }
        }
        else if(twoPchar<0.7){
          imageMode(CENTER);
          image(horse,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            horse = horseLeft;
          }
          else if(keyDown("right_arrow")){
            horse = horseRight;
          }
        }
        else{
          imageMode(CENTER);
          image(monkey,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            monkey = monkeyLeft;
          }
          else if(keyDown("right_arrow")){
            monkey = monkeyRight;
          }
        }
      }

    }
    else if(onePchar<0.7){
      imageMode(CENTER);
      image(horse,p1.x,p1.y,p1.width,p1.height);

      if(keyDown("a")||keyDown("A")){
        horse = horseLeft;
      }
      else if(keyDown("d")||keyDown("D")){
        horse = horseRight;
      }

      if(twoPchar>=0.4 && twoPchar<0.7){

        if(twoPchar<0.5){
          imageMode(CENTER);
          image(cat,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            cat = catLeft;
          }
          else if(keyDown("right_arrow")){
            cat = catRight;
          }
        }
        else{
          imageMode(CENTER);
          image(monkey,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            monkey = monkeyLeft;
          }
          else if(keyDown("right_arrow")){
            monkey = monkeyRight;
          }
        }

      }
      else{
        if(twoPchar<0.4){
          imageMode(CENTER);
          image(cat,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            cat = catLeft;
          }
          else if(keyDown("right_arrow")){
            cat = catRight;
          }
        }
        else if(twoPchar<0.7){
          imageMode(CENTER);
          image(horse,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            horse = horseLeft;
          }
          else if(keyDown("right_arrow")){
            horse = horseRight;
          }
        }
        else{
          imageMode(CENTER);
          image(monkey,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            monkey = monkeyLeft;
          }
          else if(keyDown("right_arrow")){
            monkey = monkeyRight;
          }
        }
      }

    }
    else{
      imageMode(CENTER);
      image(monkey,p1.x,p1.y,p1.width,p1.height);

      if(keyDown("a")||keyDown("A")){
        monkey = monkeyLeft;
      }
      else if(keyDown("d")||keyDown("D")){
        monkey = monkeyRight;
      }

      if(twoPchar>=0.7){

        if(twoPchar<0.5){
          imageMode(CENTER);
          image(horse,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            horse = horseLeft;
          }
          else if(keyDown("right_arrow")){
            horse = horseRight;
          }
        }
        else{
          imageMode(CENTER);
          image(cat,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            cat = catLeft;
          }
          else if(keyDown("right_arrow")){
            cat = catRight;
          }
        }

      }
      else{
        if(twoPchar<0.4){
          imageMode(CENTER);
          image(cat,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            cat = catLeft;
          }
          else if(keyDown("right_arrow")){
            cat = catRight;
          }
        }
        else if(twoPchar<0.7){
          imageMode(CENTER);
          image(horse,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            horse = horseLeft;
          }
          else if(keyDown("right_arrow")){
            horse = horseRight;
          }
        }
        else{
          imageMode(CENTER);
          image(monkey,p2.x,p2.y,p2.width,p2.height);
    
          if(keyDown("left_arrow")){
            monkey = monkeyLeft;
          }
          else if(keyDown("right_arrow")){
            monkey = monkeyRight;
          }
        }
      }

    }

  }

  if(drawChosen==="blackM"){
    imageMode(CENTER);
    image(blackM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
  }
  else if(drawChosen==="blackP"){
    imageMode(CENTER);
    image(blackP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
  }
  else if(drawChosen==="greenM"){
    imageMode(CENTER);
    image(greenM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
  }
  else if(drawChosen==="greenP"){
    imageMode(CENTER);
    image(greenP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
  }
  else if(drawChosen==="redM"){
    imageMode(CENTER);
    image(redM,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
  }
  else if(drawChosen==="redP"){
    imageMode(CENTER);
    image(redP,mouseX+(windowHeight/8)/2,mouseY-(windowHeight/8)/2,windowHeight/8,windowHeight/8);
  }

}

function reset(state){

  for(var i=0;i<blackSprites.length;i++){
    blackSprites[i].destroy();
  }
  for(var i=0;i<greenSprites.length;i++){
    greenSprites[i].destroy();
  }
  for(var i=0;i<redSprites.length;i++){
    redSprites[i].destroy();
  }

  blackSprites = [];
  greenSprites = [];
  redSprites = [];

  onePchar = Math.random(0,1);;
  onePcolour = Math.random(0,1);;
  twoPchar = Math.random(0,1);;
  twoPcolour = Math.random(0,1);;

  randNum = Math.random(0,1);
  randum = Math.random(0,1);

  drawChosen = null;

  cat = catRight;
  monkey = monkeyRight;
  horse = horseRight;

  p1.visible = false;
  p2.visible = false;

  bg = "#79CAF9";
  gameState = state;

}