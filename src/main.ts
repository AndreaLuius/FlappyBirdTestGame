import Game from "./Game";
import MainScene from "./scenes/MainScene";
import MenuScene from "./scenes/MenuScene";
import PauseScene from "./scenes/PauseScene";
import PreloadScene from "./scenes/PreloadScene";
import ScoreScene from "./scenes/ScoreScene";

function main() {
    new Game([new PreloadScene(), new MenuScene(), new MainScene(),new ScoreScene(),new PauseScene()])
}

main();