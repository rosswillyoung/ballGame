class SceneOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneOver" });
  }
  create() {
    this.gameOverText = this.add
      .text(game.config.width / 2, game.config.height / 3, "Game Over", {
        fontSize: "25px",
        fontColor: "#FF0047",
      })
      .setOrigin(0.5, 0.5);

    this.restartButton = new Button({
      scene: this,
      key: "button1",
      event: "play_again",
      text: "Play Again?",
    });

    emitter.on("play_again", this.playAgain, this);
  }
  playAgain() {
    this.scene.start("SceneMain");
  }
}
