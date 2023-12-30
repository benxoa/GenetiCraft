const axios = require("axios").default;

module.exports.TextGenerator = async (req, res) => {
  try {
    const {text} = req.body

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/chat",
      headers: {
        authorization: `Bearer ${process.env.EDEN_API}`,
      },
      data: {
        providers: "google",
        text: text,
        chatbot_global_action: "Act as an assistant",
        previous_history: [],
        temperature: 0.0,
        max_tokens: 150,
        fallback_providers: "",
      },
    };

    axios
      .request(options)
      .then((response) => {
        res.status(200).json({response})
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
};
