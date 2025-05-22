"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Menu_Items", [
      // src={`/images/${item.menuItem.image}`}
      {
        name: "Pecel Sambal Lele",
        price: 21000,
        description:
          "Lele goreng yang gurih dan renyah dipadukan dengan sambal khas yang pedas menyegarkan. Dilengkapi dengan aneka sayuran rebus dan siraman bumbu pecel yang kaya rasa.",
        category: "food",
        image: "pecel-sambal-lele.svg",
        rating: 4.8,
        rating_count: 50,
        total_rating: 240,
        available_stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ikan Telur Rebus",
        price: 23000,
        description:
          "Perpaduan ikan berbumbu lembut dan telur rebus yang menyehatkan, disajikan dengan sayur segar dan sambal nikmat. Menu ringan tapi tetap mengenyangkan.",
        category: "food",
        image: "ikan-telur-rebus.svg",
        rating: 4.6,
        rating_count: 45,
        total_rating: 207,
        available_stock: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nasi Tempe Orek Telur",
        price: 28000,
        description:
          "Nasi putih hangat disajikan bersama tempe orek manis gurih, telur rebus, lalapan segar, dan sambal pelengkap. Cocok untuk kamu yang ingin makan enak tanpa ribet.",
        category: "food",
        image: "nasi-tempe-orek-telur.svg",
        rating: 4.7,
        rating_count: 35,
        total_rating: 164.5,
        available_stock: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nasi Goreng Cabe Merah",
        price: 33000,
        description:
          "Nasi goreng  cita rasa khas Bali, ditumis dengan bumbu pilihan dan disajikan bersama sambal matah pedas segar. Dilengkapi irisan cabai dan bawang untuk sensasi yang meledak di lidah.",
        category: "food",
        image: "nasi-goreng-cabe-merah.svg",
        rating: 4.5,
        rating_count: 100,
        total_rating: 450,
        available_stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Es Teh Manis",
        price: 8000,
        description:
          "Minuman segar yang terbuat dari teh hitam yang diseduh, disajikan dengan es dan sedikit gula. Menyegarkan dan cocok untuk menemani hidangan berat.",
        category: "drinks",
        image: "es-teh-manis.svg",
        rating: 4.4,
        rating_count: 80,
        total_rating: 352,
        available_stock: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Es Jeruk",
        price: 8000,
        description:
          "Minuman segar dari perasan jeruk manis yang dicampur dengan es batu. Menawarkan rasa asam manis yang menyegarkan, ideal untuk menghilangkan dahaga.",
        category: "drinks",
        image: "es-jeruk.svg",
        rating: 4.9,
        rating_count: 40,
        total_rating: 196,
        available_stock: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jus Melon",
        price: 9500,
        description:
          "Jus segar yang terbuat dari melon matang, kaya akan vitamin dan kelembapan. Rasanya manis dan menyegarkan, cocok dinikmati kapan saja.",
        category: "drinks",
        image: "jus-melon.svg",
        rating: 4.3,
        rating_count: 30,
        total_rating: 129,
        available_stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jus Jambu",
        price: 9500,
        description:
          "Jus dari jambu biji yang kaya akan vitamin C. Rasanya manis dan segar, membantu menjaga kesehatan tubuh.",
        category: "drinks",
        image: "jus-jambu.svg",
        rating: 4.5,
        rating_count: 25,
        total_rating: 112.5,
        available_stock: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nasi Putih",
        price: 6000,
        description:
          "Nasi putih pulen yang dimasak sempurna, menjadi pendamping ideal untuk berbagai hidangan. Sederhana namun selalu menggugah selera.",
        category: "additional",
        image: "nasi-putih.svg",
        rating: 4.2,
        rating_count: 150,
        total_rating: 630,
        available_stock: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sayur Kangkung",
        price: 7000,
        description:
          "Sayuran hijau yang ditumis dengan bawang dan bumbu sederhana. Kaya serat dan nutrisi, menjadikan hidangan lebih sehat.",
        category: "additional",
        image: "sayur-kangkung.svg",
        rating: 4.7,
        rating_count: 60,
        total_rating: 282,
        available_stock: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sayur Asem",
        price: 7000,
        description:
          "Sayur yang memiliki rasa asam segar, dibuat dengan berbagai sayuran dan kuah asam yang menggugah selera. Cocok sebagai pendamping nasi.",
        category: "additional",
        image: "sayur-asem.svg",
        rating: 4.8,
        rating_count: 200,
        total_rating: 960,
        available_stock: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
