const Rating = require('../models/Rating');

// 30 canonical ObjectIds matching Catalog exactly
const initialRatings = [
  // Butter & Shortened Cakes
  { cakeId: "60d5ecb8b392d41584c31101", totalRatings: 10, averageRating: 4.5 },
  { cakeId: "60d5ecb8b392d41584c31102", totalRatings: 10, averageRating: 4.2 },
  { cakeId: "60d5ecb8b392d41584c31103", totalRatings: 10, averageRating: 4.7 },
  { cakeId: "60d5ecb8b392d41584c31104", totalRatings: 10, averageRating: 4.8 },
  { cakeId: "60d5ecb8b392d41584c31105", totalRatings: 10, averageRating: 4.6 },
  { cakeId: "60d5ecb8b392d41584c31106", totalRatings: 10, averageRating: 4.4 },

  // Sponge & Foam Cakes
  { cakeId: "60d5ecb8b392d41584c31107", totalRatings: 10, averageRating: 4.3 },
  { cakeId: "60d5ecb8b392d41584c31108", totalRatings: 10, averageRating: 4.5 },
  { cakeId: "60d5ecb8b392d41584c31109", totalRatings: 10, averageRating: 4.1 },
  { cakeId: "60d5ecb8b392d41584c3110a", totalRatings: 10, averageRating: 4.0 },
  { cakeId: "60d5ecb8b392d41584c3110b", totalRatings: 10, averageRating: 4.2 },
  { cakeId: "60d5ecb8b392d41584c3110c", totalRatings: 10, averageRating: 4.6 },

  // Cheesecakes
  { cakeId: "60d5ecb8b392d41584c3110d", totalRatings: 10, averageRating: 4.8 },
  { cakeId: "60d5ecb8b392d41584c3110e", totalRatings: 10, averageRating: 4.7 },
  { cakeId: "60d5ecb8b392d41584c3110f", totalRatings: 10, averageRating: 4.5 },
  { cakeId: "60d5ecb8b392d41584c31110", totalRatings: 10, averageRating: 4.3 },
  { cakeId: "60d5ecb8b392d41584c31111", totalRatings: 10, averageRating: 4.6 },
  { cakeId: "60d5ecb8b392d41584c31112", totalRatings: 10, averageRating: 4.4 },

  // Speciality Chocolate Cakes
  { cakeId: "60d5ecb8b392d41584c31113", totalRatings: 10, averageRating: 4.7 },
  { cakeId: "60d5ecb8b392d41584c31114", totalRatings: 10, averageRating: 4.5 },
  { cakeId: "60d5ecb8b392d41584c31115", totalRatings: 10, averageRating: 4.4 },
  { cakeId: "60d5ecb8b392d41584c31116", totalRatings: 10, averageRating: 4.8 },
  { cakeId: "60d5ecb8b392d41584c31117", totalRatings: 10, averageRating: 4.2 },
  { cakeId: "60d5ecb8b392d41584c31118", totalRatings: 10, averageRating: 4.6 },

  // Celebration & Hybrid Cakes
  { cakeId: "60d5ecb8b392d41584c31119", totalRatings: 10, averageRating: 4.5 },
  { cakeId: "60d5ecb8b392d41584c3111a", totalRatings: 10, averageRating: 4.4 },
  { cakeId: "60d5ecb8b392d41584c3111b", totalRatings: 10, averageRating: 4.1 },
  { cakeId: "60d5ecb8b392d41584c3111c", totalRatings: 10, averageRating: 4.7 },
  { cakeId: "60d5ecb8b392d41584c3111d", totalRatings: 10, averageRating: 4.3 },
  { cakeId: "60d5ecb8b392d41584c3111e", totalRatings: 10, averageRating: 4.6 }
];

const seedDatabase = async () => {
  try {
    const count = await Rating.countDocuments();
    if (count === 0) {
      console.log('[Rating Seeder] Database empty. Seeding 30 initial aggregate ratings...');
      await Rating.insertMany(initialRatings);
      console.log('[Rating Seeder] Seeding complete.');
    } else {
      console.log(`[Rating Seeder] Database already contains ${count} aggregates. Skipping seed.`);
    }
  } catch (error) {
    console.error(`[Rating Seeder] Error during seeding: ${error.message}`);
  }
};

module.exports = seedDatabase;
