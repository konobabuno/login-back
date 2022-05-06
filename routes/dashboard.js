const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        error:null,
        data:
        {
            title: 'RUTA PROTEGIDA',
            user: req.user
        }
    })
})

module.exports = router