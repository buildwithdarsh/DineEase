// ==================== Core Types ====================

export type OrderType = "dine-in" | "takeaway" | "delivery";
export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready"
  | "served"
  | "dispatched"
  | "delivered"
  | "completed"
  | "feedback"
  | "cancelled";

export type DietaryTag =
  | "veg"
  | "non-veg"
  | "egg"
  | "vegan"
  | "jain"
  | "gluten-free"
  | "halal"
  | "keto"
  | "nut-free"
  | "dairy-free"
  | "low-calorie";

export type AllergenTag =
  | "gluten"
  | "nuts"
  | "dairy"
  | "soy"
  | "shellfish"
  | "eggs"
  | "mustard"
  | "celery"
  | "sesame";

export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

export type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

export type ReservationStatus =
  | "confirmed"
  | "seated"
  | "completed"
  | "cancelled"
  | "no-show";

export type StaffRole =
  | "owner"
  | "manager"
  | "chef"
  | "line-cook"
  | "waiter"
  | "host"
  | "cashier"
  | "delivery-coordinator";

export type SubscriptionTier = "starter" | "growth" | "pro" | "enterprise";

export type LoyaltyTier = "silver" | "gold" | "platinum";

export type PaymentMethod =
  | "upi"
  | "credit-card"
  | "debit-card"
  | "net-banking"
  | "wallet"
  | "cash"
  | "pay-later"
  | "gift-card"
  | "corporate-card";

export type CuisineType =
  | "North Indian"
  | "South Indian"
  | "Chinese"
  | "Italian"
  | "Japanese"
  | "Mexican"
  | "Continental"
  | "Street Food"
  | "Bakery"
  | "Cafe"
  | "Thai"
  | "Korean"
  | "Mediterranean"
  | "Mughlai"
  | "Bengali"
  | "Biryani"
  | "Pizza"
  | "Burger"
  | "Seafood"
  | "Desserts";

export type InquiryType =
  | "general"
  | "reservation"
  | "private-dining"
  | "catering"
  | "feedback";

// ==================== Restaurant ====================

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  images: string[];
  cuisines: CuisineType[];
  priceRange: PriceRange;
  rating: number;
  reviewCount: number;
  averageCost: number;
  distance: number;
  deliveryTime: number;
  address: string;
  city: string;
  area: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  openingHours: string;
  isOpen: boolean;
  isPromoted: boolean;
  fssaiLicense: string;
  amenities: string[];
  dietaryOptions: DietaryTag[];
  subscriptionTier: SubscriptionTier;
  totalTables: number;
  activeOffers: Offer[];
  popularDishes: MenuItem[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountType: "percent" | "flat" | "bogo" | "free-delivery" | "free-item";
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

// ==================== Menu ====================

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  sortOrder: number;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  dietaryTag: DietaryTag;
  allergens: AllergenTag[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  prepTime: number;
  isAvailable: boolean;
  isBestseller: boolean;
  isNew: boolean;
  isChefSpecial: boolean;
  rating: number;
  reviewCount: number;
  variants?: MenuVariant[];
  addons?: MenuAddon[];
  tags: string[];
  category?: string;
}

export interface MenuVariant {
  id: string;
  name: string;
  price: number;
}

export interface MenuAddon {
  id: string;
  name: string;
  price: number;
  isDefault: boolean;
}

// ==================== Orders ====================

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  tip: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid" | "refunded" | "failed";
  tableNumber?: number;
  specialInstructions?: string;
  estimatedPrepTime: number;
  actualPrepTime?: number;
  placedAt: string;
  confirmedAt?: string;
  preparedAt?: string;
  completedAt?: string;
  deliveryPartner?: DeliveryPartner;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  variant?: string;
  addons: string[];
  specialInstructions?: string;
  dietaryTag: DietaryTag;
}

// ==================== Reservation ====================

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  seatingPreference: "indoor" | "outdoor" | "bar" | "private" | "any";
  specialOccasion?: string;
  specialRequests?: string;
  status: ReservationStatus;
  tableNumber?: number;
  createdAt: string;
}

// ==================== Table ====================

export interface Table {
  id: string;
  number: number;
  capacity: number;
  section: "indoor" | "outdoor" | "bar" | "private";
  status: TableStatus;
  currentOrderId?: string;
  reservationId?: string;
  seatedAt?: string;
  shape: "round" | "square" | "rectangle";
  x: number;
  y: number;
}

// ==================== Staff ====================

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  email: string;
  phone: string;
  avatar: string;
  joinedDate: string;
  isActive: boolean;
  shiftStart?: string;
  shiftEnd?: string;
  ordersToday: number;
  avgServiceTime: number;
  rating: number;
  tipsToday: number;
}

// ==================== Inventory ====================

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  parLevel: number;
  reorderLevel: number;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  status: "in-stock" | "low" | "critical" | "out-of-stock";
}

// ==================== Review ====================

export interface Review {
  id: string;
  restaurantId: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  overallRating: number;
  foodRating: number;
  serviceRating: number;
  ambianceRating: number;
  valueRating: number;
  comment: string;
  photos: string[];
  dishesReviewed: string[];
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  restaurantResponse?: string;
  respondedAt?: string;
}

// ==================== Delivery ====================

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  vehicle: string;
  vehicleNumber: string;
  rating: number;
  totalDeliveries: number;
  currentLocation?: { lat: number; lng: number };
  eta?: number;
}

// ==================== Analytics ====================

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
}

export interface PopularItem {
  name: string;
  quantity: number;
  revenue: number;
  trend: "up" | "down" | "stable";
  percentChange: number;
}

export interface PeakHourData {
  hour: number;
  orders: number;
  revenue: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  newCustomers: number;
  returningCustomers: number;
  avgRating: number;
  tableTurnover: number;
  foodCostPercentage: number;
  revenueChange: number;
  ordersChange: number;
  aovChange: number;
  ratingChange: number;
}

// ==================== KDS ====================

export interface KitchenOrder {
  id: string;
  orderNumber: string;
  type: OrderType;
  tableNumber?: number;
  items: KitchenOrderItem[];
  specialInstructions?: string;
  priority: "normal" | "high" | "rush";
  status: "pending" | "in-progress" | "ready" | "served";
  placedAt: string;
  estimatedPrepTime: number;
  elapsedTime: number;
  station?: string;
  customerName: string;
  isVIP: boolean;
}

export interface KitchenOrderItem {
  id: string;
  name: string;
  quantity: number;
  variant?: string;
  addons: string[];
  specialInstructions?: string;
  allergens: AllergenTag[];
  station: string;
  status: "pending" | "preparing" | "done";
}

// ==================== CRM ====================

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinedDate: string;
  totalOrders: number;
  totalSpend: number;
  avgOrderValue: number;
  lastOrderDate: string;
  loyaltyTier: LoyaltyTier;
  loyaltyPoints: number;
  favoriteItems: string[];
  dietaryPreferences: DietaryTag[];
  allergens: AllergenTag[];
  notes: string;
  segment: "new" | "regular" | "vip" | "at-risk" | "churned";
  visitFrequency: number;
}

// ==================== Notification ====================

export interface AppNotification {
  id: string;
  type: "order" | "reservation" | "review" | "alert" | "promotion" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// ==================== Collection ====================

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  restaurantCount: number;
  slug: string;
}

// ==================== Static Site ====================

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryTab;
  width: number;
  height: number;
}

export type GalleryTab = "food" | "ambiance" | "events" | "kitchen";

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  occasion: string;
  date: string;
}

export interface EventSpace {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChefProfile {
  name: string;
  title: string;
  image: string;
  bio: string;
  journey: string;
  awards: string[];
  quote: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  cuisine: string;
  heritage: string;
  stats: { label: string; value: string }[];
  address: string;
  phone: string;
  email: string;
  hours: {
    lunch: string;
    dinner: string;
  };
  socials: {
    instagram: string;
    zomato: string;
    google: string;
  };
}

export interface StaticMenuCategory {
  id: string;
  label: string;
  description: string;
}

// ==================== Contact ====================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
}
