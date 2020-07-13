const { Router } = require('express')
const { thumbnailTokenRegex } = require('../constants/regex')

const router = Router() // eslint-disable-line new-cap

router.get(`/:token(${thumbnailTokenRegex})`, (req, res) => res.status(200).json('thumbnail'))

module.exports = router
