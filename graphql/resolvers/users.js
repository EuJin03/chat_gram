import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server";

import User from "../../model/User.js";
import generateToken from "../../utils/generateToken.js";
import { validateRegisterInput } from "../../utils/validators.js";

export default {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) => {
      // TODO: Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // TODO: Make sure user does not already exist
      const userExist = await User.findOne({ username });
      const emailExist = await User.findOne({ email });

      if (userExist) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is already taken",
          },
        });
      }

      if (emailExist) {
        throw new UserInputError("Email is already taken", {
          errors: {
            email: "This email is already taken",
          },
        });
      }

      // TODO: hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res.id, res.email, res.username);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
