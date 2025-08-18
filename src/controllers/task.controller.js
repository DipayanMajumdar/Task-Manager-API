const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const { ok } = require('../utils/apiResponse');

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const task = await Task.create({
      title: req.body.title,
      completed: req.body.completed ?? false,
      owner: req.userId,
    });
    res.status(201).json(ok(task, 'Task created'));
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json(ok(tasks));
  } catch (err) { next(err); }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.userId });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json(ok(task));
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { $set: updates },
      { new: true }
    );
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json(ok(task, 'Task updated'));
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json(ok(null, 'Task deleted'));
  } catch (err) { next(err); }
};
