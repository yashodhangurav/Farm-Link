const sampleListings = [
  {
    title: "Mahindra 475 DI Tractor",
    type: "tractor",
    description: "Powerful 42 HP tractor suitable for all types of soil.",
    pricePerDay: 2000,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1616450656606-ff7c6f2145ec?auto=format&fit=crop&w=800&q=80", 
      filename: "tractor1" 
    },
    location: "Nashik",
    isAvailable: true,
    shareOnly: false,
    community: "River Valley Farmers",
  },
  {
    title: "John Deere Harvester 8500",
    type: "harvester",
    description: "High-efficiency harvester for large farms.",
    pricePerDay: 5000,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1617015390783-9d50f6c182e0?auto=format&fit=crop&w=800&q=80", 
      filename: "harvester1" 
    },
    location: "Pune",
    isAvailable: true,
    shareOnly: false,
    community: "Green Valley Farmers",
  },
  {
    title: "Sprayer 300L Capacity",
    type: "sprayer",
    description: "Efficient crop spraying machine with adjustable nozzles.",
    pricePerDay: 1000,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1611704122110-f3d7f1f9d6e2?auto=format&fit=crop&w=800&q=80", 
      filename: "sprayer1" 
    },
    location: "Ahmednagar",
    isAvailable: true,
    shareOnly: false,
    community: "Farmers United",
  },
  {
    title: "Plough Heavy Duty",
    type: "plough",
    description: "Strong plough for rocky soil, easy to attach to tractor.",
    pricePerDay: 800,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1581091012184-33e7b8b45c8b?auto=format&fit=crop&w=800&q=80", 
      filename: "plough1" 
    },
    location: "Satara",
    isAvailable: true,
    shareOnly: false,
    community: "Green Valley Farmers",
  },
  {
    title: "Seeder 500kg",
    type: "seeder",
    description: "Efficient seed planting machine, covers large areas quickly.",
    pricePerDay: 1500,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1611704122122-1a09fcb3f3b0?auto=format&fit=crop&w=800&q=80", 
      filename: "seeder1" 
    },
    location: "Aurangabad",
    isAvailable: true,
    shareOnly: false,
    community: "River Valley Farmers",
  },
  {
    title: "Irrigation Pump 3HP",
    type: "irrigation",
    description: "Portable water pump for irrigation purposes.",
    pricePerDay: 500,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1600195077076-c94c8cf5b1d5?auto=format&fit=crop&w=800&q=80", 
      filename: "pump1" 
    },
    location: "Kolhapur",
    isAvailable: true,
    shareOnly: true,
    community: "Farmers United",
  },
  {
    title: "Mini Tractor 30HP",
    type: "tractor",
    description: "Small tractor suitable for medium farms.",
    pricePerDay: 1200,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1616450656606-ff7c6f2145ec?auto=format&fit=crop&w=800&q=80", 
      filename: "tractor2" 
    },
    location: "Nashik",
    isAvailable: true,
    shareOnly: false,
    community: "River Valley Farmers",
  },
  {
    title: "Harvester 7500",
    type: "harvester",
    description: "Reliable harvester for wheat and rice fields.",
    pricePerDay: 4500,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1617015390783-9d50f6c182e0?auto=format&fit=crop&w=800&q=80", 
      filename: "harvester2" 
    },
    location: "Pune",
    isAvailable: true,
    shareOnly: false,
    community: "Green Valley Farmers",
  },
  {
    title: "High-capacity Sprayer 500L",
    type: "sprayer",
    description: "Covers large fields quickly, perfect for orchards.",
    pricePerDay: 2000,
    imageUrl: { 
      url: "https://images.unsplash.com/photo-1611704122110-f3d7f1f9d6e2?auto=format&fit=crop&w=800&q=80", 
      filename: "sprayer2" 
    },
    location: "Ahmednagar",
    isAvailable: true,
    shareOnly: true,
    community: "Farmers United",
  },
];

  module.exports = { data: sampleListings};