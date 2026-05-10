import type {
  Restaurant,
  MenuCategory,
  MenuItem,
  Order,
  Reservation,
  Table,
  Staff,
  InventoryItem,
  Review,
  KitchenOrder,
  Customer,
  AppNotification,
  Collection,
  RevenueData,
  PopularItem,
  PeakHourData,
  AnalyticsSummary,
  Offer,
} from "@/types";

// ==================== Helpers ====================
const img = (w: number, h: number, n: number) =>
  `https://picsum.photos/${w}/${h}?random=${n}`;

// ==================== Collections ====================
export const collections: Collection[] = [
  { id: "c1", title: "Best Brunch Spots", description: "Start your weekend right with these amazing brunch destinations", image: img(800, 450, 201), restaurantCount: 24, slug: "best-brunch-spots" },
  { id: "c2", title: "Date Night Restaurants", description: "Romantic settings for an unforgettable evening", image: img(800, 450, 202), restaurantCount: 18, slug: "date-night" },
  { id: "c3", title: "Kid-Friendly Eateries", description: "Family fun with dedicated kids menus and play areas", image: img(800, 450, 203), restaurantCount: 31, slug: "kid-friendly" },
  { id: "c4", title: "New Openings This Month", description: "The hottest new restaurants in your city", image: img(800, 450, 204), restaurantCount: 12, slug: "new-openings" },
  { id: "c5", title: "Trending This Week", description: "Most popular restaurants based on orders and reviews", image: img(800, 450, 205), restaurantCount: 20, slug: "trending" },
  { id: "c6", title: "Budget Bites Under 300", description: "Delicious meals that are easy on your wallet", image: img(800, 450, 206), restaurantCount: 45, slug: "budget-bites" },
  { id: "c7", title: "Rooftop Dining", description: "Enjoy stunning views with your meal", image: img(800, 450, 207), restaurantCount: 9, slug: "rooftop-dining" },
  { id: "c8", title: "Street Food Heroes", description: "Legendary street food joints now on DineEase", image: img(800, 450, 208), restaurantCount: 38, slug: "street-food-heroes" },
];

// ==================== Offers ====================
const sampleOffers: Offer[] = [
  { id: "of1", title: "50% OFF up to 100", description: "On orders above 199", code: "DINE50", discountType: "percent", discountValue: 50, minOrderValue: 199, maxDiscount: 100, validFrom: "2026-03-01", validTo: "2026-04-30", isActive: true },
  { id: "of2", title: "Free Delivery", description: "On your first order", code: "FREEDEL", discountType: "free-delivery", discountValue: 0, minOrderValue: 99, maxDiscount: 60, validFrom: "2026-03-01", validTo: "2026-04-30", isActive: true },
  { id: "of3", title: "Buy 1 Get 1 Free", description: "On all pizzas", code: "BOGO", discountType: "bogo", discountValue: 0, minOrderValue: 299, maxDiscount: 500, validFrom: "2026-03-15", validTo: "2026-04-15", isActive: true },
];

// ==================== Menu Items Pool ====================
export const platformMenuItems: MenuItem[] = [
  { id: "mi1", name: "Truffle Mushroom Risotto", description: "Creamy Arborio rice with wild mushrooms, finished with truffle oil and aged Parmesan", image: img(600, 400, 101), price: 595, dietaryTag: "veg", allergens: ["dairy", "gluten"], calories: 480, protein: 14, carbs: 62, fat: 22, prepTime: 20, isAvailable: true, isBestseller: true, isNew: false, isChefSpecial: true, rating: 4.7, reviewCount: 234, variants: [{ id: "v1", name: "Regular", price: 595 }, { id: "v2", name: "Large", price: 795 }], addons: [{ id: "a1", name: "Extra Truffle Oil", price: 120, isDefault: false }, { id: "a2", name: "Garlic Bread", price: 99, isDefault: false }], tags: ["bestseller", "chef-special"] },
  { id: "mi2", name: "Butter Chicken", description: "Tender chicken in rich tomato-butter gravy with aromatic spices, served with naan", image: img(600, 400, 102), price: 425, dietaryTag: "non-veg", allergens: ["dairy", "nuts"], calories: 550, protein: 32, carbs: 28, fat: 35, prepTime: 25, isAvailable: true, isBestseller: true, isNew: false, isChefSpecial: false, rating: 4.8, reviewCount: 512, variants: [{ id: "v3", name: "Half", price: 265 }, { id: "v4", name: "Full", price: 425 }], addons: [{ id: "a3", name: "Butter Naan", price: 65, isDefault: false }, { id: "a4", name: "Jeera Rice", price: 120, isDefault: false }], tags: ["bestseller"] },
  { id: "mi3", name: "Margherita Pizza", description: "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil", image: img(600, 400, 103), price: 349, dietaryTag: "veg", allergens: ["gluten", "dairy"], calories: 720, protein: 26, carbs: 84, fat: 30, prepTime: 15, isAvailable: true, isBestseller: false, isNew: false, isChefSpecial: false, rating: 4.5, reviewCount: 189, variants: [{ id: "v5", name: "8 inch", price: 349 }, { id: "v6", name: "12 inch", price: 549 }], addons: [{ id: "a5", name: "Extra Cheese", price: 80, isDefault: false }, { id: "a6", name: "Jalapenos", price: 40, isDefault: false }], tags: [] },
  { id: "mi4", name: "Hyderabadi Dum Biryani", description: "Slow-cooked basmati rice layered with marinated goat, saffron, and caramelized onions", image: img(600, 400, 104), price: 475, dietaryTag: "non-veg", allergens: ["nuts", "dairy"], calories: 680, protein: 38, carbs: 72, fat: 24, prepTime: 35, isAvailable: true, isBestseller: true, isNew: false, isChefSpecial: true, rating: 4.9, reviewCount: 723, variants: [{ id: "v7", name: "Single", price: 475 }, { id: "v8", name: "Double", price: 850 }], addons: [{ id: "a7", name: "Raita", price: 55, isDefault: false }, { id: "a8", name: "Mirchi Ka Salan", price: 85, isDefault: false }], tags: ["bestseller", "chef-special"] },
  { id: "mi5", name: "Caesar Salad", description: "Crisp romaine with Caesar dressing, croutons, and shaved Parmesan", image: img(600, 400, 105), price: 295, dietaryTag: "egg", allergens: ["eggs", "dairy", "gluten"], calories: 320, protein: 12, carbs: 18, fat: 24, prepTime: 10, isAvailable: true, isBestseller: false, isNew: false, isChefSpecial: false, rating: 4.3, reviewCount: 98, addons: [{ id: "a9", name: "Grilled Chicken", price: 120, isDefault: false }], tags: [] },
  { id: "mi6", name: "Paneer Tikka Masala", description: "Chargrilled cottage cheese in smoky tomato-cream gravy with bell peppers", image: img(600, 400, 106), price: 375, dietaryTag: "veg", allergens: ["dairy", "nuts"], calories: 420, protein: 22, carbs: 30, fat: 26, prepTime: 18, isAvailable: true, isBestseller: true, isNew: false, isChefSpecial: false, rating: 4.6, reviewCount: 345, variants: [{ id: "v9", name: "Half", price: 225 }, { id: "v10", name: "Full", price: 375 }], tags: ["bestseller"] },
  { id: "mi7", name: "Rainbow Roll Sushi", description: "12 pieces featuring salmon, tuna, avocado, and crab stick over California roll", image: img(600, 400, 107), price: 895, dietaryTag: "non-veg", allergens: ["shellfish", "soy", "gluten", "sesame"], calories: 460, protein: 28, carbs: 55, fat: 14, prepTime: 20, isAvailable: true, isBestseller: false, isNew: true, isChefSpecial: true, rating: 4.4, reviewCount: 67, tags: ["new", "chef-special"] },
  { id: "mi8", name: "Masala Dosa", description: "Crispy golden crepe filled with spiced potato, served with sambar and chutneys", image: img(600, 400, 108), price: 185, dietaryTag: "veg", allergens: [], calories: 380, protein: 8, carbs: 58, fat: 14, prepTime: 12, isAvailable: true, isBestseller: true, isNew: false, isChefSpecial: false, rating: 4.5, reviewCount: 421, variants: [{ id: "v13", name: "Regular", price: 185 }, { id: "v14", name: "Cheese", price: 225 }], tags: ["bestseller"] },
  { id: "mi9", name: "Chocolate Lava Cake", description: "Warm dark chocolate cake with molten center, served with vanilla ice cream", image: img(600, 400, 109), price: 295, dietaryTag: "egg", allergens: ["eggs", "dairy", "gluten"], calories: 520, protein: 8, carbs: 58, fat: 32, prepTime: 15, isAvailable: true, isBestseller: false, isNew: false, isChefSpecial: false, rating: 4.7, reviewCount: 278, tags: [] },
  { id: "mi10", name: "Mango Lassi", description: "Fresh Alphonso mango blended with yogurt, cardamom, and saffron", image: img(600, 400, 110), price: 145, dietaryTag: "veg", allergens: ["dairy"], calories: 220, protein: 6, carbs: 42, fat: 4, prepTime: 5, isAvailable: true, isBestseller: false, isNew: false, isChefSpecial: false, rating: 4.4, reviewCount: 156, variants: [{ id: "v15", name: "Regular", price: 145 }, { id: "v16", name: "Large", price: 195 }], tags: [] },
  { id: "mi11", name: "Grilled Lamb Chops", description: "NZ lamb chops with rosemary-garlic marinade, roasted vegetables, and mint jus", image: img(600, 400, 111), price: 1295, dietaryTag: "non-veg", allergens: [], calories: 580, protein: 45, carbs: 12, fat: 42, prepTime: 30, isAvailable: true, isBestseller: false, isNew: false, isChefSpecial: true, rating: 4.8, reviewCount: 89, tags: ["chef-special"] },
  { id: "mi12", name: "Veg Hakka Noodles", description: "Stir-fried noodles with crunchy vegetables, soy sauce, and chili", image: img(600, 400, 112), price: 225, dietaryTag: "veg", allergens: ["gluten", "soy"], calories: 420, protein: 10, carbs: 60, fat: 16, prepTime: 12, isAvailable: true, isBestseller: false, isNew: false, isChefSpecial: false, rating: 4.2, reviewCount: 132, tags: [] },
  { id: "mi13", name: "Chicken Shawarma Wrap", description: "Rotisserie chicken with garlic sauce, pickles, and fresh veggies in a wrap", image: img(600, 400, 116), price: 245, dietaryTag: "non-veg", allergens: ["gluten", "dairy"], calories: 520, protein: 28, carbs: 42, fat: 24, prepTime: 10, isAvailable: true, isBestseller: true, isNew: false, isChefSpecial: false, rating: 4.5, reviewCount: 389, variants: [{ id: "v17", name: "Regular", price: 245 }, { id: "v18", name: "Jumbo", price: 345 }], tags: ["bestseller"] },
  { id: "mi14", name: "Dal Makhani", description: "Black lentils slow-cooked overnight with butter, cream, and aromatic spices", image: img(600, 400, 114), price: 295, dietaryTag: "veg", allergens: ["dairy"], calories: 350, protein: 16, carbs: 40, fat: 14, prepTime: 20, isAvailable: true, isBestseller: true, isNew: false, isChefSpecial: false, rating: 4.6, reviewCount: 267, tags: ["bestseller"] },
  { id: "mi15", name: "Tiramisu", description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone", image: img(600, 400, 115), price: 345, dietaryTag: "egg", allergens: ["eggs", "dairy", "gluten"], calories: 450, protein: 8, carbs: 42, fat: 28, prepTime: 5, isAvailable: true, isBestseller: false, isNew: true, isChefSpecial: false, rating: 4.5, reviewCount: 134, tags: ["new"] },
];

// ==================== Menu Categories ====================
export const platformMenuCategories: MenuCategory[] = [
  { id: "cat1", name: "Starters", description: "Begin your meal with these delightful appetizers", sortOrder: 1, items: [platformMenuItems[4], platformMenuItems[5], platformMenuItems[12]] },
  { id: "cat2", name: "Main Course", description: "Hearty dishes to satisfy your appetite", sortOrder: 2, items: [platformMenuItems[0], platformMenuItems[1], platformMenuItems[3], platformMenuItems[10], platformMenuItems[13]] },
  { id: "cat3", name: "Pizza & Italian", description: "Wood-fired pizzas and Italian classics", sortOrder: 3, items: [platformMenuItems[2], platformMenuItems[14]] },
  { id: "cat4", name: "Asian", description: "Flavors from across Asia", sortOrder: 4, items: [platformMenuItems[6], platformMenuItems[11]] },
  { id: "cat5", name: "South Indian", description: "Authentic South Indian delicacies", sortOrder: 5, items: [platformMenuItems[7]] },
  { id: "cat6", name: "Desserts", description: "Sweet endings to your meal", sortOrder: 6, items: [platformMenuItems[8], platformMenuItems[14]] },
  { id: "cat7", name: "Beverages", description: "Refreshing drinks and beverages", sortOrder: 7, items: [platformMenuItems[9]] },
];

// ==================== Restaurants ====================
export const restaurants: Restaurant[] = [
  {
    id: "r1", name: "Bella Cucina", slug: "bella-cucina", description: "Authentic Italian dining with wood-fired pizzas, handmade pasta, and an extensive wine selection in a rustic Tuscan-inspired setting", coverImage: img(1200, 675, 1), images: [img(800, 600, 11), img(800, 600, 12), img(800, 600, 13), img(800, 600, 14)], cuisines: ["Italian", "Continental"], priceRange: "$$$", rating: 4.6, reviewCount: 1247, averageCost: 1200, distance: 1.2, deliveryTime: 35, address: "42, Indiranagar 12th Main, Bangalore 560038", city: "Bangalore", area: "Indiranagar", latitude: 12.9716, longitude: 77.6412, phone: "+91 80 4567 8901", email: "hello@bellacucina.in", openingHours: "12:00 PM - 11:30 PM", isOpen: true, isPromoted: true, fssaiLicense: "11522033000789", amenities: ["Wi-Fi", "Outdoor Seating", "Live Music", "Parking", "Pet-Friendly"], dietaryOptions: ["veg", "non-veg", "egg", "gluten-free"], subscriptionTier: "pro", totalTables: 22, activeOffers: [sampleOffers[0], sampleOffers[2]], popularDishes: [platformMenuItems[0], platformMenuItems[2], platformMenuItems[14]],
  },
  {
    id: "r2", name: "Spice Route", slug: "spice-route", description: "A culinary journey through India's diverse spice heritage, from Kerala coast to Rajasthani deserts", coverImage: img(1200, 675, 2), images: [img(800, 600, 21), img(800, 600, 22), img(800, 600, 23)], cuisines: ["North Indian", "South Indian", "Mughlai"], priceRange: "$$", rating: 4.8, reviewCount: 2341, averageCost: 650, distance: 0.8, deliveryTime: 25, address: "18, Koramangala 5th Block, Bangalore 560095", city: "Bangalore", area: "Koramangala", latitude: 12.9352, longitude: 77.6245, phone: "+91 80 2345 6789", email: "eat@spiceroute.in", openingHours: "11:00 AM - 11:00 PM", isOpen: true, isPromoted: false, fssaiLicense: "11522033000456", amenities: ["Wi-Fi", "Family-Friendly", "Private Dining", "Parking"], dietaryOptions: ["veg", "non-veg", "jain", "halal"], subscriptionTier: "enterprise", totalTables: 35, activeOffers: [sampleOffers[0]], popularDishes: [platformMenuItems[1], platformMenuItems[3], platformMenuItems[13]],
  },
  {
    id: "r3", name: "Sakura House", slug: "sakura-house", description: "Premium Japanese dining with an omakase bar, live teppanyaki stations, and the freshest sushi in town", coverImage: img(1200, 675, 3), images: [img(800, 600, 31), img(800, 600, 32), img(800, 600, 33)], cuisines: ["Japanese", "Korean"], priceRange: "$$$$", rating: 4.7, reviewCount: 876, averageCost: 2200, distance: 3.5, deliveryTime: 45, address: "The Leela Palace, 23 HAL Old Airport Rd, Bangalore", city: "Bangalore", area: "HAL", latitude: 12.9601, longitude: 77.6486, phone: "+91 80 6789 0123", email: "reserve@sakurahouse.in", openingHours: "12:30 PM - 11:00 PM", isOpen: true, isPromoted: true, fssaiLicense: "11522033001234", amenities: ["Valet Parking", "Private Dining", "Live Kitchen", "Bar", "Wi-Fi"], dietaryOptions: ["non-veg", "veg", "gluten-free"], subscriptionTier: "enterprise", totalTables: 18, activeOffers: [], popularDishes: [platformMenuItems[6]],
  },
  {
    id: "r4", name: "Dosa Factory", slug: "dosa-factory", description: "Where tradition meets innovation - 50+ varieties of dosas, uttapams, and South Indian breakfast favorites", coverImage: img(1200, 675, 4), images: [img(800, 600, 41), img(800, 600, 42)], cuisines: ["South Indian", "Cafe"], priceRange: "$", rating: 4.4, reviewCount: 3456, averageCost: 250, distance: 0.5, deliveryTime: 20, address: "Shop 7, Jayanagar 4th Block, Bangalore 560041", city: "Bangalore", area: "Jayanagar", latitude: 12.9260, longitude: 77.5930, phone: "+91 80 1234 5678", email: "info@dosafactory.in", openingHours: "7:00 AM - 10:30 PM", isOpen: true, isPromoted: false, fssaiLicense: "11522033000321", amenities: ["Wi-Fi", "Family-Friendly", "Quick Service"], dietaryOptions: ["veg", "jain"], subscriptionTier: "growth", totalTables: 12, activeOffers: [sampleOffers[1]], popularDishes: [platformMenuItems[7]],
  },
  {
    id: "r5", name: "The Grill House", slug: "the-grill-house", description: "Premium steaks and grills over mesquite wood, paired with craft cocktails in an industrial-chic setting", coverImage: img(1200, 675, 5), images: [img(800, 600, 51), img(800, 600, 52), img(800, 600, 53)], cuisines: ["Continental", "Burger", "Seafood"], priceRange: "$$$", rating: 4.5, reviewCount: 967, averageCost: 1400, distance: 2.1, deliveryTime: 40, address: "UB City, Vittal Mallya Road, Bangalore 560001", city: "Bangalore", area: "MG Road", latitude: 12.9719, longitude: 77.5960, phone: "+91 80 5678 9012", email: "hello@thegrillhouse.in", openingHours: "12:00 PM - 1:00 AM", isOpen: true, isPromoted: false, fssaiLicense: "11522033000567", amenities: ["Bar", "Rooftop", "Live Music", "Valet Parking", "Outdoor Seating"], dietaryOptions: ["non-veg", "veg"], subscriptionTier: "pro", totalTables: 25, activeOffers: [sampleOffers[0], sampleOffers[1]], popularDishes: [platformMenuItems[10]],
  },
  {
    id: "r6", name: "Wok & Roll", slug: "wok-and-roll", description: "High-energy Asian fusion with fiery wok-tossed dishes, dim sum, and bubble tea", coverImage: img(1200, 675, 6), images: [img(800, 600, 61), img(800, 600, 62)], cuisines: ["Chinese", "Thai", "Korean"], priceRange: "$$", rating: 4.3, reviewCount: 1823, averageCost: 550, distance: 1.8, deliveryTime: 30, address: "Phoenix Marketcity, Whitefield, Bangalore", city: "Bangalore", area: "Whitefield", latitude: 12.9980, longitude: 77.7480, phone: "+91 80 8901 2345", email: "eat@wokandroll.in", openingHours: "11:30 AM - 11:00 PM", isOpen: true, isPromoted: true, fssaiLicense: "11522033000890", amenities: ["Wi-Fi", "Family-Friendly", "Parking"], dietaryOptions: ["veg", "non-veg", "egg"], subscriptionTier: "growth", totalTables: 20, activeOffers: [sampleOffers[2]], popularDishes: [platformMenuItems[11], platformMenuItems[6]],
  },
  {
    id: "r7", name: "Chai & Chaat", slug: "chai-and-chaat", description: "Nostalgic street food from across India, from Mumbai pav bhaji to Delhi chaat, with artisanal chai", coverImage: img(1200, 675, 7), images: [img(800, 600, 71), img(800, 600, 72)], cuisines: ["Street Food", "North Indian", "Cafe"], priceRange: "$", rating: 4.2, reviewCount: 4521, averageCost: 200, distance: 0.3, deliveryTime: 15, address: "12, Church Street, Bangalore 560001", city: "Bangalore", area: "Brigade Road", latitude: 12.9740, longitude: 77.6070, phone: "+91 80 3456 7890", email: "hi@chaiandchaat.in", openingHours: "9:00 AM - 11:00 PM", isOpen: false, isPromoted: false, fssaiLicense: "11522033000234", amenities: ["Wi-Fi", "Quick Service"], dietaryOptions: ["veg", "jain"], subscriptionTier: "starter", totalTables: 8, activeOffers: [sampleOffers[1]], popularDishes: [platformMenuItems[12]],
  },
  {
    id: "r8", name: "The Biryani Pot", slug: "the-biryani-pot", description: "Hyderabadi biryani perfected over four generations, slow-cooked in copper handi with premium basmati", coverImage: img(1200, 675, 8), images: [img(800, 600, 81), img(800, 600, 82), img(800, 600, 83)], cuisines: ["Biryani", "Mughlai", "North Indian"], priceRange: "$$", rating: 4.9, reviewCount: 5230, averageCost: 500, distance: 1.5, deliveryTime: 30, address: "56, HSR Layout Sector 2, Bangalore 560102", city: "Bangalore", area: "HSR Layout", latitude: 12.9116, longitude: 77.6389, phone: "+91 80 7890 1234", email: "order@biryanipot.in", openingHours: "11:00 AM - 11:30 PM", isOpen: true, isPromoted: true, fssaiLicense: "11522033000678", amenities: ["Wi-Fi", "Family-Friendly", "Parking", "Private Dining"], dietaryOptions: ["non-veg", "veg", "halal"], subscriptionTier: "pro", totalTables: 30, activeOffers: [sampleOffers[0]], popularDishes: [platformMenuItems[3], platformMenuItems[1]],
  },
];

// ==================== Orders ====================
export const orders: Order[] = [
  {
    id: "ord1", orderNumber: "DE-20260328-001", restaurantId: "r2", restaurantName: "Spice Route", restaurantImage: img(100, 100, 2), customerId: "cust1", customerName: "Rahul Sharma", customerPhone: "+91 98765 43210", type: "delivery", status: "preparing", items: [
      { id: "oi1", menuItemId: "mi2", name: "Butter Chicken (Full)", quantity: 1, price: 425, variant: "Full", addons: ["Butter Naan"], dietaryTag: "non-veg" },
      { id: "oi2", menuItemId: "mi14", name: "Dal Makhani", quantity: 1, price: 295, addons: ["Butter Naan"], dietaryTag: "veg" },
      { id: "oi3", menuItemId: "mi10", name: "Mango Lassi (Large)", quantity: 2, price: 195, variant: "Large", addons: [], dietaryTag: "veg" },
    ], subtotal: 1110, tax: 55.5, deliveryFee: 40, discount: 100, tip: 50, total: 1155.5, paymentMethod: "upi", paymentStatus: "paid", estimatedPrepTime: 25, placedAt: "2026-03-28T12:30:00", confirmedAt: "2026-03-28T12:31:00", customerAddress: "123, 4th Cross, HSR Layout, Bangalore",
    deliveryPartner: { id: "dp1", name: "Kiran Kumar", phone: "+91 99876 54321", avatar: img(100, 100, 301), vehicle: "Motorcycle", vehicleNumber: "KA-01-AB-1234", rating: 4.7, totalDeliveries: 2340, eta: 12 },
  },
  {
    id: "ord2", orderNumber: "DE-20260328-002", restaurantId: "r1", restaurantName: "Bella Cucina", restaurantImage: img(100, 100, 1), customerId: "cust2", customerName: "Meera Patel", customerPhone: "+91 87654 32109", type: "dine-in", status: "served", items: [
      { id: "oi4", menuItemId: "mi1", name: "Truffle Mushroom Risotto (Large)", quantity: 1, price: 795, variant: "Large", addons: ["Garlic Bread"], dietaryTag: "veg" },
      { id: "oi5", menuItemId: "mi3", name: "Margherita Pizza (12 inch)", quantity: 1, price: 549, variant: "12 inch", addons: ["Extra Cheese"], dietaryTag: "veg" },
      { id: "oi6", menuItemId: "mi9", name: "Chocolate Lava Cake", quantity: 2, price: 295, addons: ["Extra Ice Cream Scoop"], dietaryTag: "egg" },
    ], subtotal: 2009, tax: 100.45, deliveryFee: 0, discount: 0, tip: 200, total: 2309.45, paymentMethod: "credit-card", paymentStatus: "paid", tableNumber: 7, estimatedPrepTime: 20, placedAt: "2026-03-28T13:15:00", confirmedAt: "2026-03-28T13:15:00", preparedAt: "2026-03-28T13:35:00",
  },
  {
    id: "ord3", orderNumber: "DE-20260328-003", restaurantId: "r8", restaurantName: "The Biryani Pot", restaurantImage: img(100, 100, 8), customerId: "cust3", customerName: "Vikram Singh", customerPhone: "+91 76543 21098", type: "takeaway", status: "ready", items: [
      { id: "oi7", menuItemId: "mi4", name: "Hyderabadi Dum Biryani (Double)", quantity: 1, price: 850, variant: "Double", addons: ["Raita", "Mirchi Ka Salan"], dietaryTag: "non-veg" },
    ], subtotal: 990, tax: 49.5, deliveryFee: 0, discount: 0, tip: 0, total: 1039.5, paymentMethod: "upi", paymentStatus: "paid", estimatedPrepTime: 35, placedAt: "2026-03-28T12:45:00", confirmedAt: "2026-03-28T12:46:00", preparedAt: "2026-03-28T13:18:00",
  },
  {
    id: "ord4", orderNumber: "DE-20260328-004", restaurantId: "r4", restaurantName: "Dosa Factory", restaurantImage: img(100, 100, 4), customerId: "cust4", customerName: "Ananya Reddy", customerPhone: "+91 65432 10987", type: "delivery", status: "delivered", items: [
      { id: "oi8", menuItemId: "mi8", name: "Masala Dosa (Cheese)", quantity: 2, price: 225, variant: "Cheese", addons: ["Extra Sambar"], dietaryTag: "veg" },
    ], subtotal: 520, tax: 26, deliveryFee: 30, discount: 30, tip: 20, total: 566, paymentMethod: "wallet", paymentStatus: "paid", estimatedPrepTime: 12, placedAt: "2026-03-28T10:15:00", confirmedAt: "2026-03-28T10:16:00", preparedAt: "2026-03-28T10:28:00", completedAt: "2026-03-28T10:50:00", customerAddress: "45, BTM Layout 2nd Stage, Bangalore",
    deliveryPartner: { id: "dp2", name: "Ravi Teja", phone: "+91 88765 43210", avatar: img(100, 100, 302), vehicle: "Bicycle", vehicleNumber: "N/A", rating: 4.5, totalDeliveries: 890, eta: 0 },
  },
  {
    id: "ord5", orderNumber: "DE-20260328-005", restaurantId: "r5", restaurantName: "The Grill House", restaurantImage: img(100, 100, 5), customerId: "cust5", customerName: "Priya Nair", customerPhone: "+91 54321 09876", type: "dine-in", status: "placed", items: [
      { id: "oi9", menuItemId: "mi11", name: "Grilled Lamb Chops", quantity: 2, price: 1295, addons: ["Mashed Potatoes"], dietaryTag: "non-veg" },
      { id: "oi10", menuItemId: "mi5", name: "Caesar Salad", quantity: 1, price: 295, addons: ["Grilled Chicken"], dietaryTag: "egg" },
    ], subtotal: 3035, tax: 151.75, deliveryFee: 0, discount: 0, tip: 0, total: 3186.75, paymentMethod: "corporate-card", paymentStatus: "pending", tableNumber: 12, estimatedPrepTime: 30, placedAt: "2026-03-28T13:45:00",
  },
  {
    id: "ord6", orderNumber: "DE-20260328-006", restaurantId: "r6", restaurantName: "Wok & Roll", restaurantImage: img(100, 100, 6), customerId: "cust1", customerName: "Rahul Sharma", customerPhone: "+91 98765 43210", type: "delivery", status: "cancelled", items: [
      { id: "oi11", menuItemId: "mi12", name: "Veg Hakka Noodles", quantity: 1, price: 225, addons: ["Extra Veggies"], dietaryTag: "veg" },
    ], subtotal: 270, tax: 13.5, deliveryFee: 35, discount: 0, tip: 0, total: 318.5, paymentMethod: "upi", paymentStatus: "refunded", estimatedPrepTime: 12, placedAt: "2026-03-28T11:00:00", confirmedAt: "2026-03-28T11:01:00", customerAddress: "123, 4th Cross, HSR Layout, Bangalore", specialInstructions: "Extra spicy please",
  },
];

// ==================== Reservations ====================
export const reservations: Reservation[] = [
  { id: "res1", restaurantId: "r1", restaurantName: "Bella Cucina", customerId: "cust2", customerName: "Meera Patel", customerPhone: "+91 87654 32109", date: "2026-03-29", time: "19:30", partySize: 4, seatingPreference: "outdoor", specialOccasion: "birthday", specialRequests: "Need a high chair for toddler, birthday cake arrangement", status: "confirmed", tableNumber: 15, createdAt: "2026-03-27T14:00:00" },
  { id: "res2", restaurantId: "r3", restaurantName: "Sakura House", customerId: "cust3", customerName: "Vikram Singh", customerPhone: "+91 76543 21098", date: "2026-03-28", time: "20:00", partySize: 2, seatingPreference: "private", specialOccasion: "anniversary", specialRequests: "Window table with city view preferred", status: "confirmed", tableNumber: 5, createdAt: "2026-03-25T10:00:00" },
  { id: "res3", restaurantId: "r5", restaurantName: "The Grill House", customerId: "cust5", customerName: "Priya Nair", customerPhone: "+91 54321 09876", date: "2026-03-28", time: "13:00", partySize: 6, seatingPreference: "indoor", specialOccasion: "business meeting", specialRequests: "Quiet corner table, projector setup", status: "seated", tableNumber: 12, createdAt: "2026-03-26T09:30:00" },
  { id: "res4", restaurantId: "r2", restaurantName: "Spice Route", customerId: "cust4", customerName: "Ananya Reddy", customerPhone: "+91 65432 10987", date: "2026-03-28", time: "12:30", partySize: 8, seatingPreference: "private", specialRequests: "Vegetarian family, no non-veg cross-contamination", status: "completed", createdAt: "2026-03-24T16:00:00" },
  { id: "res5", restaurantId: "r1", restaurantName: "Bella Cucina", customerId: "cust1", customerName: "Rahul Sharma", customerPhone: "+91 98765 43210", date: "2026-03-28", time: "19:00", partySize: 2, seatingPreference: "any", status: "no-show", createdAt: "2026-03-27T20:00:00" },
  { id: "res6", restaurantId: "r8", restaurantName: "The Biryani Pot", customerId: "cust6", customerName: "Suresh Rao", customerPhone: "+91 43210 98765", date: "2026-03-30", time: "13:00", partySize: 12, seatingPreference: "private", specialOccasion: "birthday", specialRequests: "Large family celebration", status: "confirmed", createdAt: "2026-03-26T11:00:00" },
];

// ==================== Tables ====================
export const tables: Table[] = [
  { id: "t1", number: 1, capacity: 2, section: "indoor", status: "available", shape: "round", x: 50, y: 50 },
  { id: "t2", number: 2, capacity: 2, section: "indoor", status: "occupied", currentOrderId: "ord2", seatedAt: "2026-03-28T13:10:00", shape: "round", x: 150, y: 50 },
  { id: "t3", number: 3, capacity: 4, section: "indoor", status: "available", shape: "square", x: 250, y: 50 },
  { id: "t4", number: 4, capacity: 4, section: "indoor", status: "reserved", reservationId: "res1", shape: "square", x: 350, y: 50 },
  { id: "t5", number: 5, capacity: 2, section: "indoor", status: "cleaning", shape: "round", x: 50, y: 150 },
  { id: "t6", number: 6, capacity: 6, section: "indoor", status: "occupied", currentOrderId: "ord5", seatedAt: "2026-03-28T13:40:00", shape: "rectangle", x: 150, y: 150 },
  { id: "t7", number: 7, capacity: 4, section: "indoor", status: "available", shape: "square", x: 300, y: 150 },
  { id: "t8", number: 8, capacity: 8, section: "outdoor", status: "available", shape: "rectangle", x: 50, y: 300 },
  { id: "t9", number: 9, capacity: 4, section: "outdoor", status: "occupied", seatedAt: "2026-03-28T12:55:00", shape: "square", x: 200, y: 300 },
  { id: "t10", number: 10, capacity: 2, section: "outdoor", status: "available", shape: "round", x: 350, y: 300 },
  { id: "t11", number: 11, capacity: 4, section: "bar", status: "available", shape: "rectangle", x: 50, y: 450 },
  { id: "t12", number: 12, capacity: 6, section: "bar", status: "occupied", seatedAt: "2026-03-28T13:30:00", shape: "rectangle", x: 200, y: 450 },
  { id: "t13", number: 13, capacity: 10, section: "private", status: "reserved", reservationId: "res6", shape: "rectangle", x: 50, y: 550 },
  { id: "t14", number: 14, capacity: 8, section: "private", status: "available", shape: "rectangle", x: 250, y: 550 },
];

// ==================== Staff ====================
export const staffMembers: Staff[] = [
  { id: "s1", name: "Suresh Kumar", role: "owner", email: "suresh@spiceroute.in", phone: "+91 98765 00001", avatar: img(100, 100, 401), joinedDate: "2020-01-15", isActive: true, ordersToday: 0, avgServiceTime: 0, rating: 0, tipsToday: 0 },
  { id: "s2", name: "Priya Menon", role: "chef", email: "priya@spiceroute.in", phone: "+91 98765 00002", avatar: img(100, 100, 402), joinedDate: "2021-06-01", isActive: true, shiftStart: "10:00", shiftEnd: "18:00", ordersToday: 47, avgServiceTime: 18, rating: 4.8, tipsToday: 0 },
  { id: "s3", name: "Arjun Nair", role: "waiter", email: "arjun@spiceroute.in", phone: "+91 98765 00003", avatar: img(100, 100, 403), joinedDate: "2023-03-15", isActive: true, shiftStart: "11:00", shiftEnd: "23:00", ordersToday: 32, avgServiceTime: 8, rating: 4.6, tipsToday: 1450 },
  { id: "s4", name: "Deepa Rao", role: "manager", email: "deepa@spiceroute.in", phone: "+91 98765 00004", avatar: img(100, 100, 404), joinedDate: "2022-01-10", isActive: true, shiftStart: "09:00", shiftEnd: "21:00", ordersToday: 0, avgServiceTime: 0, rating: 4.9, tipsToday: 0 },
  { id: "s5", name: "Ravi Shankar", role: "line-cook", email: "ravi@spiceroute.in", phone: "+91 98765 00005", avatar: img(100, 100, 405), joinedDate: "2024-08-20", isActive: true, shiftStart: "10:00", shiftEnd: "18:00", ordersToday: 35, avgServiceTime: 15, rating: 4.3, tipsToday: 0 },
  { id: "s6", name: "Kavitha S", role: "host", email: "kavitha@spiceroute.in", phone: "+91 98765 00006", avatar: img(100, 100, 406), joinedDate: "2023-11-01", isActive: true, shiftStart: "11:00", shiftEnd: "23:00", ordersToday: 0, avgServiceTime: 0, rating: 4.7, tipsToday: 350 },
  { id: "s7", name: "Manoj Pillai", role: "waiter", email: "manoj@spiceroute.in", phone: "+91 98765 00007", avatar: img(100, 100, 407), joinedDate: "2024-02-14", isActive: true, shiftStart: "11:00", shiftEnd: "23:00", ordersToday: 28, avgServiceTime: 9, rating: 4.4, tipsToday: 1120 },
  { id: "s8", name: "Anjali Verma", role: "cashier", email: "anjali@spiceroute.in", phone: "+91 98765 00008", avatar: img(100, 100, 408), joinedDate: "2024-05-01", isActive: false, ordersToday: 0, avgServiceTime: 0, rating: 4.5, tipsToday: 0 },
];

// ==================== Inventory ====================
export const inventoryItems: InventoryItem[] = [
  { id: "inv1", name: "Basmati Rice (Premium)", category: "Grains", unit: "kg", currentStock: 45, parLevel: 50, reorderLevel: 20, costPerUnit: 120, supplier: "Rice World Traders", lastRestocked: "2026-03-25", status: "in-stock" },
  { id: "inv2", name: "Chicken Breast (Boneless)", category: "Meat", unit: "kg", currentStock: 8, parLevel: 25, reorderLevel: 10, costPerUnit: 280, supplier: "FreshMeat Co.", lastRestocked: "2026-03-27", status: "low" },
  { id: "inv3", name: "Paneer (Fresh)", category: "Dairy", unit: "kg", currentStock: 3, parLevel: 15, reorderLevel: 5, costPerUnit: 320, supplier: "Amul Distributor", lastRestocked: "2026-03-26", expiryDate: "2026-03-31", status: "critical" },
  { id: "inv4", name: "Olive Oil (Extra Virgin)", category: "Oils", unit: "ltr", currentStock: 12, parLevel: 10, reorderLevel: 4, costPerUnit: 850, supplier: "Mediterranean Imports", lastRestocked: "2026-03-20", status: "in-stock" },
  { id: "inv5", name: "Tomatoes", category: "Vegetables", unit: "kg", currentStock: 18, parLevel: 20, reorderLevel: 8, costPerUnit: 45, supplier: "Local Farm Fresh", lastRestocked: "2026-03-28", expiryDate: "2026-04-02", status: "in-stock" },
  { id: "inv6", name: "Mozzarella Cheese", category: "Dairy", unit: "kg", currentStock: 0, parLevel: 8, reorderLevel: 3, costPerUnit: 650, supplier: "Italian Cheese Co.", lastRestocked: "2026-03-22", status: "out-of-stock" },
  { id: "inv7", name: "Saffron (Kashmiri)", category: "Spices", unit: "gm", currentStock: 25, parLevel: 30, reorderLevel: 10, costPerUnit: 45, supplier: "Spice Palace", lastRestocked: "2026-03-15", status: "in-stock" },
  { id: "inv8", name: "Lamb Rack (Imported)", category: "Meat", unit: "kg", currentStock: 4, parLevel: 8, reorderLevel: 3, costPerUnit: 1800, supplier: "Premium Meats Intl", lastRestocked: "2026-03-26", expiryDate: "2026-03-30", status: "low" },
  { id: "inv9", name: "Butter (Unsalted)", category: "Dairy", unit: "kg", currentStock: 10, parLevel: 12, reorderLevel: 5, costPerUnit: 520, supplier: "Amul Distributor", lastRestocked: "2026-03-27", status: "in-stock" },
  { id: "inv10", name: "Garlic (Peeled)", category: "Vegetables", unit: "kg", currentStock: 6, parLevel: 8, reorderLevel: 3, costPerUnit: 180, supplier: "Local Farm Fresh", lastRestocked: "2026-03-27", status: "in-stock" },
];

// ==================== Reviews ====================
export const reviews: Review[] = [
  { id: "rev1", restaurantId: "r2", customerId: "cust1", customerName: "Rahul Sharma", customerAvatar: img(80, 80, 501), overallRating: 5, foodRating: 5, serviceRating: 5, ambianceRating: 4, valueRating: 4, comment: "The Butter Chicken here is absolutely divine! Perfectly balanced gravy with tender chicken pieces. The naan was fresh and fluffy. Will definitely be back for the biryani next time.", photos: [img(400, 300, 601), img(400, 300, 602)], dishesReviewed: ["Butter Chicken", "Garlic Naan"], isVerified: true, helpfulCount: 47, createdAt: "2026-03-27T20:30:00", restaurantResponse: "Thank you Rahul! We're thrilled you enjoyed the Butter Chicken. Looking forward to serving you the biryani next time!", respondedAt: "2026-03-28T09:00:00" },
  { id: "rev2", restaurantId: "r1", customerId: "cust4", customerName: "Ananya Reddy", customerAvatar: img(80, 80, 502), overallRating: 4, foodRating: 5, serviceRating: 4, ambianceRating: 5, valueRating: 3, comment: "Beautiful restaurant with amazing Italian food. The truffle risotto was hands down the best I've had in Bangalore. A bit pricey but worth it for special occasions.", photos: [img(400, 300, 603), img(400, 300, 604), img(400, 300, 605)], dishesReviewed: ["Truffle Mushroom Risotto", "Margherita Pizza", "Tiramisu"], isVerified: true, helpfulCount: 32, createdAt: "2026-03-26T21:15:00" },
  { id: "rev3", restaurantId: "r8", customerId: "cust3", customerName: "Vikram Singh", customerAvatar: img(80, 80, 503), overallRating: 5, foodRating: 5, serviceRating: 5, ambianceRating: 4, valueRating: 5, comment: "Best biryani in Bangalore, no contest. The dum cooking technique really shows - every grain of rice is perfectly flavored. I order from here at least twice a week.", photos: [img(400, 300, 606)], dishesReviewed: ["Hyderabadi Dum Biryani"], isVerified: true, helpfulCount: 89, createdAt: "2026-03-25T19:00:00", restaurantResponse: "Thank you for the love, Vikram! You're one of our most valued regulars.", respondedAt: "2026-03-26T08:30:00" },
  { id: "rev4", restaurantId: "r3", customerId: "cust2", customerName: "Meera Patel", customerAvatar: img(80, 80, 504), overallRating: 4, foodRating: 4, serviceRating: 5, ambianceRating: 5, valueRating: 3, comment: "Exquisite Japanese dining experience. The sushi platter was fresh and beautifully presented. Service was impeccable. Only downside is the steep pricing.", photos: [img(400, 300, 607), img(400, 300, 608)], dishesReviewed: ["Rainbow Roll Sushi Platter"], isVerified: true, helpfulCount: 21, createdAt: "2026-03-24T22:00:00" },
  { id: "rev5", restaurantId: "r4", customerId: "cust5", customerName: "Priya Nair", customerAvatar: img(80, 80, 505), overallRating: 2, foodRating: 2, serviceRating: 3, ambianceRating: 2, valueRating: 3, comment: "Disappointed with my last visit. The masala dosa was undercooked and the sambar was too watery. We had to wait 20 minutes even with a reservation.", photos: [], dishesReviewed: ["Masala Dosa"], isVerified: true, helpfulCount: 15, createdAt: "2026-03-23T13:30:00", restaurantResponse: "We sincerely apologize for the experience, Priya. This is not our standard. We'd love to make it up to you.", respondedAt: "2026-03-23T16:00:00" },
];

// ==================== Kitchen Orders ====================
export const kitchenOrders: KitchenOrder[] = [
  {
    id: "ko1", orderNumber: "DE-001", type: "dine-in", tableNumber: 7, items: [
      { id: "ki1", name: "Truffle Mushroom Risotto", quantity: 1, variant: "Large", addons: ["Garlic Bread"], allergens: ["dairy", "gluten"], station: "Main Kitchen", status: "preparing", specialInstructions: "Extra truffle oil" },
      { id: "ki2", name: "Caesar Salad", quantity: 1, addons: ["Grilled Chicken"], allergens: ["eggs", "dairy", "gluten"], station: "Cold Station", status: "done" },
    ], priority: "normal", status: "in-progress", placedAt: "2026-03-28T13:15:00", estimatedPrepTime: 20, elapsedTime: 12, customerName: "Meera Patel", isVIP: false,
  },
  {
    id: "ko2", orderNumber: "DE-002", type: "delivery", items: [
      { id: "ki3", name: "Butter Chicken", quantity: 1, variant: "Full", addons: ["Butter Naan x2"], allergens: ["dairy", "nuts"], station: "Tandoor", status: "preparing" },
      { id: "ki4", name: "Dal Makhani", quantity: 1, addons: ["Butter Naan"], allergens: ["dairy"], station: "Main Kitchen", status: "pending" },
      { id: "ki5", name: "Mango Lassi", quantity: 2, variant: "Large", addons: [], allergens: ["dairy"], station: "Beverage", status: "done" },
    ], priority: "high", status: "in-progress", placedAt: "2026-03-28T12:30:00", estimatedPrepTime: 25, elapsedTime: 22, customerName: "Rahul Sharma", isVIP: false, specialInstructions: "Less spicy butter chicken",
  },
  {
    id: "ko3", orderNumber: "DE-003", type: "takeaway", items: [
      { id: "ki6", name: "Hyderabadi Dum Biryani", quantity: 1, variant: "Double", addons: ["Raita", "Mirchi Ka Salan"], allergens: ["nuts", "dairy"], station: "Biryani Station", status: "done" },
    ], priority: "normal", status: "ready", placedAt: "2026-03-28T12:45:00", estimatedPrepTime: 35, elapsedTime: 33, customerName: "Vikram Singh", isVIP: true,
  },
  {
    id: "ko4", orderNumber: "DE-004", type: "dine-in", tableNumber: 12, items: [
      { id: "ki7", name: "Grilled Lamb Chops", quantity: 2, addons: ["Mashed Potatoes"], allergens: [], station: "Grill", status: "pending", specialInstructions: "Medium rare please" },
      { id: "ki8", name: "Caesar Salad", quantity: 1, addons: ["Grilled Chicken"], allergens: ["eggs", "dairy", "gluten"], station: "Cold Station", status: "pending" },
    ], priority: "high", status: "pending", placedAt: "2026-03-28T13:45:00", estimatedPrepTime: 30, elapsedTime: 2, customerName: "Priya Nair", isVIP: true, specialInstructions: "VIP - Corporate client dinner",
  },
  {
    id: "ko5", orderNumber: "DE-005", type: "delivery", items: [
      { id: "ki9", name: "Veg Hakka Noodles", quantity: 2, addons: ["Extra Veggies"], allergens: ["gluten", "soy"], station: "Wok Station", status: "preparing" },
      { id: "ki10", name: "Paneer Tikka Masala", quantity: 1, addons: [], allergens: ["dairy", "nuts"], station: "Tandoor", status: "pending", specialInstructions: "NO NUTS - severe nut allergy" },
    ], priority: "rush", status: "in-progress", placedAt: "2026-03-28T12:15:00", estimatedPrepTime: 18, elapsedTime: 28, customerName: "Neha Gupta", isVIP: false, specialInstructions: "RUSH - Order delayed",
  },
];

// ==================== Customers ====================
export const customers: Customer[] = [
  { id: "cust1", name: "Rahul Sharma", email: "rahul.sharma@gmail.com", phone: "+91 98765 43210", avatar: img(80, 80, 501), joinedDate: "2025-06-15", totalOrders: 87, totalSpend: 42350, avgOrderValue: 487, lastOrderDate: "2026-03-28", loyaltyTier: "platinum", loyaltyPoints: 4235, favoriteItems: ["Butter Chicken", "Biryani", "Mango Lassi"], dietaryPreferences: ["non-veg"], allergens: [], notes: "Prefers spicy food, regular delivery customer", segment: "vip", visitFrequency: 5 },
  { id: "cust2", name: "Meera Patel", email: "meera.patel@outlook.com", phone: "+91 87654 32109", avatar: img(80, 80, 504), joinedDate: "2025-09-20", totalOrders: 34, totalSpend: 28900, avgOrderValue: 850, lastOrderDate: "2026-03-28", loyaltyTier: "gold", loyaltyPoints: 2890, favoriteItems: ["Truffle Mushroom Risotto", "Margherita Pizza"], dietaryPreferences: ["veg", "egg"], allergens: ["nuts"], notes: "Nut allergy (son). Always books for family. Prefers outdoor seating.", segment: "regular", visitFrequency: 3 },
  { id: "cust3", name: "Vikram Singh", email: "vikram.singh@company.com", phone: "+91 76543 21098", avatar: img(80, 80, 503), joinedDate: "2025-04-10", totalOrders: 112, totalSpend: 56000, avgOrderValue: 500, lastOrderDate: "2026-03-28", loyaltyTier: "platinum", loyaltyPoints: 5600, favoriteItems: ["Hyderabadi Dum Biryani"], dietaryPreferences: ["non-veg", "halal"], allergens: [], notes: "Corporate card user, hosts client lunches", segment: "vip", visitFrequency: 4 },
  { id: "cust4", name: "Ananya Reddy", email: "ananya.foodie@gmail.com", phone: "+91 65432 10987", avatar: img(80, 80, 502), joinedDate: "2025-11-01", totalOrders: 23, totalSpend: 12500, avgOrderValue: 543, lastOrderDate: "2026-03-28", loyaltyTier: "gold", loyaltyPoints: 1250, favoriteItems: ["Masala Dosa", "Tiramisu"], dietaryPreferences: ["veg", "vegan"], allergens: ["dairy"], notes: "Food blogger, photographs every dish", segment: "regular", visitFrequency: 2 },
  { id: "cust5", name: "Priya Nair", email: "priya.nair@techcorp.in", phone: "+91 54321 09876", avatar: img(80, 80, 505), joinedDate: "2026-01-05", totalOrders: 8, totalSpend: 9200, avgOrderValue: 1150, lastOrderDate: "2026-03-28", loyaltyTier: "silver", loyaltyPoints: 920, favoriteItems: ["Grilled Lamb Chops", "Caesar Salad"], dietaryPreferences: ["non-veg"], allergens: [], notes: "Corporate dinners, needs GST invoices", segment: "new", visitFrequency: 1 },
  { id: "cust6", name: "Suresh Rao", email: "suresh.rao@yahoo.com", phone: "+91 43210 98765", avatar: img(80, 80, 506), joinedDate: "2025-03-01", totalOrders: 45, totalSpend: 18750, avgOrderValue: 417, lastOrderDate: "2026-02-15", loyaltyTier: "gold", loyaltyPoints: 1875, favoriteItems: ["Biryani", "Kebabs"], dietaryPreferences: ["non-veg"], allergens: [], notes: "Family celebrations, large party bookings", segment: "at-risk", visitFrequency: 1 },
];

// ==================== Notifications ====================
export const notifications: AppNotification[] = [
  { id: "n1", type: "order", title: "New Delivery Order", message: "Order #DE-001 from Rahul Sharma - 3 items, INR 1,155", isRead: false, createdAt: "2026-03-28T12:30:00", actionUrl: "/dashboard/orders" },
  { id: "n2", type: "reservation", title: "New Reservation", message: "Meera Patel - 4 guests, Mar 29 at 7:30 PM (Birthday)", isRead: false, createdAt: "2026-03-27T14:00:00", actionUrl: "/dashboard/reservations" },
  { id: "n3", type: "review", title: "New 5-Star Review!", message: "Rahul Sharma: \"The Butter Chicken here is absolutely divine!\"", isRead: true, createdAt: "2026-03-27T20:30:00", actionUrl: "/dashboard/reviews" },
  { id: "n4", type: "alert", title: "Low Stock Alert", message: "Paneer (Fresh) is critically low - 3 kg remaining (par: 15 kg)", isRead: false, createdAt: "2026-03-28T08:00:00", actionUrl: "/dashboard/inventory" },
  { id: "n5", type: "review", title: "Negative Review Alert", message: "Priya Nair left a 2-star review. Respond promptly.", isRead: false, createdAt: "2026-03-23T13:30:00", actionUrl: "/dashboard/reviews" },
  { id: "n6", type: "system", title: "FSSAI License Expiring", message: "Your FSSAI license expires in 30 days. Renew to avoid suspension.", isRead: true, createdAt: "2026-03-20T09:00:00" },
  { id: "n7", type: "alert", title: "Mozzarella Out of Stock", message: "Mozzarella Cheese is out of stock. 3 menu items affected.", isRead: false, createdAt: "2026-03-28T10:00:00", actionUrl: "/dashboard/inventory" },
  { id: "n8", type: "promotion", title: "Weekend Offer Performance", message: "Your BOGO pizza offer generated 45 orders this weekend - 32% increase!", isRead: true, createdAt: "2026-03-28T07:00:00" },
];

// ==================== Analytics ====================
export const analyticsSummary: AnalyticsSummary = {
  totalRevenue: 284500, totalOrders: 347, avgOrderValue: 820, newCustomers: 48, returningCustomers: 186, avgRating: 4.5, tableTurnover: 2.8, foodCostPercentage: 28.5, revenueChange: 12.4, ordersChange: 8.2, aovChange: 3.8, ratingChange: 0.2,
};

export const revenueData: RevenueData[] = [
  { date: "Mar 22", revenue: 38500, orders: 47, avgOrderValue: 819 },
  { date: "Mar 23", revenue: 42300, orders: 52, avgOrderValue: 813 },
  { date: "Mar 24", revenue: 35200, orders: 41, avgOrderValue: 859 },
  { date: "Mar 25", revenue: 39800, orders: 48, avgOrderValue: 829 },
  { date: "Mar 26", revenue: 44100, orders: 55, avgOrderValue: 802 },
  { date: "Mar 27", revenue: 48600, orders: 58, avgOrderValue: 838 },
  { date: "Mar 28", revenue: 36000, orders: 46, avgOrderValue: 783 },
];

export const popularItems: PopularItem[] = [
  { name: "Hyderabadi Dum Biryani", quantity: 89, revenue: 42275, trend: "up", percentChange: 15 },
  { name: "Butter Chicken", quantity: 76, revenue: 32300, trend: "up", percentChange: 8 },
  { name: "Masala Dosa", quantity: 65, revenue: 12025, trend: "stable", percentChange: 1 },
  { name: "Truffle Mushroom Risotto", quantity: 42, revenue: 25200, trend: "up", percentChange: 22 },
  { name: "Margherita Pizza", quantity: 38, revenue: 13262, trend: "down", percentChange: -5 },
  { name: "Paneer Tikka Masala", quantity: 35, revenue: 13125, trend: "up", percentChange: 12 },
  { name: "Chicken Shawarma Wrap", quantity: 33, revenue: 8085, trend: "up", percentChange: 18 },
  { name: "Chocolate Lava Cake", quantity: 28, revenue: 8260, trend: "stable", percentChange: 2 },
];

export const peakHourData: PeakHourData[] = [
  { hour: 8, orders: 12, revenue: 2400 }, { hour: 9, orders: 18, revenue: 3600 },
  { hour: 10, orders: 15, revenue: 3000 }, { hour: 11, orders: 22, revenue: 5500 },
  { hour: 12, orders: 45, revenue: 18000 }, { hour: 13, orders: 52, revenue: 23400 },
  { hour: 14, orders: 38, revenue: 15200 }, { hour: 15, orders: 20, revenue: 8000 },
  { hour: 16, orders: 15, revenue: 6000 }, { hour: 17, orders: 18, revenue: 7200 },
  { hour: 18, orders: 28, revenue: 14000 }, { hour: 19, orders: 55, revenue: 33000 },
  { hour: 20, orders: 62, revenue: 40300 }, { hour: 21, orders: 48, revenue: 28800 },
  { hour: 22, orders: 30, revenue: 15000 }, { hour: 23, orders: 12, revenue: 4800 },
];
