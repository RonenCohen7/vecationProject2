import OpenAI, { } from "openai";
import { appConfig } from "./app-config";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";


class Gpt {
    private openai = new OpenAI({
        apiKey: appConfig.apiKey
    })

    public async getCompletion(systemContent: string, userContent: string): Promise<string> {

        const body: ChatCompletionCreateParamsNonStreaming = {
            model: "gpt-4o-mini",
            response_format:{type: "json_object"},
            messages: [
                { role: "system", content: systemContent },
                { role: "user", content: userContent }
            ]
        };

        const response = await this.openai.chat.completions.create(body);


        const completions = response.choices?.[0]?.message.content || "No recommendation";
        return JSON.parse(completions);

    }
}
export const gpt = new Gpt();