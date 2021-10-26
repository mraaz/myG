module.exports = async (job) => {
  const ClashRoyaleController = require('../../../Controllers/Http/ClashRoyaleController')
  const auth = { user: { id: 1 } }
  await new ClashRoyaleController().reminder_service({ auth })
}
