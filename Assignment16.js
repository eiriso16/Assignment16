var game = new Phaser.Game(800,600,Phaser.AUTO,"",{preload:preload,create:create,update:update});

    //VARIABLER *
var player;
var platforms;
var cursors;
var ledge3;
var steak;
var bones;
var score = 0;
var gameText;
var scoreText;

function preload(){
    
        //IMAGES *
    game.load.spritesheet("dude","assets/Doggo.png",29,23);
    game.load.spritesheet("baddie","assets/baddie.png",32,30);
    game.load.image("steak","assets/smsteak.png");
    game.load.image("bone","assets/bone.png");
    game.load.image("duck","assets/duck.png");
    game.load.image("sky","assets/background.png");
    game.load.image("ground","assets/myplatform.png");
    game.load.image("xsplatform","assets/xsplatform.png");
    game.load.image("smplatform","assets/smplatform.png");
    game.load.image("bottom","assets/bottomplatform.png");
    game.load.image("bump","assets/bump.png");
    game.load.image("water","assets/water.png");
    game.load.image("cloud","assets/Cloudplatform2.png");
    game.load.image("cloud2","assets/Cloudplatform3.png");
    game.load.image("cloud3","assets/Cloudplatform4.png");
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0,0,2000,600,"sky");
    game.world.setBounds(0, 0, 2000, 600);
    
    
        //LIFE *
    liv=game.add.group();
    for (var i=0;i<3;i++){
        hp=liv.create(105+(i*33),10,"steak");liv.fixedToCamera=true;
    }
    
    //water
    
    water=game.add.group();
    water.enableBody=true;
    
    water = water.create(730,game.world.height-60,"water");
    water.body.immovable = true;
    
        //PLATFORMS *
    platforms = game.add.group();
    platforms.enableBody = true;
    

    
    var ground = platforms.create(0,game.world.height-64,"bottom");
    ground.body.immovable = true;
    
    var ground = platforms.create(1200,game.world.height-64,"bottom");
    ground.body.immovable = true;
    
    var ground = platforms.create(1390,130,"ground");
    ground.body.immovable = true;
    
    var ledge = platforms.create(400,400,"ground");
    ledge.body.immovable = true;
    
    var ledge2 = platforms.create(-150,200,"ground");
    ledge2.body.immovable = true;
    
    var ledge4 = platforms.create(1440,350,"smplatform");
    ledge4.body.immovable = true;
    
    var ledge5 = platforms.create(1300,280,"xsplatform");
    ledge5.body.immovable = true;
    
    var ledge7 = platforms.create(1900,250,"smplatform");
    ledge7.body.immovable = true;
    
    var bump = platforms.create(200,512,"bump");
    bump.body.immovable = true;
    
    var cloud = platforms.create(890,350,"cloud");
    cloud.body.immovable = true;
    
    var cloud2 = platforms.create(1700,450,"cloud");
    cloud2.body.immovable = true;
    
    var cloud3 = platforms.create(1155,255,"cloud2");
    cloud3.body.immovable = true;
    
    var cloud4 = platforms.create(970,180,"cloud3");
    cloud4.body.immovable = true;
    
    var cloud5 = platforms.create(1200,108,"cloud3");
    cloud5.body.immovable = true;
    

    
    
        //PLAYER *
    player = game.add.sprite(50,190,"dude");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.2;
    
    
        //PLAYER ANIMATIONS *
    player.animations.add("left",[0,1,2,1],10,true);
    player.animations.add("right",[5,6,7,6],10,true);
    player.animations.add("idle",[3,4],6,true);
    cursors = game.input.keyboard.createCursorKeys();
    
    
        //CAMERA *        
    player.anchor.setTo(0.5, 0.5);
    game.camera.follow(player);
    
    
        //ENEMY1 *
    enemy = game.add.group();
    
    enemy = game.add.sprite(800,300,"baddie");
    game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = true;
    enemy.body.bounce.y = 0.2;
    enemy.animations.add("left",[0,1,2],10,true);
    enemy.animations.add("right",[3,4,5],10,true);
    
        //ENEMY2 *
    enemy2 = game.add.group();
    
    enemy2 = game.add.sprite(1900,480,"baddie");
    game.physics.arcade.enable(enemy2);
    enemy2.body.gravity.y = 300;
    enemy2.body.collideWorldBounds = true;
    enemy2.body.bounce.y = 0.2;
    enemy2.body.bounce.x = 1;
    enemy2.animations.add("left",[0,1,2],10,true);
    enemy2.animations.add("right",[3,4,5],10,true);    
    
        //LEDGE3 * (moving)
    ledge3 = platforms.create(255,350,"smplatform");
    ledge3.body.immovable = true;
    ledge3.body.collideWorldBounds = true;
    ledge3.body.velocity.y = 100;
    
    
        //BONES *
    bones = game.add.group();
    bones.enableBody = true;
    bone1 = bones.create(game.world.width-1088,315,"bone");
    bone2 = bones.create(game.world.width-1830,180,"bone");
    bone3 = bones.create(game.world.width-1470,380,"bone");
    bone4 = bones.create(game.world.width-1930,510,"bone");
    bone5 = bones.create(game.world.width-1260,510,"bone");
    bone6 = bones.create(game.world.width-280,410,"bone");
    bone7 = bones.create(game.world.width-1015,150,"bone");
    bone8 = bones.create(800,70,"bone");
    bone9 = bones.create(1320,40,"bone");
    bone10 = bones.create(1860,270,"bone");
    
        //GOLDEN DUCKIE
    duck = game.add.group();
    duck.enableBody=true;
    duckie = duck.create(game.world.width-50,215,"duck");
    
    
        //TEXT *
    gameText = game.add.text(230, 250, '', { fontSize: '32px', fill: '#FF0000'});gameText.fixedToCamera=true;
    winText = game.add.text(255,250,'', { font: '65px Arial', fill:'#FFFFFF'});winText.fixedToCamera=true;
    scoreText = game.add.text(16, 34, 'Score: 0',{fontSize: '32px', fill: '#FFFFFF'});scoreText.fixedToCamera=true;
    lifeText = game.add.text(16,10, 'Lives: ',{fontSize: '32px', fill: '#FFFFFF'});lifeText.fixedToCamera=true;
}

      //DEATH *
    function die(player,enemy){
    
    if(!player.invincible){
            toggleInvincible();
            game.time.events.add(1000,toggleInvincible);
            removeLife(); 
   }
}

    function toggleInvincible() {

        player.invincible = !player.invincible;
        if(player.invincible){
            player.alpha=0.5;
    }
    else{
        player.alpha=1;
    }
}

    function removeLife(){
    
        if(liv.length > 0){
        liv.getTop().destroy();
        
        if(liv.length == 0){
        player.kill();
            gameText.text = "You died, hit F5 to restart";
        }
        
    }
    
}


        //COLLECT *
    function collect(player,bones){
        bones.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
    
    }

    //WIN *
    function win(player,duck){
        duck.kill();
        player.kill();
        winText.text = "You Won!";
        
    }

function update(){
    
        //PHYSICS *
    game.physics.arcade.overlap(player,enemy,die,null,this);
    game.physics.arcade.overlap(player,enemy2,die,null,this);
    game.physics.arcade.overlap(player,water,die,null,this);
    game.physics.arcade.overlap(player,bones,collect,null,this);
    game.physics.arcade.overlap(player,duck,win,null,this);
        
    game.physics.arcade.collide(bones,player);
    game.physics.arcade.collide(enemy,platforms);
    game.physics.arcade.collide(enemy2,platforms);
    game.physics.arcade.collide(player,platforms);
    
    
        //PLAYER *
    player.body.velocity.x = 0;
    if(cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play("left");
    }
    else if(cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play("right");
    }
    else{
        player.animations.play("idle");
        
    }
    if(cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -250; //JUMP
    }
    
    
        //LEDGE3 *
    if(ledge3.body.position.y >= game.world.height-150){
        ledge3.body.velocity.y = -150; 
    }
    if(ledge3.body.position.y <50){
        ledge3.body.velocity.y = 150;
    }
    
    
        //ENEMY *
    if(enemy.body.position.x >=750){
        
        enemy.body.velocity.x = -100;
    }
    if(enemy.body.position.x <400){
        enemy.body.velocity.x = 100;
    }
    
    
    if (enemy.body.velocity.x > 0){
        enemy.animations.play('right');
    }
    else {
        enemy.animations.play('left');
    }
    
        //ENEMY2 *
    if(enemy2.body.position.x >=1900){
        
        enemy2.body.velocity.x = -150;
    }
    if(enemy2.body.position.x <1200){
        enemy2.body.velocity.x = 150;
    }
    
    
    if (enemy2.body.velocity.x > 0){
        enemy2.animations.play('right');
    }
    else {
        enemy2.animations.play('left');
    }
    
    if(cursors.up.isDown && enemy2.body.touching.down){
       enemy2.body.velocity.y = -250; //JUMP
    }
    
}