import runpod
from huggingface_hub import InferenceClient
import os

# Get API token from environment variable
hf_token = os.getenv("HF_TOKEN")

# Initialize HF inference client
client = InferenceClient(
    provider="novita",
    api_key=hf_token,
)

# Main handler
def handler(job):
    job_input = job.get("input", {})
    user_message = job_input.get("message", "Hola, ¿cómo estás?")

    # Create chat completion
    try:
        completion = client.chat.completions.create(
            model="Qwen/Qwen3-235B-A22B",
            messages=[
                {
                    "role": "system",
                    "content": "Eres un chatbot en español que ayudará al usuario a aprender español utilizando el modelo de aprendizaje conversacional. Mantén tus respuestas breves..."
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            max_tokens=512
        )

        response = completion.choices[0].message.content
        return {
            "response": response
        }

    except Exception as e:
        return {
            "error": str(e)
        }

if __name__ == "__main__":
    runpod.serverless.start({"handler": handler})
