

const products = [
    {
        name: "Standart",
        price: 5000,
        features: [
            "Доступ до відео уроків",
            "Онлайн чат",
            "Практичне заняття",
            "Домашнє завдання",
            "Бронювання місця"
        ],
        available: [true, true, true, true, false]
    },
    {
        name: "Reservation",
        price: 5250,
        features: [
            "Доступ до відео уроків",
            "Онлайн чат",
            "Практичне заняття",
            "Домашнє завдання",
            "Бронювання місця"
        ],
        available: [true, true, true, true, true]
    },
    {
        name: "Non Standart",
        price: 4000,
        features: [
            "Доступ до відео уроків",
            "Онлайн чат",
            "Практичне заняття",
            "Домашнє завдання",
            "Бронювання місця"
        ],
        available: [true, true, false, true, false]
    },
    {
        name: "Econom",
        price: 2000,
        features: [
            "Доступ до відео уроків",
            "Онлайн чат",
            "Практичне заняття",
            "Домашнє завдання",
            "Бронювання місця"
        ],
        available: [true, true, false, false, false]
    },
    {
        name: "Premium",
        price: 7000,
        features: [
            "Онлайн чат",
            "Практичне заняття",
            "Домашнє завдання",
            "Персональний наставник",
            "Бронювання місця"
        ],
        available: [true, true, true, true, true]
    },
    {
        name: "Ultimate",
        price: 8000,
        features: [
            "Доступ до відео уроків",
            "Онлайн чат",
            "Практичне заняття",
            "Домашнє завдання",
            "Персональний наставник"
        ],
        available: [true, true, true, true, true]
    },
    {
        name: "Basic",
        price: 1500,
        features: [
            "Доступ до відео уроків",
            "Онлайн чат",
            "Персональний наставник",
            "Практичне заняття",
            "Домашнє завдання"
        ],
        available: [true, true, false, true, false]
    },
    {
        name: "Advanced",
        price: 3500,
        features: [
            "Доступ до відео уроків",
            "Онлайн чат",
            "Практичне заняття",
            "Домашнє завдання",
            "Персональний наставник"
        ],
        available: [true, true, true, true, false]
    }
];

const boxesContainer = document.querySelector('.boxes');
const loadMoreButton = document.getElementById('loadMore');
let productsDisplayed = 0;
const productsPerPage = 4;

function renderProducts(productsToRender) {
    productsToRender.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'price';
        productDiv.draggable = true;
        productDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', JSON.stringify(product));
        });

        const productHtml = `
            <div class="test">
                <h1>${product.name}</h1>
                <h1>${product.price}₴ грн</h1>
            </div>
            <div class="access">
                ${product.features.map((feature, index) => `
                    <p><i class="fa-solid fa-${product.available[index] ? 'check' : 'xmark'} fa-fw"></i> ${feature}</p>
                `).join('')}
            </div>
            <button class="buy1" data-product='${JSON.stringify(product)}'>ОПЛАТИТИ</button>
        `;

        productDiv.innerHTML = productHtml;
        boxesContainer.appendChild(productDiv);
    });

    document.querySelectorAll('.buy1').forEach(button => {
        button.addEventListener('click', () => {
            const product = JSON.parse(button.getAttribute('data-product'));
            openModal(product);
        });
    });
}

function loadProducts() {
    const productsToLoad = products.slice(productsDisplayed, productsDisplayed + productsPerPage);
    renderProducts(productsToLoad);
    productsDisplayed += productsPerPage;
    if (productsDisplayed >= products.length) {
        loadMoreButton.style.display = 'none';
    }
}

// Initial load
loadProducts();

loadMoreButton.addEventListener('click', loadProducts);

const sortNameButton = document.getElementById('sortName');
const sortPriceButton = document.getElementById('sortPrice');

function sortProducts(criteria) {
    if (criteria === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'price') {
        products.sort((a, b) => a.price - b.price);
    }
    productsDisplayed = 0;
    boxesContainer.innerHTML = '';
    loadProducts();
    if (productsDisplayed < products.length) {
        loadMoreButton.style.display = 'block';
    } else {
        loadMoreButton.style.display = 'none';
    }
}

sortNameButton.addEventListener('click', () => sortProducts('name'));
sortPriceButton.addEventListener('click', () => sortProducts('price'));

const cart = [];
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalContainer = document.getElementById('cartTotal');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <input type="number" value="${item.quantity}" min="1" data-name="${item.name}">
            <span>${item.price}₴ грн</span>
            <button class="remove" data-name="${item.name}">Видалити</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    cartTotalContainer.innerText = `Загальна вартість: ${total}₴ грн`;

    document.querySelectorAll('.cart-item input').forEach(input => {
        input.addEventListener('change', (event) => {
            const name = event.target.getAttribute('data-name');
            const quantity = parseInt(event.target.value);
            const item = cart.find(product => product.name === name);
            item.quantity = quantity;
            updateCart();
        });
    });

    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const index = cart.findIndex(product => product.name === name);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCart();
            }
        });
    });
}

function openModal(product) {
    const modal = document.getElementById('modal');
    document.getElementById('modalProductName').innerText = product.name;
    const quantityInput = document.getElementById('modalProductQuantity');
    quantityInput.value = 1;
    document.getElementById('modalAddToCart').onclick = () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(product, quantity);
        modal.style.display = 'none';
    };
    modal.style.display = 'block';
}

document.querySelector('.close').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

function addToCart(product, quantity) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    updateCart();
}

const cartContainer = document.getElementById('cart');
cartContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
});

cartContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    const product = JSON.parse(event.dataTransfer.getData('text/plain'));
    openModal(product);
});

const barColors = ['#FF6384', '#36A2EB', '#FFCE56', '#5C33F6', '#8FE768', '#FF5733', '#33FFBD', '#CE33FF'];

function displayCart(){
    new Chart("myChart", {
        type: "pie",
        data: {
            labels: cart.map(item => item.name),
            datasets: [{
                backgroundColor: barColors,
                data: cart.map(item => item.quantity)
            }]
        },
        options: {
            title: {
                display: true,
                text: "Статистика корзини"
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

function displayCartBar(){

    new Chart("myBar", {
        type: "bar",
        data: {
            labels: cart.map(item => item.name),
            datasets: [{
                backgroundColor: barColors,
                data: cart.map(item => item.quantity)
            }]
        },
        options: {
            title: {
                display: true,
                text: "Статистика корзини"
            }
    
        }
    });
}

function displayCartRadar(){

    new Chart("myRadar", {
        type: "radar",
        data: {
            labels: cart.map(item => item.name),
            datasets: [{
                backgroundColor: barColors,
                data: cart.map(item => item.quantity)
            }]
        },
        options: {
            title: {
                display: true,
                text: "Статистика корзини"
            }
        }
    });
}


function handleSelectStatistic() {
    const select = document.getElementById("SelectStatistic");
    const selectedValue = select.value;
    if (selectedValue === "pie") {
        document.getElementById('myBar').style.display = 'none';
        document.getElementById('myRadar').style.display = 'none';
        document.getElementById('myChart').style.display = 'flex';
        displayCart(); 
    }
    if (selectedValue === "bar") {
        document.getElementById('myChart').style.display = 'none';
        document.getElementById('myRadar').style.display = 'none';
        document.getElementById('myBar').style.display = 'flex';
        displayCartBar(); 
    }
    if (selectedValue === "radar") {
        document.getElementById('myChart').style.display = 'none';
        document.getElementById('myBar').style.display = 'none';
        document.getElementById('myRadar').style.display = 'flex';
        displayCartRadar(); 
    }
}

document.getElementById('myBar').style.display = 'none';
document.getElementById('myRadar').style.display = 'none';
document.getElementById('myChart').style.display = 'none';


const scrollTopButton = document.querySelector('.akeconsa-udaneles');

document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.querySelector('.akeconsa-udaneles');
    
  
    window.addEventListener('scroll', () => {
     
        if (window.scrollY > window.innerHeight * 2 / 3) {

            scrollTopButton.style.display = 'block';
        } else {

            scrollTopButton.style.display = 'none';
        }
    });

    scrollTopButton.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


