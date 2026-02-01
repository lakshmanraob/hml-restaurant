export interface Founder {
  name: string;
  title: string;
  yearStarted: number;
  story: string;
  vision: string;
}

export interface Chef {
  name: string;
  specialty: string;
  experience: string;
  description: string;
  image?: string;
}

export interface CulturalInfo {
  title: string;
  description: string;
  region: string;
}

// Founder information
export const founder: Founder = {
  name: "Madhavi",
  title: "Founder & Owner",
  yearStarted: 2010,
  story: `Madhavi founded HML Restaurant in 2010 with a vision to bring authentic Indian flavors to the heart of Bangalore's suburbs. Growing up in a family where food was a celebration of culture and togetherness, she dreamed of creating a space where families could gather, share meals, and create lasting memories.

Over the past 14 years, HML Restaurant has become more than just a dining destination—it has become part of countless family celebrations, first dates, business meetings, and cherished traditions. What started as a small family venture has grown into a beloved community staple, serving thousands of satisfied customers who have become part of our extended family.`,

  vision: "To preserve and celebrate the rich culinary heritage of India while creating a warm, welcoming space where every guest feels at home. We believe food is not just nourishment—it's a bridge between cultures, generations, and hearts."
};

// Chef profiles
export const chefs: Chef[] = [
  {
    name: "Chef Rajesh Kumar",
    specialty: "North Indian Cuisine",
    experience: "15+ years",
    description: "Master of tandoor and rich gravies, Chef Rajesh brings the authentic flavors of Punjab and Delhi to every dish. His signature butter chicken and dal makhani have won countless hearts.",
    image: "/images/chefs/chef-rajesh.jpg"
  },
  {
    name: "Chef Lakshmi Menon",
    specialty: "South Indian Delicacies",
    experience: "12+ years",
    description: "Expert in dosas, idlis, and authentic Kerala cuisine, Chef Lakshmi's crispy dosas and aromatic sambhar transport you straight to the streets of Chennai and the backwaters of Kerala.",
    image: "/images/chefs/chef-lakshmi.jpg"
  },
  {
    name: "Chef Arjun Singh",
    specialty: "Biryanis & Rice Dishes",
    experience: "10+ years",
    description: "Specializes in aromatic biryanis and pulao, Chef Arjun learned the art of dum cooking from masters in Hyderabad. His layered biryanis are a symphony of flavors and fragrances.",
    image: "/images/chefs/chef-arjun.jpg"
  }
];

// Cultural heritage information
export const culturalInfo: CulturalInfo[] = [
  {
    title: "North Indian Traditions",
    region: "Punjab, Delhi, Uttar Pradesh",
    description: "Rich, creamy gravies and tandoor-cooked specialties define North Indian cuisine. From butter chicken to naan bread, these dishes reflect the warmth and hospitality of the region. The use of dairy products, aromatic spices, and slow-cooking techniques creates layers of complex flavors."
  },
  {
    title: "South Indian Heritage",
    region: "Tamil Nadu, Kerala, Karnataka, Andhra Pradesh",
    description: "Light, healthy, and bursting with flavors—South Indian cuisine emphasizes rice, lentils, and coconut. Fermented batters create the crispy dosas and fluffy idlis that are breakfast staples. The balance of spices, tangy tamarind, and aromatic curry leaves defines this cuisine."
  },
  {
    title: "Street Food Culture",
    region: "Mumbai, Delhi, Kolkata, Bangalore",
    description: "India's vibrant street food scene represents the soul of its cities. From Mumbai's pav bhaji to Delhi's chaat, these quick bites are explosions of taste and texture. Street food is where innovation meets tradition, creating beloved snacks that unite people across all walks of life."
  },
  {
    title: "Festival Celebrations",
    region: "All India",
    description: "Indian festivals are incomplete without special foods. Diwali brings sweet treats like ladoos and halwa, Holi celebrates with refreshing thandai, and Eid features aromatic biryanis and kebabs. Each festival has its culinary traditions that bind communities together in celebration."
  }
];

// Restaurant values
export const restaurantValues = [
  {
    title: "Authenticity",
    description: "We use traditional recipes and cooking methods passed down through generations, ensuring every dish tastes just like home."
  },
  {
    title: "Quality Ingredients",
    description: "Fresh, locally-sourced vegetables and premium spices form the foundation of our kitchen. We never compromise on quality."
  },
  {
    title: "Family-Friendly",
    description: "From our spacious seating to our kid-friendly menu options, we welcome families and create a comfortable atmosphere for all ages."
  },
  {
    title: "Cultural Experience",
    description: "Beyond food, we celebrate Indian culture through our live music nights, festival specials, and warm hospitality that makes everyone feel at home."
  }
];
