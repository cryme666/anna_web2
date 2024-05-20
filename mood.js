setTimeout(function() {
    // Перевіряємо, чи користувач ще не підписаний
    var subscribed = localStorage.getItem('subscribed');
    if (!subscribed) {
        var subscriptionWindow = document.createElement('div');
        subscriptionWindow.id = 'subscriptionWindow';
        subscriptionWindow.innerHTML = '<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9999;"></div> <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 10px; z-index: 10000;"> <h2>Підписка на повідомлення</h2> <p>Підпишіться на наші повідомлення, щоб отримувати останні новини та акції.</p> <button id="acceptButton">Підписатися</button> <button id="rejectButton">Відхилити</button> </div>';
        document.body.appendChild(subscriptionWindow);

        document.getElementById('acceptButton').addEventListener('click', function() {
            localStorage.setItem('subscribed', true);
            subscriptionWindow.remove();
            showThankYouMessage();
        });

        document.getElementById('rejectButton').addEventListener('click', function() {
            subscriptionWindow.remove();
        });
    }
}, 5000); // З'являється через 5 секунд після завантаження сторінки

function showThankYouMessage() {
    var thankYouMessage = document.createElement('div');
    thankYouMessage.innerHTML = '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #ffffff; padding: 20px; border-radius: 10px; z-index: 10000;"> <h2>Дякуємо за підписку!</h2> <p>Ви успішно підписалися на наші повідомлення. Будьте в курсі останніх новин та акцій.</p> </div>';
    document.body.appendChild(thankYouMessage);

    setTimeout(function() {
        thankYouMessage.remove();
    }, 3000); // Повідомлення зникає через 3 секунди
}
