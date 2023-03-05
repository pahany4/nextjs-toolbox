import Head from "next/head";
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Multiselect} from "multiselect-react-dropdown";

export default function Dadata() {

  const [response, setResponse] = useState(null)
  const [search, setSearch] = useState("")

  const onSearch = (value) => {
    setSearch(value)
  }

  useEffect(() => {
    if (search.length > 2) {
      axios.post('/.netlify/functions/dadata', {
        search
      })
        .then(function (response) {
          if (response?.data?.length > 0) {
            setResponse(response?.data)
            console.log(response?.data);
          }
        })
    }
  }, [search])

  return (
    <div className="container">
      <Head>
        <title>Next.js Toolbox</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Link href={"/"}>главная</Link>
        <div className={""}>
          <Multiselect
            closeOnSelect={true}
            options={response || []}
            /*onSelect={onSelect}
            onRemove={onRemove}*/
            displayValue={"unrestricted_value"}
            placeholder={"Выберите организацию"}
            closeIcon={"cancel"}
            onSearch={onSearch}
          />
        </div>
      </main>

    </div>
  );
}
