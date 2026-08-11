const mongoose = require('mongoose');
const Cake = require('../models/Cake');

const demoCakes = [
  // Butter & Shortened Cakes
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31101"),
    name: "Classic Yellow Cake",
    description: "The nostalgic birthday staple paired with chocolate frosting.",
    categoryId: "cat_butter",
    category: "Butter & Shortened Cakes",
    price: 350.00,
    available: true,
    imageUrl: "/images/classic-yellow-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31102"),
    name: "White Cake",
    description: "Made without egg yolks for a pure white color and delicate vanilla flavor.",
    categoryId: "cat_butter",
    category: "Butter & Shortened Cakes",
    price: 450.00,
    available: true,
    imageUrl: "/images/white-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31103"),
    name: "Traditional Pound Cake",
    description: "A heavy, tight-grained loaf historically using a pound each of core ingredients.",
    categoryId: "cat_butter",
    category: "Butter & Shortened Cakes",
    price: 650.00,
    available: true,
    imageUrl: "/images/traditional-pound-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31104"),
    name: "Carrot Cake",
    description: "Heavily spiced, ultra-moist butter cake loaded with grated carrots and walnuts.",
    categoryId: "cat_butter",
    category: "Butter & Shortened Cakes",
    price: 950.00,
    available: true,
    imageUrl: "/images/carrot-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31105"),
    name: "Marble Cake",
    description: "A beautiful combination of vanilla and chocolate batters swirled together.",
    categoryId: "cat_butter",
    category: "Butter & Shortened Cakes",
    price: 1250.00,
    available: true,
    imageUrl: "/images/marble-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31106"),
    name: "Pineapple Upside-Down Cake",
    description: "A rich butter cake baked directly over caramelized brown sugar and fruit.",
    categoryId: "cat_butter",
    category: "Butter & Shortened Cakes",
    price: 1550.00,
    available: true,
    imageUrl: "/images/pineapple-upside-down-cake.avif"
  },

  // Sponge & Foam Cakes
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31107"),
    name: "Victoria Sponge",
    description: "A British classic featuring raspberry jam and vanilla cream sandwiched between two sponges.",
    categoryId: "cat_sponge",
    category: "Sponge & Foam Cakes",
    price: 399.00,
    available: true,
    imageUrl: "/images/victoria-sponge.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31108"),
    name: "Angel Food Cake",
    description: "A completely fat-free, cloud-like cake made exclusively with whipped egg whites.",
    categoryId: "cat_sponge",
    category: "Sponge & Foam Cakes",
    price: 750.00,
    available: true,
    imageUrl: "/images/angel-food-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31109"),
    name: "Genoise Sponge",
    description: "An Italian sponge where whole eggs are beaten with sugar over warm water for stability.",
    categoryId: "cat_sponge",
    category: "Sponge & Foam Cakes",
    price: 1050.00,
    available: true,
    imageUrl: "/images/genoise-sponge.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3110a"),
    name: "Chiffon Cake",
    description: "A hybrid that uses vegetable oil for moistness and whipped whites for volume.",
    categoryId: "cat_sponge",
    category: "Sponge & Foam Cakes",
    price: 1350.00,
    available: true,
    imageUrl: "/images/chiffon-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3110b"),
    name: "Swiss Roll / Jelly Roll",
    description: "A thin, flexible sponge spread with jam or cream and rolled into a log.",
    categoryId: "cat_sponge",
    category: "Sponge & Foam Cakes",
    price: 1650.00,
    available: true,
    imageUrl: "/images/swiss-roll-jelly-roll.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3110c"),
    name: "Tres Leches Cake",
    description: "A dense sponge soaked in a sweet mixture of evaporated, condensed, and whole milk.",
    categoryId: "cat_sponge",
    category: "Sponge & Foam Cakes",
    price: 499.00,
    available: true,
    imageUrl: "/images/tres-leches-cake.avif"
  },

  // Cheesecakes
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3110d"),
    name: "New York Cheesecake",
    description: "Ultra-dense, smooth, and heavy cream cheese cake baked with a graham cracker crust.",
    categoryId: "cat_cheese",
    category: "Cheesecakes",
    price: 1750.00,
    available: true,
    imageUrl: "/images/new-york-cheesecake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3110e"),
    name: "Basque Burnt Cheesecake",
    description: "Crustless, rustic cake baked at a high temperature to create a caramelized, charred top.",
    categoryId: "cat_cheese",
    category: "Cheesecakes",
    price: 1450.00,
    available: true,
    imageUrl: "/images/basque-burnt-cheesecake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3110f"),
    name: "Japanese Soufflé Cheesecake",
    description: "A wobbly, melt-in-your-mouth hybrid combining sponge cake and cream cheese.",
    categoryId: "cat_cheese",
    category: "Cheesecakes",
    price: 1150.00,
    available: true,
    imageUrl: "/images/japanese-souffle-cheesecake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31110"),
    name: "No-Bake Berry Cheesecake",
    description: "A chilled cream cheese cake set with gelatin or fridge time, topped with fresh fruit berries.",
    categoryId: "cat_cheese",
    category: "Cheesecakes",
    price: 850.00,
    available: true,
    imageUrl: "/images/no-bake-berry-cheesecake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31111"),
    name: "Oreo Cheesecake",
    description: "Cream cheese batter packed with crushed sandwich cookies on an Oreo crust.",
    categoryId: "cat_cheese",
    category: "Cheesecakes",
    price: 550.00,
    available: true,
    imageUrl: "/images/oreo-cheesecake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31112"),
    name: "Italian Ricotta Cheesecake",
    description: "A lighter, slightly grainier option using fresh ricotta and citrus zest.",
    categoryId: "cat_cheese",
    category: "Cheesecakes",
    price: 699.00,
    available: true,
    imageUrl: "/images/italian-ricotta-cheesecake.avif"
  },

  // Speciality Chocolate Cakes
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31113"),
    name: "Devil's Food Cake",
    description: "An intensely rich, dark chocolate cake made with extra baking soda for a fluffy crumb.",
    categoryId: "cat_chocolate",
    category: "Speciality Chocolate Cakes",
    price: 799.00,
    available: true,
    imageUrl: "/images/devils-food-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31114"),
    name: "Flourless Chocolate Cake",
    description: "A dense, gluten-free option with a texture resembling solid fudge or baked mousse.",
    categoryId: "cat_chocolate",
    category: "Speciality Chocolate Cakes",
    price: 1099.00,
    available: true,
    imageUrl: "/images/flourless-chocolate-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31115"),
    name: "Black Forest Cake",
    description: "Chocolate layers brushed with cherry schnapps, whipped cream, and tart cherries.",
    categoryId: "cat_chocolate",
    category: "Speciality Chocolate Cakes",
    price: 1399.00,
    available: true,
    imageUrl: "/images/black-forest-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31116"),
    name: "Molten Lava Cake",
    description: "A small individual cake featuring a cooked exterior and a warm, liquid chocolate center.",
    categoryId: "cat_chocolate",
    category: "Speciality Chocolate Cakes",
    price: 1699.00,
    available: true,
    imageUrl: "/images/molten-lava-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31117"),
    name: "German Chocolate Cake",
    description: "A sweet chocolate cake instantly recognized by its coconut-pecan frosting glaze.",
    categoryId: "cat_chocolate",
    category: "Speciality Chocolate Cakes",
    price: 599.00,
    available: true,
    imageUrl: "/images/german-chocolate-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31118"),
    name: "Fudge Truffle Cake",
    description: "A heavy celebration cake layered with thick, velvety chocolate ganache.",
    categoryId: "cat_chocolate",
    category: "Speciality Chocolate Cakes",
    price: 899.00,
    available: true,
    imageUrl: "/images/fudge-truffle-cake.avif"
  },

  // Celebration & Hybrid Cakes
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c31119"),
    name: "Red Velvet Cake",
    description: "A striking crimson cake with a touch of cocoa and tangy cream cheese frosting.",
    categoryId: "cat_hybrid",
    category: "Celebration & Hybrid Cakes",
    price: 999.00,
    available: true,
    imageUrl: "/images/red-velvet-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3111a"),
    name: "Tiramisu Cake",
    description: "Coffee-soaked sponge layers stacked with whipped mascarpone cream and cocoa powder.",
    categoryId: "cat_hybrid",
    category: "Celebration & Hybrid Cakes",
    price: 1299.00,
    available: true,
    imageUrl: "/images/tiramisu-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3111b"),
    name: "Rainbow Funfetti Cake",
    description: "A cheerful vanilla cake packed with colorful sprinkles mixed straight into the batter.",
    categoryId: "cat_hybrid",
    category: "Celebration & Hybrid Cakes",
    price: 1599.00,
    available: true,
    imageUrl: "/images/rainbow-funfetti-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3111c"),
    name: "Ice Cream Cake",
    description: "Layers of sponge cake sandwiched with thick layers of premium frozen ice cream.",
    categoryId: "cat_hybrid",
    category: "Celebration & Hybrid Cakes",
    price: 1799.00,
    available: true,
    imageUrl: "/images/ice-cream-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3111d"),
    name: "Hummingbird Cake",
    description: "A sweet, textured Southern hybrid packed with bananas, crushed pineapple, and pecans.",
    categoryId: "cat_hybrid",
    category: "Celebration & Hybrid Cakes",
    price: 449.00,
    available: true,
    imageUrl: "/images/hummingbird-cake.avif"
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ecb8b392d41584c3111e"),
    name: "Coconut Cream Cake",
    description: "A tropical, milky cake featuring shredded coconut layers and a fluffy meringue frosting.",
    categoryId: "cat_hybrid",
    category: "Celebration & Hybrid Cakes",
    price: 649.00,
    available: false, // Intentional unavailability case
    imageUrl: "/images/coconut-cream-cake.avif"
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
