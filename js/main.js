
const details = {
  elbrus: {
    category: "Горы и природа",
    title: "Эльбрус и Приэльбрусье",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    text: "Эльбрус — самая высокая гора России. Приэльбрусье привлекает путешественников горными пейзажами, маршрутами и возможностью познакомиться с природой высокогорья. Перед поездкой уточните состояние дорог, погоду, режим работы канатных дорог и требования безопасности."
  },
  chegem: {
    category: "Природные достопримечательности",
    title: "Чегемские водопады",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1000&q=80",
    text: "Чегемские водопады — популярное направление для знакомства с горной природой Кабардино-Балкарии. Поездку можно совместить с осмотром Чегемского ущелья. Доступность отдельных участков зависит от сезона и дорожных условий."
  },
  lakes: {
    category: "Озёра и природа",
    title: "Голубые озёра",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80",
    text: "Голубые озёра расположены в Черекском районе. Это известный природный комплекс с необычным цветом воды и горными пейзажами. Соблюдайте правила посещения и не загрязняйте территорию."
  },
  balkaria: {
    category: "История и горы",
    title: "Верхняя Балкария",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=80",
    text: "Верхняя Балкария известна горными ландшафтами, историческими поселениями и башенными сооружениями. Это направление позволяет познакомиться с историей и культурным наследием балкарского народа. Уточняйте дорожные условия перед поездкой."
  },
  nalchik: {
    category: "Городской отдых",
    title: "Парки и прогулки Нальчика",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    text: "В Нальчике можно планировать прогулки по зелёным зонам, знакомиться с городскими достопримечательностями и культурными учреждениями. Для полноценного справочника здесь можно будет разместить отдельные карточки парков, музеев и мест отдыха с адресами и актуальными часами работы."
  },
  aushiger: {
    category: "Отдых",
    title: "Термальные источники Аушигера",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80",
    text: "Аушигер известен термальными источниками и местами отдыха. Перед посещением конкретного комплекса уточните условия доступа, стоимость, график работы и правила использования бассейнов."
  },
  khychin: {
    category: "Национальная кухня",
    title: "Где попробовать хычины",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    text: "Хычины — одно из известных блюд балкарской кухни. В будущем этот раздел будет содержать реальные карточки кафе и ресторанов, адреса, фотографии блюд, ценовой диапазон и ссылки на карты. Перед публикацией сведения о заведениях необходимо проверить."
  },
  restaurants: {
    category: "Кафе и рестораны",
    title: "Где поесть в Нальчике",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    text: "Здесь будет собран каталог заведений Нальчика: кафе, рестораны, места с национальной кухней и семейные заведения. В карточках можно указать подтверждённый адрес, примерный бюджет, часы работы и ссылку на карту."
  },
  mountainfood: {
    category: "Путешествия",
    title: "Где поесть в горах",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80",
    text: "При планировании горной поездки заранее проверьте, где расположены кафе и магазины по пути, какие заведения работают в нужный сезон и доступны ли они с вашего маршрута. В каталоге будут собраны проверенные варианты."
  }
};

const modal = document.getElementById("detailsModal");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const searchInput = document.getElementById("searchInput");
const cards = [...document.querySelectorAll(".searchable")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";
let currentQuery = "";

function normalize(value) {
  return value.toLocaleLowerCase("ru").trim();
}

function filterCards() {
  let visible = 0;

  cards.forEach(card => {
    const text = normalize(
      (card.dataset.title || "") + " " +
      card.innerText + " " +
      (card.dataset.category || "")
    );

    const category = (card.dataset.category || "").split(/\s+/);
    const matchesQuery = !currentQuery || text.includes(currentQuery);
    const matchesFilter = activeFilter === "all" ||
      category.includes(activeFilter);

    const show = matchesQuery && matchesFilter;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });

  emptyState.style.display = visible ? "none" : "block";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    filterCards();
  });
});

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  currentQuery = normalize(searchInput.value);
  activeFilter = "all";

  filterButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === "all");
  });

  filterCards();

  document.getElementById("places").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

searchInput.addEventListener("input", () => {
  currentQuery = normalize(searchInput.value);
  filterCards();
});

document.getElementById("resetSearch").addEventListener("click", () => {
  currentQuery = "";
  activeFilter = "all";
  searchInput.value = "";

  filterButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === "all");
  });

  filterCards();
});

function openDetails(key) {
  const item = details[key];
  if (!item) return;

  document.getElementById("modalCategory").textContent = item.category;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalText").textContent = item.text;

  const image = document.getElementById("modalImage");
  image.src = item.image;
  image.alt = item.title;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

function closeDetails() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-detail]").forEach(button => {
  button.addEventListener("click", () => {
    openDetails(button.dataset.detail);
  });
});

document.getElementById("modalClose").addEventListener("click", closeDetails);
document.getElementById("modalDone").addEventListener("click", closeDetails);

modal.addEventListener("click", event => {
  if (event.target === modal) closeDetails();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDetails();
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

