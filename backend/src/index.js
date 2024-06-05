const express = require('express');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const processHistoryRoutes = require('./routes/processHistoryRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/images', imageRoutes);
app.use('/process-history', processHistoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
