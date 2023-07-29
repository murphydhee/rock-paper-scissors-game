<template>
  <div class="bg-gray-950 text-white text-center min-h-screen flex flex-col">
<!--    Header-->
    <header class="container mx-auto p-7">
      <h1 class="text-4xl font-bold"> Rock, Paper, Scissors Game</h1>
      <h2 class="text-3md font-bold"> The ultimate rock paper scissors game! </h2>
    </header>

    <!--        Instructions-->
    <div class="flex-row">
      <h2 class="text-sm font-bold text-cyan-600"> Press "R" for Rock </h2>
      <h2 class="text-sm font-bold text-cyan-600"> Press "P" for Paper </h2>
      <h2 class="text-sm font-bold text-cyan-600"> Press "S" for Scissors </h2>

      <h2 class="text-3xl font-bold"> Press "M" To Reset </h2>
    </div>

<!--    Main-->
    <main class="container mx-auto p-6 flex-1" >
      <div v-if="choice === null" class="flex items-center justify-center -mx-6">
<!--        Buttons-->
        <button @click="play('rock')" class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-blue-500">
          <img src="./assets/RockIcon.svg" alt="Rock" class="w-full" />
        </button>
        <button @click="play('paper')" class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-blue-500">
          <img src="./assets/PaperIcon.svg" alt="paper" class="w-full" />
        </button>
        <button @click="play('scissors')" class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-blue-500">
          <img src="./assets/ScissorsIcon.svg" alt="scissors" class="w-full" />
        </button>
      </div>
      <div v-else>
<!--        Results-->
        <div class="text-3xl mb-4">
          You picked <span class="text-pink-500"> {{ choice }}</span>
        </div>

        <div class="text-3xl mb-4">
          The Computer picked <span class="text-pink-500"> {{ computerChoice }}</span>
        </div>

<!--        Verdict-->
        <div class="text-6xl mb-12">
          {{ verdict }}
        </div>

        <button @click="ResetRound" class="bg-blue-500 py-2 px-4 rounded-md text-lg "> Reset</button>
      </div>
    </main>
    <div class="card bg-slate-900 pb-4">
      <!--      Results-->
      <div class="mt-12 text-3xl mb-4">
        {{ wins }} : {{ draws }} : {{ losses}}
      </div>
      <!--        Win percentage-->
      <div class="text-lg">
        Win rate: {{ Math.round(winPercentage) }} %
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const wins = ref(0);
const losses = ref(0);
const draws = ref(0);

const choice = ref(null);
const computerChoice = ref(null);
const verdict = ref(null);

const outcomes = {
  rock: {
    rock: "draw",
    paper: "loss",
    scissors: "win",
  },
  paper: {
    rock: "win",
    paper: "draw",
    scissors: "loss",
  },
  scissors: {
    rock: "loss",
    paper: "win",
    scissors: "draw",
  },
};

// Win Percentage

const winPercentage = computed(() => {
  const total = wins.value + draws.value + losses.value
  return total ? (wins.value/total) * 100 : 0
})

// Game Logic
const play = (c) => {
  choice.value = c;

  const choices = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * choices.length);
  computerChoice.value = choices[random];

  const outcome = outcomes[c][computerChoice.value];

  if (outcome === "win") {
    wins.value++;
    verdict.value = "You win!";
  } else if (outcome === "loss") {
    losses.value++;
    verdict.value = "You lose !";
  } else {
    draws.value++;
    verdict.value = "It is a draw !";
  }

  SaveGame();
};

// Save Game
const SaveGame = () => {
  localStorage.setItem("wins", wins.value);
  localStorage.setItem("draws", draws.value);
  localStorage.setItem("losses", losses.value);
};


// Load Game
const LoadGame = () => {
  wins.value = parseInt(localStorage.getItem('wins')) || 0;
  draws.value = parseInt(localStorage.getItem('draws')) || 0;
  losses.value = parseInt(localStorage.getItem('losses') )|| 0;
};

// Reset Game Round
const ResetRound = () => {
  choice.value = null
  computerChoice.value = null
  verdict.value = null
}

onMounted(() => {
  LoadGame()

  window.addEventListener('keypress', e => {
    if(e.key === 'r') {
      play('rock')
    } else if (e.key === 'p') {
      play('paper')
    } else if (e.key === 's') {
      play('scissors')
    } else if (e.key === 'm') {
      ResetRound()
    }
  })
})
</script>

<style scoped></style>
