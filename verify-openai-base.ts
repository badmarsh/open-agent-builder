import { POST } from './app/api/execute-guardrails/route';

async function run() {
    process.env.OPENAI_API_KEY = "sk-4c2ec6f80d904f35b2c1598b1464aaca";
    process.env.OPENAI_BASE_URL = "http://192.168.0.101:8045/v1";

    const req = new Request('http://localhost/api', {
        method: 'POST',
        body: JSON.stringify({
            text: "hello world",
            checks: { moderation: true },
            model: "openai/gpt-4o"
        })
    });

    try {
        const res = await POST(req as any);
        const data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Caught error:", e);
    }
}

run();
