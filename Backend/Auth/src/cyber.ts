import crypto from "crypto";
import { appConfig } from "./app-config";
import jwt, { SignOptions } from "jsonwebtoken"
import { IUserModel } from "./user-model";

class Cyber {

    public hash(plainText: string): string {
        const hashText = crypto.createHmac("sha512", appConfig.hashSalt).update(plainText).digest("hex");
        return hashText;
    }



}

export const cyber = new Cyber();
