const express = require('express'),
        sequelize = require('sequelize'),
        dotenv = require('dotenv').config(),
        cookieParser = require('cookie-parser'),
        db = require('./Models'),
        userRoutes = require('./Routes/userRoutes');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});