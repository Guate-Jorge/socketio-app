import { io } from 'socket.io-client';

const emojiButton = document.getElementById('emoji-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');
const sendMessageButton = document.getElementById('send-button');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  displayMessage(`You are online with id: ${socket.id}`);
});

socket.on('receive-message', message => {
  displayMessage(message);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = messageInput.value;

  if (message === '') return
  displayMessage(message);
  socket.emit('send-message', message);

  messageInput.value = '';
});

emojiButton.addEventListener('click', () => {
  displayMessage('😀');
  socket.emit('emojis');
});

function displayMessage(message) {
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').append(div);
}

/*
fetch => server => data 
fetch => server => data 
fetch => server => data 
fetch => server => data 
fetch => server => data 

ws ==> conexion => enviar/recibir =============== enviar ====== 
*/