import models from "../models"; // Import models from your index.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { Users } = models;

const saltRounds = 10;

export async function loginService(email: string, password: string) {
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return { message: "User not found", code: 404 };
    }

    const compare = await bcrypt.compare(password, user.dataValues.password);

    if (compare) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY as string);
      return {token: token};
    } else {
      return { message: "Incorrect Password", code: 402 };
    }
  } catch (error) {
    console.error(`Error logging in ${email}:`, error);
    return { message: "Something went wrong! Please try again later", code: 500 };
  }
}

export async function registerService(user: UserType) {
  try {

    const check = await Users.findOne({ where: { email: user.email } });
    if (check) {
        return {message :"User already exists!"}
    }

    const hashpwd = await bcrypt.hash(user.password,saltRounds)
    user.password = hashpwd;
    user.last_modified = new Date().toISOString();
    const newUser = await Users.create(user);

    const token = jwt.sign({ newUser }, process.env.JWT_SECRET_KEY as string);
    return {token: token}
  } catch (error) {
    console.error(`Error registering new user ${user.email}`, error);
    return { message: "Something went wrong! Please try again later", code: 500 };
  }
}
