// Инициализируем VK Bridge
vkBridge.send("VKWebAppInit");

// Автоматически получаем имя и аватарку при запуске приложения
vkBridge.send("VKWebAppGetUserInfo").then((data) => {
    if (data) {
        document.getElementById('user-avatar').src = data.photo_100;
        document.getElementById('input-name').value = data.first_name;
    }
}).catch((error) => console.log(error));

// Автоматически запрашиваем номер телефона пользователя из ВК (потребует одобрения пользователя)
vkBridge.send("VKWebAppGetPhoneNumber").then((data) => {
    if (data && data.phone_number) {
        document.getElementById('input-phone').value = data.phone_number;
    }
}).catch((error) => console.log(error));

// Логика кнопки "Отправить" (переключение экранов)
document.getElementById('btn-submit').addEventListener('click', () => {
    document.getElementById('screen-form').classList.add('hidden');
    document.getElementById('screen-thanks').classList.remove('hidden');
});

// Логика кнопки "Перейти на сайт" (открытие вашего ВК Видео)
document.getElementById('btn-go').addEventListener('click', () => {
    vkBridge.send("VKWebAppOpenURL", {
        "url": "https://vk.com" // ЗАМЕНИТЕ НА ВАШУ ССЫЛКУ НА ВК ВИДЕО
    });
});
