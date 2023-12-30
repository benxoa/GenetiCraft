const axios = require("axios").default;

module.exports.Summery = async (req, res) => {
    try {
        const {text, lang, lines} = req.body
        const options = {
    
    method: "POST",
    url: "https://api.edenai.run/v2/text/summarize",
    headers: {
      authorization: `Bearer ${process.env.EDEN_API}` ,
    },
    data: {
      output_sentences: lines,
      providers: "microsoft",
      text: text,
      language: lang,
      fallback_providers: "",
    },
  };
  
  axios
    .request(options)
    .then((response) => {
      // console.log(response.data);
      res.status(200).json({ summary: response.data });
    })
    .catch((error) => {
      console.error(error);
      res.status(500)

    });
    
    } catch (error) {
        console.log(error)
        res.status(500)
    }


}
