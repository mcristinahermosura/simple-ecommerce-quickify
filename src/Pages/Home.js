import { Image } from "react-bootstrap";
import Banner from "../components/Banner";
import footerImage from "../assets/images/footer.png";

export default function Home() {
  const data = {
    content1: "Your Beauty, Your Way",
    content2: "BIG",
    content3: "SALE",
    content4: "UP TO 50% OFF!",
    destination: "/products",
    label: "BUY NOW",
  };

  return (
    <>
      <Banner data={data} />

      <footer>
        <Image src={footerImage} fluid width={"100%"} />
      </footer>
    </>
  );
}
