import { UnauthorizedError, ValidationError } from "@vacation/restify";
import { cyber } from "./cyber";
import { IUserModel, UserModel } from "./user-model";
import { jwt } from "@vacation/jwt"


class UserService {

    public async register(user: IUserModel): Promise<string> {

        const error = user.validateSync();
        if (error) throw new ValidationError(error.message)

        user.email = user.email.trim().toLowerCase()
        const exists = await UserModel.exists({ email: user.email })
        if (exists) throw new ValidationError("Email already taken")
        user.password = cyber.hash(user.password)
        console.log("SECRET IN AUTH:", process.env.JWT_SECRET);

        try {
            await user.save();
        } catch (err: any) {
            if (err?.code === 11000) throw new ValidationError("Email already taken")
            throw err;
        }
        //Token
        const token = jwt.generateToken(user._id.toString(), user.role, user.firstName, user.lastName)
        return token

    }

    public async login(user: IUserModel): Promise<string> {

        const error = user.validateSync();
        if (error) throw new ValidationError(error.message)
        console.log("LOGIN EMAIL:", user.email);
        console.log("LOGIN PASSWORD:", user.password);
        user.password = cyber.hash(user.password)
        const dbUser = await UserModel.findOne({ email: user.email.trim().toLocaleLowerCase(), password: user.password }).exec();
        if (!dbUser) throw new UnauthorizedError("Incorrect email or password")



        //Token
        const token = jwt.generateToken(dbUser._id.toString(), dbUser.role, dbUser.firstName, dbUser.lastName)
        return token

    }

    

}

export const userService = new UserService();