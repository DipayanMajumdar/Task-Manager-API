const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();

// Security & performance
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/health', healthRoutes);

// 404 and Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
