const router = require('express').Router();
const { User } = require('../../models');

router.post('/newUser', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
    });

    // Saves the session as logged in
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.name;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// For loggin in
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Sorry, the account could not be found' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Sorry, it looks like your password was incorrect, please try again' });
      return;
    }

    // Saving the session as logged in
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

// Logs the user out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
