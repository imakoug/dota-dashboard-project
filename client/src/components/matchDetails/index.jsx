import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import dotaApiService from "../../services/dotaApi";
import items from "../../items";

const MatchDetails = () => {
  const [details, setDetails] = useState();
  const [its, setIts] = useState([]);
  const location = useLocation();
  const id = location.state?.id;
  const uid = location.state?.uid;

  useEffect(() => {
    const getDetails = async () => {
      const res = await dotaApiService.getMatch(id);
      for (let player of res.players) {
        // for await question;
        if (player.account_id === uid) {
          setDetails(player);
        }
      }
      if (details) {
        const itemNames = [];
        for (let i = 0; i <= 5; i++) {
          const itemId = details[`item_${i}`];
          for (let item in items) {
            if (items[item].id === itemId) itemNames.push(items[item].dname);
          }
        }
        setIts(itemNames);
      }
    };
    getDetails();
    console.log(details);
    console.log(its);
  }, [uid, id]);

  return (
    <>
      <h1>{id}</h1>
      <h1>{details && details.kills}</h1>
      {its.length > 0 && its.map((it) => <h1>{it}</h1>)}
    </>
  );
};

export default MatchDetails;
