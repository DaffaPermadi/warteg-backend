const db = require('./models');

async function testAssociations() {
  try {
    // Cek associations di model Order
    console.log('Order associations:', Object.keys(db.Order.associations));
    
    // Cek associations di model User
    console.log('User associations:', Object.keys(db.User.associations));
    
    // Contoh query dengan include, misal ambil 1 order beserta user dan slot
    const orderWithRelations = await db.Order.findOne({
      include: ['user', 'slot']
    });
    
    console.log('Order with relations:', orderWithRelations?.toJSON() || 'No order found');
  } catch (error) {
    console.error('Error testing associations:', error);
  } finally {
    await db.sequelize.close();
  }
}

testAssociations();
