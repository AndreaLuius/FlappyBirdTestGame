import Phaser from "phaser";
import BaseScene from "./BaseScene";

class MainScene extends BaseScene {

    private bird!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private upperPile!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private pipes!: Phaser.Physics.Arcade.Group;

    private score!: Phaser.GameObjects.Text;
    private bestScore!: Phaser.GameObjects.Text;
    private points: number;

    private isPaused!: boolean;

    constructor()
    {
        super("Main scene");
        this.points = 0;        
    }

    update(time: number,delta: number)
    {
        this.recyclePipes();
        this.gameOverController();   

        this.birdAnimation();

    }
    
    private create() {
        this.isPaused = false;        
        this.bgInitializer();
        this.birdInitializer();
        this.pipesInitializer();
        this.scoreInitializer();
        this.menuInitializer();
        this.eventsHandler();
        this.configColliders();
    }

    private birdInitializer(): void {
        this.bird = this.physics.add.sprite(80,300,"bird").setScale(2.5).setOrigin(0);
        this.bird.setFlipX(true);  
        this.bird.setBodySize(14,9);  
        this.bird.setOffset(0,5)
        this.bird.body.gravity.y = 200;
        this.bird.setCollideWorldBounds(true);
    }

    private pipesInitializer(): void {
        this.pipes = this.physics.add.group();

        // this.pileRandomizer();
        for(let i = 1; i <= 4; i++) {
            const up = this.pipes.create(0,0,"pile")
                .setImmovable(true)
                .setOrigin(0,1);
            const lp = this.pipes.create(0,0,"pile")
            .setImmovable(true)
            .setOrigin(0,0);

            
            this.pileRandomizer2(up,lp);
        }

        this.pipes.setVelocityX(-175);
    }

    private scoreInitializer (): void {
        this.score = this.add.text(20,20,`Score: 0`);
        this.bestScore = this.add.text(20,40,`Best Score: 0`);

        if(localStorage.getItem("score"))
            this.bestScore.setText(`Best Score: ${localStorage.getItem("score")}`);
    }

    private menuInitializer() {
        const pauseBtn = this.add.image(750,550,"pause").setOrigin(0);
        pauseBtn.setScale(2.5);
        pauseBtn.setInteractive({useHandCursor: true});

        pauseBtn.on("pointerdown", () => {
            this.isPaused = true;           
            this.scene.launch("Pause scene");
            this.physics.pause();
            this.scene.pause(); 
        });

        this.events.on("resume", () => {
            this.isPaused = false;
        });
    }

    private eventsHandler(): void {
        this.input.on("pointerdown", () => {    
            if(!this.isPaused) {
                this.bird.body.velocity.y = -200; 
                
                this.anims.create({
                    key: "flap",
                    frames: this.anims.generateFrameNames("bird",{start: 8,end: 10}),
                    // frameRate: 3,
                    duration: 300,
                    repeat: 1
                });

                this.bird.play("flap");
            }
        })
    }

    private configColliders(): void {
        this.physics
        .add.collider(this.bird,this.pipes,
             this.gameOver,undefined,this);
    }

    private pileRandomizer(): void {
        let xDistance = 0;
        let upperPileHeight = 0;
        let pileDistance = 0;

        for(let i = 1; i <= 4; i++)
        {
            upperPileHeight = Phaser.Math.Between(20, 600 - 20 - 200);
            pileDistance = Phaser.Math.Between(140,200);
            xDistance = this.getRightMostX() + Phaser.Math.Between(250,300);

            //using normal sprites
            // this.upperPile = this.physics.add.sprite(xDistance,upperPileHeight,"pile").setOrigin(0,1);
            // this.physics.add.sprite(xDistance,this.upperPile.y + pileDistance,"pile").setOrigin(0,0);
            
            //using groups
            this.upperPile = this.pipes.create(xDistance,upperPileHeight,"pile").setOrigin(0,1);
            this.pipes.create(xDistance,this.upperPile.y + pileDistance,"pile").setOrigin(0,0);
        }
    }

    private pileRandomizer2(uPipe:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
            lPipe: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {

        let xDistance = 0;
        let upperPileHeight = 0;
        let pileDistance = 0;
        let hard = 50;

        const scr = parseInt(this.score?.text.substring(7,8));

        if(scr > 10) {
         upperPileHeight = Phaser.Math.Between(20, 600 - 20 - 200);
         pileDistance = Phaser.Math.Between(140 - hard,200 - hard);
         xDistance = this.getRightMostX() + Phaser.Math.Between(250 - hard,300 - hard);
        } else {
            upperPileHeight = Phaser.Math.Between(20, 600 - 20 - 200);
            pileDistance = Phaser.Math.Between(140,200);
            xDistance = this.getRightMostX() + Phaser.Math.Between(250,300);
        }

        //using normal sprites
        // this.upperPile = this.physics.add.sprite(xDistance,upperPileHeight,"pile").setOrigin(0,1);
        // this.physics.add.sprite(xDistance,this.upperPile.y + pileDistance,"pile").setOrigin(0,0);
        
        //using groups
        uPipe.x = xDistance;
        uPipe.y = upperPileHeight;

        lPipe.x = xDistance;
        lPipe.y = uPipe.y + pileDistance;

    }

    private gameOver() {
        this.physics.pause();
        this.bird.setTint(0xEE4824);

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.increaseBestScore();
                this.points = 0;
                this.scene.restart();
            },
            loop: false
        })
    }

    private gameOverController() {
        if(this.bird.getBounds().bottom >= 600 || this.bird.y <= 0)
            this.gameOver();
    }

    private recyclePipes(): void {
        const tmp: [Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,Phaser.Types.Physics.Arcade.SpriteWithDynamicBody] = [];
        this.pipes.getChildren()
            .forEach(pipe => {
                if(pipe.getBounds().right <= 0) {
                   tmp.push(pipe); 
                    if(tmp.length === 2) {
                        this.pileRandomizer2(...tmp);
                        this.increaseScore();
                        return;
                    }
                }
            });
    }

    private getRightMostX(): number {
        let rightX = 0;

        this.pipes.getChildren()
            .forEach((pipe: Phaser.GameObjects.GameObject) => {                
                rightX = Math.max(pipe.x,rightX);
            });
        
        return rightX;
    }

    private increaseScore(): void {
        this.points += 1;
        this.score.setText(`Score: ${this.points}`);
    }

    private increaseBestScore(): void {
        const best = Number(this.bestScore.text.substring(12,this.bestScore.text.length));
                
        if(best < this.points)
            localStorage.setItem("score","" + this.points);
    }

    private birdAnimation() {
        this.anims.create({
            key: "falling",
            frames: this.anims.generateFrameNames("bird",{start: 18, end: 18}),
            frameRate: 1,
            repeat: 0
        });


        if(this.bird.body.velocity.y > -5)
            this.bird.play("falling");
        
        
    }

}

export default MainScene;