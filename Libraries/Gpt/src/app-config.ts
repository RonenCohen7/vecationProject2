class AppConfig {
    public readonly apiKey = process.env.OPENAI_API_KEY
}

export const appConfig = new AppConfig();