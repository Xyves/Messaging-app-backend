const passport = require('passport');
const prisma = require('../db/prisma.js')
const bcrypt = require('bcryptjs')

const login = passport.authenticate('local', {
  successRedirect: "/login-success",
  failureRedirect: "/login-failure"
});

const register = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    try {
      await prisma.users.create({ 
        data: {
          username: req.body.username,
          password: hashedPassword,
        }
      });
      res.redirect("/login");
    } catch(err) {
      return next(err);
    }
  })
}

const index = (req, res, next) => {
  res.render('index')
}

const loginForm = (req, res, next) => {
  res.render('login')
}

const registerForm = (req, res, next) => {
  res.render('register')
}

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  }
  );
}

const redirectIndex = (req, res, next) => {
  res.redirect('/');
}

const loginFailure =  (req, res, next) => {
  res.render('login', {errors:[{msg:'Username or password did not match'}]})
}

module.exports = {login, register, index, loginForm, registerForm, logout, redirectIndex, loginFailure}