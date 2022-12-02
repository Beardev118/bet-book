import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BetFeed from "./components/BetFeed";
import FooterBar from "./components/FooterBar";
import NavBar from "./components/NavBar";
import NewBetModal from "./components/NewBetModal";
import SortModal from "./components/SortModal";
import StatBar from "./components/StatBar";

const dummyData = [
  {
    title: "Vikings win the superbowl",
    person: "Bobby",
    wager: "$100",
    date: 1669943023177,
    result: "winner",
    active: true,
    id: 4,
  },
  {
    title: "Raptors beat the Celtics",
    person: "Tommy",
    wager: "Steak dinner",
    date: 1659963221177,
    result: "pending",
    active: true,
    id: 3,
  },
  {
    title: "10km foot race",
    person: "Billy",
    wager: "$20",
    date: 1668973024177,
    result: "loser",
    active: true,
    id: 2,
  },
  {
    title: "Trae scores over 50 points",
    person: "Sally",
    wager: "$10",
    date: 4263983023177,
    result: "pending",
    active: false,
    id: 1,
  },
];

export default function App() {
  const [showBetModal, setShowBetModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [bets, setBets] = useState(dummyData);
  const [sortedBets, setSortedBets] = useState(dummyData);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (activeFilter === "all") {
      setSortedBets(bets);
    }
    if (activeFilter === "active") {
      const activeBets = bets.filter((bet) => bet.active);
      setSortedBets(activeBets);
    }
    if (activeFilter === "settled") {
      const settledBets = bets.filter((bet) => !bet.active);
      setSortedBets(settledBets);
    }
  }, [activeFilter]);

  const betModalHandler = () => {
    setShowBetModal(!showBetModal);
  };

  const sortModalHandler = () => {
    setShowSortModal(!showSortModal);
  };

  const sortBetsAlphabetically = () => {
    const sortedArray = sortedBets.sort((a, b) => {
      return a.person.localeCompare(b.person);
    });
    setSortedBets(sortedArray);
  };

  const sortBetsChronologically = () => {
    const sortedArray = sortedBets.sort((a, b) => b.date - a.date);
    setSortedBets(sortedArray);
  };

  const filterAllBets = () => {
    setActiveFilter("all");
  };
  
  const filterActiveBets = () => {
    setActiveFilter("active");
  };

  const filterSettledBets = () => {
    setActiveFilter("settled");
  };

  return (
    <View style={styles.app}>
      <NavBar />
      <StatBar bets={sortedBets} />
      <NewBetModal
        closeModal={betModalHandler}
        showModal={showBetModal}
        setBets={setBets}
      />
      <BetFeed setBets={setBets} bets={sortedBets} />
      <SortModal
        showModal={showSortModal}
        closeModal={sortModalHandler}
        sortBetsAlphabetically={sortBetsAlphabetically}
        sortBetsChronologically={sortBetsChronologically}
        filterAllBets={filterAllBets}
        filterActiveBets={filterActiveBets}
        filterSettledBets={filterSettledBets}
        activeFilter={activeFilter}
      />
      <FooterBar
        showSortModal={sortModalHandler}
        showBetModal={betModalHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "white",
  },
});
