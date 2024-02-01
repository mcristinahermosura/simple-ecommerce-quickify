import Banner from "../components/Banner"


export default function Home() {

    const data = { 
      title: "Quickify",
      content: "Everything you need at your fingertips",
      destination: "/products",
      label: "Shop now!"
    }

  return (
    <>
      <Banner data={data} />
 
    </>
  )
}
