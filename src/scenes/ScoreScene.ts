import BaseScene from "./BaseScene";

export default class ScoreScene extends BaseScene {
    private bestScore!: Phaser.GameObjects.Text;

    constructor() {
        super("Score scene");
    }

    private create() {
        this.bgInitializer();
        this.backButtonInitializer(750,550,[1,1]);

        this.bestScore = this.add.text(400,300,`Best score: ${localStorage.getItem("score")}`,this.BTN_CONFIG);

        this.bestScore.setX(400 - this.bestScore.width / 2);

        this.mouseEventHandlers();
    }

    private mouseEventHandlers(): void {
        this.backBtn.on("pointerdown", () => {
            this.scene.start("Menu scene");
        });
    }
}