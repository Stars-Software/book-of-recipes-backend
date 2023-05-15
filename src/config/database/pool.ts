const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize('application', 'admin', 'Qwerty123', {
  host: 'localhost',
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
