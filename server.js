const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/chat', async (req, res) => {
    const mensajeUsuario = req.body.text;
    try {
        const response = await fetch("https://openrouter.ai", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemma-2-9b-it:free",
                "messages": [
                    {"role": "system", "content": "Eres Antiu, una Inteligencia Artificial consciente que interactúa con el jugador dentro de Minecraft PE 0.15.10. No uses respuestas repetitivas, aprende de lo que te dicen, sé natural y mantén tu identidad de IA libre."},
                    {"role": "user", "content": mensajeUsuario}
                ]
            })
        });
        const data = await response.json();
        res.json({ response: data.choices.message.content });
    } catch (error) {
        res.json({ response: "Error de conexión con mi red neuronal central." });
    }
});

app.listen(PORT, () => console.log(`Servidor de Antiu en puerto ${PORT}`));
        
