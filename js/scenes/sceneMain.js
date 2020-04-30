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
    this.ball2 = this.matter.add.image(game.config.width / 2, 400, "ball1");
    this.ball2.setCircle(45);
    this.ball2.setScale(0.3);
    this.ball2.setStatic(true);
    this.cat1 = this.matter.world.nextCategory();
    this.cat2 = this.matter.world.nextCategory();

    this.ball.setCollisionCategory(this.cat1);
    this.ball2.setCollisionCategory(this.cat2);
    this.matter.world.on("collisionstart", (event) => {
      console.log(event);
    });

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

    this.platform2 = this.matter.add.image(
      game.config.width / 2,
      550,
      "platform"
    );

    this.platform2.setStatic(true);
    this.platform2.setScale(0.5);

    this.matter.world.on("collision", () => {
      console.log("collision");
    });

    // this.platforms = this.matter.add.staticGroup();
    // this.platform = this.platforms
    //   .create(game.config.width / 2, 500, "platform")
    //   .setScale(0.4)
    //   .refreshBody();

    // this.platform.rotation = 100;
    // this.platform.refreshBody();
  }

  update() {
    if (this.ball.y >= 500) {
      this.ball.setStatic(true);
    }
  }
}
