import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("Preload Scene");
    }

    private preload() {
        this.load.image("sky","./assets/sky.png");
        this.load.spritesheet("bird","./assets/birdSprite.png", {
            frameWidth:16, frameHeight: 16
        });
        this.load.image("pile", "./assets/pipe.png");
        this.load.image("pause","./assets/pause.png");
        this.load.image("backBtn","./assets/back.png");
    }

    private create() {
        this.scene.launch("Menu scene");
    }
}