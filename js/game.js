let config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  backgroundColor: "#ff5000",
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  scene: [SceneLoad, SceneMain],
};

let game = new Phaser.Game(config);
