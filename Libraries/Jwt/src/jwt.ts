import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";



const secret = process.env.JWT_SECRET as string;


class Jwt {

    public generateToken(userId: string, role: string, firstName:string, lastName:string): string {

        // Payload:
        const container = { userId, role, firstName, lastName }; // ID Token - is a JWT token containing only the user id.

        // Create options:
        const options: SignOptions = { expiresIn: "3h" };

        // Generate the token:
        const token = jsonwebtoken.sign(container, appConfig.jwtSecret, options);

        // Return the token:
        return token;
    }

    public verifyToken(token: string): boolean {
        
        try {
            
            if (!token) return false;
            jsonwebtoken.verify(token, appConfig.jwtSecret); // Crash if not valid.
            console.log("🔥 NEW JWT MIDDLEWARE VERSION 🔥");
            return true;
        }
        catch (err: any) {
            return false;
        }
    }


    

    public getUserId(token: string): string | null {
        try {
            if (!token) return null;
            const container = jsonwebtoken.decode(token) as { userId: string };
            const userId = container.userId;
            return userId;
        }
        catch (err: any) {
            return null;
        }
    }

    public getRole(token: string): string | null {
        try {
            if (!token) return null;
            const container = jsonwebtoken.decode(token) as { role: string }
            return container.role
        } catch (err: any) {
            return null
        }
    }


    public decoded(token:string):any{
        return jsonwebtoken.verify(token, appConfig.jwtSecret)
    }

}

export const jwt = new Jwt();
