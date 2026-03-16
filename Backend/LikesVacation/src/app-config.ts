    import dotenv from "dotenv"
    import path from "node:path";

    dotenv.config({quiet: true, path: path.resolve(__dirname,"..","..","..",".env")})


class AppConfig {

    public readonly port = 4002;
    public readonly mongoConnectionString = process.env.LIKE_VACATION_DB_CONNECTION_STRING!;
    public readonly jwtSecret = process.env.JWT_SECRET
    
}

export const appConfig = new AppConfig();