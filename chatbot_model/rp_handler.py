import runpod
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import os

hf_token = os.getenv("HF_TOKEN")


model_name = "Qwen/Qwen3-14B"

tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True, use_auth_token=hf_token)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True,
    use_auth_token=hf_token
)
model.eval()

def handler(job):
    job_input = job.get("input", {})
    user_message = job_input.get("message", "Hola, ¿cómo estás?")

    # Prepare the prompt
    messages = [
        {
            "role": "system",
            "content": "Eres un chatbot en español que ayudará al usuario a aprender español utilizando el modelo de aprendizaje conversacional. Mantén tus respuestas breves..."
        },
        {
            "role": "user",
            "content": user_message
        }
    ]

    prompt = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True,
        enable_thinking=True  # Enable thinking mode
    )

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    with torch.no_grad():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=512,
            temperature=0.7,
            top_p=0.95,
            top_k=20
        )

    response = tokenizer.decode(output_ids[0][inputs.input_ids.shape[1]:], skip_special_tokens=True)

    return {
        "response": response
    }


if __name__ == "__main__":
    runpod.serverless.start({"handler": handler})
