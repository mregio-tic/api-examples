const axios = require("axios");
const CryptoJS = require("crypto-js");

// Key & Secret
const API_KEY = "pk_test_b908c73ef43ad72209477f3b8d15510f"; // put your lalamove API key here
const SECRET = "sk_test_3WXbWu3jBaxSjUKhMgGujm4BKV7sgshbfQPnb8GqLUdxgL1seDphVrVhAzhXSkE4"; // put your lalamove API secret here

axios.defaults.baseURL = "https://rest.sandbox.lalamove.com"; // URl to Lalamove Sandbox API
const time = new Date().getTime().toString();
const region = "PH";
const method = "POST";
const path = "/v2/quotations";

const body = JSON.stringify({
  serviceType: "MOTORCYCLE",
  specialRequests: [],
  requesterContact: {
    name: "marck",
    phone: "09778217638",
  },
  stops: [
    {
      location: {
        lat: "14.691056",
        lng: "121.034410",
      },
      addresses: {
        en_PH: {
          displayString:
            "58 F. Del Mundo St. Sauyo QC",
          market: region,
        },
      },
    },
    {
      location: {
        lat: "14.5116249",
        lng: "121.0582659",
      },
      addresses: {
        en_PH: {
          displayString:
            "Signal Village, Taguig City",
          market: region,
        },
      },
    },
  ],
  deliveries: [
    {
      toStop: 1,
      toContact: {
        name: "Marck Regio",
        phone: "+639778217638",
      },
      remarks: "Do not take this order - SANDBOX CLIENT TEST",
    },
  ],
});

const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();
const startTime = new Date().getTime();

axios
  .post(path, body, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
      Authorization: `hmac ${API_KEY}:${time}:${SIGNATURE}`,
      Accept: "application/json",
      "X-LLM-Market": region,
    },
  })
  .then((result) => {
    console.log(
      "Total elapsed http request/response time in milliseconds: ",
      new Date().getTime() - startTime
    );
    console.log(
      "Authorization header: ",
      `hmac ${API_KEY}:${time}:${SIGNATURE}`
    );
    console.log("Status Code: ", result.status);
    console.log("Returned data: ", result.data);
  });
