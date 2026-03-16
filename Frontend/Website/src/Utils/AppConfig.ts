    class AppConfig {

        // public readonly isDevelopment = (import.meta.env.MODE === "development");
        public readonly isDevelopment = import.meta.env.DEV;
        private readonly devHost = "http://localhost:4003";
        private readonly prodHost = "http://35.176.62.102:4003";

        private readonly host = this.isDevelopment ? this.devHost : this.prodHost;

        public readonly vacationUrl = this.host + "/api/vacation/vacation";
        public readonly loginUrl = this.host + "/api/auth/login";
        public readonly registerUrl = this.host + "/api/auth/register";
        public readonly likesUrl = this.host + "/api/likes/likes";
        public readonly likesCount = this.host + "/api/likes/likes/count";
        public readonly feedUrl = this.host + "/api/feed";
        public readonly imageUrl = this.host + "/images/";
        public readonly bookingUrl = this.host + "/api/booking"

      
    }

    export const appConfig = new AppConfig();