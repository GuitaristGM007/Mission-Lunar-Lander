let lander;
var lander_img, blastImage;
var bg, bg_img;
var rocksGroup1, rocksGroup2, rocksGroup3, rocksImage;
var playButton, playButtonImage;
var resetButton, resetButtonImage;
var mechanism, mechanismImage;
var realMech, realMechImage;
var pillar1Group, pillar2Group, pillar3Group;
var mechanismStage = false;
var back, backImage;
var invisibleWall1, invisibleWall2;
var titleFont, rulesFont;
var bgMusic, blastMusic, scoreMusic, speechMusic;
var score = 0;
var gameState = "wait";

localStorage = ["highestScore"];
localStorage[0] = 0;

function preload(){
lander_img = loadImage("./assets/normal.png");
blastImage = loadImage("./assets/blast.png");
bg_img = loadImage("./assets/bg_sur.png");
rocksImage = loadImage("./assets/rock.png");
playButtonImage = loadImage("./assets/playIcon.png");
resetButtonImage = loadImage("./assets/resetIcon.png");
mechanismImage = loadImage("./assets/mechanism.jpg");
realMechImage = loadImage("./assets/realMech.png");
backImage = loadImage("./assets/back.png");
titleFont = loadFont("./fonts/brocheCut.otf");
rulesFont = loadFont("./fonts/SLANT.TTF");
blastMusic = loadSound("./assets/blastSound.mp3");
scoreMusic = loadSound("./assets/scoreSound.mp3");
speechMusic = loadSound("./assets/speechSound.mp3");
}

function setup() {
createCanvas(1000,620);
frameRate(80);

bg = createSprite(1200, 310, 2400, 813);
bg.addImage("background", bg_img);

rocksGroup1 = createGroup();
rocksGroup2 = createGroup();
rocksGroup3 = createGroup();

pillar1Group = createGroup();
pillar2Group = createGroup();
pillar3Group = createGroup();

lander = createSprite(100,windowHeight / 2,30,30);
lander.addImage("satellite", lander_img);
lander.addImage("explosion", blastImage);
lander.setCollider("rectangle", 0, -50, 620, 750);
lander.debug = false;

playButton = createSprite(500, 310, 330, 330);
playButton.addImage("playIcon", playButtonImage);

resetButton = createSprite(500, 450, 256, 256);
resetButton.addImage("resetIcon", resetButtonImage);
resetButton.visible = false;

mechanism = createSprite(750, 310, 1920, 1080);
mechanism.addImage("rules", mechanismImage);

realMech = createSprite(500, 310, 1091, 730);
realMech.addImage("rulesImage", realMechImage);
realMech.visible = false;

back = createSprite(55, 587.5, 350, 300);
back.addImage("close", backImage);
back.visible = false;

invisibleWall1 = createSprite(500, 2.5, 1000, 5);
invisibleWall1.visible = false;
invisibleWall2 = createSprite(500, 617.5, 1000, 5);
invisibleWall2.visible = false;
}

function draw() {
background(0);

if (gameState === "wait2"){
setTimeout(function(){
gameState = "wait3";
}, 1000);
}
if (gameState === "wait3"){
setTimeout(function(){
gameState = "wait4";
}, 1000);
}
if (gameState === "wait4"){
setTimeout(function(){
gameState = "wait5";
}, 1000);
}
if (gameState === "wait5"){
setTimeout(function(){
gameState = "wait6";
}, 1000);
}

if (gameState === "wait"){
if (mechanismStage === false){
bg.visible = true;
}else{
bg.visible = false;
}
if (mouseIsOver(playButton)){
playButton.scale = 0.4;
}else{
playButton.scale = 0.3;
}
if (mouseIsOver(mechanism)){
mechanism.scale = 0.1;
}else{
mechanism.scale = 0.08;
}
if (mousePressedOver(mechanism)){
mechanismStage = true;
}    

if (mechanismStage === true){
realMech.visible = true;
mechanism.visible = false;
lander.visible = false;
back.visible = true;
if (mouseIsOver(back)){
back.scale = 0.2;
}else{
back.scale = 0.15;
}
if (mousePressedOver(back)){
mechanismStage = false;
back.visible = false;
realMech.visible = false;
mechanism.visible = true;
lander.visible = true;
}
}
if (mousePressedOver(playButton) && mechanismStage === false){
speechMusic.play();
gameState = "wait2";
setTimeout(function(){
gameState = "play";
}, 6000);
playButton.destroy();
mechanism.destroy();
realMech.destroy();
back.destroy();
}
}

if (gameState === "play"){
if (!lander.isTouching(invisibleWall1) && !lander.isTouching(invisibleWall2)){
lander.y += 5;
}

if (keyDown("space")){
lander.y -= 10;
}

if (score <= 20){
buildRocks1();
bg.velocityX = -0.02;
}
if (score <= 50 && score > 20){
buildRocks2();
bg.velocityX = -0.04;
}
if (score > 50){
buildRocks3();
bg.velocityX = -0.05;
}

if (lander.isTouching(pillar1Group)){
pillar1Group.destroyEach();
scoreMusic.play();
score = score + 1;
}
if (lander.isTouching(pillar2Group)){
pillar2Group.destroyEach();
scoreMusic.play();
score = score + 1;
}
if (lander.isTouching(pillar3Group)){
pillar3Group.destroyEach();
scoreMusic.play();
score = score + 1;
}

if (lander.isTouching(invisibleWall1) || lander.isTouching(invisibleWall2)){
blastMusic.play();
gameState = "end";
}
if (lander.isTouching(rocksGroup1)){
blastMusic.play();
gameState = "end";
}
if (lander.isTouching(rocksGroup2)){
blastMusic.play();
gameState = "end";
}
if (lander.isTouching(rocksGroup3)){
blastMusic.play();
gameState = "end";
}
}

if (gameState === "end"){
resetButton.visible = true;
if (mouseIsOver(resetButton)){
resetButton.scale = 0.475;
}else{
resetButton.scale = 0.35;
}
if (mousePressedOver(resetButton)){
again();
}
bg.velocityX = 0;
rocksGroup1.destroyEach();
rocksGroup1.setLifetimeEach(-1);
rocksGroup1.setVelocityXEach(0);
rocksGroup2.destroyEach();
rocksGroup2.setLifetimeEach(-1);
rocksGroup2.setVelocityXEach(0);
rocksGroup3.destroyEach();
rocksGroup3.setLifetimeEach(-1);
rocksGroup3.setVelocityXEach(0);
pillar1Group.destroyEach();
pillar1Group.setLifetimeEach(-1);
pillar1Group.setVelocityXEach(0);
pillar2Group.destroyEach();
pillar2Group.setLifetimeEach(-1);
pillar2Group.setVelocityXEach(0);
pillar3Group.destroyEach();
pillar3Group.setLifetimeEach(-1);
pillar3Group.setVelocityXEach(0);
}

if (gameState === "wait" || gameState === "play"){
lander.scale = 0.1;
lander.changeImage("satellite");
}
if (gameState === "end"){
lander.scale = 0.25;
lander.changeImage("explosion");
}
  
drawSprites();
if (gameState === "wait2"){
fill("white");
strokeWeight(5);
stroke("blue");
textSize(35);
textFont("Copperplate Gothic");
textAlign(CENTER, CENTER);
text("5", 500, 310);
}
if (gameState === "wait3"){
fill("white");
strokeWeight(5);
stroke("blue");
textSize(35);
textFont("Copperplate Gothic");
textAlign(CENTER, CENTER);
text("4", 500, 310);
}
if (gameState === "wait4"){
fill("white");
strokeWeight(5);
stroke("blue");
textSize(35);
textFont("Copperplate Gothic");
textAlign(CENTER, CENTER);
text("3", 500, 310);
}
if (gameState === "wait5"){
fill("white");
strokeWeight(5);
stroke("blue");
textSize(35);
textFont("Copperplate Gothic");
textAlign(CENTER, CENTER);
text("2", 500, 310);
}
if (gameState === "wait6"){
fill("white");
strokeWeight(5);
stroke("blue");
textSize(35);
textFont("Copperplate Gothic");
textAlign(CENTER, CENTER);
text("1", 500, 310);
}
if (gameState === "wait" && mechanismStage === false){
fill("white");
strokeWeight(5);
stroke("blue");
textSize(45);
textFont(titleFont);
textAlign(CENTER, CENTER);
text("Mission Lunar Lander", 500, 125);
textSize(20);
text("Mechanisms", 750, 225);
}
if (gameState === "wait" && mechanismStage === true){
noFill();
strokeWeight(1.5);
stroke("white");
textSize(30);
textFont(rulesFont);
text("1) Keep The Indian Satellite In The Orbit.", 240, 40);
text("Press Space.", 275, 80)
text("2) Beware Of The Debris.", 240, 120);
text("3) Increase The Score.", 240, 160);
textAlign(CENTER, CENTER);
text("This Is Mission Lunar Lander.", 500, 200);
text("Good Luck!", 500, 240);
}
if (gameState === "play"){
fill("blue");
strokeWeight(1.5);
stroke("white");
textSize(30);
textFont("Copperplate Gothic");
textAlign(CENTER, CENTER);
text("Score : "+score, 500, 100);
text("High : "+localStorage[0], 500, 150);
}
if (gameState === "end"){
fill("blue");
strokeWeight(1.5);
stroke("white");
textSize(30);
textFont("Lucida Console");
textAlign(CENTER, CENTER);
text("Mission Failed!", 500, 100);
text("Try Again!", 500, 200);
text("Highest Score : "+localStorage[0], 500, 300);
}
}

function buildRocks1(){
if (frameCount % 110 === 0){
var rock1 = createSprite(1200, 162.5, 528, 2000);
rock1.addImage("blockade", rocksImage);
rock1.y = Math.round(random(-200, 100));
rock1.scale = 0.35;
rock1.velocityX = -10;
rock1.setCollider("rectangle", 0, 100, 280, 1600);
rock1.debug = false;
rock1.lifetime = 200;
rocksGroup1.add(rock1);
var rock2 = createSprite(1200, windowHeight - 162.5, 528, 2000);
rock2.addImage("blockade", rocksImage);
rock2.y = rock1.y + 700;
rock2.scale = 0.2;
rock2.velocityX = -10;
rock2.setCollider("rectangle", 0, -100, 280, 1600);
rock2.debug = false;
rock2.lifetime = 200;
rocksGroup1.add(rock2);
var yPos = (rock2.y - rock1.y) / 2;
var pillar = createSprite(1210, yPos, 5, 620);
pillar.visible = false;
pillar.velocityX = -10;
pillar.lifetime = 200;
pillar1Group.add(pillar);
}
}

function buildRocks2(){
if (frameCount % 110 === 0){
var rock1 = createSprite(1200, 162.5, 528, 2000);
rock1.addImage("blockade", rocksImage);
rock1.y = Math.round(random(-200, 100));
rock1.scale = 0.35;
rock1.velocityX = -12;
rock1.setCollider("rectangle", 0, 100, 280, 1600);
rock1.debug = false;
rock1.lifetime = 200;
rocksGroup2.add(rock1);
var rock2 = createSprite(1200, windowHeight - 162.5, 528, 2000);
rock2.addImage("blockade", rocksImage);
rock2.y = rock1.y + 700;
rock2.scale = 0.2;
rock2.velocityX = -12;
rock2.setCollider("rectangle", 0, -100, 280, 1600);
rock2.debug = false;
rock2.lifetime = 200;
rocksGroup2.add(rock2);
var yPos = (rock2.y - rock1.y) / 2;
var pillar = createSprite(1210, yPos, 5, 620);
pillar.visible = false;
pillar.velocityX = -12;
pillar.lifetime = 200;
pillar2Group.add(pillar);
}
}

function buildRocks3(){
if (frameCount % 110 === 0){
var rock1 = createSprite(1200, 162.5, 528, 2000);
rock1.addImage("blockade", rocksImage);
rock1.y = Math.round(random(-200, 100));
rock1.scale = 0.35;
rock1.velocityX = -13;
rock1.setCollider("rectangle", 0, 100, 280, 1600);
rock1.debug = false;
rock1.lifetime = 200;
rocksGroup3.add(rock1);
var rock2 = createSprite(1200, windowHeight - 162.5, 528, 2000);
rock2.addImage("blockade", rocksImage);
rock2.y = rock1.y + 700;
rock2.scale = 0.2;
rock2.velocityX = -13;
rock2.setCollider("rectangle", 0, -100, 280, 1600);
rock2.debug = false;
rock2.lifetime = 200;
rocksGroup3.add(rock2);
var yPos = (rock2.y - rock1.y) / 2;
var pillar = createSprite(1210, yPos, 5, 620);
pillar.visible = false;
pillar.velocityX = -13;
pillar.lifetime = 200;
pillar3Group.add(pillar);
}
}

function again(){
if (localStorage[0]<score){
localStorage[0] = score;
}
gameState = "play";
resetButton.visible = false;
score = 0;
bg.x = 1200;
lander.y = 310;
lander.changeImage("satellite");
}