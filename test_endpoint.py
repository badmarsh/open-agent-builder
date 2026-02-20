from openai import OpenAI

client = OpenAI(
    base_url="http://127.0.0.1:8045/v1",
    api_key="sk-4c2ec6f80d904f35b2c1598b1464aaca"
)

response = client.chat.completions.create(
    model="gemini-3-pro-high",
    messages=[{"role": "user", "content": "Hello"}]
)

print(response.choices[0].message.content)
