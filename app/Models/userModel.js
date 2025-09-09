module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define( "user", {
        user_id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
           type: DataTypes.STRING,
           allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
   }, {timestamps: true}, )
   return User
}