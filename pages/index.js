import Head from 'next/head'
import Sidebar from "../components/Sidebar"

export default function Home() {


  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/fav.ico" />
      </Head>
      
 <Sidebar />
        


    </div>
  )
}
