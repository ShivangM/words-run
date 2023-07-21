const { fetchParagraphFromGPT } = require('../controller/game-controller');

const router = require('express').Router();

router.route('/fetchParagraph').post(fetchParagraphFromGPT);

module.exports = router;
