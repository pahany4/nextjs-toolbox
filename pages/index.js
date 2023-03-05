import Head from "next/head";
import axios from "axios";
import {useState} from "react";

export default function Home() {

  const [response, setResponse] = useState(null)
  const handleClick = () => {
    axios.get('/.netlify/functions/hello-world')
      .then(function (response) {
        setResponse(response?.data)
        // handle success
        console.log(response);
      })
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Toolbox</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <button onClick={handleClick}>Hello world!</button>
        {response &&
          <p>Результат: {response.message}</p>
        }
      </main>

    </div>
  );
}
