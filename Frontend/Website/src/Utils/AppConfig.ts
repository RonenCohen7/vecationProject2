class AppConfig {
    private readonly host = import.meta.env.VITE_API_URL || "http://localhost:4003";

    public readonly vacationUrl = this.host + "/api/vacation/vacation";
    public readonly loginUrl = this.host + "/api/auth/login";
    public readonly registerUrl = this.host + "/api/auth/register";
    public readonly likesUrl = this.host + "/api/likes/likes";
    public readonly likesCount = this.host + "/api/likes/likes/count";
    public readonly feedUrl = this.host + "/api/feed";
    public readonly imageUrl = this.host + "/images/";
    public readonly bookingUrl = this.host + "/api/booking";
}

export const appConfig = new AppConfig();