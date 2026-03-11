// ================== НАВИГАЦИЯ МЕЖДУ СТРАНИЦАМИ ==================
const pages = {
  home: document.getElementById("page-home"),
  about: document.getElementById("page-about"),
  services: document.getElementById("page-services"),
  blog: document.getElementById("page-blog"),
  contact: document.getElementById("page-contact")
};

const navItems = document.querySelectorAll(".nav-item");

function setActivePage(pageId) {
  // Скрыть все страницы
  Object.values(pages).forEach((p) => p.classList.remove("active-page"));

  // Показать нужную
  if (pages[pageId]) pages[pageId].classList.add("active-page");

  // Обновить active класс в меню
  navItems.forEach((item) => {
    if (item.dataset.page === pageId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // ⭐ СОБЫТИЕ: navigation_click - отслеживание переходов по меню
  if (typeof gtag !== "undefined") {
    gtag("event", "navigation_click", {
      target_page: pageId,
      page_title: document.title
    });
    console.log("✅ Событие navigation_click отправлено:", pageId);
  }
}

// Функция для открытия Telegram бота
function openTelegramBot() {
  // Отправляем событие в Google Analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "telegram_bot_click", {
      bot_username: "compass_books_bot",
      action: "open_bot"
    });
    console.log("✅ Событие telegram_bot_click отправлено");
  }
  
  // Открываем Telegram бота
  window.open("https://t.me/compass_books_bot", "_blank");
}

// Обработчики кликов по пунктам меню
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const pageId = item.dataset.page;
    if (pageId) {
      setActivePage(pageId);
      window.location.hash = pageId;
    }
  });
});

// При загрузке проверяем hash
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && pages[hash]) {
    setActivePage(hash);
  } else {
    setActivePage("home");
  }
  console.log("👋 Book Compass готов. GA4 интегрирован с ID: G-1RLF0NBYZE");
  console.log("📊 Отслеживаются события: category_click, blog_click, contact_click, navigation_click, telegram_bot_click");
  console.log("🤖 Telegram бот: @compass_books_bot (в разработке)");
});
