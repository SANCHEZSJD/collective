const {
  Userprofile,
  User,
  View
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


// The resolvers
const resolvers = {
  Query: {
    me: (root, args, { user }) => {
      if (user) {
        return User.findById({ _id: user.id });
      }
      return null;
    },
    users: (root, args) => {
      if (args.id) {
        return User.findById({ _id: args.id }).populate('userprofile');
      }
      return User.find({}).populate('userprofile');
    },
    userprofiles: (root, args) => {
      if (args.id) {
        return Userprofile.find({ _id: args.id });
      }
      return Userprofile.find({});
    },
    views: (root, args, ) => {
      if (args.id) {
        return View.find({ _id: args.id });
      }
      return View.find({});
    }
  },
  Mutation: {
    /**
     * Authentication
     */
    register: async (root, args) => {
      const dataUser = args;
      dataUser.password = await bcrypt.hash(dataUser.password, 12);
      var newUser = new User(dataUser);
      var saveUser = newUser.save();
      return saveUser;
    },
    login: async (root, { email, password }, { SECRET }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error('Not user with that email')
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrent password')
      }

      var token = jwt.sign({ user: _.pick(user, ['id', 'username']), }, SECRET, { expiresIn: 60 * 60 });

      return token;
    },
    /**
     * Userprofile
     */
    userprofileAdd: (root, args) => {
      var newUserprofile = new Userprofile(args);
      var saveUserprofile = newUserprofile.save();
      return saveUserprofile;
    },
    userprofileUpdate: (root, args) => {
      var id = args.id;
      try {
        var oldUserprofile = Userprofile.findByIdAndUpdate({ _id: id }, args);
      } catch (e) {
        throw Error(`Error: ${e}`)
      }
      return oldUserprofile;
    },
    userprofileRemove: (root, args) => {
      var id = args.id;
      try {
        var deleted = Userprofile.findByIdAndRemove({ _id: id });
        return deleted;
      } catch (e) {
        throw Error(`Error: ${e}`)
      }
    },
    /**
     * User
     */

    userUpdate: (root, args) => {
      var id = args.id;
      try {
        var oldUser = User.findByIdAndUpdate({ _id: id }, args);
      } catch (e) {
        throw Error(`Error: ${e}`)
      }
      return oldUser;
    },
    userRemove: (root, args) => {
      var id = args.id;
      try {
        var deleted = User.findByIdAndRemove({ _id: id });
        return deleted;
      } catch (e) {
        throw Error(`Error: ${e}`)
      }
    },

    /**
     * View
     */
    viewAdd: (root, args) => {
      var newView = new View(args);
      var saveView = newView.save();
      return saveView;
    },
    viewUpdate: (root, args) => {
      var id = args.id;
      try {
        var oldUser = View.findByIdAndUpdate({ _id: id }, args);
      } catch (e) {
        throw Error(`Error: ${e}`)
      }
      return oldUser;
    },
    viewRemove: (root, args) => {
      var id = args.id;
      try {
        var deleted = View.findByIdAndRemove({ _id: id });
        return deleted;
      } catch (e) {
        throw Error(`Error: ${e}`)
      }
    },
  }
};

module.exports = {
  resolvers
}