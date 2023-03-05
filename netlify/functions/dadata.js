import fetch from "node-fetch"

export const handler = async (event) => {
  const eventBody = JSON.parse(event.body)

  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
  const token = "91dd056f3b551cf9916dd391e13da5b28e7d05aa";
  //const secret = "49c3b9892d396a853d55e459190e02dc30622fe1";

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json; charset=utf-8",
      "Authorization": "Token " + token
    },
    body: JSON.stringify({query: eventBody.search})
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json; charset=utf-8",
    },
    body: JSON.stringify([
      ...data.suggestions
    ])
  }
}