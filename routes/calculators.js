const Router = require('koa-router');
const router = new Router();
const ctrl = require('./../controllers/calculator')
const mdCtral = require('./../controllers/metadata')

// var ctrl = new UserController()
router.get('/getVersion', ctrl.getVersion)
router.post('/aff_calc',ctrl.aff_calc)
router.post('/getExtractionInput',mdCtral.getExtractionInput)
// router.get('/get/:domain', ctrl.show)
// router.put('/update', ctrl.update)
router.allowedMethods()
module.exports = router;
