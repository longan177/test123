import type { NextPage } from "next";
import ShipList from "../component/Battleships/ShipList";
import BoardLayout from "../component/BoardLayout/BoardLayout";
import Layout from "../component/Layout";
import TransitionsModal from "../component/EndingGameModal";
import StartingGameMenu from "../component/StartingGameMenu";

const Home: NextPage = () => {
  return (
    <Layout>
      <BoardLayout />
      <ShipList />
      <TransitionsModal />
      <StartingGameMenu />
    </Layout>
  );
};

export default Home;
