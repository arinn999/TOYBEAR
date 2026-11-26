// Data Produk Boneka (Gambar menggunakan SVG Data URI agar selalu tampil tanpa internet/broken link)
const products = [
  {
    id: 1,
    name: "Teddy Bear Cokelat Klasik",
    price: 125000,
    desc: "Boneka beruang cokelat super lembut ukuran 40cm dengan pita merah.",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23fceae8'/><circle cx='115' cy='60' r='22' fill='%238d5524'/><circle cx='185' cy='60' r='22' fill='%238d5524'/><circle cx='150' cy='95' r='45' fill='%23a86832'/><circle cx='135' cy='85' r='5' fill='%23222'/><circle cx='165' cy='85' r='5' fill='%23222'/><ellipse cx='150' cy='102' rx='14' ry='10' fill='%23e0ac69'/><circle cx='150' cy='98' r='5' fill='%23333'/><ellipse cx='150' cy='160' rx='40' ry='35' fill='%23a86832'/><polygon points='150,130 135,122 135,138' fill='%23ff4757'/><polygon points='150,130 165,122 165,138' fill='%23ff4757'/></svg>"
  },
  {
    id: 2,
    name: "Kelinci Pink Gemas",
    price: 95000,
    desc: "Boneka kelinci bertelinga panjang dengan bahan bulu halus premium.",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23fff0f5'/><ellipse cx='130' cy='50' rx='12' ry='40' fill='%23ffb6c1'/><ellipse cx='170' cy='50' rx='12' ry='40' fill='%23ffb6c1'/><circle cx='150' cy='100' r='42' fill='%23ffc0cb'/><circle cx='136' cy='92' r='5' fill='%23222'/><circle cx='164' cy='92' r='5' fill='%23222'/><circle cx='150' cy='104' r='4' fill='%23ff69b4'/><ellipse cx='150' cy='160' rx='36' ry='32' fill='%23ffc0cb'/></svg>"
  },
  {
    id: 3,
    name: "Panda Bambu Lucu",
    price: 110000,
    desc: "Boneka panda hitam putih yang menggemaskan, cocok untuk bantal tidur.",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23e8f8f5'/><circle cx='115' cy='60' r='20' fill='%232f3542'/><circle cx='185' cy='60' r='20' fill='%232f3542'/><circle cx='150' cy='95' r='45' fill='%23ffffff' stroke='%23dfe4ea' stroke-width='2'/><ellipse cx='134' cy='90' rx='11' ry='14' fill='%232f3542'/><ellipse cx='166' cy='90' rx='11' ry='14' fill='%232f3542'/><circle cx='134' cy='88' r='4' fill='%23fff'/><circle cx='166' cy='88' r='4' fill='%23fff'/><circle cx='150' cy='105' r='5' fill='%232f3542'/><ellipse cx='150' cy='160' rx='40' ry='35' fill='%232f3542'/></svg>"
  },
  {
    id: 4,
    name: "Bebek Kuning Mini",
    price: 75000,
    desc: "Boneka bebek kuning cerah dengan ekspresi lucu dan empuk dipeluk.",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23fef9e7'/><circle cx='150' cy='90' r='42' fill='%23ffd32a'/><circle cx='135' cy='82' r='5' fill='%23222'/><circle cx='165' cy='82' r='5' fill='%23222'/><ellipse cx='150' cy='98' rx='16' ry='8' fill='%23ff7f50'/><ellipse cx='150' cy='155' rx='42' ry='35' fill='%23ffd32a'/></svg>"
  }
];

// State Aplikasi
let cart = JSON.parse(localStorage.getItem('boneka_cart')) || [];
let currentUser = localStorage.getItem('boneka_user') || null;

// Elemen DOM
const productListEl = document.getElementById('productList');
const cartCountEl = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const authBtn = document.getElementById('authBtn');
const userGreeting = document.getElementById('userGreeting');

// Modal Elemen
const loginModal = document.getElementById('loginModal');
const cartModal = document.getElementById('cartModal');
const closeLogin = document.getElementById('closeLogin');
const closeCart = document.getElementById('closeCart');
const cartBtn = document.getElementById('cartBtn');
const loginForm = document.getElementById('loginForm');
const checkoutBtn = document.getElementById('checkoutBtn');

// Format Rupiah
function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// Render Katalog Produk
function renderProducts() {
  productListEl.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="product-price">${formatRupiah(product.price)}</div>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">
          + Tambah ke Keranjang
        </button>
      </div>
    `;
    productListEl.appendChild(card);
  });
}

// Tambah ke Keranjang
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveAndRenderCart();
  alert(`"${product.name}" berhasil ditambahkan ke keranjang!`);
}

// Ubah Jumlah Item di Keranjang
function updateQty(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveAndRenderCart();
}

// Hapus Item dari Keranjang
function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveAndRenderCart();
}

// Simpan & Render Keranjang
function saveAndRenderCart() {
  localStorage.setItem('boneka_cart', JSON.stringify(cart));
  
  // Update jumlah badge keranjang
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalQty;

  // Render daftar item di modal keranjang
  cartItemsEl.innerHTML = '';
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p style="text-align:center; color:#747d8c; padding:1rem;">Keranjang belanja masih kosong.</p>';
  } else {
    cart.forEach(item => {
      const subtotal = item.price * item.qty;
      totalPrice += subtotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${formatRupiah(item.price)} x ${item.qty} = ${formatRupiah(subtotal)}</p>
        </div>
        <div class="cart-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Hapus</button>
        </div>
      `;
      cartItemsEl.appendChild(itemEl);
    });
  }

  cartTotalEl.textContent = formatRupiah(totalPrice);
}

// Manajemen Login / Logout
function updateAuthUI() {
  if (currentUser) {
    userGreeting.textContent = `Halo, ${currentUser}!`;
    userGreeting.classList.remove('hidden');
    authBtn.textContent = 'Logout';
  } else {
    userGreeting.classList.add('hidden');
    authBtn.textContent = 'Login';
  }
}

authBtn.addEventListener('click', () => {
  if (currentUser) {
    // Proses Logout
    if (confirm('Apakah Anda yakin ingin logout?')) {
      currentUser = null;
      localStorage.removeItem('boneka_user');
      updateAuthUI();
    }
  } else {
    // Buka Modal Login
    loginModal.classList.remove('hidden');
  }
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById('username').value.trim();
  if (usernameInput) {
    currentUser = usernameInput;
    localStorage.setItem('boneka_user', currentUser);
    updateAuthUI();
    loginModal.classList.add('hidden');
    loginForm.reset();
    alert(`Selamat datang, ${currentUser}!`);
  }
});

// Fitur Checkout / Beli
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Keranjang Anda masih kosong. Pilih boneka terlebih dahulu!');
    return;
  }

  if (!currentUser) {
    alert('Anda harus LOGIN terlebih dahulu untuk menyelesaikan pembelian!');
    cartModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
    return;
  }

  const totalBayar = cartTotalEl.textContent;
  alert(`Terima kasih ${currentUser}!\nPesanan Anda sebesar ${totalBayar} berhasil diproses.\nBoneka kesayangan Anda akan segera dikirim! 🚚🧸`);
  
  // Kosongkan keranjang setelah berhasil beli
  cart = [];
  saveAndRenderCart();
  cartModal.classList.add('hidden');
});

// Kontrol Buka/Tutup Modal
cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));
closeLogin.addEventListener('click', () => loginModal.classList.add('hidden'));

window.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal.classList.add('hidden');
  if (e.target === cartModal) cartModal.classList.add('hidden');
});

// Inisialisasi saat halaman dimuat
renderProducts();
saveAndRenderCart();
updateAuthUI();
