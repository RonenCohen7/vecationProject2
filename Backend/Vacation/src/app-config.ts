import dotenv from "dotenv"
import path from "node:path";

dotenv.config({quiet: true, path: path.resolve(__dirname,"..","..","..",".env")})


class AppConfig {

    public readonly port = 4001;
    public readonly mongoConnectionString = process.env.VACATION_DB_CONNECTION_STRING!;
    public readonly jwtSecret = process.env.JWT_SECRET
    
    public readonly vacationImages = process.env.NODE_ENV === "production" ? "/app/Backend/Vacation/uploads" : path.join(__dirname,"..","..","..","uploads")
   
    private readonly devHost = "http://localhost:4001";
    private readonly prodHost = "http://18.175.121.197:4003";

    private readonly host = process.env.NODE_ENV === "production"
        ?this.prodHost : this.devHost
    
    public readonly vacationWebUrl = this.host + "/images/";
   
}

export const appConfig = new AppConfig();