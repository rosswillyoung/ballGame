class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {}
  create() {
    emitter = new Phaser.Events.EventEmitter();
    this.bullets = [];
    this.balls = [];
    gameOver = false;
    let points = 0;
    this.pointsText = this.add
      .text(game.config.width / 2, 25, "Points: 0", {
        fontSize: "25px",
      })
      .setOrigin(0.5, 0.5);
    this.player = this.matter.add.image(
      game.config.width / 2,
      game.config.height - 20,
      "ball1"
    );
    this.player.setCircle(45);
    this.player.setScale(0.4);
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

    // this.matter.world.setGravity(0, 1);

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

    this.makeBalls();

    this.matter.world.on(
      "collisionstart",
      (e, bodyA, bodyB) => {
        if (bodyA.isStatic || bodyB.isStatic) {
          // console.log(bodyA.gameObject.scale);
          return;
        } else if (
          bodyA.gameObject.scale > 0.2 ==
          bodyB.gameObject.scale > 0.2
        ) {
          return;
        } else {
          // console.log(bodyA.gameObject.scale, bodyB.gameObject.scale);
          bodyA.gameObject.destroy();
          bodyB.gameObject.destroy();
          points++;
          this.pointsText.setText("Points: " + points);
          if (points % 9 == 0) {
            this.makeBalls();
            for (let i = 0; i < this.bullets.length; i++) {
              this.bullets[i].destroy();
            }
          }
        }
      },
      this
    );
  }

  update() {
    for (let i = 0; i < this.balls.length; i++) {
      if (this.balls[i].body && this.balls[i].y > this.game.config.height) {
        gameOver = true;
        this.scene.start("SceneOver");
      }
    }
  }
  makeBalls() {
    let x = 0;
    for (let i = 40; i < 400; i += 40) {
      this.balls[x] = this.matter.add.image(i, 20, "ball1");
      this.balls[x].setCircle(45);
      this.balls[x].setScale(0.3);
      this.balls[x].setBounce(0.5);
      x++;
    }
  }
  shootBullet(e) {
    // console.log(e.x, e.y);
    this.bullet = this.matter.add.image(this.player.x, this.player.y, "ball1");
    this.bullet.setOrigin(0.5, 0.5);

    let speed = 10;
    let angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      e.downX,
      e.downY
    );
    // console.log(angle);
    this.bullet.setScale(0.1);
    this.bullet.setCircle(5);
    this.bullet.setVelocityX(speed * Math.cos(angle));
    this.bullet.setVelocityY(speed * Math.sin(angle));
    this.bullet.setIgnoreGravity(true);
    this.bullets.push(this.bullet);
  }
}
