import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ChevronDown, Flame } from "lucide-react";

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeSection, setActiveSection] = useState("Αρχική Σελίδα");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBrand, setActiveBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "Νέες Άφιξεις",
    "Άνδρικά",
    "Γυναίκεία",
    "Παπούτσια",
    "Αρώματα",
    "Τσάντες",
    "Ρολόγια",
    "Κοσμήματα",
    "Γυαλιά Ηλίου",
    "Ηλεκτρονικά",
  ];

  const brands = [
    "ALEXANDER WANG",
    "Balenciaga",
    "Burberry",
    "CELINE",
    "CHANEL",
    "CHROME HEARTS",
    "DIOR",
    "GIVENCHY",
    "GUCCI",
    "HERMÈS",
    "LV",
    "McQueen",
    "MONCLER",
    "Nike",
    "Off-White",
    "PRADA",
    "RALPH LAUREN",
    "RICK OWENS",
    "SAINT LAURENT",
    "STONE ISLAND",
    "THOM BROWNE",
    "TOM FORD",
    "VERSACE",
  ];

  const [showBrands, setShowBrands] = useState(false);

  // Updated product list with categories
  const products = [
    { id: 1, name: "Φούστα Εκατό", price: 50, category: "Γυναίκεία", brand: "CHANEL", image: "https://via.placeholder.com/400x500?text=Φούστα+Εκατό" },
    { id: 2, name: "Παπούτσι Αθλητικό", price: 50, category: "Άνδρικά", brand: "Nike", image: "https://via.placeholder.com/400x500?text=Παπούτσι+Αθλητικό" },
    { id: 3, name: "Τσάντα Δέρματος", price: 50, category: "Τσάντες", brand: "GUCCI", image: "https://via.placeholder.com/400x500?text=Τσάντα+Δέρματος" },
    { id: 4, name: "Ρολόι Χειρός", price: 100, category: "Ρολόγια", brand: "ROLEX", image: "https://via.placeholder.com/400x500?text=Ρολόι+Χειρός" },
    { id: 5, name: "Κοσμήματα Χρυσά", price: 30, category: "Κοσμήματα", brand: "HERMÈS", image: "https://via.placeholder.com/400x500?text=Κοσμήματα+Χρυσά" },
    { id: 6, name: "Γυαλιά Ηλίου", price: 100, category: "Γυαλιά Ηλίου", brand: "Ray-Ban", image: "https://via.placeholder.com/400x500?text=Γυαλιά+Ηλίου" },
    { id: 7, name: "Αρώματα Πολυτελή", price: 100, category: "Αρώματα", brand: "DIOR", image: "https://via.placeholder.com/400x500?text=Αρώματα+Πολυτελή" },
    { id: 8, name: "Smartphone Pro Max", price: 500, category: "Ηλεκτρονικά", brand: "Apple", image: "https://via.placeholder.com/400x500?text=Smartphone+Pro+Max" },
    { id: 9, name: "Φόρεμα Βραδινό", price: 100, category: "Γυναίκεία", brand: "Versace", image: "https://via.placeholder.com/400x500?text=Φόρεμα+Βραδινό" },
    { id: 10, name: "Μπουφάν Εποχής", price: 100, category: "Άνδρικά", brand: "MONCLER", image: "https://via.placeholder.com/400x500?text=Μπουφάν+Εποχής" },
  ];

  // Filter products by category or search term
  const filteredProducts = products.filter((product) => {
    if (activeBrand) {
      return product.brand === activeBrand;
    }
    return product.category === searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleQtyChange = (index, delta, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].qty += delta;
      if (updated[index].qty <= 0) updated.splice(index, 1);
      return updated;
    });
  };

  const handleRemove = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  if (activeSection === "checkout") {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-10 md:px-20">
        <button
          onClick={() => setActiveSection("Αρχική Σελίδα")}
          className="inline-flex items-center gap-2 text-sm px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition mb-8"
        >
          <span className="text-lg">←</span> Πίσω στην Αρχική Σελίδα
        </button>
        <h1 className="text-4xl font-bold mb-8 text-center uppercase">Ολοκλήρωση Παραγγελίας</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Στοιχεία Πληρωμής</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Ονοματεπώνυμο"
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
              />
              <input
                type="email"
                placeholder="Διεύθυνση Email"
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Διεύθυνση"
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Πόλη"
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Ταχυδρομικός Κώδικας"
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Χώρα"
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
              />
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Περίληψη Παραγγελίας</h2>
            <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <div className="flex justify-between border-b border-zinc-700 pb-2 mb-4">
                <span>Υποσύνολο</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty * 199, 0)}€</span>
              </div>
              <div className="flex justify-between border-b border-zinc-700 pb-2 mb-4">
                <span>Μεταφορικά</span>
                <span>5€</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Σύνολο</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty * 199, 0) + 5}€</span>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Τρόπος Πληρωμής</h3>
                <select
                  id="paymentMethod"
                  className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none"
                >
                  <option>Αντικαταβολή</option>
                  <option>PayPal</option>
                </select>
                <button
                  onClick={() => {
                    const method = document.getElementById("paymentMethod").value;
                    alert(`✅ Πληρωμή ολοκληρώθηκε επιτυχώς με ${method}! Ευχαριστούμε για την αγορά.`);
                    setCartItems([]);
                    setActiveSection("Αρχική Σελίδα");
                  }}
                  className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
                >
                  Επιβεβαίωση & Πληρωμή
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "Καλάθι Αγορών") {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-10 md:px-20">
        <button
          onClick={() => setActiveSection("Αρχική Σελίδα")}
          className="inline-flex items-center gap-2 text-sm px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition mb-8"
        >
          <span className="text-lg">←</span> Πίσω στην Αρχική Σελίδα
        </button>
        <h1 className="text-4xl font-bold mb-8 text-center uppercase">Καλάθι Αγορών</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400">Το καλάθι σας είναι άδειο.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex gap-4 items-center border-b border-gray-700 pb-4">
                  <img
                    src={`https://via.placeholder.com/80x80?text=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Ποσότητα: {item.qty}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={(e) => handleQtyChange(index, -1, e)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <button
                      onClick={(e) => handleQtyChange(index, 1, e)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-500 font-bold text-xl hover:text-red-700 transition"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="font-bold text-lg">
                Σύνολο: {cartItems.reduce((acc, item) => acc + item.qty * 199, 0)}€
              </p>
              <button
                onClick={() => setActiveSection("checkout")}
                className="mt-4 w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition font-medium"
              >
                Προχωρήστε στην Αγορά
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 overflow-y-scroll">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-black border-b border-zinc-800 relative md:gap-0 gap-4">
        <img
          src="src/steez.png"
          alt="STEEZ.GR Logo"
          className="h-20 w-auto scale-[3] origin-left cursor-pointer z-10"
          onClick={() => window.location.reload()}
        />
        <nav className="w-full flex justify-center md:justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-4 md:mt-0 gap-4 text-sm md:text-base font-medium uppercase">
          {["Αρχική Σελίδα", "Προϊόντα", "Επικοινωνία", "Αναζήτηση Δέματος"].map(
            (key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setActiveBrand(null);
                }}
                className={`px-4 py-2 rounded-lg border border-white/20 hover:bg-white hover:text-black transition ${
                  activeSection === key ? "bg-white text-black" : "bg-zinc-800 text-white"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            )
          )}
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
              <h3 className="text-lg font-semibold mb-2">Καλάθι Αγορών</h3>
              {cartItems.length === 0 ? (
                <p className="text-sm">Το καλάθι σας είναι άδειο.</p>
              ) : (
                <ul className="space-y-2">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm">Ποσότητα: {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQtyChange(index, -1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleQtyChange(index, 1)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(index)}
                          className="text-red-500 font-bold text-xl hover:text-red-700 transition"
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {cartItems.length > 0 && (
                <div className="mt-4">
                  <p className="font-bold">Σύνολο: {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}€</p>
                  <button
                    onClick={() => setActiveSection("Καλάθι Αγορών")}
                    className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-zinc-800 transition font-medium"
                  >
                    Προβολή Καλαθιού
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Categories Bar */}
      {activeSection === "Προϊόντα" && (
        <div className="bg-zinc-900 py-3 border-b border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {categories.map((category) => (
                <div key={category} className="w-1/3 sm:w-1/5 mb-2">
                  <button
                    onClick={() => {
                      setSearchTerm(category);
                      setActiveBrand(null);
                    }}
                    className="w-full px-2 py-1 text-white hover:text-blue-400 transition focus:outline-none"
                  >
                    {category}
                  </button>
                </div>
              ))}
              <div className="w-full mt-2">
                <button
                  onClick={() => setShowBrands(!showBrands)}
                  className="px-2 py-1 text-white hover:text-blue-400 focus:outline-none flex items-center gap-1"
                >
                  View All Brands <span>▼</span>
                </button>
              </div>
            </div>
            {showBrands && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-3 bg-zinc-800 rounded">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setActiveBrand(brand);
                      setShowBrands(false);
                    }}
                    className="text-left px-2 py-1 text-white hover:text-blue-400 focus:outline-none"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shop Section */}
      {(activeSection === "Προϊόντα" || activeSection === "Αρχική Σελίδα") && (
        <section className="pt-16 pb-20 px-4 md:px-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 uppercase tracking-widest flex items-center justify-center gap-2">
            {activeBrand ? `${activeBrand}` : <> <Flame className="text-red-500" />FEATURED</>}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
  {filteredProducts.map((product) => (
    <Card
      key={product.id}
      className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
      onClick={() =>
        setSelectedProduct({
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
    >
      <CardContent className="p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl"
        />
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
          <p className="text-gray-400 mt-1">{product.price}€</p>
          <Button
  onClick={(e) => {
    e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((p) => p.name === product.name);
      if (existing) {
        return prev.map((p) => (p.name === product.name ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { name: product.name, price: product.price, qty: 1 }];
    });
    setShowCart(true); // Ανοίγει το καλάθι αυτόματα
  }}
  variant="ghost"
  className="mt-2 text-white flex items-center gap-2 hover:underline"
>
  <ShoppingCart size={16} /> Προσθήκη στο Καλάθι
</Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
        </section>
      )}

      {/* Modal for Product Details */}
{selectedProduct && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setSelectedProduct(null)} // Κλείσιμο με κλικ έξω από το modal
  >
    <div
      className="bg-white p-6 rounded-lg max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()} // Αποτροπή κλεισίματος όταν κάνετε κλικ μέσα στο modal
    >
      {/* Κουμπί "Πίσω" */}
      <button
        onClick={() => setSelectedProduct(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>

      {/* Εικόνα Προϊόντος */}
      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Λεπτομέρειες Προϊόντος */}
      <h3 className="text-xl font-semibold mt-4">{selectedProduct.name}</h3>
      <p className="text-gray-500 mt-2">{selectedProduct.price}€</p>
      <p className="mt-4 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi vel nunc tincidunt, nec
        fermentum ex aliquet.
      </p>

      {/* Κουμπί "Προσθήκη στο Καλάθι" */}
      <Button
  onClick={() => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.name === selectedProduct.name);
      if (existing) {
        return prev.map((p) => (p.name === selectedProduct.name ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { name: selectedProduct.name, price: selectedProduct.price, qty: 1 }];
    });
    setShowCart(true); // Ανοίγει το καλάθι αυτόματα
    setSelectedProduct(null); // Κλείνει το modal
  }}
  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-zinc-800 transition font-medium"
>
  Προσθήκη στο Καλάθι
</Button>

      {/* Κουμπί "Πίσω" (Εναλλακτικό) */}
      <button
        onClick={() => setSelectedProduct(null)}
        className="mt-4 w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300 transition font-medium"
      >
        Πίσω
      </button>
    </div>
  </div>
)}

      {/* Contact Section */}
      {(activeSection === "Επικοινωνία" || activeSection === "Αρχική Σελίδα") && (
        <section className="py-20 px-4 md:px-16 text-center bg-black border-t border-zinc-800">
          <h3 className="text-2xl font-semibold text-white">ΠΛΗΡΟΦΟΡΙΕΣ ΚΑΤΑΣΤΗΜΑΤΟΣ</h3>
          <p className="text-gray-400">Διαδικτυακό κατάστημα με έδρα την Αττική.</p>
          <p className="text-gray-400">Τηλέφωνο: +30 210 000 0000</p>
          <p className="text-gray-400">Email: support@steez.gr</p>
          <h3 className="text-3xl md:text-4xl font-semibold mt-10 text-white">Γίνετε Μέλος</h3>
          <p className="text-gray-400 mt-3 text-lg">Μάθετε πρώτοι για τις νέες παραλαβές. Αποκλειστικές εκπτώσεις σε μέλη.</p>
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Εισάγετε το email σας"
              className="p-4 rounded-xl w-full text-black focus:outline-none"
            />
            <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 text-lg">Εγγραφή</Button>
          </div>
        </section>
      )}

      {/* Αναζήτηση Δέματος Section */}
      {(activeSection === "Αναζήτηση Δέματος") && (
        <section className="py-20 px-4 md:px-16 bg-black text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white">Αναζήτηση Δέματος</h2>
            <p className="text-gray-400 mt-6 text-lg">
              Αναζητήστε το δέμα σας από την υπηρεσία ACS Courier με τον αριθμό αποστολής.
            </p>
            <a
              href="https://www.acscourier.net/el/myacs/anafores-apostolwn/anazitisi-apostolwn/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-6 py-3 text-lg bg-white text-black rounded-lg hover:bg-gray-200 transition"
            >
              Αναζήτηση Δέματος
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;