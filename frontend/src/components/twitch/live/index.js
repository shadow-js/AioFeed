import { CSSTransition, TransitionGroup } from "react-transition-group";
import Alert from "react-bootstrap/Alert";
import React, { useEffect, useState, useCallback } from "react";

import Header from "./Header";
import StreamEle from "./StreamElement.js";
import { Container } from "../StyledComponents";
import Sidebar from "./../sidebar";
import Util from "../../../util/Util";

export default ({ data }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Header
        data={data}
        refresh={async () => {
          await data.refresh();
        }}
      />

      {data.error ? (
        show && (
          <Alert
            variant='secondary'
            style={{
              ...Util.feedAlertWarning,
              width: "50%",
              margin: "auto",
            }}
            dismissible
            onClose={() => setShow(false)}>
            <Alert.Heading>{data.error}</Alert.Heading>
          </Alert>
        )
      ) : (
        <>
          <Sidebar
            onlineStreams={data.liveStreams}
            newlyAdded={data.newlyAddedStreams}
            REFRESH_RATE={data.REFRESH_RATE}
          />
          {data.liveStreams.length > 0 ? (
            <Container>
              <TransitionGroup className='twitch-live' component={null}>
                {data.liveStreams.map((stream) => {
                  return (
                    <CSSTransition
                      // in={true}
                      key={stream.id}
                      timeout={750}
                      classNames='videoFadeSlide'
                      unmountOnExit>
                      <StreamEle
                        key={stream.id}
                        data={stream}
                        newlyAddedStreams={data.newlyAddedStreams}
                        newlyAdded={stream.newlyAdded}
                        refresh={async () => {
                          await data.refresh();
                        }}
                        REFRESH_RATE={data.REFRESH_RATE}
                      />
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </Container>
          ) : (
            show && (
              <Alert
                variant='secondary'
                style={{
                  ...Util.feedAlertWarning,
                  width: "50%",
                  margin: "auto",
                }}
                dismissible
                onClose={() => setShow(false)}>
                <Alert.Heading>No streams online at the momment</Alert.Heading>
              </Alert>
            )
          )}
        </>
      )}
    </>
  );
};
