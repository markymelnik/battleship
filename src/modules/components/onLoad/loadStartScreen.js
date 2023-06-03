const loadStartScreen = () => {

  const startScreen = document.querySelector('.start-screen');
  const startTitle = document.querySelector('.start-title');
  const enterGameBtn = document.querySelector('.enter-game-btn');
  const nameForm = document.querySelector('.name-form');
  const nameInput = document.querySelector('#username');
  const playerName = document.querySelector('.player-name');
  const dragContainer = document.querySelector('.drag-container');
  const aiContainer = document.querySelector('.ai-container');

  const resetGameBtn = document.querySelector('.reset-game-btn');
  const gameStatusText = document.querySelector('.game-status-text');

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      startTitle.classList.add('active');
    }, 500);
    setTimeout(() => {
      nameForm.classList.add('active');
    }, 1000);
    setTimeout(() => {
      enterGameBtn.style.visibility = 'visible';
    }, 1600);
  });
  
  enterGameBtn.addEventListener('click', (event) => {
    startTitle.classList.remove('active');
    startTitle.classList.add('fade');
    setTimeout(() => {
      nameForm.classList.remove('active');
      nameForm.classList.add('fade');
    }, 100);
    setTimeout(() => {
      startScreen.style.top = '-100vh';
    }, 250);
  
    playerName.textContent = nameInput.value || 'Player';
    nameForm.reset();
  
    aiContainer.style.visibility = 'hidden';
    dragContainer.style.visibility = 'visible';
    resetGameBtn.style.visibility = 'visible';
  
    setTimeout(() => {
      startScreen.style.display = 'none';
      gameStatusText.textContent = 'Place your ships...';
    }, 1000);
  
    event.preventDefault();
  });
}

export default loadStartScreen;
