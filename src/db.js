require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const bcrypt = require("bcrypt");

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_TABLE, DB_PORT, NODE_ENV
} = process.env;

const config = {
  development: {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  },
  production:{
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialect: 'postgres',
      ssl: true,
      protocol: "postgres",
      dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false // <<<<<< YOU NEED THIS
          }
      }
  }
}

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_TABLE}`, config[NODE_ENV || 'development'] );

/*const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;*/

/*const sequelize = new Sequelize(
  `postgres://psodlwqogvcxvp:5626392dae222d0f33c26f8725a155dc95c0423ea0612628dfebd65cb4a97064@ec2-54-235-108-217.compute-1.amazonaws.com:5432/d22mpv9rjdcdlm`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    operatorsAliases: false,
  }
);*/
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Product,
  Categories,
  User,
  Comment,
  Order,
  OrderLine,
  Review,
  InformationUser,
  Likes,
  Messages
} = sequelize.models;

// PRODUCTS CATEGORIES
Product.belongsToMany(Categories, { through: 'Products_Categories', as: 'categories' });
Categories.belongsToMany(Product, { through: 'Products_Categories', as: 'products' });

// PRODUCTS REVIEWS
Product.belongsToMany(Review, { through: 'Products_Reviews', as: 'reviews' });
Review.belongsToMany(Product, { through: 'Products_Reviews', as: 'products' });

// PRODUCTS COMMENTS
Product.hasMany(Comment, {foreignKey: "productId"});
Comment.belongsTo(Product);


// PRODUCTS LIKES
Product.belongsToMany(Likes, { through: 'Products_Likes', as: 'likes' });
Likes.belongsToMany(Product, { through: 'Products_Likes', as: 'products' });

// ORDER ORDERLINE
Order.hasMany(OrderLine, { foreignKey: "orderId" });
OrderLine.belongsTo(Order);

// USERS MESSAGES
User.belongsToMany(Messages, { through: 'User_Messages', as: 'messages' });
Messages.belongsToMany(User, { through: 'User_Messages', as: 'users' });

//USER INFORMATIONUSER
User.hasOne(InformationUser, { foreignKey: "userId" });
InformationUser.belongsTo(User);

//BEFORE CREATE QUERY
User.beforeCreate(async (user) => {
  if (user.password_virtual) {
    const encryptPassword = await bcrypt.hash(user.password_virtual, 10);
    user.password = encryptPassword;
  }
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
