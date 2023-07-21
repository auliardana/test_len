const express = require('express');
const passport = require('passport');

const router = express.Router();
// passport.authenticate('jwt', { session: false }),

//ini endpoint untuk yang tidak perlu authentifikasi
router.get('/payment',(req, res) => {
    res.send('ini endpoint yang bisa dipakai tanpa authorization');
  }
);

//ini endpoint yang perlu auth
router.get('/payment-auth', passport.authenticate('jwt', { session: false }),(req, res) => {
    res.send('ini endpoint yang harus pakai authorization');
  }
);

module.exports = router;
