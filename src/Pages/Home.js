import { Image } from "react-bootstrap";
import Banner from "../components/Banner";
import headerImage from "../assets/images/header.png";

export default function Home() {
  const data = {
    content1: "Your Beauty, Your Way",
    content2: "This is skincare product that focuses on repairing and recovering the entire body to make it look younger and more beautiful every day. ",
    destination: "/products",
    label: "BUY NOW",
  };

  return (
    <>
      <header>
        <Image src={headerImage} fluid width={"100%"} />
      </header>
      <Banner data={data} />


    </>
  );
}
