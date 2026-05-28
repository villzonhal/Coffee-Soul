// Данные для новостей
const newsData = [
    { id: 1, title: "Новая партия из Эфиопии", short: "Уникальные фруктовые ноты с оттенком жасмина", full: "Свежая партия зерен из региона Иргачефф. Вкус: жасмин, черника, бергамот. Успейте заказать.", img: "https://placehold.co/600x400/8B5A2B/white?text=Ethiopia" },
    { id: 2, title: "Курс бариста старт 15 июня", short: "Стань профессионалом за 5 дней", full: "Интенсивный курс: эспрессо, латте-арт, теория. Сертификат и скидка 20 процентов на оборудование.", img: "https://placehold.co/600x400/b87c4a/white?text=Barista" },
    { id: 3, title: "Колд брю сезон открыт", short: "Освежающий способ заваривания", full: "Холодное заваривание 16 часов. Мягкий вкус без горечи. Второй стакан в подарок.", img: "https://placehold.co/600x400/6b4220/white?text=Cold+Brew" },
    { id: 4, title: "Кофейный фестиваль", short: "20 июля в центре Москвы", full: "Более 30 обжарщиков, дегустации, лекции от чемпионов мира. Вход свободный.", img: "https://placehold.co/600x400/8B5A2B/white?text=Fest" },
    { id: 5, title: "Линия Decaf", short: "Кофе без кофеина", full: "Швейцарский водный метод. Мягкое удаление кофеина. Идеально для вечера.", img: "https://placehold.co/600x400/b87c4a/white?text=Decaf" },
    { id: 6, title: "Кофейная подписка", short: "Свежая обжарка каждый месяц", full: "Скидка 15 процентов, эксклюзивные сорта и бесплатная доставка. Оформите сейчас.", img: "https://placehold.co/600x400/6b4220/white?text=Subscription" }
];

// Данные для карточек коллекции
const coffeeCards = [
    { name: "Эфиопия Иргачеффе", desc: "Жасмин, черника, цитрус", img: "https://placehold.co/300x200/f5e6d3/8B5A2B?text=Ethiopia" },
    { name: "Колумбия Супремо", desc: "Шоколад, орехи", img: "https://placehold.co/300x200/e0cfb6/8B5A2B?text=Colombia" },
    { name: "Коста-Рика", desc: "Мед, карамель", img: "https://placehold.co/300x200/dbbc8c/8B5A2B?text=Costa+Rica" },
    { name: "Гватемала", desc: "Какао, пряности", img: "https://placehold.co/300x200/c9aa7b/8B5A2B?text=Guatemala" },
    { name: "Руанда", desc: "Вишня, сухофрукты", img: "https://placehold.co/300x200/b58d5e/8B5A2B?text=Rwanda" },
    { name: "Бразилия Сантос", desc: "Ореховая сладость", img: "https://placehold.co/300x200/a67648/8B5A2B?text=Brazil" },
    { name: "Перу", desc: "Зеленое яблоко", img: "https://placehold.co/300x200/9c6e47/8B5A2B?text=Peru" },
    { name: "Индия Монсун", desc: "Пряный, землистый", img: "https://placehold.co/300x200/87613d/8B5A2B?text=India" },
    { name: "Йемен Мокко", desc: "Сухофрукты, шоколад", img: "https://placehold.co/300x200/7a5839/8B5A2B?text=Yemen" },
    { name: "Танзания", desc: "Яркая кислотность", img: "https://placehold.co/300x200/6e4e34/white?text=Tanzania" },
    { name: "Никарагуа", desc: "Сливочная сладость", img: "https://placehold.co/300x200/624531/white?text=Nicaragua" }
];

let formEntries = [];

// ========== ДАТА И ВРЕМЯ ==========
function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTimeString = now.toLocaleString("ru-RU", options);
    const dateElem = document.getElementById('currentDateTime');
    if (dateElem) dateElem.textContent = dateTimeString;
}

function initDateTime() {
    if (document.getElementById('currentDateTime')) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
}

// ========== БУРГЕР-МЕНЮ ==========
function initBurger() {
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!burgerBtn || !mobileMenu) return;
    
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (event) => {
        if (!burgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// ========== АКТИВНАЯ ССЫЛКА ==========
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) link.classList.add('active');
        else link.classList.remove('active');
    });
}

// ========== НОВОСТИ ==========
function initNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    grid.innerHTML = newsData.map(n => `
        <div class="news-card" data-id="${n.id}">
            <img class="news-img" src="${n.img}" alt="${n.title}">
            <div class="news-content">
                <div class="news-title">${n.title}</div>
                <div class="news-desc">${n.short}</div>
                <button class="btn-more" data-id="${n.id}">Подробнее</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.id;
            const news = newsData.find(n => n.id == id);
            if (news) {
                document.getElementById('modalTitle').innerText = news.title;
                document.getElementById('modalFullText').innerHTML = `<p>${news.full}</p><img src="${news.img}" style="width:100%; border-radius:20px; margin-top:1rem">`;
                document.getElementById('newsModal').style.display = 'flex';
            }
        });
    });
    
    const closeModal = () => document.getElementById('newsModal').style.display = 'none';
    document.querySelector('.close-modal')?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === document.getElementById('newsModal')) closeModal(); });
}

// ========== КАРТОЧКИ КОЛЛЕКЦИИ ==========
function initCards() {
    const container = document.getElementById('cardsContainer');
    if (container) {
        container.innerHTML = coffeeCards.map(card => `
            <div class="flex-card">
                <img src="${card.img}" alt="${card.name}">
                <h3>${card.name}</h3>
                <p>${card.desc}</p>
            </div>
        `).join('');
    }
}

// ========== ГАЛЕРЕЯ С КНОПКАМИ ==========
const galleryImages = [
    "https://placehold.co/900x600/d4b48c/5a3e2b?text=Latte+Art+1",
    "https://placehold.co/900x600/cfaa7a/5a3e2b?text=Roastery",
    "https://placehold.co/900x600/b88f5e/5a3e2b?text=Pourover",
    "https://placehold.co/900x600/a57447/5a3e2b?text=Barista",
    "https://placehold.co/900x600/936a42/5a3e2b?text=Coffee+Beans",
    "https://placehold.co/900x600/7a5839/5a3e2b?text=Latte+Art+2"
];

let currentIndex = 0;

function updateMainImage() {
    const bigImg = document.getElementById('bigimg');
    if (bigImg) {
        bigImg.src = galleryImages[currentIndex];
        bigImg.alt = 'Фото ' + (currentIndex + 1);
    }
    
    const thumbnails = document.getElementById('thumbnails');
    if (thumbnails) {
        thumbnails.innerHTML = galleryImages.map((img, idx) => `
            <img src="${img}" width="90" height="90" style="object-fit:cover; border-radius:12px; cursor:pointer; border: ${idx === currentIndex ? '3px solid #c47a3a' : '2px solid #ddd'}; transition:0.2s;" onclick="setImage(${idx})" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        `).join('');
    }
}

function setImage(index) {
    currentIndex = index;
    updateMainImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateMainImage();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateMainImage();
}

function initGallery() {
    updateMainImage();
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.onclick = prevImage;
        prevBtn.onmouseover = () => prevBtn.style.background = '#c47a3a';
        prevBtn.onmouseout = () => prevBtn.style.background = '#8B5A2B';
    }
    if (nextBtn) {
        nextBtn.onclick = nextImage;
        nextBtn.onmouseover = () => nextBtn.style.background = '#c47a3a';
        nextBtn.onmouseout = () => nextBtn.style.background = '#8B5A2B';
    }
    
    window.setImage = setImage;
}

// ========== ФОРМА С LOCALSTORAGE ==========
function loadEntries() {
    const saved = localStorage.getItem('coffeeFormEntries');
    if (saved) formEntries = JSON.parse(saved);
    else formEntries = [];
}

function saveEntries() {
    localStorage.setItem('coffeeFormEntries', JSON.stringify(formEntries));
}

function displayEntries() {
    const container = document.getElementById('savedEntriesList');
    if (!container) return;
    
    if (formEntries.length === 0) {
        container.innerHTML = '<p style="color: #888;">Нет сохраненных записей</p>';
        return;
    }
    
    container.innerHTML = formEntries.map((entry, index) => `
        <div class="entry-item">
            <div class="entry-info">
                <strong>${entry.name || 'Без имени'}</strong><br>
                Email: ${entry.email || '-'}<br>
                Телефон: ${entry.phone || '-'}<br>
                Способ заваривания: ${entry.brew || '-'}<br>
                Чашек в день: ${entry.cups || '0'}<br>
                Регион: ${entry.region || '-'}<br>
                Добавки: ${entry.additives || '-'}
            </div>
            <button class="entry-delete" data-index="${index}">Удалить</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.entry-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            formEntries.splice(index, 1);
            saveEntries();
            displayEntries();
        });
    });
}

function initForm() {
    const form = document.getElementById('coffeeForm');
    if (!form) return;
    
    loadEntries();
    displayEntries();
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (formEntries.length >= 3) {
            alert('Достигнут лимит записей (максимум 3). Удалите одну из записей.');
            return;
        }
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            brew: document.getElementById('brew').value,
            roast: document.getElementById('roast').value,
            cups: document.getElementById('cups').value,
            region: document.getElementById('region').value,
            additives: document.getElementById('additives').value,
            comment: document.getElementById('comment').value
        };
        
        formEntries.push(formData);
        saveEntries();
        displayEntries();
        form.reset();
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    setActiveLink();
    initDateTime();
    initNews();
    initCards();
    initGallery();
    initForm();
});