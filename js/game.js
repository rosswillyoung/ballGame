let emitter, gameOver;
let config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  backgroundColor: "#ff5000",
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0.1 },
    },
  },
  scene: [SceneLoad, SceneMain, SceneOver],
};

let game = new Phaser.Game(config);
