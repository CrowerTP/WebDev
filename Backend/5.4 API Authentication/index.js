import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "crowertp";
const yourPassword = "crower";
const yourAPIKey = "99ae8206-c390-49fb-a93e-5ba565c6a5e2";
const yourBearerToken = "101599f9-ee20-40fc-b8f5-609d0c82278d";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const result = response.data;
    const resultJSON = JSON.stringify(result);
    res.render("index.ejs" , { content: resultJSON });
  } catch (error) {
    console.error("Failed to make request: " , error.message);
    res.render("index.ejs" , { content: "Failed to make request!"})
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
  const response = await axios.get(API_URL + "all?page=2" , {
    auth: {
      username: yourUsername,
      password: yourPassword
    },
  });
  const result = response.data;
  const resultJSON = JSON.stringify(result);
  res.render("index.ejs", { content: resultJSON })
} catch (error) {
  console.error("Failed to make request" , error.message);
  res.render("index.ejs" , { content: "Failed to make request!"})
}
});

app.get("/apiKey", async (req, res) => {
  try {
  const response = await axios.get(API_URL + `filter?score=6&apiKey=${yourAPIKey}`);
  const result = response.data;
  const resultJSON = JSON.stringify(result);
  res.render("index.ejs" , { content: resultJSON});
  } catch (error) {
    console.error("Failed to make request" , error.message);
    res.render("index.ejs" , { content: "Failed to make request!"})
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
  const response = await axios.get(API_URL + "secrets/2" , { headers: { Authorization : `Bearer ${yourBearerToken}`}});
  const result = response.data;
  const resultJSON = JSON.stringify(result);
  res.render("index.ejs" , { content: resultJSON});
  } catch (error){
    console.error("Failed to make request" , error.message);
    res.render("index.ejs" , { content: "Failed to make request"});
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
