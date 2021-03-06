import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import GetTopGames from "./GetTopGames";
import { StyledGameListElement, StyledShowAllButton } from "./styledComponents";
import StyledLoadingList from "./../LoadingList";

const RenderTopGamesList = () => {
  const [topGames, setTopGames] = useState();

  useEffect(() => {
    (async () => {
      const games = await GetTopGames();
      setTopGames(games.data.data);
    })();
  }, []);

  return topGames ? (
    <ul>
      <StyledShowAllButton key='showAll'>
        <Link to={"/category/"}>Show all</Link>
      </StyledShowAllButton>
      {topGames.map((game) => {
        return (
          <StyledGameListElement key={game.id}>
            <Link to={"/category/" + game.name}>
              <img src={game.box_art_url.replace("{width}", 300).replace("{height}", 300)} alt='' />
              {game.name}
            </Link>
          </StyledGameListElement>
        );
      })}
    </ul>
  ) : (
    <StyledLoadingList amount={12} />
  );
};

export default RenderTopGamesList;
