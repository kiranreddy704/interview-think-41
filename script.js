
let playlist = [];
let currentIndex = -1;

function renderPlaylist() {
  const playlistDiv = document.getElementById('playlist');
  playlistDiv.innerHTML = '';

  playlist.forEach((song, index) => {
    const songDiv = document.createElement('div');
    songDiv.className = 'song' + (index === currentIndex ? ' current' : '');
    songDiv.innerHTML = `
      <span onclick="selectSong(${index})">${song}</span>
      <button onclick="removeSong(${index})">Remove</button>
    `;
    playlistDiv.appendChild(songDiv);
  });
}

function addSong() {
  const songInput = document.getElementById('songInput');
  const songName = songInput.value.trim();
  if (songName) {
    playlist.push(songName);
    if (currentIndex === -1) {
      currentIndex = 0;
    }
    songInput.value = '';
    renderPlaylist();
  }
}

function selectSong(index) {
  currentIndex = index;
  renderPlaylist();
}

function nextSong() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex + 1) % playlist.length;
  renderPlaylist();
}

function previousSong() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  renderPlaylist();
}

function removeSong(index) {
  playlist.splice(index, 1);
  if (playlist.length === 0) {
    currentIndex = -1;
  } else if (index < currentIndex) {
    currentIndex--;
  } else if (index === currentIndex) {
    currentIndex = currentIndex % playlist.length;
  }
  renderPlaylist();
}

function sortPlaylist() {
  const option = document.getElementById('sortOptions').value;
  if (option === 'nameAsc') {
    playlist.sort((a, b) => a.localeCompare(b));
  } else if (option === 'nameDesc') {
    playlist.sort((a, b) => b.localeCompare(a));
  }
  currentIndex = playlist.length > 0 ? 0 : -1;
  renderPlaylist();
}