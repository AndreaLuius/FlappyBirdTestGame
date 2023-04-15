import Phaser from "phaser";

class Game {

    constructor();
    constructor(scenes?: Array<Phaser.Scene>)
    constructor(scenes?: Array<Phaser.Scene>){
        type GameConfig = Phaser.Types.Core.GameConfig;
        
        const gameConfig: GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: scenes,
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade:{
                    // debug: true,
                }
                 
            },
        }
        
        new Phaser.Game(gameConfig);
    }
}

export default Game;
