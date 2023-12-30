const axios = require("axios").default;

module.exports.Article = async (req,res) => {
const {text} = req.body
const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/text/generation",
  headers: {
    authorization: `Bearer ${process.env.EDEN_API}`,
  },
  data: {
    providers: "mistral",
    text: text,
    temperature: 0.2,
    max_tokens: 250,
    fallback_providers: "",
  },
};

axios
  .request(options)
  .then((response) => {
    const data = response.data;

    res.status(200).json({message: data})
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

}