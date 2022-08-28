import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import EnterRoom from "../components/enterRoom/EnterRoom";
import Footer from "../components/footer/Footer";

const Home: NextPage = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Head>
        <title>Co-editor</title>
        <meta
          name="description"
          content="Cooperate with your team on one piece of code"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "85vh", background: "#1C2127" }}>
        <EnterRoom />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
