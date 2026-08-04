import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const restaurant = await prisma.restaurant.findFirst()
  const menuItems = await prisma.menuItem.findMany({
    take: 10,
  })

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="bg-charcoal/90 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif">
          {restaurant?.name || 'Verde & Salt'}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          {restaurant?.description || 'Modern Mediterranean cuisine with a soul'}
        </p>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center text-charcoal mb-12">
          Our Menu
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* ✅ IMAGE DISPLAY - FIXED! */}
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
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
      </div>
    </main>
  )
}
