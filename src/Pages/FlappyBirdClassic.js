// src/components/FlappyBirdClassic.js
import React, { useRef, useEffect, useState } from "react";
import groundImg from "../assets/img/ground.png";
import bgImg from "../assets/img/BG.png";
import toppipeImg from "../assets/img/toppipe.png";
import botpipeImg from "../assets/img/botpipe.png";
import getreadyImg from "../assets/img/getready.png";
import goImg from "../assets/img/go.png";
import bird0 from "../assets/img/bird/b0.png";
import bird1 from "../assets/img/bird/b1.png";
import bird2 from "../assets/img/bird/b2.png";
import tap0 from "../assets/img/tap/t0.png";
import tap1 from "../assets/img/tap/t1.png";

const FlappyBirdClassic = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 350, height: 550 });

  // Calculate responsive canvas size
  const calculateCanvasSize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Base size for mobile
    let baseWidth = 350;
    let baseHeight = 550;

    // Responsive breakpoints
    if (viewportWidth >= 1200) {
      // Desktop
      baseWidth = Math.min(500, viewportWidth * 0.4);
      baseHeight = baseWidth * 1.57; // Maintain aspect ratio
    } else if (viewportWidth >= 768) {
      // Tablet
      baseWidth = Math.min(450, viewportWidth * 0.6);
      baseHeight = baseWidth * 1.57;
    } else if (viewportWidth >= 480) {
      // Large mobile
      baseWidth = Math.min(400, viewportWidth * 0.8);
      baseHeight = baseWidth * 1.57;
    } else {
      // Small mobile
      baseWidth = Math.min(350, viewportWidth * 0.9);
      baseHeight = Math.min(550, viewportHeight * 0.7);
    }

    return { width: Math.floor(baseWidth), height: Math.floor(baseHeight) };
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(calculateCanvasSize());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const RAD = Math.PI / 180;
    const scrn = canvasRef.current;
    if (!scrn) return;

    // Set canvas size
    scrn.width = canvasSize.width;
    scrn.height = canvasSize.height;

    const sctx = scrn.getContext("2d");
    scrn.tabIndex = 1;
    scrn.focus();

    let frames = 0;
    let dx = Math.max(1, canvasSize.width / 175); // Scale movement speed
    const state = { curr: 0, getReady: 0, Play: 1, gameOver: 2 };

    // Scale factor for responsive design
    const scaleFactor = canvasSize.width / 350;

    const gnd = {
      sprite: new window.Image(),
      x: 0,
      y: 0,
      draw: function () {
        this.y = parseFloat(scrn.height - this.sprite.height * scaleFactor);
        sctx.drawImage(
          this.sprite,
          this.x,
          this.y,
          this.sprite.width * scaleFactor,
          this.sprite.height * scaleFactor
        );
      },
      update: function () {
        if (state.curr !== state.Play) return;
        this.x -= dx;
        this.x = this.x % ((this.sprite.width * scaleFactor) / 2);
      },
    };

    const bg = {
      sprite: new window.Image(),
      x: 0,
      y: 0,
      draw: function () {
        let y = parseFloat(scrn.height - this.sprite.height * scaleFactor);
        sctx.drawImage(
          this.sprite,
          this.x,
          y,
          this.sprite.width * scaleFactor,
          this.sprite.height * scaleFactor
        );
      },
    };

    const pipe = {
      top: { sprite: new window.Image() },
      bot: { sprite: new window.Image() },
      gap: 85 * scaleFactor, // Scale gap
      moved: true,
      pipes: [],
      draw: function () {
        for (let i = 0; i < this.pipes.length; i++) {
          let p = this.pipes[i];
          sctx.drawImage(
            this.top.sprite,
            p.x,
            p.y,
            this.top.sprite.width * scaleFactor,
            this.top.sprite.height * scaleFactor
          );
          sctx.drawImage(
            this.bot.sprite,
            p.x,
            p.y + parseFloat(this.top.sprite.height * scaleFactor) + this.gap,
            this.bot.sprite.width * scaleFactor,
            this.bot.sprite.height * scaleFactor
          );
        }
      },
      update: function () {
        if (state.curr !== state.Play) return;
        if (frames % Math.floor(100 / scaleFactor) === 0) {
          this.pipes.push({
            x: parseFloat(scrn.width),
            y: -210 * scaleFactor * Math.min(Math.random() + 1, 1.8),
          });
        }
        this.pipes.forEach((pipe) => {
          pipe.x -= dx;
        });
        if (
          this.pipes.length &&
          this.pipes[0].x < -this.top.sprite.width * scaleFactor
        ) {
          this.pipes.shift();
          this.moved = true;
        }
      },
    };

    const bird = {
      animations: [
        { sprite: new window.Image() },
        { sprite: new window.Image() },
        { sprite: new window.Image() },
        { sprite: new window.Image() },
      ],
      rotatation: 0,
      x: 50 * scaleFactor,
      y: 100 * scaleFactor,
      speed: 0,
      gravity: 0.125 * scaleFactor,
      thrust: 3.6 * scaleFactor,
      frame: 0,
      draw: function () {
        let h = this.animations[this.frame].sprite.height * scaleFactor;
        let w = this.animations[this.frame].sprite.width * scaleFactor;
        sctx.save();
        sctx.translate(this.x, this.y);
        sctx.rotate(this.rotatation * RAD);
        sctx.drawImage(
          this.animations[this.frame].sprite,
          -w / 2,
          -h / 2,
          w,
          h
        );
        sctx.restore();
      },
      update: function () {
        let r = parseFloat(this.animations[0].sprite.width * scaleFactor) / 2;
        switch (state.curr) {
          case state.getReady:
            this.rotatation = 0;
            this.y +=
              frames % 10 === 0 ? Math.sin(frames * RAD) * scaleFactor : 0;
            this.frame += frames % 10 === 0 ? 1 : 0;
            break;
          case state.Play:
            this.frame += frames % 5 === 0 ? 1 : 0;
            this.y += this.speed;
            this.setRotation();
            this.speed += this.gravity;
            if (this.y + r >= gnd.y || this.collisioned()) {
              state.curr = state.gameOver;
            }
            break;
          case state.gameOver:
            this.frame = 1;
            if (this.y + r < gnd.y) {
              this.y += this.speed;
              this.setRotation();
              this.speed += this.gravity * 2;
            } else {
              this.speed = 0;
              this.y = gnd.y - r;
              this.rotatation = 90;
            }
            break;
          default:
            break;
        }
        this.frame = this.frame % this.animations.length;
      },
      flap: function () {
        if (this.y > 0) {
          this.speed = -this.thrust;
        }
      },
      setRotation: function () {
        if (this.speed <= 0) {
          this.rotatation = Math.max(
            -25,
            (-25 * this.speed) / (-1 * this.thrust)
          );
        } else if (this.speed > 0) {
          this.rotatation = Math.min(90, (90 * this.speed) / (this.thrust * 2));
        }
      },
      collisioned: function () {
        if (!pipe.pipes.length) return;
        let birdImg = this.animations[0].sprite;
        let x = pipe.pipes[0].x;
        let y = pipe.pipes[0].y;
        let r =
          (birdImg.height * scaleFactor) / 4 +
          (birdImg.width * scaleFactor) / 4;
        let roof = y + parseFloat(pipe.top.sprite.height * scaleFactor);
        let floor = roof + pipe.gap;
        let w = parseFloat(pipe.top.sprite.width * scaleFactor);
        if (this.x + r >= x) {
          if (this.x + r < x + w) {
            if (this.y - r <= roof || this.y + r >= floor) {
              return true;
            }
          } else if (pipe.moved) {
            UI.score.curr++;
            pipe.moved = false;
          }
        }
      },
    };

    const UI = {
      getReady: { sprite: new window.Image() },
      gameOver: { sprite: new window.Image() },
      tap: [{ sprite: new window.Image() }, { sprite: new window.Image() }],
      score: { curr: 0, best: 0 },
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      frame: 0,
      draw: function () {
        switch (state.curr) {
          case state.getReady:
            this.y =
              parseFloat(
                scrn.height - this.getReady.sprite.height * scaleFactor
              ) / 2;
            this.x =
              parseFloat(
                scrn.width - this.getReady.sprite.width * scaleFactor
              ) / 2;
            this.tx =
              parseFloat(scrn.width - this.tap[0].sprite.width * scaleFactor) /
              2;
            this.ty =
              this.y +
              this.getReady.sprite.height * scaleFactor -
              this.tap[0].sprite.height * scaleFactor;
            sctx.drawImage(
              this.getReady.sprite,
              this.x,
              this.y,
              this.getReady.sprite.width * scaleFactor,
              this.getReady.sprite.height * scaleFactor
            );
            sctx.drawImage(
              this.tap[this.frame].sprite,
              this.tx,
              this.ty,
              this.tap[this.frame].sprite.width * scaleFactor,
              this.tap[this.frame].sprite.height * scaleFactor
            );
            break;
          case state.gameOver:
            this.y =
              parseFloat(
                scrn.height - this.gameOver.sprite.height * scaleFactor
              ) / 2;
            this.x =
              parseFloat(
                scrn.width - this.gameOver.sprite.width * scaleFactor
              ) / 2;
            this.tx =
              parseFloat(scrn.width - this.tap[0].sprite.width * scaleFactor) /
              2;
            this.ty =
              this.y +
              this.gameOver.sprite.height * scaleFactor -
              this.tap[0].sprite.height * scaleFactor;
            sctx.drawImage(
              this.gameOver.sprite,
              this.x,
              this.y,
              this.gameOver.sprite.width * scaleFactor,
              this.gameOver.sprite.height * scaleFactor
            );
            sctx.drawImage(
              this.tap[this.frame].sprite,
              this.tx,
              this.ty,
              this.tap[this.frame].sprite.width * scaleFactor,
              this.tap[this.frame].sprite.height * scaleFactor
            );
            break;
          default:
            break;
        }
        this.drawScore();
      },
      drawScore: function () {
        sctx.fillStyle = "#FFFFFF";
        sctx.strokeStyle = "#000000";
        const fontSize = Math.floor(35 * scaleFactor);
        const strokeWidth = Math.max(1, 2 * scaleFactor);

        switch (state.curr) {
          case state.Play:
            sctx.lineWidth = strokeWidth;
            sctx.font = `${fontSize}px Squada One, Arial`;
            sctx.fillText(
              this.score.curr,
              scrn.width / 2 - 5 * scaleFactor,
              50 * scaleFactor
            );
            sctx.strokeText(
              this.score.curr,
              scrn.width / 2 - 5 * scaleFactor,
              50 * scaleFactor
            );
            break;
          case state.gameOver:
            sctx.lineWidth = strokeWidth;
            sctx.font = `${Math.floor(40 * scaleFactor)}px Squada One, Arial`;
            let sc = `SCORE :     ${this.score.curr}`;
            try {
              this.score.best = Math.max(
                this.score.curr,
                localStorage.getItem("best")
              );
              localStorage.setItem("best", this.score.best);
              let bs = `BEST  :     ${this.score.best}`;
              sctx.fillText(
                sc,
                scrn.width / 2 - 80 * scaleFactor,
                scrn.height / 2 + 0
              );
              sctx.strokeText(
                sc,
                scrn.width / 2 - 80 * scaleFactor,
                scrn.height / 2 + 0
              );
              sctx.fillText(
                bs,
                scrn.width / 2 - 80 * scaleFactor,
                scrn.height / 2 + 30 * scaleFactor
              );
              sctx.strokeText(
                bs,
                scrn.width / 2 - 80 * scaleFactor,
                scrn.height / 2 + 30 * scaleFactor
              );
            } catch (e) {
              sctx.fillText(
                sc,
                scrn.width / 2 - 85 * scaleFactor,
                scrn.height / 2 + 15 * scaleFactor
              );
              sctx.strokeText(
                sc,
                scrn.width / 2 - 85 * scaleFactor,
                scrn.height / 2 + 15 * scaleFactor
              );
            }
            break;
          default:
            break;
        }
      },
      update: function () {
        if (state.curr === state.Play) return;
        this.frame += frames % 10 === 0 ? 1 : 0;
        this.frame = this.frame % this.tap.length;
      },
    };

    // Load images
    gnd.sprite.src = groundImg;
    bg.sprite.src = bgImg;
    pipe.top.sprite.src = toppipeImg;
    pipe.bot.sprite.src = botpipeImg;
    UI.gameOver.sprite.src = goImg;
    UI.getReady.sprite.src = getreadyImg;
    UI.tap[0].sprite.src = tap0;
    UI.tap[1].sprite.src = tap1;
    bird.animations[0].sprite.src = bird0;
    bird.animations[1].sprite.src = bird1;
    bird.animations[2].sprite.src = bird2;
    bird.animations[3].sprite.src = bird0;

    function handleInput() {
      if (state.curr === state.gameOver) {
        state.curr = state.getReady;
        UI.score.curr = 0;
        bird.x = 50 * scaleFactor;
        bird.y = 100 * scaleFactor;
        bird.speed = 0;
        bird.rotatation = 0;
        bird.frame = 0;
        gnd.x = 0;
        pipe.pipes = [];
        pipe.moved = true;
        return;
      }
      if (state.curr === state.getReady) {
        state.curr = state.Play;
        return;
      }
      bird.flap();
    }

    function handleKeyDown(e) {
      if (e.code === "Space") {
        e.preventDefault();
        handleInput();
      }
      if (e.code === "Escape" && onClose) {
        e.preventDefault();
        onClose();
      }
    }

    function handleClick() {
      handleInput();
    }

    document.addEventListener("keydown", handleKeyDown);
    scrn.addEventListener("click", handleClick);
    scrn.addEventListener("touchstart", handleClick);

    let animationId;
    function gameLoop() {
      update();
      draw();
      frames++;
      animationId = requestAnimationFrame(gameLoop);
    }

    function update() {
      bird.update();
      gnd.update();
      pipe.update();
      UI.update();
    }

    function draw() {
      sctx.fillStyle = "#30c0df";
      sctx.fillRect(0, 0, scrn.width, scrn.height);
      bg.draw();
      pipe.draw();
      bird.draw();
      gnd.draw();
      UI.draw();
    }

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("keydown", handleKeyDown);
      scrn.removeEventListener("click", handleClick);
      scrn.removeEventListener("touchstart", handleClick);
    };
  }, [onClose, canvasSize]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        minHeight: "400px",
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          outline: "none",
          borderRadius: "12px",
          maxWidth: "100%",
          maxHeight: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      />
      {onClose && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "5px",
            zIndex: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 87, 87, 0.9)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
            title="Quit Game (ESC)"
          >
            ×
          </button>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              whiteSpace: "nowrap",
            }}
          >
            Press ESC to quit
          </div>
        </div>
      )}
    </div>
  );
};

export default FlappyBirdClassic;
