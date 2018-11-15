const ParticlesConfig = {
  particles: {
    number: {
      value: 35,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#3e474c"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 1,
        color: "#6e6e6e"
      },
      polygon: {
        nb_sides: 2
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: .5,
      random: false,
      anim: {
        enable: false,
        speed: 4,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 170,
      color: "#3e474c",
      opacity: .3,
      width: .8
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  }
};

export default ParticlesConfig;