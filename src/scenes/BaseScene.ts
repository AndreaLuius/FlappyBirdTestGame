import Phaser from "phaser";

export default class BaseScene extends Phaser.Scene {
    protected BTN_CONFIG = {"fontSize": "25px"};

    protected backBtn!: Phaser.GameObjects.Image;

    constructor(sceneName: string) {
        super(sceneName);
    }

    protected bgInitializer(): void {
        this.add.image(0,0,"sky").setOrigin(0,0);
    }

    protected backButtonInitializer(x:number,y:number,origin: [number,number]): void {
        this.backBtn = this.add.image(x,y,"backBtn").setScale(2).setOrigin(...origin);
        this.backBtn.setInteractive({"useHandCursor": true})
    }

    // protected mouseEventHandlers(): void {
    //     this.backBtn.on("pointerdown", () => {
    //         console.log("here");
            
    //         this.scene.start("Main scene");
    //     });
    // }
}