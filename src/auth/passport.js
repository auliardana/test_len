const passport = require('passport');
const passportJwt = require('passport-jwt');

const { ExtractJwt } = passportJwt;
const StrategyJwt = passportJwt.Strategy;
// const User = require('../models/user');

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    ((jwtPayload, done) => User.findOne({ where: { id: jwtPayload.id } })
      .then((user) => done(null, user))
      .catch((err) => done(err)))
  )
);

// // Middleware Passport untuk melindungi endpoint
// const authenticateJwt = passport.authenticate('jwt', { session: false });

// // Middleware untuk melindungi endpoint hanya untuk pengguna dengan peran admin
// const protectAdminRoute = (req, res, next) => {
//   const userRole = req.user.role; // Asumsikan peran pengguna disimpan dalam properti 'role'

//   if (userRole === 'admin') {
//     next(); // Jika pengguna memiliki peran admin, lanjutkan ke endpoint berikutnya
//   } else {
//     res.status(403).json({ error: 'Unauthorized access' }); // Jika pengguna bukan admin, kirimkan respon 'Unauthorized'
//   }
// };

// module.exports = {
//   authenticateJwt: authenticateJwt,
//   protectAdminRoute: protectAdminRoute
// };