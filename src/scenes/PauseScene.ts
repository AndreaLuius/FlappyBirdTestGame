import BaseScene from "./BaseScene";

export default class PauseScene extends BaseScene {
    private restart!: Phaser.GameObjects.Text; 
    private resume!: Phaser.GameObjects.Text;
    private exit!: Phaser.GameObjects.Text;

    constructor() {
        super("Pause scene");
    }

    private create() {
        this.menuInitializer();
        this.mouseEventHandlers();
    }

    private menuInitializer(): void  {
        this.restart = this.add.text(0,250,"Restart",this.BTN_CONFIG);
        this.resume = this.add.text(0,290,"Resume",this.BTN_CONFIG);
        this.exit = this.add.text(0,330,"Exit",this.BTN_CONFIG);
        
        this.restart.setX(400 - this.restart.width / 2);
        this.resume.setX(400 - this.resume.width / 2);
        this.exit.setX(400 - this.exit.width / 2);

        this.restart.setInteractive({useHandCursor: true});
        this.resume.setInteractive({useHandCursor: true});
        this.exit.setInteractive({useHandCursor: true});    
    }

    private mouseEventHandlers(): void {
        this.restart.on("pointerdown", () => {
            const mainScene = this.scene.get("Main scene");
            this.scene.stop();
            mainScene.scene.restart();

        });

        this.resume.on("pointerdown",() => {
            const mainScene = this.scene.get("Main scene");
            this.scene.stop();
            mainScene.physics.resume();
            mainScene.scene.resume();
        });

        this.exit.on("pointerdown",() => {
            const mainScene = this.scene.get("Main scene");
            mainScene.scene.stop();
            this.scene.start("Menu scene");
        });
    }
}