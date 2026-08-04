import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Delete existing data (optional - prevents duplicate errors)
  console.log('🧹 Cleaning existing data...')
  await prisma.menuItem.deleteMany({})
  await prisma.table.deleteMany({})
  await prisma.reservation.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.waitlist.deleteMany({})
  await prisma.restaurant.deleteMany({})
  console.log('✅ Cleaned existing data')

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Verde & Salt',
      description: 'Modern Mediterranean cuisine with a soul - where fresh ingredients meet timeless recipes.',
      address: '123 Olive Street, Mediterranean City, MC 10001',
      phone: '+1 (234) 567-8900',
      email: 'hello@verdeandsalt.com',
      openingHours: {
        monday: '11:00 AM - 11:00 PM',
        tuesday: '11:00 AM - 11:00 PM',
        wednesday: '11:00 AM - 11:00 PM',
        thursday: '11:00 AM - 11:00 PM',
        friday: '11:00 AM - 12:00 AM',
        saturday: '11:00 AM - 12:00 AM',
        sunday: '12:00 PM - 10:00 PM',
      },
      maxCapacity: 100,
    },
  })

  console.log('✅ Restaurant created')

  // Create tables
  for (let i = 1; i <= 25; i++) {
    let capacity = 2
    let section = 'Main'
    
    if (i <= 5) { capacity = 2; section = 'Window' }
    else if (i <= 15) { capacity = 4; section = 'Main' }
    else if (i <= 22) { capacity = 4; section = 'Patio' }
    else { capacity = 6; section = 'Private' }

    await prisma.table.create({
      data: {
        number: i,
        capacity,
        section,
        restaurantId: restaurant.id,
      },
    })
  }

  console.log('✅ 25 tables created')

  // Create menu items with ALL images
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Grilled Octopus',
        description: 'Tender Mediterranean octopus with lemon, olive oil, and smoked paprika',
        price: 24,
        category: 'STARTERS',
        dietaryTags: ['GLUTEN_FREE', 'DAIRY_FREE'],
        isPopular: true,
        imageUrl: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400',
        restaurantId: restaurant.id,
      },
      {
        name: 'Truffle Risotto',
        description: 'Creamy Arborio risotto with black truffle, parmesan, and wild mushrooms',
        price: 28,
        category: 'PASTA',
        dietaryTags: ['VEGETARIAN'],
        isChefSpecial: true,
        imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400',
        restaurantId: restaurant.id,
      },
      {
        name: 'Mediterranean Salad',
        description: 'Fresh mixed greens, cherry tomatoes, cucumber, feta, olives, and lemon vinaigrette',
        price: 16,
        category: 'SALADS',
        dietaryTags: ['VEGETARIAN', 'GLUTEN_FREE'],
        isPopular: true,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        restaurantId: restaurant.id,
      },
      {
        name: 'Lamb Chops',
        description: 'Grilled New Zealand lamb chops with rosemary, garlic, and mint sauce',
        price: 38,
        category: 'GRILL',
        dietaryTags: ['DAIRY_FREE', 'GLUTEN_FREE'],
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
        restaurantId: restaurant.id,
      },
      {
        name: 'Seafood Paella',
        description: 'Saffron rice with shrimp, mussels, clams, and chorizo',
        price: 34,
        category: 'SEAFOOD',
        dietaryTags: ['DAIRY_FREE'],
        isChefSpecial: true,
        imageUrl: 'https://images.unsplash.com/photo-1536256263892-c2e2e1a2c3f0?w=400',  // ← IMAGE ADDED!
        restaurantId: restaurant.id,
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream',
        price: 12,
        category: 'DESSERTS',
        dietaryTags: ['VEGETARIAN'],
        isPopular: true,
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        restaurantId: restaurant.id,
      },
      {
        name: 'Aperol Spritz',
        description: 'Aperol, prosecco, soda water, and orange slice',
        price: 14,
        category: 'COCKTAILS',
        dietaryTags: ['VEGAN', 'GLUTEN_FREE'],
        imageUrl: 'https://images.unsplash.com/photo-1583707300915-f9a48f5f02c4?w=400',
        restaurantId: restaurant.id,
      },
      {
        name: 'Grilled Salmon',
        description: 'Wild-caught salmon with lemon butter sauce and seasonal vegetables',
        price: 32,
        category: 'MAINS',
        dietaryTags: ['GLUTEN_FREE'],
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
        restaurantId: restaurant.id,
      },
    ],
  })

  console.log('✅ 8 menu items created with images')
  console.log('🎉 Database seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
