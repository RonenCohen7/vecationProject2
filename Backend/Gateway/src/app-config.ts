
import dotenv from "dotenv"
import path from "node:path";

dotenv.config({ quiet: true, path: path.resolve(__dirname, "..", "..", "..", ".env") })



class AppConfig {
    public readonly port = 4003;

    public readonly authUrl = process.env.AUTH_URL!;
    public readonly vacationUrl = process.env.VACATION_URL!;
    public readonly likesUrl = process.env.LIKE_VACATION_URL!;
    public readonly bookingUrl = process.env.BOOKING_URL!;
}

export const appConfig = new AppConfig();
