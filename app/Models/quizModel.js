module.exports = (sequelize, DataTypes) => {
   const Quiz = sequelize.define( "quiz", {
        topic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        question:{
            type: DataTypes.JSONB,
            allowNull: false
        }
    }, {timestamps: true}, )
   return Quiz
}