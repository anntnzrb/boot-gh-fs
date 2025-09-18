const defaultPhrases = [
  '¡Ánimo! Cada línea te acerca a la meta.',
  'Ese bug se arregla con una buena mateada.',
  'Respira, cuenta hasta diez y vuelve al código.',
  'No hay error que aguante un buen refactor.',
  'Hoy el deploy sale sin drama, vas a ver.'
];

const phrases = [...defaultPhrases];
const colorSchemes = [
  {
    gradient: 'linear-gradient(160deg, #e7ecff 0%, #f2f5ff 100%)',
    primary: '#2d4bff',
    primaryDark: '#1f34b5',
    border: 'rgba(45, 75, 255, 0.2)',
    focus: 'rgba(45, 75, 255, 0.15)',
    shadow: 'rgba(33, 56, 255, 0.1)'
  },
  {
    gradient: 'linear-gradient(160deg, #ffe8e8 0%, #ffd3b6 100%)',
    primary: '#f97316',
    primaryDark: '#ea580c',
    border: 'rgba(249, 115, 22, 0.25)',
    focus: 'rgba(249, 115, 22, 0.18)',
    shadow: 'rgba(249, 115, 22, 0.12)'
  },
  {
    gradient: 'linear-gradient(160deg, #e0f9f1 0%, #c8f7dc 100%)',
    primary: '#0f9d58',
    primaryDark: '#0b7d46',
    border: 'rgba(15, 157, 88, 0.25)',
    focus: 'rgba(15, 157, 88, 0.18)',
    shadow: 'rgba(15, 157, 88, 0.12)'
  },
  {
    gradient: 'linear-gradient(160deg, #fff0f6 0%, #ffd6e8 100%)',
    primary: '#d5298a',
    primaryDark: '#aa1f6c',
    border: 'rgba(213, 41, 138, 0.25)',
    focus: 'rgba(213, 41, 138, 0.2)',
    shadow: 'rgba(213, 41, 138, 0.12)'
  },
  {
    gradient: 'linear-gradient(160deg, #edf6ff 0%, #d9ecff 100%)',
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    border: 'rgba(37, 99, 235, 0.25)',
    focus: 'rgba(37, 99, 235, 0.18)',
    shadow: 'rgba(37, 99, 235, 0.12)'
  }
];

let shownCount = 0;
let lastPhrase = null;
let lastSchemeIndex = -1;

const phraseDisplay = document.querySelector('[data-phrase-display]');
const showButton = document.querySelector('[data-show-button]');
const counterLabel = document.querySelector('[data-counter]');
const addForm = document.querySelector('[data-add-form]');
const addInput = document.querySelector('[data-add-input]');
const feedback = document.querySelector('[data-feedback]');

function getRandomPhrase() {
  if (phrases.length === 0) {
    return 'Aún no hay frases. ¡Agrega la tuya aquí abajo!';
  }

  if (phrases.length === 1) {
    return phrases[0];
  }

  let candidate = lastPhrase;
  while (candidate === lastPhrase) {
    const index = Math.floor(Math.random() * phrases.length);
    candidate = phrases[index];
  }

  return candidate;
}

function updateCounter() {
  if (!counterLabel) return;
  counterLabel.textContent = `Frases mostradas: ${shownCount}`;
}

function setFeedback(message, type = 'info') {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.state = type;
}

function showRandomPhrase() {
  if (!phraseDisplay) return;
  const phrase = getRandomPhrase();
  phraseDisplay.textContent = phrase;
  lastPhrase = phrase;
  shownCount += 1;
  updateCounter();
  applyRandomColorScheme();
  setFeedback('');
}

function handleAddPhrase(event) {
  event.preventDefault();
  if (!addInput) return;
  const newPhrase = addInput.value.trim();

  if (newPhrase.length === 0) {
    setFeedback('Por favor, escribe una frase antes de agregarla.', 'error');
    return;
  }

  const alreadyExists = phrases.some(
    (phrase) => phrase.toLowerCase() === newPhrase.toLowerCase()
  );

  if (alreadyExists) {
    setFeedback('Esa frase ya está en la lista.', 'error');
    return;
  }

  phrases.push(newPhrase);
  addInput.value = '';
  setFeedback('¡Frase agregada con éxito!', 'success');
}

if (showButton) {
  showButton.addEventListener('click', showRandomPhrase);
}

if (addForm) {
  addForm.addEventListener('submit', handleAddPhrase);
}

updateCounter();

function applyRandomColorScheme() {
  const total = colorSchemes.length;
  if (total === 0) return;

  let nextIndex = lastSchemeIndex;

  if (total === 1) {
    nextIndex = 0;
  } else {
    while (nextIndex === lastSchemeIndex) {
      nextIndex = Math.floor(Math.random() * total);
    }
  }

  lastSchemeIndex = nextIndex;
  const scheme = colorSchemes[nextIndex];

  document.body.style.background = scheme.gradient;
  document.documentElement.style.setProperty('--primary', scheme.primary);
  document.documentElement.style.setProperty('--primary-dark', scheme.primaryDark);
  document.documentElement.style.setProperty('--primary-border', scheme.border);
  document.documentElement.style.setProperty('--primary-focus', scheme.focus);
  document.documentElement.style.setProperty('--primary-shadow', scheme.shadow);
}
