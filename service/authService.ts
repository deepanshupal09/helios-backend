import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { fetchProvidersModel, fetchUserModel, registerUserModel } from "../models/authModel";

const saltRounds = 10;

export async function loginService(email: string, password: string) {
  try {
    const user = await fetchUserModel(email);

    if (!user) {
      return { message: "User not found", code: 404 };
    }

    console.log("user: ", user)

    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY as string);
      return { token: token };
    } else {
      return { message: "Incorrect Password", code: 402 };
    }
  } catch (error) {
    console.error(`Error logging in ${email}:`, error);
    return { message: "Something went wrong! Please try again later", code: 500 };
  }
}

export async function registerService(newUser: UserType) {
  try {
    const check = await fetchUserModel(newUser.email);
    if (check) {
      return { message: "User already exists!" };
    }

    console.log("check: ", check)

    const hashpwd = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashpwd;
    newUser.last_modified = new Date().toISOString();
    const user = await registerUserModel(newUser);

    const token = jwt.sign( {user} , process.env.JWT_SECRET_KEY as string);
    return { token: token };
  } catch (error) {
    console.error(`Error registering new user ${newUser.email}`, error);
    return { message: "Something went wrong! Please try again later", code: 500 };
  }
}

export async function fetchProvidersService() {
  try {
    const providers = await fetchProvidersModel();
    return providers;
  } catch(error) {
    console.log("Error fetching providers: ", error)
    return {message: "Something went wrong! Please try again later."}
  }
} 
