const Cake = require('../models/Cake');

const demoCakes = [
  {
    name: "Classic Chocolate Truffle",
    description: "Rich chocolate cake layered with truffle frosting.",
    category: "Chocolate",
    price: 35.00,
    available: true,
    imageUrl: "/images/chocolate-truffle.jpg"
  },
  {
    name: "Strawberry Shortcake",
    description: "Light sponge cake with fresh strawberries and whipped cream.",
    category: "Fruit",
    price: 28.50,
    available: true,
    imageUrl: "/images/strawberry-shortcake.jpg"
  },
  {
    name: "Red Velvet Bliss",
    description: "Classic red velvet with cream cheese icing.",
    category: "Specialty",
    price: 40.00,
    available: true,
    imageUrl: "/images/red-velvet.jpg"
  },
  {
    name: "Vanilla Bean Dream",
    description: "Simple, elegant vanilla cake with buttercream.",
    category: "Vanilla",
    price: 25.00,
    available: true,
    imageUrl: "/images/vanilla-bean.jpg"
  },
  {
    name: "Seasonal Fruit Tart Cake",
    description: "A beautiful arrangement of seasonal fruits on a cake base.",
    category: "Fruit",
    price: 45.00,
    available: false, // Intentional unavailability case
    imageUrl: "/images/fruit-tart.jpg"
  }
];

const seedDatabase = async () => {
  try {
    const count = await Cake.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding demo cakes...');
      await Cake.insertMany(demoCakes);
      console.log('Seeding complete.');
    } else {
      console.log(`Database already contains ${count} cakes. Skipping seed to prevent duplicates.`);
    }
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
  }
};

module.exports = seedDatabase;
