const SibApiV3Sdk = require("sib-api-v3-sdk");

require("dotenv").config();

const sendMail = async (email) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.API_KEY;

    const transEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: "ritu.jr1@gmail.com",
    };

    const receivers = [
      {
        email: email,
      },
    ];

    const response = await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Reset Password your password.",
      textContent: "Notty ",
    });
    return response;
  } catch (error) {
    return error;
    console.log(error);
  }
};

exports.resetPassword = async (req, res) => {
  console.log(req.body.email);
  const response = await sendMail(req.body.email);
  res.status(200).json(response);
};
