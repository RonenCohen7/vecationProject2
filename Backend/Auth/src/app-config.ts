import dotenv from "dotenv"
import path from "node:path";

dotenv.config({quiet: true, path: path.resolve(__dirname,"..","..","..",".env")})
class AppConfig {

    public readonly port = 4000;
    public readonly mongoConnectionString = process.env.AUTH_DB_CONNECTION_STRING!;
    public readonly hashSalt = "אין הטיפה חוצבת מכוח עוצמתה אלה מכוח התמדתה"
    public readonly jwtSecret = process.env.JWT_SECRET
    
}

export const appConfig = new AppConfig();