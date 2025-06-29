// src/components/FlappyBirdClassic.js
import React, { useRef, useEffect } from "react";
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

const CANVAS_WIDTH = 350;
const CANVAS_HEIGHT = 550;

const FlappyBirdClassic = ({ onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- ALL OF YOUR ORIGINAL GAME LOGIC REMAINS HERE ---
    // (This part of your code was perfect)
    const RAD = Math.PI / 180;
    const scrn = canvasRef.current;
    if (!scrn) return;
    const sctx = scrn.getContext("2d");
    scrn.tabIndex = 1;
    scrn.focus();
    let frames = 0;
    let dx = 2;
    const state = { curr: 0, getReady: 0, Play: 1, gameOver: 2 };
    const gnd = {
      sprite: new window.Image(),
      x: 0,
      y: 0,
      draw: function () {
        this.y = parseFloat(scrn.height - this.sprite.height);
        sctx.drawImage(this.sprite, this.x, this.y);
      },
      update: function () {
        if (state.curr !== state.Play) return;
        this.x -= dx;
        this.x = this.x % (this.sprite.width / 2);
      },
    };
    const bg = {
      sprite: new window.Image(),
      x: 0,
      y: 0,
      draw: function () {
        let y = parseFloat(scrn.height - this.sprite.height);
        sctx.drawImage(this.sprite, this.x, y);
      },
    };
    const pipe = {
      top: { sprite: new window.Image() },
      bot: { sprite: new window.Image() },
      gap: 85,
      moved: true,
      pipes: [],
      draw: function () {
        for (let i = 0; i < this.pipes.length; i++) {
          let p = this.pipes[i];
          sctx.drawImage(this.top.sprite, p.x, p.y);
          sctx.drawImage(
            this.bot.sprite,
            p.x,
            p.y + parseFloat(this.top.sprite.height) + this.gap
          );
        }
      },
      update: function () {
        if (state.curr !== state.Play) return;
        if (frames % 100 === 0) {
          this.pipes.push({
            x: parseFloat(scrn.width),
            y: -210 * Math.min(Math.random() + 1, 1.8),
          });
        }
        this.pipes.forEach((pipe) => {
          pipe.x -= dx;
        });
        if (this.pipes.length && this.pipes[0].x < -this.top.sprite.width) {
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
      x: 50,
      y: 100,
      speed: 0,
      gravity: 0.125,
      thrust: 3.6,
      frame: 0,
      draw: function () {
        let h = this.animations[this.frame].sprite.height;
        let w = this.animations[this.frame].sprite.width;
        sctx.save();
        sctx.translate(this.x, this.y);
        sctx.rotate(this.rotatation * RAD);
        sctx.drawImage(this.animations[this.frame].sprite, -w / 2, -h / 2);
        sctx.restore();
      },
      update: function () {
        let r = parseFloat(this.animations[0].sprite.width) / 2;
        switch (state.curr) {
          case state.getReady:
            this.rotatation = 0;
            this.y += frames % 10 === 0 ? Math.sin(frames * RAD) : 0;
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
        let r = birdImg.height / 4 + birdImg.width / 4;
        let roof = y + parseFloat(pipe.top.sprite.height);
        let floor = roof + pipe.gap;
        let w = parseFloat(pipe.top.sprite.width);
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
            this.y = parseFloat(scrn.height - this.getReady.sprite.height) / 2;
            this.x = parseFloat(scrn.width - this.getReady.sprite.width) / 2;
            this.tx = parseFloat(scrn.width - this.tap[0].sprite.width) / 2;
            this.ty =
              this.y + this.getReady.sprite.height - this.tap[0].sprite.height;
            sctx.drawImage(this.getReady.sprite, this.x, this.y);
            sctx.drawImage(this.tap[this.frame].sprite, this.tx, this.ty);
            break;
          case state.gameOver:
            this.y = parseFloat(scrn.height - this.gameOver.sprite.height) / 2;
            this.x = parseFloat(scrn.width - this.gameOver.sprite.width) / 2;
            this.tx = parseFloat(scrn.width - this.tap[0].sprite.width) / 2;
            this.ty =
              this.y + this.gameOver.sprite.height - this.tap[0].sprite.height;
            sctx.drawImage(this.gameOver.sprite, this.x, this.y);
            sctx.drawImage(this.tap[this.frame].sprite, this.tx, this.ty);
            break;
          default:
            break;
        }
        this.drawScore();
      },
      drawScore: function () {
        sctx.fillStyle = "#FFFFFF";
        sctx.strokeStyle = "#000000";
        switch (state.curr) {
          case state.Play:
            sctx.lineWidth = "2";
            sctx.font = "35px Squada One, Arial";
            sctx.fillText(this.score.curr, scrn.width / 2 - 5, 50);
            sctx.strokeText(this.score.curr, scrn.width / 2 - 5, 50);
            break;
          case state.gameOver:
            sctx.lineWidth = "2";
            sctx.font = "40px Squada One, Arial";
            let sc = `SCORE :     ${this.score.curr}`;
            try {
              this.score.best = Math.max(
                this.score.curr,
                localStorage.getItem("best")
              );
              localStorage.setItem("best", this.score.best);
              let bs = `BEST  :     ${this.score.best}`;
              sctx.fillText(sc, scrn.width / 2 - 80, scrn.height / 2 + 0);
              sctx.strokeText(sc, scrn.width / 2 - 80, scrn.height / 2 + 0);
              sctx.fillText(bs, scrn.width / 2 - 80, scrn.height / 2 + 30);
              sctx.strokeText(bs, scrn.width / 2 - 80, scrn.height / 2 + 30);
            } catch (e) {
              sctx.fillText(sc, scrn.width / 2 - 85, scrn.height / 2 + 15);
              sctx.strokeText(sc, scrn.width / 2 - 85, scrn.height / 2 + 15);
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
        bird.x = 50;
        bird.y = 100;
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
    document.addEventListener("keydown", handleKeyDown);
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
    };
  }, [onClose]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ outline: "none", borderRadius: "0 0 12px 12px" }}
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
