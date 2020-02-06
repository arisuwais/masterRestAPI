const router = global.express.Router();
const isCredential = require('../middlewares/verifyTokenAdmin');

// Import Local
const {
    GetHome,
    CreateVersion
} = require('../controllers');

router.get('/', GetHome);


module.exports = router;