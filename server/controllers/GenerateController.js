const express = require('express')
const {Configuration,OpenAIApi} = require("openai");




module.exports.OpenAi = async (req, res) => {
    const config =  new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    const openai = new OpenAIApi(config);
    try {
        const { prompt } = req.body;
        const aiRes = await openai.createImage({
          prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json',
        });
        const image = aiRes.data.data[0].b64_json;
        res.status(200).json({ photo: image });
      } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
      }
}