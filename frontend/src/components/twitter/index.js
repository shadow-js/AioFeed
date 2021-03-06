import { Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import React, { useContext } from "react";

import { Container, LoadingPlaceholder } from "./StyledComponents";
import FeedsContext from "../feed/FeedsContext";
import UpdateTwitterListName from "../navigation/sidebar/UpdateTwitterListName";
import ThemeContext from "./../themes/ThemeContext";

export default () => {
  const { twitterListName, enableTwitter } = useContext(FeedsContext);
  const { activeTheme } = useContext(ThemeContext);

  return (
    <CSSTransition
      in={enableTwitter}
      timeout={750}
      classNames='twitter-slide'
      unmountOnExit
      key={twitterListName + activeTheme.name}
      appear={true}>
      {/* <Container width={width ? `${width}px` : "15vw"} key={twitterListName}> */}
      <Container key={twitterListName}>
        {twitterListName ? (
          <TwitterTimelineEmbed
            sourceType='list'
            id={twitterListName}
            placeholder={<LoadingPlaceholder />}
            autoHeight={true}
            theme={activeTheme.type}
            noScrollbar={true}
            noHeader={true}
            noFooter={true}
            noBorders={true}
            transparent={true}
            onLoad={() => {
              console.log(`Twitter feed with list id '${twitterListName}' loaded.`);
            }}
          />
        ) : (
          <>
            <Alert variant='info' style={{ textAlign: "center" }}>
              <Alert.Heading>No twitter list entered</Alert.Heading>
              <hr />
              Please enter a public twitter list id below.
            </Alert>
            <UpdateTwitterListName style={{ padding: "10px" }} />
          </>
        )}
      </Container>
    </CSSTransition>
  );
};
