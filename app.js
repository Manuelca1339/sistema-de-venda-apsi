const ADMIN_PASSWORD = "Passw0rd2020";
const SALES_CONTROL_PASSWORD = "Passw0rd2026";
const WHATSAPP_NUMBER = "245955403758";
const STORE_NAME = "APSI-PNB Tecnologia";
const STORE_LOGO = "texte.png";
const RECEIPT_LOGO = STORE_LOGO;
const DB_NAME = "apsi-store-database";
const DB_VERSION = 1;
const DB_STORE = "records";
const DATA_KEYS = ["products", "cart", "orders", "customer", "customers", "favorites", "settings", "isAdmin"];
const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
    <rect width="900" height="650" fill="#ece8dd"/>
    <rect x="120" y="105" width="660" height="440" rx="28" fill="#ffffff"/>
    <circle cx="320" cy="265" r="70" fill="#d8efe6"/>
    <path d="M190 485l170-170 120 118 86-86 144 138H190z" fill="#1c7c63"/>
    <text x="450" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#1d1d1b">Produto sem imagem</text>
  </svg>
`)}`;

const defaultProducts = [
  {
    id: "p1",
    sku: "CAT-1001",
    name: "Mochila urbana resistente",
    category: "Acessorios",
    price: 32500,
    stock: 12,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p2",
    sku: "CAT-1002",
    name: "Auriculares sem fios",
    category: "Tecnologia",
    price: 52000,
    stock: 8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p3",
    sku: "CAT-1003",
    name: "Garrafa termica inox",
    category: "Casa",
    price: 16000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p4",
    sku: "CAT-1004",
    name: "Camisola premium algodao",
    category: "Moda",
    price: 23000,
    stock: 15,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p5",
    sku: "CAT-1005",
    name: "Candeeiro de mesa LED",
    category: "Casa",
    price: 27500,
    stock: 6,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p6",
    sku: "CAT-1006",
    name: "Relogio minimalista",
    category: "Acessorios",
    price: 59000,
    stock: 5,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p7",
    sku: "CAT-1007",
    name: "Teclado mecanico compacto",
    category: "Tecnologia",
    price: 72000,
    stock: 9,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p8",
    sku: "CAT-1008",
    name: "Tapete de yoga antiderrapante",
    category: "Desporto",
    price: 19500,
    stock: 18,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p9",
    sku: "CAT-1009",
    name: "Oculos de sol polarizados",
    category: "Moda",
    price: 35500,
    stock: 11,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p10",
    sku: "CAT-1010",
    name: "Coluna bluetooth portatil",
    category: "Tecnologia",
    price: 42500,
    stock: 10,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p11",
    sku: "CAT-1011",
    name: "Conjunto de cafe ceramica",
    category: "Casa",
    price: 25000,
    stock: 14,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p12",
    sku: "CAT-1012",
    name: "Sapatilhas treino leve",
    category: "Desporto",
    price: 49000,
    stock: 7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
];

const state = {
  products: load("products", defaultProducts),
  cart: load("cart", []),
  orders: load("orders", []),
  customer: load("customer", null),
  customers: load("customers", []),
  favorites: load("favorites", []),
  settings: load("settings", { storeName: STORE_NAME, logoUrl: STORE_LOGO }),
  isAdmin: load("isAdmin", false),
  view: "store",
  salesControlUnlocked: false,
  scannerStream: null,
  scannerTimer: null,
};

if (state.customer && !state.customers.length) {
  state.customers = [{ ...state.customer, id: `cli-${Date.now()}` }];
  state.customer = state.customers[0];
}

const els = {
  productGrid: document.querySelector("#productGrid"),
  marqueeTrack: document.querySelector("#marqueeTrack"),
  categorySelect: document.querySelector("#categorySelect"),
  sortSelect: document.querySelector("#sortSelect"),
  favoritesOnly: document.querySelector("#favoritesOnly"),
  searchInput: document.querySelector("#searchInput"),
  cartCount: document.querySelector("#cartCount"),
  cartDrawer: document.querySelector("#cartDrawer"),
  openCart: document.querySelector("#openCart"),
  closeCart: document.querySelector("#closeCart"),
  closeCartBackdrop: document.querySelector("#closeCartBackdrop"),
  cartItems: document.querySelector("#cartItems"),
  cartSubtitle: document.querySelector("#cartSubtitle"),
  subtotal: document.querySelector("#subtotal"),
  shipping: document.querySelector("#shipping"),
  total: document.querySelector("#total"),
  checkoutForm: document.querySelector("#checkoutForm"),
  checkoutButton: document.querySelector("#checkoutButton"),
  whatsappCheckout: document.querySelector("#whatsappCheckout"),
  toast: document.querySelector("#toast"),
  navTabs: document.querySelectorAll(".nav-tab"),
  storeView: document.querySelector("#storeView"),
  aboutView: document.querySelector("#aboutView"),
  ordersView: document.querySelector("#ordersView"),
  salesControlView: document.querySelector("#salesControlView"),
  salesLock: document.querySelector("#salesLock"),
  salesControlContent: document.querySelector("#salesControlContent"),
  salesControlLogin: document.querySelector("#salesControlLogin"),
  salesControlPassword: document.querySelector("#salesControlPassword"),
  showSalesPassword: document.querySelector("#showSalesPassword"),
  ordersList: document.querySelector("#ordersList"),
  dailyCloseTotal: document.querySelector("#dailyCloseTotal"),
  dailyCloseMeta: document.querySelector("#dailyCloseMeta"),
  allSalesTotal: document.querySelector("#allSalesTotal"),
  allSalesCount: document.querySelector("#allSalesCount"),
  controlAverageTicket: document.querySelector("#controlAverageTicket"),
  monthlyChart: document.querySelector("#monthlyChart"),
  bestMonth: document.querySelector("#bestMonth"),
  salesTable: document.querySelector("#salesTable"),
  clearOrders: document.querySelector("#clearOrders"),
  customerForm: document.querySelector("#customerForm"),
  customerStatus: document.querySelector("#customerStatus"),
  customerId: document.querySelector("#customerId"),
  customerName: document.querySelector("#customerName"),
  customerPhone: document.querySelector("#customerPhone"),
  customerEmail: document.querySelector("#customerEmail"),
  customerDocument: document.querySelector("#customerDocument"),
  customerCity: document.querySelector("#customerCity"),
  customerDistrict: document.querySelector("#customerDistrict"),
  customerAddress: document.querySelector("#customerAddress"),
  customerPayment: document.querySelector("#customerPayment"),
  customerNotes: document.querySelector("#customerNotes"),
  customerSearch: document.querySelector("#customerSearch"),
  customerList: document.querySelector("#customerList"),
  useCustomerCheckout: document.querySelector("#useCustomerCheckout"),
  clearCustomer: document.querySelector("#clearCustomer"),
  todayRevenue: document.querySelector("#todayRevenue"),
  todayOrders: document.querySelector("#todayOrders"),
  productCount: document.querySelector("#productCount"),
  metricCart: document.querySelector("#metricCart"),
  metricFavorites: document.querySelector("#metricFavorites"),
  averageTicket: document.querySelector("#averageTicket"),
  scannerModal: document.querySelector("#scannerModal"),
  openScanner: document.querySelector("#openScanner"),
  closeScanner: document.querySelector("#closeScanner"),
  closeScannerBackdrop: document.querySelector("#closeScannerBackdrop"),
  startScanner: document.querySelector("#startScanner"),
  stopScanner: document.querySelector("#stopScanner"),
  scannerVideo: document.querySelector("#scannerVideo"),
  scannerNote: document.querySelector("#scannerNote"),
  manualCodeForm: document.querySelector("#manualCodeForm"),
  manualCode: document.querySelector("#manualCode"),
  helpModal: document.querySelector("#helpModal"),
  openHelp: document.querySelector("#openHelp"),
  closeHelp: document.querySelector("#closeHelp"),
  closeHelpBackdrop: document.querySelector("#closeHelpBackdrop"),
  helpWhatsapp: document.querySelector("#helpWhatsapp"),
  imageModal: document.querySelector("#imageModal"),
  imageModalImg: document.querySelector("#imageModalImg"),
  imageModalTitle: document.querySelector("#imageModalTitle"),
  imageModalCaption: document.querySelector("#imageModalCaption"),
  closeImageModal: document.querySelector("#closeImageModal"),
  closeImageBackdrop: document.querySelector("#closeImageBackdrop"),
  brand: document.querySelector(".brand"),
  brandName: document.querySelector("#brandName"),
  brandLogo: document.querySelector("#brandLogo"),
  openAdmin: document.querySelector("#openAdmin"),
  adminModal: document.querySelector("#adminModal"),
  closeAdmin: document.querySelector("#closeAdmin"),
  closeAdminBackdrop: document.querySelector("#closeAdminBackdrop"),
  adminLoginForm: document.querySelector("#adminLoginForm"),
  adminPassword: document.querySelector("#adminPassword"),
  adminArea: document.querySelector("#adminArea"),
  adminSubtitle: document.querySelector("#adminSubtitle"),
  logoutAdmin: document.querySelector("#logoutAdmin"),
  storeSettingsForm: document.querySelector("#storeSettingsForm"),
  storeNameInput: document.querySelector("#storeNameInput"),
  logoUrlInput: document.querySelector("#logoUrlInput"),
  logoFileInput: document.querySelector("#logoFileInput"),
  productForm: document.querySelector("#productForm"),
  productFormTitle: document.querySelector("#productFormTitle"),
  productId: document.querySelector("#productId"),
  productName: document.querySelector("#productName"),
  productCategory: document.querySelector("#productCategory"),
  productPrice: document.querySelector("#productPrice"),
  productStock: document.querySelector("#productStock"),
  productSku: document.querySelector("#productSku"),
  productImage: document.querySelector("#productImage"),
  productImageFile: document.querySelector("#productImageFile"),
  productPreview: document.querySelector("#productPreview"),
  productPreviewImage: document.querySelector("#productPreviewImage"),
  cancelProductEdit: document.querySelector("#cancelProductEdit"),
  newProduct: document.querySelector("#newProduct"),
  applyQuarterPromo: document.querySelector("#applyQuarterPromo"),
  endPromotions: document.querySelector("#endPromotions"),
  fillSku: document.querySelector("#fillSku"),
  clearProductImage: document.querySelector("#clearProductImage"),
  adminProducts: document.querySelector("#adminProducts"),
  categoryMenu: document.querySelector("#categoryMenu"),
  categorySuggestions: document.querySelector("#categorySuggestions"),
};

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  writeDbKey(key, value).catch(() => {});
}

function openDatabase() {
  if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB indisponivel"));

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.addEventListener("upgradeneeded", () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

async function readDbKey(key) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE, "readonly");
    const request = transaction.objectStore(DB_STORE).get(key);
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
    transaction.addEventListener("complete", () => db.close());
  });
}

async function writeDbKey(key, value) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE, "readwrite");
    transaction.objectStore(DB_STORE).put(value, key);
    transaction.addEventListener("complete", () => {
      db.close();
      resolve();
    });
    transaction.addEventListener("error", () => {
      db.close();
      reject(transaction.error);
    });
  });
}

async function hydrateFromDatabase() {
  try {
    const entries = await Promise.all(DATA_KEYS.map(async (key) => [key, await readDbKey(key)]));
    entries.forEach(([key, value]) => {
      if (value !== undefined) state[key] = value;
    });

    if (state.customer && !state.customers.length) {
      state.customers = [{ ...state.customer, id: `cli-${Date.now()}` }];
      state.customer = state.customers[0];
    }

    DATA_KEYS.forEach((key) => save(key, state[key]));
    persistAndRender();
  } catch {
    DATA_KEYS.forEach((key) => save(key, state[key]));
  }
}

function products() {
  return state.products.length ? state.products : defaultProducts;
}

function money(value) {
  return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value)} FCFA`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value).trim().toLowerCase().replace(/^qr-/, "");
}

function categoryIcon(category) {
  const value = normalize(category)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (value.includes("tecnologia")) return "⌘";
  if (value.includes("casa")) return "⌂";
  if (value.includes("moda")) return "◇";
  if (value.includes("desporto") || value.includes("esporte")) return "◉";
  if (value.includes("acessorio")) return "✦";
  if (value.includes("aliment") || value.includes("comida")) return "□";
  if (value.includes("beleza")) return "✧";
  return (String(category).trim()[0] || "?").toUpperCase();
}

function iconMarkup(category, className = "category-icon") {
  return `<span class="${className}" aria-hidden="true">${categoryIcon(category)}</span>`;
}

function productImage(product) {
  return product.image || FALLBACK_IMAGE;
}

function customerAddressLine(customer = state.customer) {
  if (!customer) return "";
  return [customer.address, customer.district, customer.city].filter(Boolean).join(", ");
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { subtotal, shipping: 0, total: subtotal };
}

function setupCategories() {
  els.categorySelect.innerHTML = '<option value="all">Todas</option>';
  const categories = [...new Set(products().map((product) => product.category))].sort();
  els.categorySuggestions.innerHTML = categories.map((category) => `<option value="${category}"></option>`).join("");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = `${categoryIcon(category)} ${category}`;
    els.categorySelect.append(option);
  });
  renderCategoryMenu(categories);
}

function renderCategoryMenu(categories) {
  if (!els.categoryMenu) return;

  const groups = categories.map((category) => {
    const items = products()
      .filter((product) => product.category === category)
      .slice(0, 4)
      .map((product) => `<button type="button" data-find="${product.id}">${product.name}</button>`)
      .join("");
    return `
      <div class="category-group">
        <strong>${iconMarkup(category)} ${category}</strong>
        <button type="button" data-category="${category}">Ver todos</button>
        ${items}
      </div>
    `;
  });

  els.categoryMenu.innerHTML = `
    <div class="category-group">
      <strong>${iconMarkup("Todas")} Todas as categorias</strong>
      <button type="button" data-category="all">Ver toda a loja</button>
    </div>
    ${groups.join("")}
  `;
}

function getRelated(product) {
  return products()
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);
}

function filteredProducts() {
  const query = normalize(els.searchInput.value);
  const category = els.categorySelect.value;
  const onlyFavorites = els.favoritesOnly?.checked ?? false;
  const filtered = products().filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query);
    const matchesFavorite = !onlyFavorites || state.favorites.includes(product.id);
    return matchesCategory && matchesSearch && matchesFavorite;
  });

  return filtered.sort((a, b) => {
    if (els.sortSelect.value === "priceAsc") return a.price - b.price;
    if (els.sortSelect.value === "priceDesc") return b.price - a.price;
    if (els.sortSelect.value === "stock") return b.stock - a.stock;
    return products().indexOf(a) - products().indexOf(b);
  });
}

function productCard(product) {
  const inCart = state.cart.find((item) => item.id === product.id);
  const remaining = product.stock - (inCart?.qty ?? 0);
  const hasPromo = Boolean(product.promotion?.active);

  return `
    <article class="product-card ${state.isAdmin ? "is-admin" : ""}">
      <button class="product-image-button" type="button" data-preview="${product.id}" aria-label="Visualizar imagem de ${product.name}">
        <img class="product-image" src="${productImage(product)}" alt="${product.name}" data-fallback="${FALLBACK_IMAGE}" />
      </button>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
        </div>
        <h3>${product.name}</h3>
        <div class="product-footer">
          <span class="price">${money(product.price)}</span>
          <div class="product-actions">
            <button class="order-button" type="button" data-add="${product.id}" ${remaining <= 0 ? "disabled" : ""}>
              <span class="whatsapp-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 3.2a8.6 8.6 0 0 0-7.3 13.1L3.6 20l3.8-1a8.6 8.6 0 1 0 4.6-15.8Zm0 1.8a6.8 6.8 0 0 1 0 13.6 6.7 6.7 0 0 1-3.5-1l-.4-.2-1.8.5.5-1.7-.3-.4A6.8 6.8 0 0 1 12 5Zm-2.4 3.6c-.2 0-.5.1-.7.4-.2.3-.8.8-.8 2 0 1.1.8 2.2.9 2.4.1.1 1.6 2.6 4 3.5 2 .8 2.4.6 2.8.6.4 0 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.6-.3-1.6-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a5.6 5.6 0 0 1-2.8-2.4c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.7c-.2-.5-.4-.5-.6-.5h-.5Z" />
                </svg>
              </span>
              Encomendar
            </button>
          </div>
        </div>
      </div>
      <div class="admin-card-actions">
        <button class="secondary-button" type="button" data-edit="${product.id}">Editar</button>
        ${hasPromo ? `<button class="secondary-button" type="button" data-remove-promo="${product.id}">Remover promocao</button>` : ""}
        <button class="danger-button" type="button" data-delete="${product.id}">Excluir</button>
      </div>
    </article>
  `;
}

function renderProducts() {
  const filtered = filteredProducts();
  els.productGrid.innerHTML = filtered.map(productCard).join("");

  if (filtered.length === 0) {
    els.productGrid.innerHTML = '<div class="empty-state">Nenhum produto encontrado.</div>';
  }
}

function renderMarquee() {
  const featured = [...products(), ...products()];
  els.marqueeTrack.innerHTML = featured
    .map(
      (product) => `
      <button class="marquee-card" type="button" data-add="${product.id}">
        <img src="${productImage(product)}" alt="${product.name}" data-fallback="${FALLBACK_IMAGE}" />
        <span>
          <strong>${product.name}</strong>
          <span>${money(product.price)} | CAT ${product.sku}</span>
        </span>
      </button>
    `,
    )
    .join("");
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totals = cartTotals();
  els.cartCount.textContent = itemCount;
  els.metricCart.textContent = itemCount;
  els.cartSubtitle.textContent = itemCount === 1 ? "1 item adicionado" : `${itemCount} itens adicionados`;
  els.subtotal.textContent = money(totals.subtotal);
  if (els.shipping) els.shipping.textContent = money(totals.shipping);
  els.total.textContent = money(totals.total);
  els.checkoutButton.disabled = itemCount === 0;

  if (state.cart.length === 0) {
    els.cartItems.innerHTML = '<div class="empty-state">O carrinho esta vazio.</div>';
    return;
  }

  els.cartItems.innerHTML = state.cart
    .map(
      (item) => `
      <article class="cart-item">
        <img src="${productImage(item)}" alt="${item.name}" data-fallback="${FALLBACK_IMAGE}" />
        <div>
          <h4>${item.name}</h4>
          <p>${money(item.price)} cada | CAT ${item.sku}</p>
          <div class="qty">
            <button type="button" data-dec="${item.id}" aria-label="Diminuir quantidade">-</button>
            <strong>${item.qty}</strong>
            <button type="button" data-inc="${item.id}" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <button class="remove-button" type="button" data-remove="${item.id}">Remover</button>
      </article>
    `,
    )
    .join("");
}

function renderOrders() {
  const today = new Date().toISOString().slice(0, 10);
  const todaysOrders = state.orders.filter((order) => order.createdAt.slice(0, 10) === today);
  const revenue = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  const average = state.orders.length ? state.orders.reduce((sum, order) => sum + order.total, 0) / state.orders.length : 0;

  if (els.todayRevenue) els.todayRevenue.textContent = money(revenue);
  if (els.todayOrders) els.todayOrders.textContent = `${todaysOrders.length} pedidos registados`;
  if (els.productCount) els.productCount.textContent = products().length;
  if (els.metricFavorites) els.metricFavorites.textContent = state.favorites.length;
  if (els.averageTicket) els.averageTicket.textContent = money(average);

  if (state.orders.length === 0) {
    els.ordersList.innerHTML = '<div class="empty-state">Ainda nao existem pedidos fechados.</div>';
    return;
  }

  els.ordersList.innerHTML = state.orders
    .map(
      (order) => `
      <article class="order-card">
        <div>
          <div class="order-card-head">
            <div>
              <span>${order.id}</span>
              <h3>${order.customer.name}</h3>
            </div>
            <strong>${order.status}</strong>
          </div>
          <p>${order.customer.phone || "Sem telefone"} | ${order.customer.email} | ${order.customer.payment} | ${order.status}</p>
          <p>${order.customer.address}</p>
          <p>${order.items.map((item) => `${item.qty}x ${item.name}`).join(", ")}</p>
          <p>${new Date(order.createdAt).toLocaleString("pt-PT")}</p>
        </div>
        <div class="order-side">
          <div class="order-total">${money(order.total)}</div>
          <button class="secondary-button" type="button" data-print-order="${order.id}">Imprimir recibo</button>
          ${
            state.isAdmin
              ? `<button class="danger-button" type="button" data-delete-order="${order.id}">Apagar venda</button>`
              : '<span class="order-lock">So administrador pode apagar</span>'
          }
        </div>
      </article>
    `,
    )
    .join("");
}

function monthlySalesTotals(year = new Date().getFullYear()) {
  const totals = Array.from({ length: 12 }, () => 0);
  state.orders.forEach((order) => {
    const date = new Date(order.createdAt);
    if (date.getFullYear() === year) {
      totals[date.getMonth()] += order.total;
    }
  });
  return totals;
}

function renderSalesControl() {
  if (!els.salesControlView) return;
  els.salesLock.classList.toggle("is-hidden", state.salesControlUnlocked);
  els.salesControlContent.classList.toggle("is-visible", state.salesControlUnlocked);

  const today = new Date().toISOString().slice(0, 10);
  const todaysOrders = state.orders.filter((order) => order.createdAt.slice(0, 10) === today);
  const dailyTotal = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  const allTotal = state.orders.reduce((sum, order) => sum + order.total, 0);
  const average = state.orders.length ? allTotal / state.orders.length : 0;
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const monthlyTotals = monthlySalesTotals();
  const bestIndex = monthlyTotals.indexOf(Math.max(...monthlyTotals));

  els.dailyCloseTotal.textContent = money(dailyTotal);
  els.dailyCloseMeta.textContent = `${todaysOrders.length} vendas registadas hoje`;
  els.allSalesTotal.textContent = money(allTotal);
  els.allSalesCount.textContent = `${state.orders.length} vendas registadas`;
  els.controlAverageTicket.textContent = money(average);
  els.bestMonth.textContent = monthlyTotals[bestIndex] > 0 ? `Melhor mes: ${months[bestIndex]}` : "Melhor mes: --";

  els.monthlyChart.innerHTML = monthlyTotals
    .map((total, index) => {
      const percent = allTotal > 0 ? (total / allTotal) * 100 : 0;
      const height = Math.max(percent, total > 0 ? 8 : 2);
      return `
        <div class="month-bar" tabindex="0" title="${months[index]}: ${percent.toFixed(1)}% | ${money(total)}">
          <div class="bar-track">
            <span style="height: ${height}%"></span>
          </div>
          <strong>${months[index]}</strong>
          <small>Progresso ${percent.toFixed(1)}%<br />${money(total)}</small>
        </div>
      `;
    })
    .join("");

  if (state.orders.length === 0) {
    els.salesTable.innerHTML = '<div class="empty-state">Ainda nao existem vendas registadas.</div>';
    return;
  }

  els.salesTable.innerHTML = `
    <div class="sales-table-head">
      <span>Data</span>
      <span>Cliente</span>
      <span>Pagamento</span>
      <span>Total</span>
    </div>
    ${state.orders
      .map(
        (order) => `
        <div class="sales-table-row">
          <span>${new Date(order.createdAt).toLocaleDateString("pt-PT")}</span>
          <strong>${escapeHtml(order.customer.name || "Cliente")}</strong>
          <span>${escapeHtml(order.customer.payment || "Sem pagamento")}</span>
          <b>${money(order.total)}</b>
        </div>
      `,
      )
      .join("")}
  `;
}

function renderCustomer() {
  const customer = state.customer;
  els.customerStatus.textContent = customer ? `Cliente: ${customer.name}` : "Nenhum cliente cadastrado";
  renderCustomerList();

  if (!customer) {
    if (els.customerId) els.customerId.value = "";
    return;
  }

  if (els.customerId) els.customerId.value = customer.id || "";
  els.customerName.value = customer.name || "";
  els.customerPhone.value = customer.phone || "";
  els.customerEmail.value = customer.email || "";
  els.customerDocument.value = customer.document || "";
  els.customerCity.value = customer.city || "";
  els.customerDistrict.value = customer.district || "";
  els.customerAddress.value = customer.address || "";
  els.customerPayment.value = customer.payment || "Dinheiro na entrega";
  els.customerNotes.value = customer.notes || "";
}

function customerSearchText(customer) {
  return [customer.name, customer.phone, customer.email, customer.document, customer.city, customer.district]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function renderCustomerList() {
  if (!els.customerList) return;

  const query = normalize(els.customerSearch?.value || "");
  const customers = state.customers
    .filter((customer) => !query || customerSearchText(customer).includes(query))
    .sort((a, b) => (b.updatedAt || b.createdAt || "").localeCompare(a.updatedAt || a.createdAt || ""));

  if (!customers.length) {
    els.customerList.innerHTML = '<div class="empty-state">Nenhum cliente encontrado.</div>';
    return;
  }

  els.customerList.innerHTML = customers
    .map(
      (customer) => `
        <article class="customer-row ${state.customer?.id === customer.id ? "is-active" : ""}">
          <div>
            <h4>${escapeHtml(customer.name || "Cliente")}</h4>
            <p>${escapeHtml(customer.phone || "Sem telefone")} | ${escapeHtml(customer.city || "Sem cidade")} | ${escapeHtml(customer.payment || "Sem metodo")}</p>
          </div>
          <div class="customer-row-actions">
            <button class="secondary-button" type="button" data-use-customer="${customer.id}">Usar</button>
            <button class="danger-button" type="button" data-delete-customer="${customer.id}">Remover</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function upsertCustomer(customer) {
  const now = new Date().toISOString();
  const id =
    customer.id ||
    state.customers.find(
      (item) =>
        (customer.phone && normalize(item.phone) === normalize(customer.phone)) ||
        (customer.email && normalize(item.email) === normalize(customer.email)) ||
        (customer.document && normalize(item.document) === normalize(customer.document)),
    )?.id ||
    `cli-${Date.now()}`;
  const saved = { ...customer, id, createdAt: customer.createdAt || now, updatedAt: now };

  state.customers = [saved, ...state.customers.filter((item) => item.id !== id)];
  state.customer = saved;
  return saved;
}

function selectCustomer(customerId) {
  const customer = state.customers.find((item) => item.id === customerId);
  if (!customer) return;
  state.customer = customer;
  persistAndRender();
  showToast("Cliente selecionado.");
}

function deleteCustomer(customerId) {
  const customer = state.customers.find((item) => item.id === customerId);
  if (!customer) return;
  const confirmed = window.confirm(`Remover "${customer.name}" do banco de clientes?`);
  if (!confirmed) return;

  state.customers = state.customers.filter((item) => item.id !== customerId);
  if (state.customer?.id === customerId) {
    state.customer = null;
    els.customerForm.reset();
    if (els.customerId) els.customerId.value = "";
  }
  persistAndRender();
  showToast("Cliente removido.");
}

function applyCustomerToCheckout() {
  if (!state.customer) {
    showToast("Cadastre um cliente primeiro.");
    switchView("orders");
    return false;
  }

  els.checkoutForm.elements.name.value = state.customer.name || "";
  els.checkoutForm.elements.email.value = state.customer.email || "";
  els.checkoutForm.elements.phone.value = state.customer.phone || "";
  els.checkoutForm.elements.address.value = customerAddressLine();
  els.checkoutForm.elements.payment.value = state.customer.payment || "Dinheiro na entrega";
  return true;
}

function addToCart(productId) {
  const product = products().find((item) => item.id === productId);
  if (!product) {
    showToast("Produto nao encontrado.");
    return;
  }

  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    if (existing.qty >= product.stock) {
      showToast("Stock maximo atingido.");
      return;
    }
    existing.qty += 1;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  persistAndRender();
  showToast(`${product.name} adicionado ao carrinho.`);
}

function addByCode(rawCode) {
  const code = normalize(rawCode);
  const product = products().find((item) => normalize(item.id) === code || normalize(item.sku) === code);
  if (!product) {
    showToast("Codigo sem produto associado.");
    return false;
  }
  addToCart(product.id);
  openCart();
  return true;
}

function changeQty(productId, delta) {
  const product = products().find((item) => item.id === productId);
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== productId);
  }
  if (item.qty > product.stock) {
    item.qty = product.stock;
    showToast("Stock maximo atingido.");
  }
  persistAndRender();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  persistAndRender();
}

function toggleFavorite(productId) {
  if (state.favorites.includes(productId)) {
    state.favorites = state.favorites.filter((id) => id !== productId);
  } else {
    state.favorites.push(productId);
  }
  persistAndRender();
}

function persistAndRender() {
  save("products", state.products);
  save("cart", state.cart);
  save("orders", state.orders);
  save("customer", state.customer);
  save("customers", state.customers);
  save("favorites", state.favorites);
  save("settings", state.settings);
  save("isAdmin", state.isAdmin);
  applyStoreSettings();
  setupCategories();
  renderMarquee();
  renderProducts();
  renderCart();
  renderOrders();
  renderSalesControl();
  renderCustomer();
  renderAdmin();
}

function openCart() {
  if (state.customer) applyCustomerToCheckout();
  els.cartDrawer.classList.add("is-open");
  els.cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  els.cartDrawer.classList.remove("is-open");
  els.cartDrawer.setAttribute("aria-hidden", "true");
}

function openScannerModal() {
  els.scannerModal.classList.add("is-open");
  els.scannerModal.setAttribute("aria-hidden", "false");
  els.manualCode.focus();
}

function closeScannerModal() {
  stopScanner();
  els.scannerModal.classList.remove("is-open");
  els.scannerModal.setAttribute("aria-hidden", "true");
}

function openHelpModal() {
  els.helpModal.classList.add("is-open");
  els.helpModal.setAttribute("aria-hidden", "false");
}

function closeHelpModal() {
  els.helpModal.classList.remove("is-open");
  els.helpModal.setAttribute("aria-hidden", "true");
}

function openImageModal(productId) {
  const product = products().find((item) => item.id === productId);
  if (!product) return;

  els.imageModalImg.src = productImage(product);
  els.imageModalImg.alt = product.name;
  els.imageModalImg.dataset.fallback = FALLBACK_IMAGE;
  els.imageModalTitle.textContent = product.name;
  els.imageModalCaption.textContent = `${product.category} | CAT ${product.sku}`;
  els.imageModal.classList.add("is-open");
  els.imageModal.setAttribute("aria-hidden", "false");
}

function closeImageModal() {
  els.imageModal.classList.remove("is-open");
  els.imageModal.setAttribute("aria-hidden", "true");
  els.imageModalImg.removeAttribute("src");
}

function openAdminModal() {
  els.adminModal.classList.add("is-open");
  els.adminModal.setAttribute("aria-hidden", "false");
  renderAdmin();
  if (!state.isAdmin) els.adminPassword.focus();
}

function closeAdminModal() {
  els.adminModal.classList.remove("is-open");
  els.adminModal.setAttribute("aria-hidden", "true");
}

async function startScanner() {
  if (!navigator.mediaDevices?.getUserMedia) {
    els.scannerNote.textContent = "Este navegador nao disponibiliza acesso a camera nesta pagina.";
    return;
  }

  try {
    state.scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    els.scannerVideo.srcObject = state.scannerStream;
    await els.scannerVideo.play();
    els.scannerNote.textContent = "Camera ligada. Aponte para QR ou codigo de barras com ID/CAT do produto.";

    if ("BarcodeDetector" in window) {
      const detector = new BarcodeDetector({
        formats: ["qr_code", "code_128", "code_39", "ean_13", "ean_8", "upc_a", "upc_e", "itf"],
      });
      state.scannerTimer = window.setInterval(async () => {
        const codes = await detector.detect(els.scannerVideo).catch(() => []);
        if (codes.length && addByCode(codes[0].rawValue)) {
          closeScannerModal();
        }
      }, 700);
    } else {
      els.scannerNote.textContent = "Camera ligada, mas este navegador nao tem leitura automatica. Use o campo de codigo manual.";
    }
  } catch {
    els.scannerNote.textContent = "Nao foi possivel ligar a camera. Autorize a permissao ou use o codigo manual.";
  }
}

function stopScanner() {
  window.clearInterval(state.scannerTimer);
  state.scannerTimer = null;
  state.scannerStream?.getTracks().forEach((track) => track.stop());
  state.scannerStream = null;
  els.scannerVideo.srcObject = null;
}

function switchView(view) {
  state.view = view;
  els.navTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === view));
  els.storeView.classList.toggle("is-visible", view === "store");
  els.aboutView?.classList.toggle("is-visible", view === "about");
  els.ordersView.classList.toggle("is-visible", view === "orders");
  els.salesControlView?.classList.toggle("is-visible", view === "salesControl");
  if (view === "salesControl") {
    renderSalesControl();
    if (!state.salesControlUnlocked) els.salesControlPassword.focus();
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
}

function applyStoreSettings() {
  state.settings = { storeName: STORE_NAME, logoUrl: STORE_LOGO };
  if (els.brandName) els.brandName.textContent = STORE_NAME;
  if (els.storeNameInput) els.storeNameInput.value = STORE_NAME;
  if (els.logoUrlInput) els.logoUrlInput.value = STORE_LOGO;
  if (els.brandLogo) els.brandLogo.src = STORE_LOGO;
  els.brand.classList.add("has-logo");
  els.openAdmin.classList.toggle("is-admin", state.isAdmin);
  els.openAdmin.textContent = state.isAdmin ? "Admin ativo" : "Administrador";
  els.clearOrders.disabled = !state.isAdmin;
  els.clearOrders.title = state.isAdmin ? "" : "Apenas o administrador pode limpar pedidos.";
}

function renderAdmin() {
  els.adminLoginForm.style.display = state.isAdmin ? "none" : "grid";
  els.adminArea.classList.toggle("is-visible", state.isAdmin);
  els.adminSubtitle.textContent = state.isAdmin
    ? "Modo administrador ativo. Pode alterar produtos, categorias e promocoes."
    : "Entre para alterar produtos, categorias e promocoes.";

  if (!state.isAdmin) {
    els.adminProducts.innerHTML = "";
    return;
  }

  els.adminProducts.innerHTML = products()
    .map(
      (product) => `
      <article class="admin-product-row">
        <img src="${productImage(product)}" alt="${product.name}" data-fallback="${FALLBACK_IMAGE}" />
        <div>
          <h4>${product.name}</h4>
          <p>${product.category} | CAT ${product.sku} | ${money(product.price)} | ${product.stock} em stock</p>
        </div>
        <div class="admin-tools">
          <button class="secondary-button" type="button" data-edit="${product.id}">Editar</button>
          ${product.promotion?.active ? `<button class="secondary-button" type="button" data-remove-promo="${product.id}">Remover promocao</button>` : ""}
          <button class="danger-button" type="button" data-delete="${product.id}">Excluir</button>
        </div>
      </article>
    `,
    )
    .join("");
}

function resetProductForm() {
  els.productForm.reset();
  els.productId.value = "";
  els.productImage.value = "";
  els.productImageFile.value = "";
  els.productFormTitle.textContent = "Novo produto";
  updateProductPreview();
}

function editProduct(productId) {
  if (!state.isAdmin) {
    showToast("Apenas o administrador pode alterar produtos.");
    return;
  }

  const product = products().find((item) => item.id === productId);
  if (!product) return;

  els.productId.value = product.id;
  els.productName.value = product.name;
  els.productCategory.value = product.category;
  els.productPrice.value = product.price;
  els.productStock.value = product.stock;
  els.productSku.value = product.sku;
  els.productImage.value = product.image || "";
  els.productFormTitle.textContent = `Editar ${product.name}`;
  updateProductPreview();
  openAdminModal();
}

function deleteProduct(productId) {
  if (!state.isAdmin) {
    showToast("Apenas o administrador pode excluir produtos.");
    return;
  }

  const product = products().find((item) => item.id === productId);
  if (!product) return;

  const confirmed = window.confirm(`Excluir "${product.name}" da loja?`);
  if (!confirmed) return;

  state.products = products().filter((item) => item.id !== productId);
  state.cart = state.cart.filter((item) => item.id !== productId);
  state.favorites = state.favorites.filter((id) => id !== productId);
  persistAndRender();
  showToast("Produto excluido.");
}

function deleteOrder(orderId) {
  if (!state.isAdmin) {
    showToast("Apenas o administrador pode apagar registros de venda.");
    return;
  }

  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;

  const confirmed = window.confirm(`Apagar o registro de venda ${order.id}? Use apenas em caso de fraude ou erro confirmado.`);
  if (!confirmed) return;

  state.orders = state.orders.filter((item) => item.id !== orderId);
  persistAndRender();
  showToast("Registro de venda apagado pelo administrador.");
}

function soldQuantityLastDays(productId, days = 90) {
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  return state.orders.reduce((total, order) => {
    if (new Date(order.createdAt).getTime() < since) return total;
    const sold = order.items.find((item) => item.id === productId);
    return total + (sold?.qty || 0);
  }, 0);
}

function applyQuarterPromotion() {
  if (!state.isAdmin) {
    showToast("Apenas o administrador pode aplicar promocao.");
    return;
  }

  const ranked = products()
    .map((product) => ({ product, qty: soldQuantityLastDays(product.id) }))
    .sort((a, b) => a.qty - b.qty || a.product.name.localeCompare(b.product.name));
  const promoCount = Math.max(1, Math.ceil(ranked.length * 0.25));
  const targets = ranked.slice(0, promoCount);
  const names = targets.map(({ product }) => product.name).join(", ");
  const confirmed = window.confirm(
    `Aplicar baixa de 10% nos produtos menos vendidos dos ultimos 3 meses?\n\nProdutos: ${names}`,
  );
  if (!confirmed) return;

  const targetIds = new Set(targets.map(({ product }) => product.id));
  state.products = products().map((product) => {
    if (!targetIds.has(product.id)) return product;
    const previousPrice = product.promotion?.originalPrice || product.price;
    const nextPrice = Math.max(Math.round(product.price * 0.9), 1);
    return {
      ...product,
      price: nextPrice,
      promotion: {
        active: true,
        originalPrice: previousPrice,
        discountPercent: 10,
        appliedAt: new Date().toISOString(),
        reason: "Produto menos vendido nos ultimos 3 meses",
      },
    };
  });
  persistAndRender();
  showToast("Promocao trimestral aplicada aos menos vendidos.");
}

function productWithoutPromotion(product) {
  if (!product.promotion?.active) return product;
  const restoredPrice = product.promotion.originalPrice || product.price;
  const { promotion, ...rest } = product;
  return { ...rest, price: restoredPrice };
}

function removeProductPromotion(productId) {
  if (!state.isAdmin) {
    showToast("Apenas o administrador pode remover promocao.");
    return;
  }

  const product = products().find((item) => item.id === productId);
  if (!product?.promotion?.active) {
    showToast("Este produto nao tem promocao ativa.");
    return;
  }

  const restored = productWithoutPromotion(product);
  state.products = products().map((item) => (item.id === productId ? restored : item));
  state.cart = state.cart.map((item) => (item.id === productId ? { ...restored, qty: item.qty } : item));
  persistAndRender();
  showToast("Promocao removida do produto.");
}

function endPromotions() {
  if (!state.isAdmin) {
    showToast("Apenas o administrador pode encerrar promocoes.");
    return;
  }

  const activeCount = products().filter((product) => product.promotion?.active).length;
  if (!activeCount) {
    showToast("Nao ha promocoes ativas.");
    return;
  }

  const confirmed = window.confirm(`Encerrar ${activeCount} promocao(oes) ativa(s) e restaurar os precos originais?`);
  if (!confirmed) return;

  state.products = products().map(productWithoutPromotion);
  state.cart = state.cart.map((item) => {
    const product = state.products.find((saved) => saved.id === item.id);
    return product ? { ...product, qty: item.qty } : item;
  });
  persistAndRender();
  showToast("Promocoes encerradas.");
}

function saveProduct(event) {
  event.preventDefault();
  if (!state.isAdmin) {
    showToast("Entre como administrador para guardar produtos.");
    return;
  }

  const id = els.productId.value || `p${Date.now()}`;
  const image = els.productImage.value.trim();

  if (!image) {
    showToast("Escolha uma imagem do produto ou cole um link.");
    return;
  }

  const skuExists = products().some((item) => item.id !== id && normalize(item.sku) === normalize(els.productSku.value));
  if (skuExists) {
    showToast("Ja existe outro produto com este CAT.");
    return;
  }

  const product = {
    id,
    sku: els.productSku.value.trim(),
    name: els.productName.value.trim(),
    category: els.productCategory.value.trim(),
    price: Number(els.productPrice.value),
    stock: Number(els.productStock.value),
    image,
  };

  if (els.productId.value) {
    state.products = products().map((item) => (item.id === id ? product : item));
    state.cart = state.cart.map((item) => (item.id === id ? { ...product, qty: item.qty } : item));
  } else {
    state.products.unshift(product);
  }

  resetProductForm();
  persistAndRender();
  showToast("Produto guardado.");
}

function updateProductPreview() {
  const image = els.productImage.value.trim();
  els.productPreviewImage.src = image || FALLBACK_IMAGE;
}

function generateSku() {
  const nextNumber = products().length + 1001;
  let sku = `CAT-${nextNumber}`;
  let step = 1;
  while (products().some((product) => normalize(product.sku) === normalize(sku))) {
    sku = `CAT-${nextNumber + step}`;
    step += 1;
  }
  els.productSku.value = sku;
}

function readProductImage(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = new Image();
    image.addEventListener("load", () => {
      const maxWidth = 900;
      const maxHeight = 700;
      const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * ratio);
      canvas.height = Math.round(image.height * ratio);
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      els.productImage.value = canvas.toDataURL("image/jpeg", 0.86);
      updateProductPreview();
      showToast("Imagem do produto carregada.");
    });
    image.addEventListener("error", () => {
      els.productImage.value = reader.result;
      updateProductPreview();
      showToast("Imagem carregada.");
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function buildWhatsappMessage() {
  const data = new FormData(els.checkoutForm);
  const totals = cartTotals();
  const items = state.cart.length
    ? state.cart.map((item) => `- ${item.qty}x ${item.name} (CAT ${item.sku}) = ${money(item.price * item.qty)}`).join("\n")
    : "- Ainda nao selecionei produtos";
  const name = data.get("name") || "Cliente";
  const email = data.get("email") || "Email nao informado";
  const phone = data.get("phone") || "Telefone nao informado";
  const address = data.get("address") || "Morada nao informada";
  const payment = data.get("payment") || "Pagamento nao escolhido";

  return [
    "Ola, quero confirmar o meu pedido:",
    "",
    items,
    "",
    `Subtotal: ${money(totals.subtotal)}`,
    `Total: ${money(totals.total)}`,
    "",
    `Nome: ${name}`,
    `Email: ${email}`,
    `Telefone: ${phone}`,
    `Morada: ${address}`,
    `Pagamento: ${payment}`,
  ].join("\n");
}

function openWhatsappConfirmation() {
  if (!state.cart.length) {
    showToast("Adicione produtos ao carrinho antes de confirmar pelo WhatsApp.");
    openCart();
    return;
  }

  const message = encodeURIComponent(buildWhatsappMessage());
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");
}

function buildOrderFromCheckout() {
  const data = new FormData(els.checkoutForm);
  const totals = cartTotals();

  return {
    id: `PED-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customer: {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      payment: data.get("payment"),
      document: state.customer?.document || "",
      city: state.customer?.city || "",
      district: state.customer?.district || "",
      notes: state.customer?.notes || "",
    },
    items: state.cart.map((item) => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    status: "Recebido",
  };
}

function receiptHtml(order) {
  const logo = state.settings.logoUrl || RECEIPT_LOGO;
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.qty)}</td>
          <td>${money(item.price)}</td>
          <td>${money(item.price * item.qty)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <!doctype html>
    <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <base href="${escapeHtml(document.baseURI)}" />
        <title>Recibo ${escapeHtml(order.id)}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 28px;
            font-family: Arial, sans-serif;
            color: #111827;
            background: #f3f6fb;
          }
          .receipt {
            max-width: 820px;
            margin: 0 auto;
            padding: 28px;
            border: 1px solid #d8e2ef;
            border-radius: 10px;
            background: white;
          }
          .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            border-bottom: 4px solid #0b56ad;
            padding-bottom: 18px;
          }
          .head img {
            max-width: 190px;
            max-height: 82px;
            object-fit: contain;
          }
          h1 { margin: 0; color: #0b4186; font-size: 28px; }
          .meta, .customer { margin-top: 18px; display: grid; gap: 6px; }
          table { width: 100%; margin-top: 22px; border-collapse: collapse; }
          th {
            background: #e9f5ff;
            color: #0b4186;
            text-align: left;
          }
          th, td { border: 1px solid #d8e2ef; padding: 10px; }
          .total {
            margin-top: 18px;
            text-align: right;
            font-size: 24px;
            font-weight: 800;
            color: #0b4186;
          }
          .foot {
            margin-top: 26px;
            border-top: 1px solid #d8e2ef;
            padding-top: 14px;
            color: #4b5563;
            font-size: 13px;
            text-align: center;
          }
          .actions { margin: 18px auto 0; max-width: 820px; text-align: center; }
          .actions button {
            border: 0;
            border-radius: 8px;
            padding: 12px 18px;
            background: #0b56ad;
            color: white;
            font-weight: 800;
            cursor: pointer;
          }
          @media print {
            body { padding: 0; background: white; }
            .receipt { border: 0; border-radius: 0; max-width: none; }
            .actions { display: none; }
          }
        </style>
      </head>
      <body>
        <main class="receipt">
          <div class="head">
            <img src="${escapeHtml(logo)}" alt="APSI-PNB Tecnologia" />
            <div>
              <h1>Recibo / Fatura</h1>
              <strong>${escapeHtml(order.id)}</strong>
            </div>
          </div>
          <section class="meta">
            <span>Data: ${new Date(order.createdAt).toLocaleString("pt-PT")}</span>
            <span>Pagamento: ${escapeHtml(order.customer.payment)}</span>
            <span>Estado: ${escapeHtml(order.status)}</span>
          </section>
          <section class="customer">
            <strong>Cliente</strong>
            <span>${escapeHtml(order.customer.name)}</span>
            <span>${escapeHtml(order.customer.phone || "Sem telefone")} | ${escapeHtml(order.customer.email || "Sem email")}</span>
            <span>${escapeHtml(order.customer.address || "Sem morada")}</span>
          </section>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preco</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="total">Total: ${money(order.total)}</div>
          <div class="foot">APSI-PNB Tecnologia - Obrigado pela preferencia.</div>
        </main>
        <div class="actions">
          <button onclick="window.print()">Imprimir ou salvar em PDF</button>
        </div>
        <script>
          window.addEventListener("load", () => setTimeout(() => window.print(), 350));
        </script>
      </body>
    </html>
  `;
}

function printReceipt(order) {
  const receiptWindow = window.open("", "_blank");
  if (!receiptWindow) {
    showToast("Permita pop-ups para imprimir o recibo.");
    return;
  }

  receiptWindow.document.open();
  receiptWindow.document.write(receiptHtml(order));
  receiptWindow.document.close();
}

function printDailyClose() {
  const today = new Date().toISOString().slice(0, 10);
  const todaysOrders = state.orders.filter((order) => order.createdAt.slice(0, 10) === today);
  const total = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  const rows = todaysOrders
    .map(
      (order) => `
        <tr>
          <td>${new Date(order.createdAt).toLocaleTimeString("pt-PT")}</td>
          <td>${escapeHtml(order.id)}</td>
          <td>${escapeHtml(order.customer.name || "Cliente")}</td>
          <td>${escapeHtml(order.customer.payment || "Sem pagamento")}</td>
          <td>${money(order.total)}</td>
        </tr>
      `,
    )
    .join("");
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showToast("Permita pop-ups para imprimir o fecho diario.");
    return;
  }

  reportWindow.document.open();
  reportWindow.document.write(`
    <!doctype html>
    <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <base href="${escapeHtml(document.baseURI)}" />
        <title>Fecho diario ${today}</title>
        <style>
          body { margin: 0; padding: 28px; font-family: Arial, sans-serif; color: #111827; }
          .box { max-width: 900px; margin: 0 auto; }
          .head { display: flex; justify-content: space-between; gap: 20px; border-bottom: 4px solid #0b56ad; padding-bottom: 18px; }
          img { max-width: 180px; max-height: 74px; object-fit: contain; }
          h1 { margin: 0; color: #0b4186; }
          table { width: 100%; margin-top: 22px; border-collapse: collapse; }
          th { background: #e9f5ff; color: #0b4186; text-align: left; }
          th, td { border: 1px solid #d8e2ef; padding: 10px; }
          .total { margin-top: 20px; text-align: right; font-size: 26px; font-weight: 800; color: #0b4186; }
          button { margin-top: 20px; border: 0; border-radius: 8px; padding: 12px 18px; background: #0b56ad; color: white; font-weight: 800; }
          @media print { button { display: none; } body { padding: 0; } }
        </style>
      </head>
      <body>
        <main class="box">
          <div class="head">
            <img src="${escapeHtml(state.settings.logoUrl || RECEIPT_LOGO)}" alt="APSI-PNB Tecnologia" />
            <div>
              <h1>Fecho de caixa diario</h1>
              <strong>${new Date().toLocaleDateString("pt-PT")}</strong>
            </div>
          </div>
          <table>
            <thead>
              <tr><th>Hora</th><th>Venda</th><th>Cliente</th><th>Pagamento</th><th>Total</th></tr>
            </thead>
            <tbody>${rows || '<tr><td colspan="5">Sem vendas registadas hoje.</td></tr>'}</tbody>
          </table>
          <div class="total">Total do dia: ${money(total)}</div>
          <button onclick="window.print()">Imprimir ou salvar em PDF</button>
        </main>
        <script>window.addEventListener("load", () => setTimeout(() => window.print(), 350));</script>
      </body>
    </html>
  `);
  reportWindow.document.close();
}

function checkout(event) {
  event.preventDefault();
  if (state.cart.length === 0) return;

  const order = buildOrderFromCheckout();
  upsertCustomer({
    ...state.customer,
    name: order.customer.name,
    email: order.customer.email,
    phone: order.customer.phone,
    address: order.customer.address,
    payment: order.customer.payment,
  });

  state.orders.unshift(order);
  state.products = products().map((product) => {
    const sold = order.items.find((item) => item.id === product.id);
    return sold ? { ...product, stock: Math.max(product.stock - sold.qty, 0) } : product;
  });
  state.cart = [];
  els.checkoutForm.reset();
  persistAndRender();
  closeCart();
  switchView("orders");
  printReceipt(order);
  showToast(`Venda ${order.id} registada. Recibo pronto para PDF.`);
}

document.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  const fav = event.target.closest("[data-fav]");
  const edit = event.target.closest("[data-edit]");
  const del = event.target.closest("[data-delete]");
  const removePromo = event.target.closest("[data-remove-promo]");
  const category = event.target.closest("[data-category]");
  const find = event.target.closest("[data-find]");
  const preview = event.target.closest("[data-preview]");
  const deleteOrderButton = event.target.closest("[data-delete-order]");
  const printOrderButton = event.target.closest("[data-print-order]");
  const printDailyCloseButton = event.target.closest("[data-print-daily-close]");
  const useCustomerButton = event.target.closest("[data-use-customer]");
  const deleteCustomerButton = event.target.closest("[data-delete-customer]");
  if (add) addToCart(add.dataset.add);
  if (fav) toggleFavorite(fav.dataset.fav);
  if (edit) editProduct(edit.dataset.edit);
  if (del) deleteProduct(del.dataset.delete);
  if (removePromo) removeProductPromotion(removePromo.dataset.removePromo);
  if (preview) openImageModal(preview.dataset.preview);
  if (deleteOrderButton) deleteOrder(deleteOrderButton.dataset.deleteOrder);
  if (useCustomerButton) selectCustomer(useCustomerButton.dataset.useCustomer);
  if (deleteCustomerButton) deleteCustomer(deleteCustomerButton.dataset.deleteCustomer);
  if (printOrderButton) {
    const order = state.orders.find((item) => item.id === printOrderButton.dataset.printOrder);
    if (order) printReceipt(order);
  }
  if (printDailyCloseButton) printDailyClose();
  if (category) {
    els.categorySelect.value = category.dataset.category;
    els.searchInput.value = "";
    renderProducts();
  }
  if (find) {
    const product = products().find((item) => item.id === find.dataset.find);
    if (product) {
      els.categorySelect.value = "all";
      els.searchInput.value = product.name;
      renderProducts();
    }
  }
});

document.addEventListener(
  "error",
  (event) => {
    const image = event.target;
    if (image instanceof HTMLImageElement && image.dataset.fallback && image.src !== image.dataset.fallback) {
      image.src = image.dataset.fallback;
    }
  },
  true,
);

els.cartItems.addEventListener("click", (event) => {
  const inc = event.target.closest("[data-inc]");
  const dec = event.target.closest("[data-dec]");
  const remove = event.target.closest("[data-remove]");
  if (inc) changeQty(inc.dataset.inc, 1);
  if (dec) changeQty(dec.dataset.dec, -1);
  if (remove) removeFromCart(remove.dataset.remove);
});

els.searchInput.addEventListener("input", renderProducts);
els.categorySelect.addEventListener("change", renderProducts);
els.sortSelect.addEventListener("change", renderProducts);
els.favoritesOnly?.addEventListener("change", renderProducts);
els.openCart.addEventListener("click", openCart);
els.closeCart.addEventListener("click", closeCart);
els.closeCartBackdrop.addEventListener("click", closeCart);
els.checkoutForm.addEventListener("submit", checkout);
els.whatsappCheckout.addEventListener("click", openWhatsappConfirmation);
els.navTabs.forEach((tab) => tab.addEventListener("click", () => switchView(tab.dataset.view)));
els.salesControlLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  if (els.salesControlPassword.value !== SALES_CONTROL_PASSWORD) {
    showToast("Senha do controle de vendas incorreta.");
    return;
  }
  state.salesControlUnlocked = true;
  els.salesControlPassword.value = "";
  renderSalesControl();
  showToast("Controle de vendas liberado.");
});
els.showSalesPassword.addEventListener("change", () => {
  els.salesControlPassword.type = els.showSalesPassword.checked ? "text" : "password";
});
els.openScanner.addEventListener("click", openScannerModal);
els.closeScanner.addEventListener("click", closeScannerModal);
els.closeScannerBackdrop.addEventListener("click", closeScannerModal);
els.startScanner.addEventListener("click", startScanner);
els.stopScanner.addEventListener("click", stopScanner);
els.openHelp.addEventListener("click", openHelpModal);
els.closeHelp.addEventListener("click", closeHelpModal);
els.closeHelpBackdrop.addEventListener("click", closeHelpModal);
els.helpWhatsapp.addEventListener("click", openWhatsappConfirmation);
els.closeImageModal.addEventListener("click", closeImageModal);
els.closeImageBackdrop.addEventListener("click", closeImageModal);
els.openAdmin.addEventListener("click", openAdminModal);
els.closeAdmin.addEventListener("click", closeAdminModal);
els.closeAdminBackdrop.addEventListener("click", closeAdminModal);
els.adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (els.adminPassword.value !== ADMIN_PASSWORD) {
    showToast("Senha de administrador incorreta.");
    return;
  }
  state.isAdmin = true;
  els.adminPassword.value = "";
  persistAndRender();
  showToast("Administrador ativo.");
});
els.logoutAdmin.addEventListener("click", () => {
  state.isAdmin = false;
  resetProductForm();
  persistAndRender();
  showToast("Saiu do modo administrador.");
});
els.storeSettingsForm?.addEventListener("submit", (event) => event.preventDefault());
els.productForm.addEventListener("submit", saveProduct);
els.productImage.addEventListener("input", updateProductPreview);
els.productImageFile.addEventListener("change", () => readProductImage(els.productImageFile.files[0]));
els.fillSku.addEventListener("click", generateSku);
els.applyQuarterPromo.addEventListener("click", applyQuarterPromotion);
els.endPromotions.addEventListener("click", endPromotions);
els.clearProductImage.addEventListener("click", () => {
  els.productImage.value = "";
  els.productImageFile.value = "";
  updateProductPreview();
});
els.cancelProductEdit.addEventListener("click", resetProductForm);
els.newProduct.addEventListener("click", resetProductForm);
els.customerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const customer = upsertCustomer({
    id: els.customerId?.value || "",
    name: els.customerName.value.trim(),
    phone: els.customerPhone.value.trim(),
    email: els.customerEmail.value.trim(),
    document: els.customerDocument.value.trim(),
    city: els.customerCity.value.trim(),
    district: els.customerDistrict.value.trim(),
    address: els.customerAddress.value.trim(),
    payment: els.customerPayment.value,
    notes: els.customerNotes.value.trim(),
  });
  persistAndRender();
  applyCustomerToCheckout();
  showToast(`Cliente ${customer.name} guardado no banco.`);
});
els.customerSearch?.addEventListener("input", renderCustomerList);
els.useCustomerCheckout.addEventListener("click", () => {
  if (applyCustomerToCheckout()) {
    openCart();
    showToast("Dados do cliente aplicados no checkout.");
  }
});
els.clearCustomer.addEventListener("click", () => {
  state.customer = null;
  els.customerForm.reset();
  if (els.customerId) els.customerId.value = "";
  persistAndRender();
  showToast("Selecao de cliente limpa.");
});
els.manualCodeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (addByCode(els.manualCode.value)) {
    els.manualCode.value = "";
    closeScannerModal();
  }
});
els.clearOrders.addEventListener("click", () => {
  if (!state.isAdmin) {
    showToast("Apenas o administrador pode limpar pedidos.");
    return;
  }
  if (!state.orders.length) return;
  state.orders = [];
  persistAndRender();
  showToast("Pedidos limpos.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.imageModal.classList.contains("is-open")) {
    closeImageModal();
  }
});

persistAndRender();
hydrateFromDatabase();
