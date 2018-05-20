import './bootstrap';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const chat  = document.getElementById('chat');       // Список для вывода сообщений
const form  = document.getElementById('chat-form');  // Форма ввода
const input = document.getElementById('chat-input'); // Поле ввода
const info  = document.getElementById('info-panel'); // Cтрока для вывода оповещений

/**
* Функция добавляет новое сообщение
*/
const addNewMessage = (userName, message) => {
  // Создаем элемент <li></li>
  const container = document.createElement('li');
  // Записываем туда имя отправителя и текст
  container.innerHTML = `<i>${userName}</i><span>${message}</span>`
  // Монтируем на страницу
  chat.appendChild(container);
}

/**
* Функция выводит оповещения для пользователя и скрывает их через 5 сек
*/
const showNotification = message  => {
  info.innerHTML = message;
  setTimeout(() => info.innerHTML = '', 5000);
}

/**
* Новый экземпляр Laravel Echo
*/
const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY,
  cluster: process.env.MIX_PUSHER_APP_CLUSTER,
  encrypted: true
});

echo.join('chat-room')
  // Сработает при присокединении к каналу
  .here(() => {
    showNotification(`Здесь будут показаны сообщения чата!`);
  })
  // Сработает при присоединении нового пользователя к каналу
 .joining(member => {
    showNotification(`Пользователь ${member.name} зашел в чат!`);
  })
  // Сработает при уходе пользователя с канала
 .leaving(member => {
    showNotification(`Пользователь ${member.name} покинул в чат!`);
  })

echo.private('chat-room').listen('NewMessage', (e) => {
    addNewMessage(e.user.name, e.message.message);
  });


form.addEventListener('submit', e => {
  e.preventDefault();
  
  if (input.value) {
    // Отправляем AJAX на роут /message с телом сообщения
    window.axios.post('/message', {
      message: input.value
    });
    // Очищаем инпут
    input.value = '';
  }
  
})
