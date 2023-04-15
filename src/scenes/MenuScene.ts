import BaseScene from "./BaseScene";

export default class MenuScene extends BaseScene {
    private start!: Phaser.GameObjects.Text ;
    private score!: Phaser.GameObjects.Text;
    private exit!: Phaser.GameObjects.Text;

    constructor() {
        super("Menu scene");
    }

    private create() {
        this.bgInitializer();
        this.start = this.add.text(400 ,250,"Start",this.BTN_CONFIG);
        this.score = this.add.text(400,290,"Score",this.BTN_CONFIG);
        this.exit = this.add.text(400,330,"Exit",this.BTN_CONFIG);
        
        this.start.setX(400 - this.start.width / 2).setInteractive({useHandCursor: true});
        this.score.setX(400 - this.score.width / 2).setInteractive({useHandCursor: true});
        this.exit.setX(400 - this.exit.width / 2).setInteractive({useHandCursor: true});
    
        this.mouseEventHandlers();
    }


    private mouseEventHandlers(): void {
        this.start.on("pointerdown", () => {
            this.changeScene("Main scene");
        });

        this.score.on("pointerdown",() => {
            this.changeScene("Score scene");

        });

        this.exit.on("pointerdown",() => {
        });
        
    }


    private changeScene(sceneName: string) {
        this.scene.start(sceneName);
    }

}