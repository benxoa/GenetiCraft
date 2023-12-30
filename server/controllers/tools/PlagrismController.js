
const axios = require("axios").default;

module.exports.Plagrsim = async (req,res)=> {
    try {
        const {text} = req.body

const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/text/plagia_detection",
  headers: {
    authorization: `Bearer ${process.env.EDEN_API}`,
  },
  data: {
    providers: "winstonai",
    text: text,
    title: "Your optional title",
    fallback_providers: "",
  },
};

axios
  .request(options)
  .then((response) => {
    const data = response.data;
    res.status(200).json({message: data})
    // console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

    } catch (error) {
        res.status(500)
        console.log(error)
    }
}