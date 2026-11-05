// Banco de preguntas: en cada partida salen 8 al azar, con las respuestas mezcladas.
const questionBank = [
  {
    topic: "ROBERTO ARLT",
    question: "¿Quién fue Roberto Arlt?",
    answers: [
      "Un escritor y periodista argentino",
      "Un streamer italiano",
      "Un pintor español",
      "Un músico francés"
    ],
    correct: 0,
    explanation: "Roberto Arlt fue un escritor, periodista e inventor argentino. Es una figura muy importante de la literatura argentina del siglo XX."
  },
  {
    topic: "ROBERTO ARLT",
    question: "¿Cuál de estas obras fue escrita por Roberto Arlt?",
    answers: [
      "El Jorobadito",
      "El Aleph",
      "Martín Fierro",
      "Rayuela"
    ],
    correct: 0,
    explanation: "“El Jorobadito” es un cuento de Roberto Arlt publicado en 1933. El Aleph es de Borges, Martín Fierro de José Hernández y Rayuela de Cortázar."
  },
  {
    topic: "ROBERTO ARLT",
    question: "¿Qué característica aparece con frecuencia en la escritura de Arlt?",
    answers: [
      "Personajes y ambientes urbanos llenos de conflictos",
      "Poemas sobre paisajes de otros planetas",
      "Historias exclusivamente sobre reyes medievales",
      "Textos científicos sin personajes"
    ],
    correct: 0,
    explanation: "Arlt mostró una mirada crítica sobre la ciudad, la sociedad y las dificultades de sus personajes, utilizando un lenguaje directo y expresivo."
  },
  {
    topic: "ROBERTO ARLT",
    question: "¿Qué eran las “Aguafuertes porteñas” de Arlt?",
    answers: [
      "Crónicas sobre la vida en Buenos Aires publicadas en un diario",
      "Una serie de pinturas al óleo",
      "Un libro de recetas de cocina",
      "Canciones de tango"
    ],
    correct: 0,
    explanation: "Las Aguafuertes porteñas eran crónicas que Arlt publicaba en el diario El Mundo, donde retrataba personajes y costumbres de Buenos Aires."
  },
  {
    topic: "EL JOROBADITO",
    question: "¿Cómo se llama el personaje del jorobadito en el cuento de Arlt?",
    answers: [
      "Rigoletto",
      "Martín",
      "Erdosain",
      "Don Segundo"
    ],
    correct: 0,
    explanation: "El jorobadito se llama Rigoletto. El narrador cuenta desde la cárcel cómo lo conoció y lo llevó a la casa de su novia."
  },
  {
    topic: "VANGUARDIAS",
    question: "¿Qué buscaban principalmente las vanguardias artísticas?",
    answers: [
      "Romper con las formas tradicionales y experimentar",
      "Repetir exactamente las reglas del arte antiguo",
      "Eliminar todas las formas de arte",
      "Hacer solamente obras religiosas"
    ],
    correct: 0,
    explanation: "Las vanguardias buscaban renovar el arte y romper con muchas normas tradicionales mediante nuevas formas, ideas y técnicas."
  },
  {
    topic: "VANGUARDIAS",
    question: "¿Cuál de estos movimientos es una vanguardia artística?",
    answers: [
      "Surrealismo",
      "Romanticismo medieval",
      "Renacimiento",
      "Clasicismo griego"
    ],
    correct: 0,
    explanation: "El surrealismo es una de las vanguardias del siglo XX. Exploró los sueños, el inconsciente y asociaciones de ideas inesperadas."
  },
  {
    topic: "VANGUARDIAS",
    question: "¿Por qué fueron importantes las vanguardias para el arte?",
    answers: [
      "Porque ayudaron a crear nuevas formas de expresarse",
      "Porque prohibieron experimentar con el arte",
      "Porque hicieron que todos los artistas usaran el mismo estilo",
      "Porque eliminaron la literatura"
    ],
    correct: 0,
    explanation: "Las vanguardias ampliaron las posibilidades del arte: los artistas pudieron experimentar con nuevas técnicas, temas, materiales y formas de expresión."
  },
  {
    topic: "SURREALISMO",
    question: "¿Qué tema se relaciona especialmente con el surrealismo?",
    answers: [
      "Los sueños y el mundo del inconsciente",
      "La historia de las matemáticas",
      "Las instrucciones para construir edificios",
      "Las reglas de los deportes"
    ],
    correct: 0,
    explanation: "El surrealismo buscó explorar el mundo de los sueños, el inconsciente y la imaginación, dejando de lado algunas reglas de la lógica cotidiana."
  },
  {
    topic: "FUTURISMO",
    question: "¿Qué aspecto llamó especialmente la atención de los futuristas?",
    answers: [
      "La velocidad, las máquinas y la vida moderna",
      "La copia exacta de esculturas antiguas",
      "Solamente las pinturas de la Edad Media",
      "La vida de los faraones"
    ],
    correct: 0,
    explanation: "El futurismo valoró la velocidad, la tecnología, las máquinas y la energía de la vida moderna."
  },
  {
    topic: "DADAÍSMO",
    question: "¿Dónde nació el dadaísmo?",
    answers: [
      "En el Cabaret Voltaire de Zúrich, en 1916",
      "En un museo de Madrid, en 1850",
      "En Buenos Aires, en 1980",
      "En la antigua Roma"
    ],
    correct: 0,
    explanation: "El dadaísmo nació en 1916 en el Cabaret Voltaire de Zúrich (Suiza), en plena Primera Guerra Mundial."
  },
  {
    topic: "CUBISMO",
    question: "¿Qué hacía el cubismo con los objetos que pintaba?",
    answers: [
      "Los mostraba desde varios puntos de vista a la vez, con formas geométricas",
      "Los pintaba exactamente como en una fotografía",
      "Los dibujaba solo con colores pastel",
      "No pintaba objetos, solo paisajes"
    ],
    correct: 0,
    explanation: "El cubismo, con artistas como Picasso y Braque, descomponía los objetos en formas geométricas y los mostraba desde varios ángulos al mismo tiempo."
  }
];

const QUESTIONS_PER_GAME = 8;
const POINTS = 10;
const MAX_SCORE = QUESTIONS_PER_GAME * POINTS;
const RANKING_KEY = "arltRanking";

let questions = [];
let currentQuestion = 0;
let score = 0;
let streak = 0;
let answered = false;
let mistakes = [];
let scoreSaved = false;
let lastSavedId = null;
let clearTimer = null;

const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
  ranking: document.getElementById("ranking-screen")
};

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const progressFill = document.getElementById("progress-fill");
const topicBadge = document.getElementById("topic-badge");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const saveBtn = document.getElementById("save-score-btn");
const clearBtn = document.getElementById("clear-ranking-btn");

function showScreen(screen) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Elige 8 preguntas al azar y mezcla sus respuestas, guardando cuál es la correcta.
function buildGame() {
  return shuffle(questionBank).slice(0, QUESTIONS_PER_GAME).map(q => {
    const order = shuffle(q.answers.map((_, index) => index));
    return {
      ...q,
      answers: order.map(index => q.answers[index]),
      correct: order.indexOf(q.correct)
    };
  });
}

function startGame() {
  questions = buildGame();
  currentQuestion = 0;
  score = 0;
  streak = 0;
  mistakes = [];
  lastSavedId = null;
  showScreen(screens.quiz);
  loadQuestion();
}

function updateTopBar() {
  scoreEl.textContent = `⭐ ${score} puntos`;
  streakEl.textContent = streak >= 2 ? `🔥 Racha x${streak}` : "";
}

function loadQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  progressEl.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  updateTopBar();
  topicBadge.textContent = q.topic;
  questionEl.textContent = q.question;

  answersEl.innerHTML = "";
  feedbackEl.className = "feedback hidden";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Ver resultado 🏁" : "Siguiente →";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.innerHTML = `<span class="letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(answer)}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const buttons = answersEl.querySelectorAll(".answer-btn");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === q.correct) button.classList.add("correct");
  });

  if (selectedIndex === q.correct) {
    score += POINTS;
    streak++;
    feedbackEl.className = "feedback good";
    feedbackEl.innerHTML = `✨ <strong>¡Correcto! +${POINTS} puntos</strong><br>${q.explanation}`;
  } else {
    streak = 0;
    buttons[selectedIndex].classList.add("wrong");
    mistakes.push({ question: q.question, answer: q.answers[q.correct] });
    feedbackEl.className = "feedback bad";
    feedbackEl.innerHTML = `💫 <strong>¡Ups! Esa no era.</strong><br>${q.explanation}`;
  }

  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  updateTopBar();
  nextBtn.classList.remove("hidden");
  nextBtn.focus({ preventScroll: true });
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

function showResult() {
  showScreen(screens.result);
  const correctCount = score / POINTS;
  document.getElementById("final-score").textContent = `${score} / ${MAX_SCORE}`;
  document.getElementById("correct-count").textContent = `Acertaste ${correctCount} de ${questions.length} preguntas`;

  let message = "";
  if (score === MAX_SCORE) {
    message = "🏆 ¡PERFECTO! Sos una estrella de la literatura.";
  } else if (score >= MAX_SCORE * 0.75) {
    message = "🌟 ¡MUY BIEN! Tenés muy buenos conocimientos.";
  } else if (score >= MAX_SCORE * 0.5) {
    message = "💖 ¡BIEN HECHO! Todavía podés seguir aprendiendo.";
  } else {
    message = "🌱 ¡SEGUÍ INTENTANDO! Cada error también enseña.";
  }
  document.getElementById("result-message").textContent = message;

  // Repaso de las preguntas que falló
  const review = document.getElementById("review");
  if (mistakes.length === 0) {
    review.classList.add("hidden");
  } else {
    review.classList.remove("hidden");
    review.innerHTML = `<h3>📝 Para repasar</h3>` + mistakes.map(m => `
      <div class="review-item">
        <div class="review-q">${escapeHTML(m.question)}</div>
        <div class="review-a">✅ ${escapeHTML(m.answer)}</div>
      </div>
    `).join("");
  }

  scoreSaved = false;
  saveBtn.disabled = false;
  saveBtn.textContent = "💾 Guardar puntuación";
  document.getElementById("player-name").value = "";
  document.getElementById("name-error").textContent = "";

  if (score >= MAX_SCORE * 0.75) createConfetti();
}

function getRanking() {
  try {
    return JSON.parse(localStorage.getItem(RANKING_KEY)) || [];
  } catch {
    return [];
  }
}

function setRanking(ranking) {
  try {
    localStorage.setItem(RANKING_KEY, JSON.stringify(ranking));
    return true;
  } catch {
    return false;
  }
}

function saveScore() {
  if (scoreSaved) return;

  const input = document.getElementById("player-name");
  const name = input.value.trim();
  const error = document.getElementById("name-error");

  if (!name) {
    error.textContent = "💗 Escribí tu nombre primero.";
    input.focus();
    return;
  }

  lastSavedId = Date.now();
  const ranking = getRanking();
  ranking.push({ id: lastSavedId, name, score });
  ranking.sort((a, b) => b.score - a.score);

  // Conservamos las 20 mejores puntuaciones.
  if (!setRanking(ranking.slice(0, 20))) {
    error.textContent = "No se pudo guardar en este navegador.";
    return;
  }

  scoreSaved = true;
  saveBtn.disabled = true;
  showRanking();

  if (!getRanking().some(player => player.id === lastSavedId)) {
    const note = document.createElement("div");
    note.className = "empty-ranking";
    note.textContent = `Hiciste ${score}/${MAX_SCORE}, pero esta vez no alcanzó para entrar en el top 20. ¡Probá de nuevo!`;
    document.getElementById("ranking-list").prepend(note);
  }
}

function showRanking() {
  showScreen(screens.ranking);
  resetClearButton();

  const ranking = getRanking();
  const container = document.getElementById("ranking-list");

  if (ranking.length === 0) {
    container.innerHTML = `<div class="empty-ranking">🌸 Todavía no hay jugadores.<br><strong>¡Sé el primero!</strong></div>`;
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  container.innerHTML = ranking.map((player, index) => {
    const medal = medals[index] || `${index + 1}°`;
    const mine = player.id && player.id === lastSavedId ? " mine" : "";

    return `
      <div class="rank-row${mine}">
        <div class="rank-position">${medal}</div>
        <div class="rank-name">${escapeHTML(player.name)}${mine ? " <small>(vos)</small>" : ""}</div>
        <div class="rank-score">${player.score}/${MAX_SCORE}</div>
      </div>
    `;
  }).join("");
}

// Borrar el ranking pide un segundo toque en vez de una ventana emergente.
function clearRanking() {
  if (getRanking().length === 0) {
    clearBtn.textContent = "El ranking ya está vacío";
    clearTimer = setTimeout(resetClearButton, 2000);
    return;
  }

  if (!clearBtn.classList.contains("confirm")) {
    clearBtn.classList.add("confirm");
    clearBtn.textContent = "⚠️ ¿Seguro? Tocá de nuevo para borrar";
    clearTimer = setTimeout(resetClearButton, 3500);
    return;
  }

  try { localStorage.removeItem(RANKING_KEY); } catch {}
  lastSavedId = null;
  showRanking();
}

function resetClearButton() {
  clearTimeout(clearTimer);
  clearBtn.classList.remove("confirm");
  clearBtn.textContent = "🗑️ Borrar ranking";
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function createConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = document.getElementById("confetti");
  container.innerHTML = "";

  const symbols = ["⭐", "✨", "💗", "🌸", "💜", "🎉", "💫"];

  for (let i = 0; i < 45; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.fontSize = `${14 + Math.random() * 15}px`;
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = "";
  }, 4000);
}

document.getElementById("question-count").textContent = QUESTIONS_PER_GAME;
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("ranking-start-btn").addEventListener("click", showRanking);
nextBtn.addEventListener("click", nextQuestion);
// Evita que mantener apretado Enter saltee la explicación.
nextBtn.addEventListener("keydown", event => {
  if (event.key === "Enter" && event.repeat) event.preventDefault();
});
saveBtn.addEventListener("click", saveScore);
document.getElementById("skip-save-btn").addEventListener("click", showRanking);
document.getElementById("play-again-btn").addEventListener("click", startGame);
clearBtn.addEventListener("click", clearRanking);
document.getElementById("home-btn").addEventListener("click", () => showScreen(screens.start));

document.getElementById("player-name").addEventListener("keydown", event => {
  if (event.key === "Enter") saveScore();
});

// Teclado: A-D o 1-4 para responder, Enter para seguir.
document.addEventListener("keydown", event => {
  if (!screens.quiz.classList.contains("active")) return;
  if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
  const key = event.key.toLowerCase();
  const index = "abcd".indexOf(key) !== -1 ? "abcd".indexOf(key) : "1234".indexOf(key);

  if (!answered && index !== -1 && index < questions[currentQuestion].answers.length) {
    selectAnswer(index);
  } else if (answered && event.key === "Enter" && document.activeElement !== nextBtn) {
    nextQuestion();
  }
});
