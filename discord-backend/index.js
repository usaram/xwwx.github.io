require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/login", (req, res) => {
  const url =
    "https://discord.com/oauth2/authorize" +
    `?client_id=${process.env.CLIENT_ID}` +
    "&response_type=code" +
    "&scope=identify" +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const token = await axios.post(
    "https://discord.com/api/oauth2/token",
    new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const user = await axios.get(
    "https://discord.com/api/users/@me",
    {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`
      }
    }
  );

  res.json(user.data);
});

app.listen(3000, () => console.log("Rodando"));
