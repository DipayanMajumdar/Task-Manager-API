const router = require('express').Router();
const { body, param } = require('express-validator');
const apicache = require('apicache');
const auth = require('../middleware/auth');
const controller = require('../controllers/task.controller');

const cache = apicache.options({ appendKey: (req) => req.userId }).middleware;

// All routes below require authentication
router.use(auth);

router.post('/', [body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 chars')], controller.createTask);

router.get('/', cache(process.env.CACHE_TTL || '5 minutes'), controller.getTasks);

router.get('/:id', [param('id').isMongoId().withMessage('Invalid task id')], controller.getTaskById);

router.patch(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid task id'),
    body('title').optional().isLength({ min: 3 }).withMessage('Title must be at least 3 chars'),
    body('completed').optional().isBoolean().withMessage('Completed must be boolean'),
  ],
  controller.updateTask
);

router.delete('/:id', [param('id').isMongoId().withMessage('Invalid task id')], controller.deleteTask);

module.exports = router;
