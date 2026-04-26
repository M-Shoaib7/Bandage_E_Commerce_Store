export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  category: ProductCategory;
  subcategory: string;
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
  stock: number;
}

export type ProductCategory = "clothes" | "shoes" | "leather" | "accessories";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

export interface WishlistItem {
  product: Product;
}

export interface FilterState {
  categories: ProductCategory[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: SortOption;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  shippingAddress: Omit<
    CheckoutFormData,
    "cardNumber" | "cardExpiry" | "cardCvc"
  >;
  createdAt: string;
  status: "pending" | "processing" | "shipped" | "delivered";
}
