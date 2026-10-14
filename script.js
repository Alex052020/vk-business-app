// Инициализируем VK Bridge для связи с социальной сетью
vkBridge.send('VKWebAppInit')
  .then(() => {
    console.log('VK Bridge успешно инициализирован');
    // Запрашиваем персональные данные пользователя (Имя, Фамилия, Аватарка)
    return vkBridge.send('VKWebAppGetUserInfo');
  })
  .then((userInfo) => {
    if (userInfo) {
      // Подставляем имя и аватарку в наше белое окошко
      document.getElementById('user-avatar').src = userInfo.photo_200;
      document.getElementById('input-name').value = `${userInfo.first_name} ${userInfo.last_name}`;
    }
    // Запрашиваем номер телефона пользователя из его профиля ВК
    return vkBridge.send('VKWebAppGetPhoneNumber');
  })
  .then((phoneData) => {
    if (phoneData && phoneData.phone_number) {
      // Автоматически вставляем телефон в поле ввода
      document.getElementById('input-phone').value = phoneData.phone_number;
    }
  })
  .catch((error) => {
    console.error('Ошибка при работе с VK Bridge:', error);
  });

// Логика переключения экранов при нажатии на кнопку "Отправить"
document.getElementById('btn-submit').addEventListener('click', () => {
  document.getElementById('screen-form').classList.add('hidden');
  document.getElementById('screen-thanks').classList.remove('hidden');
});

// Логика перехода на ваше ВК Видео при нажатии на вторую кнопку
document.getElementById('btn-go').addEventListener('click', () => {
  // Замените эту ссылку на точный адрес вашего ролика из ВК Видео, если нужно!
  window.open('https://vkvideo.ru', '_blank');
});
