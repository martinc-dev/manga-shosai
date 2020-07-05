const { Router } = require('express')
const { uuidV4Regex } = require('../constants/regex')

const router = Router() // eslint-disable-line new-cap

router.get('/', (req, res) => res.status(200).json('folder'))
router.get(`/:uuid(${uuidV4Regex})`, (req, res) => res.status(200).json('folder'))

module.exports = router
