class Game{
    constructor(){
        //creacion de todos los elemntos jugables e interactuables como el mapa
        //estados del juego: 0: formulario, pantalla principal, 1: comienzo del juego y todos los elementos
        //2: fin del juego por muerte, 3: fin del juego por victoria
        //end
    }

    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }

    updateGS(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
        //si el estado del juego es igual a 0, crear un nuevo jugador y un nuevo formulario
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form();
          form.display();
        }
        //main characters
        traveler1= createSprite(30, 100);
        traveler1.addAnimation("testanim", mainimgmale);
        traveler1.scale= 2.3;
        traveler1.frameDelay= 25;
        traveler2= createSprite(90, 100);
        traveler2.addAnimation("testanim2", mainimgfemale);
        traveler2.scale= 2.3;
        traveler2.frameDelay= 25;
        allTravelers= [traveler1, traveler2];

        //enemies
        king= createSprite(30, 220);
        king.addAnimation("king1", kingimg);
        king.scale= 2.3
        king.frameDelay= 25;

        kina= createSprite(90, 220);
        kina.addAnimation("kina1", kinaimg);
        kina.scale= 2.3
        kina.frameDelay= 25;

        pally=createSprite(150, 220);
        pally.addAnimation("pally1", pallyimg)
        pally.scale= 2.3
        pally.frameDelay= 25

        mage= createSprite(210, 220);
        mage.addAnimation("mage1", mageimg)
        mage.scale= 2.3
        mage.frameDelay= 25;

        dragon= createSprite(270, 220);
        dragon.addAnimation("dragon1", dragonimg)
        dragon.scale=2.3
        dragon.frameDelay= 25

        allEnemies= [king, kina, pally, mage, dragon]

    }

    play(){
      form.hide();

      Player.getPlayerInfo();
  
      if(allPlayers !== undefined){
        background("black");

          //test text to prove game state 1 is working
          fill("white");
          textSize(30);
          text("<----King and enemies", 330, 230);
          text("<----Iatov and Xelea, the main characters", 150, 110);


          //player1= new Player();
          //player1.createCharacters();


          drawSprites();
      }
   }    
}