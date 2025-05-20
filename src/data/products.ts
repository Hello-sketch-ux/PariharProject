interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Traditional Indian Dress",
    price: 450,
    originalPrice: 500,
    imageUrl: "https://sony.scene7.com/is/image/sonyglobalsolutions/02-16?$large360ViewerImage$",
    category: "Clothing",
    description: "Beautiful traditional Indian dress with intricate embroidery work, perfect for special occasions."
  },
  {
    id: 2,
    title: "Handcrafted Jewelry",
    price: 450,
    originalPrice: 500,
    imageUrl: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800",
    category: "Jewelry",
    description: "Exquisite handcrafted jewelry piece featuring traditional Indian designs."
  },
  {
    id: 3,
    title: "Silk Saree",
    price: 450,
    originalPrice: 500,
    imageUrl: "https://zariknyaa.com/cdn/shop/files/AVADH_2.jpg?v=1718795812",
    category: "Clothing",
    description: "Premium silk saree with beautiful patterns and rich colors."
  },
  {
    id: 4,
    title: "Traditional Bangles Set",
    price: 299,
    originalPrice: 399,
    imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800",
    category: "Jewelry",
    description: "Colorful set of traditional bangles perfect for festive occasions."
  },
  {
    id: 5,
    title: "Embroidered Shawl",
    price: 599,
    originalPrice: 799,
    imageUrl: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    description: "Warm and elegant shawl with traditional embroidery patterns."
  },
  {
    id: 6,
    title: "Designer Kurta",
    price: 799,
    originalPrice: 999,
    imageUrl: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800",
    category: "Clothing",
    description: "Modern designer kurta with traditional elements, perfect for casual wear."
  }
];