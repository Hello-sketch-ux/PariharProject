interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  imageUrls: string[];
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Toilet Seat Cover",
    price: 450,
    originalPrice: 500,
    imageUrls: [
      "https://i.ibb.co/6JF1prNJ/Whats-App-Image-2025-05-15-at-20-17-00-1803226b.jpg",
      "https://i.ibb.co/fYyP8t4r/Whats-App-Image-2025-05-15-at-20-17-20-42c16cde.jpg"
    ],
    category: "Hygiene",
    description: "Disposable toilet seat cover for hygienic use in public restrooms."
  },
  {
    id: 2,
    title: "Parihar India Hygiene Kit",
    price: 450,
    originalPrice: 500,
    imageUrls: [
      "https://i.ibb.co/6JF1prNJ/Whats-App-Image-2025-05-15-at-20-17-00-1803226b.jpg",
      "https://i.ibb.co/fYyP8t4r/Whats-App-Image-2025-05-15-at-20-17-20-42c16cde.jpg"
    ],
    category: "Hygiene",
    description: "Complete hygiene kit with essential items for personal care and protection."
  },
  {
    id: 3,
    title: "Premium Toilet Seat Cover",
    price: 450,
    originalPrice: 500,
    imageUrls: [
      "https://i.ibb.co/6JF1prNJ/Whats-App-Image-2025-05-15-at-20-17-00-1803226b.jpg",
      "https://i.ibb.co/fYyP8t4r/Whats-App-Image-2025-05-15-at-20-17-20-42c16cde.jpg"
    ],
    category: "Hygiene",
    description: "Premium quality disposable toilet seat cover with extra protection."
  },
  {
    id: 4,
    title: "Travel Hygiene Kit",
    price: 299,
    originalPrice: 399,
    imageUrls: [
      "https://i.ibb.co/6JF1prNJ/Whats-App-Image-2025-05-15-at-20-17-00-1803226b.jpg",
      "https://i.ibb.co/fYyP8t4r/Whats-App-Image-2025-05-15-at-20-17-20-42c16cde.jpg"
    ],
    category: "Hygiene",
    description: "Compact travel-sized hygiene kit for on-the-go protection."
  },
  {
    id: 5,
    title: "Bulk Toilet Seat Covers",
    price: 599,
    originalPrice: 799,
    imageUrls: [
      "https://i.ibb.co/6JF1prNJ/Whats-App-Image-2025-05-15-at-20-17-00-1803226b.jpg",
      "https://i.ibb.co/fYyP8t4r/Whats-App-Image-2025-05-15-at-20-17-20-42c16cde.jpg"
    ],
    category: "Hygiene",
    description: "Bulk pack of disposable toilet seat covers for commercial use."
  },
  {
    id: 6,
    title: "Professional Hygiene Kit",
    price: 799,
    originalPrice: 999,
    imageUrls: [
      "https://i.ibb.co/6JF1prNJ/Whats-App-Image-2025-05-15-at-20-17-00-1803226b.jpg",
      "https://i.ibb.co/fYyP8t4r/Whats-App-Image-2025-05-15-at-20-17-20-42c16cde.jpg"
    ],
    category: "Hygiene",
    description: "Professional-grade hygiene kit for workplace and commercial settings."
  }
];