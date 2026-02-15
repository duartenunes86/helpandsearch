import React, { useState } from 'react';

// Initial products database
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    sellerId: 2,
    sellerName: "TechGear Pro",
    inStock: true,
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation"
  },
  {
    id: 2,
    name: "Premium Leather Laptop Bag",
    price: 89.99,
    rating: 4.8,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    sellerId: 3,
    sellerName: "Urban Style",
    inStock: true,
    category: "Fashion",
    description: "Genuine leather laptop bag with padded compartment"
  },
  {
    id: 3,
    name: "Smart Watch Series 7",
    price: 449.99,
    rating: 4.7,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    sellerId: 2,
    sellerName: "TechGear Pro",
    inStock: true,
    category: "Electronics",
    description: "Latest smartwatch with health monitoring features"
  },
  {
    id: 4,
    name: "Vintage Sunglasses Collection",
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviews: 834,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    sellerId: 4,
    sellerName: "Fashion Forward",
    inStock: true,
    category: "Fashion",
    description: "Retro-inspired sunglasses with UV protection"
  }
];

export default function MarketplaceApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState('buyer');
  const [view, setView] = useState('home');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importPlatform, setImportPlatform] = useState('marketplace1');
  const [importUrl, setImportUrl] = useState('');
  const [importing, setImporting] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerStoreName, setRegisterStoreName] = useState('');
  
  const [users] = useState([
    { id: 1, name: 'Demo Buyer', email: 'buyer@demo.com', password: 'demo123', type: 'buyer' },
    { id: 2, name: 'TechGear Pro', email: 'seller@demo.com', password: 'demo123', type: 'seller', storeName: 'TechGear Pro' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } else {
      alert('Try: buyer@demo.com / demo123 or seller@demo.com / demo123');
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleImport = async () => {
    setImporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const platformNames = {
      marketplace1: 'Marketplace A',
      marketplace2: 'Marketplace B'
    };
    
    const newProduct = {
      id: Date.now(),
      name: `Imported Product from ${platformNames[importPlatform]}`,
      price: Math.floor(Math.random() * 500) + 50,
      rating: 4.5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      sellerId: currentUser.id,
      sellerName: currentUser.storeName,
      inStock: true,
      category: "Electronics",
      description: `Product imported from external marketplace`,
      sourceMarketplace: platformNames[importPlatform]
    };
    
    setProducts([newProduct, ...products]);
    setImporting(false);
    setShowImportModal(false);
    setImportUrl('');
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1428 50%, #0f1419 100%)', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ background: 'rgba(10, 10, 15, 0.95)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => setView('home')}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg, #ff6b35, #f7931e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
              🤝 HelpAndSearch
            </h1>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888', fontWeight: 600 }}>Marketplace</p>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, maxWidth: '500px', padding: '0.8rem 1rem', background: 'rgba(255, 255, 255, 0.04)', border: '2px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isAuthenticated ? (
              <>
                {currentUser?.type === 'seller' && (
                  <button onClick={() => setView('dashboard')} style={{ padding: '0.7rem 1.2rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    📊 Dashboard
                  </button>
                )}
                <div onClick={() => setView('cart')} style={{ position: 'relative', cursor: 'pointer', fontSize: '1.5rem' }}>
                  🛒
                  {cartCount > 0 && (
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff3366', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {cartCount}
                    </span>
                  )}
                </div>
                <span style={{ padding: '0.6rem 1rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '10px', fontSize: '0.9rem' }}>
                  👤 {currentUser?.name}
                </span>
                <button onClick={() => { setIsAuthenticated(false); setCurrentUser(null); setCart([]); setView('home'); }} style={{ padding: '0.6rem 1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => setShowAuthModal(true)} style={{ padding: '0.7rem 1.5rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {view === 'home' && (
          <>
            {/* Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15), rgba(247, 147, 30, 0.1))', borderRadius: '20px', padding: '3rem 2rem', marginBottom: '2rem', border: '1px solid rgba(255, 107, 53, 0.2)' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #ff6b35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Shop With Purpose
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#bbb', marginBottom: '1rem' }}>
                Discover thousands of products from trusted sellers. Quality products, competitive prices, fast shipping.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 107, 53, 0.2)' }}>
                <span style={{ fontSize: '1.5rem' }}>❤️</span>
                <p style={{ margin: 0, fontSize: '1rem', color: '#ffd700', fontWeight: 600 }}>
                  100% of HelpAndSearch Marketplace profits go to homeless charities - Every purchase makes a difference
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {['all', 'Electronics', 'Fashion', 'Home'].map(cat => (
                <button key={cat} onClick={() => setFilterCategory(cat)} style={{ padding: '0.7rem 1.2rem', background: filterCategory === cat ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filteredProducts.map(product => (
                <div key={product.id} style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ position: 'relative', height: '280px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {product.originalPrice && (
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(135deg, #ff3366, #ff6b35)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        SALE
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(255, 215, 0, 0.95)', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold', color: '#000' }}>
                      ❤️ CHARITY
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#ffc107' }}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                      <span style={{ color: '#888', fontSize: '0.85rem' }}>({product.reviews})</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#ff6b35', marginBottom: '1rem', fontWeight: 600 }}>
                      by {product.sellerName}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ff6b35' }}>${product.price}</div>
                        {product.originalPrice && <div style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'line-through' }}>${product.originalPrice}</div>}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); isAuthenticated ? addToCart(product) : setShowAuthModal(true); }} style={{ padding: '0.7rem 1.2rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'cart' && (
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Shopping Cart</h2>
            <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.3)', marginBottom: '2rem' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#ffd700', fontWeight: 600 }}>
                ❤️ 100% of marketplace profits support homeless charities
              </p>
            </div>
            
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                <h3 style={{ color: '#aaa', marginBottom: '1rem' }}>Your cart is empty</h3>
                <button onClick={() => setView('home')} style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '2fr 1fr', gap: '2rem' }}>
                <div>
                  {cart.map(item => (
                    <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                        <div style={{ color: '#ff6b35', marginBottom: '1rem' }}>by {item.sellerName}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ff6b35' }}>${item.price}</div>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i).filter(i => i.quantity > 0))} style={{ width: '32px', height: '32px', background: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>−</button>
                            <span style={{ fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))} style={{ width: '32px', height: '32px', background: 'rgba(255, 107, 53, 0.2)', border: 'none', borderRadius: '6px', color: '#ff6b35', cursor: 'pointer' }}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', padding: '2rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#aaa' }}>Subtotal:</span>
                    <span style={{ fontWeight: 700 }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span style={{ color: '#aaa' }}>Shipping:</span>
                    <span style={{ fontWeight: 700, color: '#ff6b35' }}>FREE</span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900 }}>
                      <span>Total:</span>
                      <span style={{ color: '#ff6b35' }}>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#ffd700', textAlign: 'center' }}>
                      ❤️ Marketplace profits support homeless charities
                    </p>
                  </div>
                  <button style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'dashboard' && currentUser?.type === 'seller' && (
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Seller Dashboard</h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1rem' }}>Welcome back, {currentUser.storeName}!</p>
            
            <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.3)', marginBottom: '2rem' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#ffd700', fontWeight: 600 }}>
                🤝 Thank you for selling on HelpAndSearch Marketplace! 100% of marketplace profits support homeless charities.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15), rgba(247, 147, 30, 0.08))', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255, 107, 53, 0.3)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>{products.filter(p => p.sellerId === currentUser.id).length}</h3>
                <p style={{ color: '#aaa', margin: 0 }}>Active Products</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, rgba(123, 47, 247, 0.15), rgba(98, 37, 197, 0.08))', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(123, 47, 247, 0.3)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>$12,450</h3>
                <p style={{ color: '#aaa', margin: 0 }}>Total Sales</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, rgba(255, 51, 102, 0.15), rgba(204, 41, 82, 0.08))', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255, 51, 102, 0.3)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>4.8</h3>
                <p style={{ color: '#aaa', margin: 0 }}>Average Rating</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Import Products</h3>
              <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Import your existing listings from other marketplaces</p>
              <button onClick={() => setShowImportModal(true)} style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
                📤 Import Products
              </button>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Your Products</h3>
              {products.filter(p => p.sellerId === currentUser.id).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                  <p>No products yet. Import your first product!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {products.filter(p => p.sellerId === currentUser.id).map(product => (
                    <div key={product.id} style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                      <div style={{ padding: '1rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.name}</h4>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ff6b35' }}>${product.price}</div>
                        {product.sourceMarketplace && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
                            Imported from {product.sourceMarketplace}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowAuthModal(false)}>
          <div style={{ background: 'linear-gradient(135deg, #1a1428, #0f1419)', borderRadius: '20px', padding: '2.5rem', maxWidth: '450px', width: '100%', margin: '1rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button onClick={() => setAuthMode('login')} style={{ flex: 1, padding: '0.8rem', background: authMode === 'login' ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                Login
              </button>
              <button onClick={() => setAuthMode('register')} style={{ flex: 1, padding: '0.8rem', background: authMode === 'register' ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                Register
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLogin}>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', padding: '1rem', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                <button type="submit" style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
                  Login
                </button>
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 107, 53, 0.08)', borderRadius: '10px', fontSize: '0.85rem', color: '#bbb' }}>
                  <strong style={{ color: '#ff6b35' }}>Demo:</strong> buyer@demo.com / demo123 or seller@demo.com / demo123
                </div>
              </form>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <button type="button" onClick={() => setUserType('buyer')} style={{ flex: 1, padding: '0.8rem', background: userType === 'buyer' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.05)', border: '1px solid ' + (userType === 'buyer' ? '#ff6b35' : 'rgba(255, 255, 255, 0.1)'), borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    Buyer
                  </button>
                  <button type="button" onClick={() => setUserType('seller')} style={{ flex: 1, padding: '0.8rem', background: userType === 'seller' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.05)', border: '1px solid ' + (userType === 'seller' ? '#ff6b35' : 'rgba(255, 255, 255, 0.1)'), borderRadius: '10px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    Seller
                  </button>
                </div>
                <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder="Name" required style={{ width: '100%', padding: '1rem', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                {userType === 'seller' && <input type="text" value={registerStoreName} onChange={(e) => setRegisterStoreName(e.target.value)} placeholder="Store Name" required style={{ width: '100%', padding: '1rem', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />}
                <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', padding: '1rem', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
                <button onClick={(e) => { e.preventDefault(); /* Register logic */ }} style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => !importing && setShowImportModal(false)}>
          <div style={{ background: 'linear-gradient(135deg, #1a1428, #0f1419)', borderRadius: '20px', padding: '2.5rem', maxWidth: '550px', width: '100%', margin: '1rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>Import Products</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>Select Marketplace</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setImportPlatform('marketplace1')} disabled={importing} style={{ flex: 1, padding: '1rem', background: importPlatform === 'marketplace1' ? 'linear-gradient(135deg, #4a90e2, #357abd)' : 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 800, cursor: importing ? 'not-allowed' : 'pointer' }}>
                  Marketplace A
                </button>
                <button onClick={() => setImportPlatform('marketplace2')} disabled={importing} style={{ flex: 1, padding: '1rem', background: importPlatform === 'marketplace2' ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 800, cursor: importing ? 'not-allowed' : 'pointer' }}>
                  Marketplace B
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>Product URL or ID</label>
              <input type="text" value={importUrl} onChange={(e) => setImportUrl(e.target.value)} disabled={importing} placeholder="Paste product URL or ID..." style={{ width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <button onClick={handleImport} disabled={!importUrl || importing} style={{ width: '100%', padding: '1.2rem', background: (!importUrl || importing) ? 'rgba(255, 255, 255, 0.08)' : 'linear-gradient(135deg, #ff6b35, #f7931e)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: (!importUrl || importing) ? 'not-allowed' : 'pointer' }}>
              {importing ? '⏳ Importing...' : '📤 Import Product'}
            </button>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 107, 53, 0.08)', borderRadius: '10px', fontSize: '0.9rem', color: '#aaa' }}>
              💡 Paste the product URL or ID from other marketplaces to automatically import product details.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
