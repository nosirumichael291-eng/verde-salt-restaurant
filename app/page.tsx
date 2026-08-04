import Navbar from '@/components/Navbar'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const restaurant = await prisma.restaurant.findFirst()
  const menuItems = await prisma.menuItem.findMany({
    take: 6,
  })

  return (
    <main className="min-h-screen bg-cream">
      {/* ============================================ */}
      {/* NAVBAR */}
      {/* ============================================ */}
      <Navbar />

      {/* ============================================ */}
      {/* SECTION 1: HERO */}
      {/* ============================================ */}
      <section className="relative h-[90vh] flex items-center justify-center bg-charcoal/90">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200')"
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">
            {restaurant?.name || 'Verde & Salt'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {restaurant?.description || 'Modern Mediterranean cuisine with a soul'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservations"
              className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Book a Table
            </a>
            <a
              href="/menu"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium text-lg transition-all backdrop-blur-sm border border-white/20"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: ABOUT US */}
      {/* ============================================ */}
      <section className="py-20 px-4 max-w-6xl mx-auto" id="about">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-4">
              About Verde & Salt
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to Verde & Salt, where the vibrant flavors of the Mediterranean come alive. Our story began with a simple passion for fresh, wholesome ingredients and the desire to share the warmth of Mediterranean hospitality with every guest.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Each dish we create is a celebration of tradition and innovation, crafted with love and the finest locally-sourced produce. From our wood-fired grill to our handcrafted pastas, every bite tells a story of culinary excellence.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Come experience the soul of the Mediterranean — where every meal is a journey, and every guest becomes family.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600"
              alt="Restaurant interior"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: MENU PREVIEW */}
      {/* ============================================ */}
      <section className="py-20 px-4 bg-white" id="menu">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-2">
              Our Signature Dishes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Crafted with passion using the finest Mediterranean ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-cream rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {item.imageUrl && (
                  <div className="overflow-hidden h-52">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-charcoal">{item.name}</h3>
                    <span className="text-terracotta font-bold text-lg">${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  {item.dietaryTags && item.dietaryTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.dietaryTags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs bg-sage/10 text-sage px-2 py-1 rounded-full font-medium"
                        >
                          {tag.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/menu"
              className="inline-block border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-8 py-3 rounded-full font-medium transition-all"
            >
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: WHY CHOOSE US */}
      {/* ============================================ */}
      <section className="py-20 px-4 max-w-6xl mx-auto" id="features">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-charcoal mb-2">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what makes Verde & Salt the perfect choice for your next dining experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-cream rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🍅</div>
            <h3 className="font-bold text-xl text-charcoal mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">We source the finest seasonal produce from local farms, ensuring every dish is bursting with flavor and freshness.</p>
          </div>
          <div className="text-center p-6 bg-cream rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">👨‍🍳</div>
            <h3 className="font-bold text-xl text-charcoal mb-2">Expert Chefs</h3>
            <p className="text-gray-600">Our team of passionate culinary artists brings decades of experience and a deep love for Mediterranean cuisine.</p>
          </div>
          <div className="text-center p-6 bg-cream rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="font-bold text-xl text-charcoal mb-2">Award-Winning</h3>
            <p className="text-gray-600">Recognized for excellence in Mediterranean cuisine with multiple awards for innovation and quality.</p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: TESTIMONIALS */}
      {/* ============================================ */}
      <section className="py-20 px-4 bg-white" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-2">
              What Our Guests Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real experiences from real people who have dined with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cream p-6 rounded-xl shadow-md">
              <div className="text-terracotta text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic">"The best Mediterranean food I&apos;ve ever had! The flavors are incredible and the service is impeccable."</p>
              <p className="font-bold text-charcoal mt-3">— Sarah J.</p>
            </div>
            <div className="bg-cream p-6 rounded-xl shadow-md">
              <div className="text-terracotta text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic">"A hidden gem! The paella is to die for and the atmosphere is warm and inviting."</p>
              <p className="font-bold text-charcoal mt-3">— Michael R.</p>
            </div>
            <div className="bg-cream p-6 rounded-xl shadow-md">
              <div className="text-terracotta text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic">"Every dish is a work of art. You can taste the passion in every bite. Highly recommend!"</p>
              <p className="font-bold text-charcoal mt-3">— Emma W.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: CALL TO ACTION */}
      {/* ============================================ */}
      <section className="bg-terracotta/10 py-20 px-4" id="reservations">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-charcoal mb-4">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Book your table now and indulge in the finest Mediterranean cuisine in a warm and elegant atmosphere.
          </p>
          <a
            href="/reservations"
            className="inline-block bg-terracotta hover:bg-terracotta/90 text-white px-10 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Book a Table
          </a>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 7: FOOTER */}
      {/* ============================================ */}
      <footer className="bg-charcoal text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-terracotta">Verde & Salt</h3>
            <p className="text-gray-400 mt-2">Modern Mediterranean cuisine with a soul</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Contact</h4>
            <p className="text-gray-400">123 Olive Street</p>
            <p className="text-gray-400">Mediterranean City, MC 10001</p>
            <p className="text-gray-400 mt-2">📞 +1 (234) 567-8900</p>
            <p className="text-gray-400">✉️ hello@verdeandsalt.com</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Hours</h4>
            <p className="text-gray-400">Mon - Thu: 11:00 AM - 11:00 PM</p>
            <p className="text-gray-400">Fri - Sat: 11:00 AM - 12:00 AM</p>
            <p className="text-gray-400">Sun: 12:00 PM - 10:00 PM</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          &copy; 2026 Verde & Salt. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
