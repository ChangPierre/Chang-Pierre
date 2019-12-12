const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
	//console.log(req.body);
	//console.log(req.cookies);
	//console.log(req.session);
	Object.assign(req.session, req.body);
	res.send('true');
});

module.exports = router;
