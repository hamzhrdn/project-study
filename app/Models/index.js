const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(`postgresql://postgres:hamzah123@localhost:5432/elearning`)

sequelize.authenticate().then(() => {
        console.log(`Database connected`)
    }).catch((err)=> {
        console.log(err)
    })
    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

db.Users = require('./userModel')(sequelize,Sequelize)
module.exports = db