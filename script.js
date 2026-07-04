const grid = document.getElementById("grid");
const completed = document.getElementById("completed");
const fill = document.getElementById("fill");

const today = new Date();
const start = new Date(today.getFullYear(), 0, 1);

const todayNumber = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

let data = JSON.parse(localStorage.getItem("streak")) || Array(100).fill(false);

function update() {
  let count = 0;

  document.querySelectorAll(".day").forEach((box, index) => {
    if (data[index]) {
      box.classList.add("done");
      box.textContent = "✖";

      count++;
    } else {
      box.classList.remove("done");
      box.textContent = index + 1;
    }
  });

  completed.textContent = count;

  fill.style.width = `${count}%`;

  localStorage.setItem("streak", JSON.stringify(data));
}

for (let i = 0; i < 100; i++) {
  const div = document.createElement("div");

  div.className = "day";

  div.textContent = i + 1;

  if (i + 1 === todayNumber && todayNumber <= 100) {
    div.classList.add("today");
  }

  div.onclick = () => {
    data[i] = !data[i];

    update();
  };

  grid.appendChild(div);
}

update();
