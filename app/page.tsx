import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const restaurant = await prisma.restaurant.findFirst()
  const menuItems = await prisma.menuItem.findMany({
    take: 6,
  })

  return (
    <main className="min-h-screen p-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-charcoal">
          {restaurant?.name || 'Verde & Salt'}
        </h1>
        <p className="text-center text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
          {restaurant?.description || 'Modern Mediterranean cuisine with a soul'}
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-charcoal">{item.name}</h3>
                  <span className="text-terracotta font-bold">${item.price}</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                {item.dietaryTags && item.dietaryTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.dietaryTags.map((tag) => (
                      <span key={tag} className="text-xs bg-sage/10 text-sage px-2 py-1 rounded-full">
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
