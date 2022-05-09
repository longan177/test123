import type { NextPage } from "next";
import ShipList from "../component/Battleships/ShipList";
import BoardLayout from "../component/BoardLayout/BoardLayout";
import Layout from "../component/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <BoardLayout />
      <ShipList />
    </Layout>
  );
};

export default Home;
