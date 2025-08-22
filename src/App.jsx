import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Instagram,
  MessageCircle,
  MapPin,
  User,
} from "lucide-react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState("home");

  const t = {
    home: "Home",
    games: "Games",
    apps: "Applications",
    about: "About Us",
    search: "Search...",
    addToCart: "Add to Cart",
    cart: "Cart",
    checkout: "Checkout via WhatsApp",
    price: "Price",
    quantity: "Quantity",
    total: "Total",
    aboutText: "HISTA STORE is a website for charging games and applications.",
    contactInfo: "Contact me via:",
    location: "Tripoli, Libya",
  };

  // Sample products data
  const products = [
    {
      id: 1,
      name: "FIFA 24",
      price: 144,
      image: "/api/placeholder/300/200",
      category: "games",
      description: "Latest FIFA football game",
    },
    {
      id: 2,
      name: "Call of Duty",
      price: 168,
      image: "/api/placeholder/300/200",
      category: "games",
      description: "Action-packed shooter game",
    },
    {
      id: 3,
      name: "Adobe Photoshop",
      price: 72,
      image: "/api/placeholder/300/200",
      category: "apps",
      description: "Professional photo editing software",
    },
    {
      id: 4,
      name: "Microsoft Office",
      price: 360,
      image: "/api/placeholder/300/200",
      category: "apps",
      description: "Complete office suite",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      currentPage === "home" || product.category === currentPage;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const sendWhatsAppOrder = () => {
    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity} - LYD ${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const englishMessage = `New Order from HISTA STORE:\n\n${orderDetails}\n\nTotal: LYD ${getTotalPrice()}`;
    const arabicMessage = `طلب جديد من HISTA STORE:\n\n${orderDetails}\n\nالمجموع: LYD ${getTotalPrice()}`;
    const message = `${englishMessage}\n\n${"─".repeat(
      30
    )}\n\n${arabicMessage}`;

    const whatsappUrl = `https://wa.me/2180915430176?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const Logo = () => (
    <div className="logo">
      <span className="logo-hista">HISTA</span>
      <span className="logo-store">STORE</span>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="price">LYD {product.price}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            <Plus size={16} />
            {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );

  const CartItem = ({ item }) => (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>LYD {item.price}</p>
      </div>
      <div className="quantity-controls">
        <button onClick={() => updateQuantity(item.id, -1)}>
          <Minus size={16} />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, 1)}>
          <Plus size={16} />
        </button>
      </div>
      <div className="item-total">
        LYD {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a
              href="#"
              onClick={() => setCurrentPage("home")}
              className={currentPage === "home" ? "active" : ""}
            >
              {t.home}
            </a>
            <a
              href="#"
              onClick={() => setCurrentPage("games")}
              className={currentPage === "games" ? "active" : ""}
            >
              {t.games}
            </a>
            <a
              href="#"
              onClick={() => setCurrentPage("apps")}
              className={currentPage === "apps" ? "active" : ""}
            >
              {t.apps}
            </a>
            <a
              href="#"
              onClick={() => setCurrentPage("about")}
              className={currentPage === "about" ? "active" : ""}
            >
              {t.about}
            </a>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            <button
              className="language-toggle"
              style={{ visibility: "hidden" }}
            >
              العربية
            </button>

            <button
              className="cart-button"
              onClick={() => setCurrentPage("cart")}
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <a
              href="#"
              onClick={() => {
                setCurrentPage("home");
                setIsMenuOpen(false);
              }}
            >
              {t.home}
            </a>
            <a
              href="#"
              onClick={() => {
                setCurrentPage("games");
                setIsMenuOpen(false);
              }}
            >
              {t.games}
            </a>
            <a
              href="#"
              onClick={() => {
                setCurrentPage("apps");
                setIsMenuOpen(false);
              }}
            >
              {t.apps}
            </a>
            <a
              href="#"
              onClick={() => {
                setCurrentPage("about");
                setIsMenuOpen(false);
              }}
            >
              {t.about}
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {currentPage === "cart" ? (
            <div className="cart-page">
              <h2>{t.cart}</h2>
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="total">
                      <strong>
                        {t.total}: LYD {getTotalPrice()}
                      </strong>
                    </div>
                    <button
                      className="checkout-btn"
                      onClick={sendWhatsAppOrder}
                    >
                      {t.checkout}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : currentPage === "about" ? (
            <div className="about-page">
              <div className="about-header">
                <h2>{t.about}</h2>
                <p className="about-description">{t.aboutText}</p>
              </div>

              <div className="contact-section">
                <div className="contact-item">
                  <div className="contact-icon">
                    <User size={24} />
                  </div>
                  <div className="contact-content">
                    <h3>Contact me via:</h3>
                    <div className="social-links">
                      <a
                        href="https://www.instagram.com/ccv_ex1?igsh=MTF5cjJtZnJmZHM0NQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link instagram"
                        title="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                      <a
                        href="https://wa.me/2180915430176"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link whatsapp"
                        title="WhatsApp"
                      >
                        <img
                          src="/whatsapp-icon.png"
                          alt="WhatsApp"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="location-item">
                  <div className="location-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="location-content">
                    <h3>Location:</h3>
                    <p>Tripoli, Libya</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="products-page">
              <h2>
                {currentPage === "games"
                  ? t.games
                  : currentPage === "apps"
                  ? t.apps
                  : "Featured Products"}
              </h2>
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <Logo />
          <p>&copy; 2025 HISTA STORE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
