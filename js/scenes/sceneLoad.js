class SceneLoad extends Phaser.Scene {
  constructor() {
    super("SceneLoad");
  }
  preload() {
    this.load.image("ball1", "assets/images/ball.png");
    this.load.image("platform", "assets/images/platform.png");
    this.load.json("shape", "assets/images/ball.json");
    this.load.image("button1", "assets/images/button.png");
  }
  create() {
    this.scene.start("SceneMain");
  }
}
