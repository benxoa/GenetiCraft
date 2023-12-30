const axios = require("axios").default;

module.exports.ImageGenerate = async (req, res) => {
    const { prompt } = req.body;
    try {
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/image/generation",
            headers: {
                authorization: `Bearer ${process.env.EDEN_API}`,
            },
            data: {
                providers: "replicate",
                text: prompt,
                resolution: "1024x1024",
                fallback_providers: "",
                response_format: 'b64_json',
            },
        };

        const response = await axios.request(options);
  

     
        const image = response.data;
        res.status(200).json({ photo: image });

        
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: "Failed to generate image" });
    }
};
