// Функція, яка створює та показує вікно реклами
function showAd() {
    // Забороняємо прокручування сторінки
    document.body.style.overflow = 'hidden';

    // Створення вікна реклами
    var adWindow = document.createElement('div');
    adWindow.id = 'adWindow'; // задаємо ідентифікатор для вікна реклами
    // Додаємо вміст вікна реклами, включаючи зображення, таймер та кнопку закриття
    adWindow.innerHTML = '<img src="rek.jpg" alt="Реклама" style="max-width: 500px;"> <div id="timer"></div> <div id="closeButton">&times;</div>';
    document.body.appendChild(adWindow); // додаємо вікно реклами до тіла документу

    var secondsLeft = 5; // початкове значення для таймера в секундах
    var timerElement = document.getElementById('timer'); // отримуємо елемент таймера
    var closeButton = document.getElementById('closeButton'); // отримуємо кнопку закриття
    closeButton.disabled = true; // вимикаємо кнопку закриття
    var countdown = setInterval(function() { // встановлюємо інтервал для таймера
        timerElement.innerText = secondsLeft; // відображаємо кількість залишених секунд
        secondsLeft--; // зменшуємо кількість секунд

        if (secondsLeft < 0) { // якщо час вичерпано
            clearInterval(countdown); // зупиняємо інтервал
            closeButton.style.opacity = '1'; 
            closeButton.style.cursor = 'pointer'; // дозволяємо використання курсора на кнопці
            closeButton.addEventListener('click', function() { // додаємо подію "клік" на кнопку закриття
                closeAd(); // викликаємо функцію закриття реклами
            });
        }
    }, 1000); 
}

setTimeout(showAd, 20000); // встановлюємо затримку перед викликом функції showAd (20 секунд)

// Функція для закриття вікна реклами
function closeAd() {
    var adWindow = document.getElementById('adWindow'); // отримуємо вікно реклами
    adWindow.remove(); // видаляємо вікно реклами 

    // Дозволяємо прокручування сторінки знову
    document.body.style.overflow = 'auto';
}
