const router = require('express').Router()

router.get('/', (req, res) => {
    console.log("AUTHENTICATE EXITOSO - SESSION:",req.session)
    res.send('Index routes').status(200)
})

router.get('/about', (req, res) => {
    console.log("AUTHENTICATE EXITOSO - SESSION:",req.session)
    res.send('Abou - index')
})

module.exports = router