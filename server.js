// server.js

// Top part (from the second screenshot):
// Import necessary modules
const express = require('express');
const connectToDB = require('./database/db'); // Assuming this is your DB connection
const authRoutes = require('./routers/auth-router'); // From the first screenshot
const homeRoutes = require('./routers/home-routes'); // From the first screenshot
const adminRoutes = require('./routers/admin-router'); // From the first screenshot
const uploadImageRoutes = require('./routers/image-routes'); // As seen in both screenshots

// Call connectToDB (assuming it's a function that establishes DB connection)
connectToDB();

// Initialize express app
const app = express();

// Configure port
const PORT = process.env.PORT || 3000; // Using process.env.PORT for flexibility, default to 3000

// Middlewares (from the first screenshot, `app.use` calls)
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes); // This line is inferred from the `uploadImageRoutes` import and typical express routing patterns

// Start the server
app.listen(PORT, () => {
    console.log(`Server is now listening to PORT ${PORT}`);
});