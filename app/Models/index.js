const {Sequelize, DataTypes} = require("sequelize");
const dotenv = require('dotenv').config();

db_password = process.env.DB_PASSWORD
db_port = process.env.DB_PORT
db_user = process.env.DB_USER

const sequelize = new Sequelize(`postgres://${db_user}:${db_password}@localhost:${db_port}/elearning`)

sequelize.authenticate().then(() => {
        console.log(`Database connected`)
    }).catch((err)=> {
        console.log(err)
    })
    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

db.Users = require('./userModel')(sequelize,Sequelize)
db.Quizzes = require('./quizModel')(sequelize,Sequelize)

module.exports = db