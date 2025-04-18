import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ChevronDown, Flame } from "lucide-react";


const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBrand, setActiveBrand] = useState(null);

  const categories = [
    "New Arrivals",
    "Men",
    "Women",
    "Sneakers",
    "Perfume",
    "Bags",
    "Watches",
    "Jewelry",
    "Sunglasses",
    "Electronics"
  ];

  const brands = [
    "ALEXANDER WANG", "Balenciaga", "Burberry", "CELINE", "CHANEL", "CHROME HEARTS",
    "DIOR", "GIVENCHY", "GUCCI", "HERMÈS", "LV", "McQueen", "MONCLER", "Nike",
    "Off-White", "PRADA", "RALPH LAUREN", "RICK OWENS", "SAINT LAURENT", "STONE ISLAND",
    "THOM BROWNE", "TOM FORD", "VERSACE"
  ];

  const products = Array.from({ length: 20 }, (_, i) => i + 1);
  const brandProducts = Array.from({ length: 10 }, (_, i) => i + 1);

  const filteredProducts = products
    .slice(0, activeSection === "home" ? 10 : 20)
    .filter((item) => `Product ${item}`.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleQtyChange = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].qty += delta;
      if (updated[index].qty <= 0) updated.splice(index, 1);
      return updated;
    });
  };

  const handleRemove = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  if (activeSection === "checkout") {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-10 md:px-20">
        <button onClick={() => setActiveSection("home")} className="inline-flex items-center gap-2 text-sm px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition mb-8"><span className="text-lg">←</span> Back to Home</button>
        <h1 className="text-4xl font-bold mb-8 text-center uppercase">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none" />
              <input type="email" placeholder="Email Address" className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none" />
              <input type="text" placeholder="Address" className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none" />
              <input type="text" placeholder="City" className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none" />
              <input type="text" placeholder="Postal Code" className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none" />
              <input type="text" placeholder="Country" className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none" />
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <div className="flex justify-between border-b border-zinc-700 pb-2 mb-4">
                <span>Subtotal</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * 199, 0)}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-700 pb-2 mb-4">
                <span>Shipping</span>
                <span>$25.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * 199, 0) + 25}</span>
              </div>
              <div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
  <select id="paymentMethod" className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none">
    <option>Credit Card</option>
    <option>Debit Card</option>
    <option>PayPal</option>
    <option>Apple Pay</option>
    <option>Google Pay</option>
    <option>Bank Transfer</option>
    <option>Cash on Delivery</option>
  </select>
  <button
    onClick={() => {
    const method = document.getElementById("paymentMethod").value;
    alert(`✅ Paid successfully using ${method}! Thank you for your purchase.`);
    setCartItems([]);
    setActiveSection("home");
  }}
    className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
  >
    Confirm & Pay
  </button>
</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 overflow-y-scroll">
      {/* Header with Logo & Navigation */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-black border-b border-zinc-800 relative md:gap-0 gap-4">
        <img src="src/steez.png" alt="STEEZ.GR Logo" className="h-20 w-auto scale-[3] origin-left" />
        <nav className="w-full flex justify-center md:justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-4 md:mt-0 gap-4 text-sm md:text-base font-medium uppercase">
          {["home", "shop", "about", "contact"].map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                setActiveBrand(null);
              }}
              className={`px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition ${
                activeSection === key ? "bg-white text-black" : "bg-zinc-800 text-white"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </nav>
        <div className="absolute top-6 right-6 flex items-center gap-2 relative md:static md:ml-auto">
          <button onClick={() => setShowCart(!showCart)} className="relative z-10">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-black rounded-full px-2 py-0.5 text-xs font-bold select-none">
              {cartItems.length}
            </span>
          </button>
          {showCart && (
            <div className="absolute right-0 top-full mt-4 w-80 max-h-[70vh] overflow-y-auto bg-white text-black rounded-lg shadow-xl p-4 z-50 border border-gray-300">
              <h3 className="text-lg font-semibold mb-2">Cart</h3>
              {cartItems.length === 0 ? (
                <p className="text-sm">Your cart is empty.</p>
              ) : (
                <ul className="space-y-2">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm">Qty: {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleQtyChange(index, -1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">-</button>
                        <button onClick={() => handleQtyChange(index, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                        <button onClick={() => handleRemove(index)} className="text-red-500 font-bold text-xl hover:text-red-700 transition">×</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {cartItems.length > 0 && (
                <div className="mt-4">
                  <p className="font-bold">Total: ${cartItems.reduce((acc, item) => acc + item.qty * 199, 0)}</p>
                  <button
                    onClick={() => setActiveSection("checkout")}
                    className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-zinc-800 transition font-medium"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      {(activeSection === "shop" || activeSection === "home") && (
  <section className="pt-16 pb-20 px-4 md:px-16">
    {!activeBrand && activeSection === "shop" && (
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl text-black focus:outline-none"
        />
      </div>
    )}
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 uppercase tracking-widest flex items-center justify-center gap-2">
      {activeBrand ? `${activeBrand} Products` : <> <Flame className="text-red-500" /> Featured Drops</>}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
      {(activeBrand ? brandProducts : filteredProducts).map((item) => (
        <Card key={item} className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <CardContent className="p-4">
            <img src={`https://via.placeholder.com/400x500?text=${activeBrand ? `${activeBrand}+Item+${item}` : `Product+${item}`}`} alt={`Item ${item}`} className="w-full rounded-xl" />
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white">{activeBrand ? `${activeBrand} Item ${item}` : `Product ${item}`}</h3>
              <p className="text-gray-400 mt-1">$199.00</p>
              <Button
                onClick={() =>
                  setCartItems((prev) => {
                    const name = activeBrand ? `${activeBrand} Item ${item}` : `Product ${item}`;
                    const existing = prev.find((p) => p.name === name);
                    if (existing) {
                      return prev.map((p) => (p.name === name ? { ...p, qty: p.qty + 1 } : p));
                    }
                    return [...prev, { name, qty: 1 }];
                  })
                }
                variant="ghost"
                className="mt-2 text-white flex items-center gap-2 hover:underline"
              >
                <ShoppingCart size={16} /> Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
)}

{(activeSection === "about" || activeSection === "home") && (
  <section className="py-20 px-4 md:px-16 bg-zinc-950 text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold uppercase">About STEEZ.GR</h2>
      <p className="text-gray-400 mt-6 text-lg">
        At STEEZ.GR, we believe in fearless fashion. Our mission is to redefine luxury streetwear by blending bold aesthetics with top-tier materials. From exclusive drops to timeless essentials, every piece is designed for those who lead, not follow.
      </p>
      <Button className="mt-8 text-black bg-white hover:bg-gray-200 px-6 py-3 text-lg">Read Our Story</Button>
    </div>
  </section>
)}

{(activeSection === "contact" || activeSection === "home") && (
  <section className="py-20 px-4 md:px-16 text-center bg-black border-t border-zinc-800">
    <h3 className="text-2xl font-semibold">Visit Us</h3>
    <p className="text-gray-400 mt-2">STEEZ.GR Flagship Store</p>
    <p className="text-gray-400">123 Fashion Ave, Athens, Greece</p>
    <p className="text-gray-400">Phone: +30 210 000 0000</p>
    <p className="text-gray-400">Email: support@steez.gr</p>
    <h3 className="text-3xl md:text-4xl font-semibold mt-10">Join the Movement</h3>
    <p className="text-gray-400 mt-3 text-lg">Be the first to access new drops, exclusives & streetwear insights.</p>
    <div className="mt-6 flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
      <input type="email" placeholder="Enter your email" className="p-4 rounded-xl w-full text-black focus:outline-none" />
      <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 text-lg">Sign Up</Button>
    </div>
  </section>
)}
    </div>
  );
};

export default Home;
