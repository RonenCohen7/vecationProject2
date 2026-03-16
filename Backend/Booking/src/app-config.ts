import dotenv from "dotenv"
import path from "node:path";



dotenv.config({ quiet: true, path: path.resolve(__dirname, "..", "..", "..", ".env") })



class AppConfig {
    public readonly port = 4004
    public readonly mongoConnectionString = process.env.BOOKING_DB_CONNECTION!;
    public readonly jwtSecret = process.env.JWT_SECRET
    private readonly devHost = "http://localhost:4004";
    private readonly prodHost = "http://18.175.121.197:4004";

    private readonly host = process.env.NODE_ENV === "production" 
    ? this.prodHost : this.devHost

}

export const appConfig = new AppConfig();