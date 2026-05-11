const router = require('express').Router()
const Task = require('../models/Task')

/* CREATE */
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json(error)
  }
})

/* READ */
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json(error)
  }
})

/* DELETE */
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)

    res.json({
      message: 'Task deleted successfully',
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedTask)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router