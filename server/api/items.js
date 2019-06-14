const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await Item.findAll())
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Item.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    res.json(await Item.create(req.body))
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const id = req.body.item.id
    const item = await Item.findByPk(id)
    if (!item) return res.sendStatus(500)

    let updateAmount = req.body.item.inventory + req.body.change
    if (updateAmount < 0) updateAmount = 0

    const updatedItem = {
      inventory: updateAmount
    }

    res.json(await item.update(updatedItem))
  } catch (err) {
    next(err)
  }
})
