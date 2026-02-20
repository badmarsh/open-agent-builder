import OpenAI from 'openai';

async function main() {
    const client = new OpenAI({
        baseURL: "http://192.168.0.101:8045/v1",
        apiKey: "sk-4c2ec6f80d904f35b2c1598b1464aaca"
    });

    try {
        const response = await client.chat.completions.create({
            model: "gemini-3-pro-high",
            messages: [{ "role": "user", "content": "Hello" }],
        });

        console.log(response.choices[0].message.content);
    } catch (e) {
        console.error("Error:", e);
    }
}

main();
