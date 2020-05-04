class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {}
  create() {
    this.player = this.matter.add.image(
      game.config.width / 2,
      game.config.height - 20,
      "ball1"
    );
    this.player.setCircle(50);
    this.player.setStatic(true);
    this.ballCategory = this.matter.world.nextCategory();
    this.platformCategory = this.matter.world.nextCategory();
    this.bulletGroup = this.matter.world.nextGroup();
    this.input.on(
      "pointerdown",
      (e) => {
        this.shootBullet(e);
      },
      this
    );

    // this.ball.setCollisionCategory(this.platformCategory);
    // this.matter.world.on("collisionstart", (event) => {
    //   console.log(event);
    // });

    // this.matter.world.setGravity(0, 1);
    // let shape = this.cache.json.get("shape");
    // console.log(shape);
    // this.matter.add.sprite(200, 300, "ball", { shape: shape.ball });

    this.platform = this.matter.add.image(60, 200, "platform");

    this.platform.setStatic(true);
    this.platform.setScale(0.4);
    this.platform.setAngle(35);

    this.platform2 = this.matter.add.image(
      game.config.width - 60,
      300,
      "platform"
    );

    this.platform2.setScale(0.4);
    this.platform2.setStatic(true);
    this.platform2.setAngle(325);

    // this.matter.world.on("collision", (e) => {
    //   console.log(e);
    // });
    this.makeBalls();

    this.matter.world.on(
      "collisionstart",
      (e, bodyA, bodyB) => {
        if (bodyA.isStatic || bodyB.isStatic) {
          console.log(bodyA.gameObject.scale);
        } else if (
          bodyA.gameObject.scale > 0.2 &&
          bodyB.gameObject.scale > 0.2
        ) {
        } else {
          console.log(bodyA.gameObject.scale, bodyB.gameObject.scale);
          bodyA.gameObject.destroy();
          bodyB.gameObject.destroy();
        }
      },
      this
    );
    // this.platforms = this.matter.add.staticGroup();
    // this.platform = this.platforms
    //   .create(game.config.width / 2, 500, "platform")
    //   .setScale(0.4)
    //   .refreshBody();

    // this.platform.rotation = 100;
    // this.platform.refreshBody();
  }

  update() {}
  makeBalls() {
    this.balls = [];
    let x = 0;
    for (let i = 40; i < 400; i += 40) {
      this.balls[x] = this.matter.add.image(i, 20, "ball1");
      this.balls[x].setCollisionCategory(this.ballCategory);
      this.balls[x].setCircle(45);
      this.balls[x].setScale(0.3);
      this.balls[x].setBounce(0.5);
      x++;
    }
  }
  shootBullet(e) {
    // console.log(e);
    this.bullet = this.matter.add.image(this.player.x, this.player.y, "ball1");

    let speed = 5;
    let angle = Phaser.Math.Angle.BetweenPoints(this.player, e);
    this.bullet.setScale(0.1);
    this.bullet.setCircle(5);
    this.bullet.setVelocityX(Math.cos(angle) * speed);
    this.bullet.setVelocityY(Math.sin(angle) * speed);
    this.bullet.setIgnoreGravity(true);
    // this.bullet.setIgnoreGravity(true);
    // this.bullet.setOnCollide((e) => {
    //   if (e.bodyB.isStatic || e.bodyA.isStatic) {
    //     console.log("Static");
    //   } else {
    //     console.log(e.bodyA);
    //     console.log(e.bodyB.gameObject.body);
    //     // e.bodyA.setStatic(true);
    //     this.bullet.destroy();
    //   }
    //   // console.log(e);
    // });
  }
}
