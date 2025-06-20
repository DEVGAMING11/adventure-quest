const storyEl = document.getElementById("story");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");

let score = 0;

const scenes = {
  start: {
    text: "You find two mysterious doors. Which one will you open?",
    options: [
      { text: "Wooden Door", next: "monster" },
      { text: "Metal Door", next: "trap" }
    ]
  },
  monster: {
    text: "A monster jumps out! What do you do?",
    options: [
      { text: "Fight", next: "fight", score: 10 },
      { text: "Run", next: "run", score: 5 }
    ]
  },
  trap: {
    text: "You fell into a trap! Try to escape.",
    options: [
      { text: "Climb out", next: "treasure", score: 5 },
      { text: "Call for help", next: "monster" }
    ]
  },
  fight: {
    text: "You defeated the monster! You see a shiny chest.",
    options: [
      { text: "Open the chest", next: "treasure", score: 15 },
      { text: "Ignore it", next: "end", score: 5 }
    ]
  },
  run: {
    text: "You escaped safely. There's another room ahead.",
    options: [
      { text: "Enter next room", next: "trap" },
      { text: "Take a rest", next: "end" }
    ]
  },
  treasure: {
    text: "You found a legendary treasure! 🎉",
    options: [
      { text: "Take it and exit", next: "end", score: 20 },
      { text: "Keep exploring", next: "start", score: 10 }
    ]
  },
  end: {
    text: "Your journey ends here. Well played!",
    options: [
      { text: "Play Again", next: "start", reset: true }
    ]
  }
};

function showScene(key) {
  const scene = scenes[key];
  storyEl.textContent = scene.text;
  optionsEl.innerHTML = "";

  scene.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      if (opt.reset) {
        score = 0;
      }
      if (opt.score) {
        score += opt.score;
      }
      scoreEl.textContent = score;
      showScene(opt.next);
    };
    optionsEl.appendChild(btn);
  });
}

showScene("start");
