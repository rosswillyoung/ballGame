class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {}
  create() {
    this.ball = this.matter.add.image(
      game.config.width / 2,
      game.config.height / 2,
      "ball1"
    );

    this.ball.setCircle(45);
    this.ball.setScale(0.3);
    this.ball.setBounce(0.5);

    // let shape = this.cache.json.get("shape");
    // console.log(shape);
    // this.matter.add.sprite(200, 300, "ball", { shape: shape.ball });

    this.platform = this.matter.add.image(
      game.config.width / 2,
      500,
      "platform"
    );

    this.platform.setStatic(true);
    this.platform.setScale(0.2);
    this.platform.setAngle(35);

    // this.platforms = this.matter.add.staticGroup();
    // this.platform = this.platforms
    //   .create(game.config.width / 2, 500, "platform")
    //   .setScale(0.4)
    //   .refreshBody();

    // this.platform.rotation = 100;
    // this.platform.refreshBody();
  }
}
