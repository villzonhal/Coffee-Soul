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
                document.getElementById('modalFullText').innerHTML = '<p>' + news.full + '</p><img src="' + news.img + '" style="width:100%; border-radius:20px; margin-top:1rem">';
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

// ========== СЛАЙДЕР ГАЛЕРЕИ ==========
function initGallerySlider() {
    const slides = [
        { image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1800&auto=format&fit=crop", title: "Авторский кофе", text: "Свежая обжарка, уютная атмосфера и любовь к деталям." },
        { image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1800&auto=format&fit=crop", title: "Идеальный латте", text: "Каждая чашка готовится профессиональным бариста." },
        { image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1800&auto=format&fit=crop", title: "Атмосфера Coffee Soul", text: "Место для отдыха, общения и вдохновения." },
        { image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1800&auto=format&fit=crop", title: "Свежая выпечка", text: "Круассаны и десерты идеально дополняют кофе." }
    ];

    const imgEl = document.getElementById('galleryImage');
    const headingEl = document.getElementById('galleryHeading');
    const textEl = document.getElementById('galleryText');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!imgEl) return;

    let currentSlide = 0;
    let autoPlayInterval;

    function updateSlide(index) {
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgEl.src = slides[index].image;
            headingEl.textContent = slides[index].title;
            textEl.textContent = slides[index].text;
            imgEl.style.opacity = 1;
        }, 200);

        progressBar.style.animation = 'none';
        void progressBar.offsetWidth;
        progressBar.style.animation = 'progress 5s linear infinite';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
    });

    const slider = document.querySelector('.gallery-slider');
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    updateSlide(0);
    startAutoPlay();
}

// ========== КАРТА КОНТАКТОВ ==========
function initContactMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const coffeeCoords = [58.016638, 55.965716];
    let userPlacemark, accuracyCircle;
    let map = new ymaps.Map("map", {
        center: coffeeCoords,
        zoom: 16,
        controls: ["zoomControl", "geolocationControl"]
    });

    const coffeePlacemark = new ymaps.Placemark(coffeeCoords, {
        hintContent: "Coffee Soul",
        balloonContent: "Coffee Soul, г. Пермь, ул. Магистральная, 89/2"
    }, { preset: "islands#redIcon" });
    map.geoObjects.add(coffeePlacemark);

    function setStatus(text, type) {
        const el = document.getElementById('geoText');
        if (el) {
            el.textContent = text;
            el.className = 'geo-status ' + type;
        }
    }

    document.getElementById('findMeBtn')?.addEventListener('click', () => {
        if (!navigator.geolocation) {
            setStatus("Геолокация не поддерживается", "error");
            return;
        }
        setStatus("Определяем местоположение...", "info");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                const userCoords = [lat, lon];

                if (accuracy > 2000) {
                    setStatus("Нет точного GPS сигнала", "error");
                    map.setCenter(coffeeCoords, 15);
                    return;
                }

                if (userPlacemark) map.geoObjects.remove(userPlacemark);
                if (accuracyCircle) map.geoObjects.remove(accuracyCircle);

                userPlacemark = new ymaps.Placemark(userCoords, {
                    hintContent: "Вы здесь",
                    balloonContent: "Ваше местоположение"
                }, { preset: "islands#blueCircleDotIcon" });

                accuracyCircle = new ymaps.Circle([userCoords, accuracy], {}, {
                    fillColor: "#1e88e5", fillOpacity: 0.15,
                    strokeColor: "#1e88e5", strokeWidth: 2
                });

                map.geoObjects.add(userPlacemark);
                map.geoObjects.add(accuracyCircle);

                const bounds = ymaps.util.bounds.fromPoints([coffeeCoords, userCoords]);
                map.setBounds(bounds, { zoomMargin: 80, checkZoomRange: true });
                setStatus("Вы определены (точность ~" + Math.round(accuracy) + " м)", "success");
            },
            () => {
                setStatus("Не удалось получить геолокацию", "error");
                map.setCenter(coffeeCoords, 16);
            },
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
        );
    });

    setStatus("Готово. Нажмите кнопку Найти меня", "info");
}

// ========== ФОРМА ==========
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
    initGallerySlider();
    // Карта инициализируется только после загрузки API Яндекс.Карт
    if (document.getElementById('map')) {
        ymaps.ready(initContactMap);
    }
    initForm();
});
