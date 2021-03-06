import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaRegFileVideo } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { MdMovieCreation } from "react-icons/md";
import { MdRefresh } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useEffect, useState, useCallback, useRef } from "react";

import { RefreshButton, HeaderTitle } from "./../../sharedStyledComponents";
import { StyledLoadmore } from "./../StyledComponents";
import {
  TypeListUlContainer,
  TypeButton,
  TopDataSortButtonsContainer,
  HeaderContainer,
  TopStreamsContainer,
} from "./styledComponents";
import ClipsSortButton from "./../channelPage/ClipsSortButton";
import GameSearchBar from "./GameSearchBar";
import GetTopClips from "./GetTopClips";
import GetTopStreams from "./GetTopStreams";
import GetTopVideos from "./GetTopVideos";
import LoadingBoxes from "./../LoadingBoxes";
import SortButton from "./../channelPage/SortButton";
import StreamEle from "./../live/StreamElement";
import ClipElement from "./../channelPage/ClipElement";
import VodElement from "./../vods/VodElement";
import Util from "./../../../util/Util";
import validateToken from "../validateToken";

export default () => {
  const { category } = useParams();
  const { p_videoType } = useLocation().state || {};
  const [topData, setTopData] = useState([]);
  const [videoType, setVideoType] = useState(p_videoType || "Streams");
  const [typeListOpen, setTypeListOpen] = useState();
  const [loadmoreLoaded, setLoadmoreLoaded] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Views");
  const [sortByTime, setSortByTime] = useState(null);

  const oldTopData = useRef();
  const loadmoreRef = useRef();

  document.title = `AF | ${category || "All"} - Top ${videoType}`;

  const videoElementTypeComp = (data) => {
    switch (videoType) {
      case "Streams":
        return <StreamEle data={data} />;
      case "Clips":
        return <ClipElement data={data} />;
      case "Videos":
        return <VodElement data={data} />;
      default:
        return <StreamEle data={data} />;
    }
  };

  const fetchVideosDataHandler = (res, shouldLoadMore) => {
    if (shouldLoadMore) {
      const allTopData = oldTopData.current.data.concat(res.topData.data);
      oldTopData.current = {
        data: allTopData,
        pagination: res.topData.pagination,
      };

      setLoadmoreLoaded(true);
      setTopData(allTopData);

      setTimeout(() => {
        if (loadmoreRef.current) {
          loadmoreRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }, 0);
    } else {
      oldTopData.current = res.topData;
      setTopData(res.topData.data);
      setRefreshing(false);
    }
  };

  const fetchVideos = useCallback(
    (shouldLoadMore) => {
      if (shouldLoadMore) setLoadmoreLoaded(false);

      switch (videoType) {
        case "Streams":
          GetTopStreams(category, shouldLoadMore && oldTopData.current)
            .then((res) => {
              fetchVideosDataHandler(res, shouldLoadMore);
            })
            .catch((e) => {
              if ((e.message = "game is undefined")) {
                setError("Invalid game name");
              } else {
                setError(e.message);
              }
              setRefreshing(false);
            });
          break;
        case "Clips":
          GetTopClips(category, sortByTime, oldTopData.current)
            .then((res) => {
              fetchVideosDataHandler(res, shouldLoadMore);
            })
            .catch((e) => {
              if ((e.message = "game is undefined")) {
                setError("Invalid game name");
              } else {
                setError(e.message);
              }
              setRefreshing(false);
            });
          break;
        case "Videos":
          GetTopVideos(category, sortBy, oldTopData.current)
            .then((res) => {
              fetchVideosDataHandler(res, shouldLoadMore);
            })
            .catch((e) => {
              if ((e.message = "game is undefined")) {
                setError("Invalid game name");
              } else {
                setError(e.message);
              }
              setRefreshing(false);
            });
          break;
        default:
          GetTopStreams(category, shouldLoadMore && oldTopData.current)
            .then((res) => {
              fetchVideosDataHandler(res, shouldLoadMore);
            })
            .catch((e) => {
              if ((e.message = "game is undefined")) {
                setError("Invalid game name");
              } else {
                setError(e.message);
              }
              setRefreshing(false);
            });
      }
    },
    [category, sortBy, sortByTime, videoType]
  );

  const videoTypeBtnOnClick = (type) => {
    setTopData();
    oldTopData.current = null;
    setVideoType(type);
    setTypeListOpen(false);
  };

  const refresh = useCallback(() => {
    setRefreshing(true);
    oldTopData.current = null;
    validateToken().then(() => {
      fetchVideos();
    });
  }, [fetchVideos]);

  useEffect(() => {
    setRefreshing(true);
    setTopData([]);
    validateToken().then(() => {
      fetchVideos();
    });
  }, [fetchVideos]);

  return (
    <CSSTransition in={true} timeout={750} classNames='fade-750ms' appear>
      <>
        <HeaderContainer>
          <div
            style={{
              width: "675px",
              minWidth: "675px",
              alignItems: "end",
              display: "flex",
            }}>
            <RefreshButton onClick={refresh}>
              {refreshing ? (
                <div className='SpinnerWrapper'>
                  <Spinner
                    animation='border'
                    role='status'
                    variant='light'
                    style={Util.loadingSpinnerSmall}></Spinner>
                </div>
              ) : (
                <MdRefresh size={34} />
              )}
            </RefreshButton>
          </div>
          <HeaderTitle style={{ marginLeft: "10px" }}>
            <FaTwitch size={32} style={{ color: "#6f166f" }} />
            Top {videoType}
          </HeaderTitle>
          <TopDataSortButtonsContainer>
            <GameSearchBar gameName={category} videoType={videoType} />
            <div>
              <TypeButton
                title={`Fetch top ${videoType}`}
                disabled={category ? false : true}
                onClick={() => {
                  setTypeListOpen(!typeListOpen);
                }}>
                <FaRegFileVideo size={20} />
                {videoType}
              </TypeButton>

              {typeListOpen && (
                <TypeListUlContainer>
                  <li
                    onClick={() => {
                      videoTypeBtnOnClick("Streams");
                    }}>
                    <MdLiveTv size={24} />
                    Streams
                  </li>
                  <li
                    onClick={() => {
                      videoTypeBtnOnClick("Clips");
                      setSortBy("Views");
                    }}>
                    <MdMovieCreation size={24} />
                    Clips
                  </li>
                  {/* <li
                  onClick={() => {
                    videoTypeBtnOnClick("Videos");
                  }}>
                  <MdVideocam size={24} />
                  Videos
                </li> */}
                </TypeListUlContainer>
              )}
            </div>

            {videoType === "Videos" ? (
              <SortButton sortBy={sortBy} setSortBy={setSortBy} setData={setTopData} />
            ) : videoType === "Clips" ? (
              <ClipsSortButton
                sortBy={sortByTime}
                setSortBy={setSortByTime}
                setData={setTopData}
                resetOldData={() => {
                  oldTopData.current = null;
                }}
              />
            ) : null}
          </TopDataSortButtonsContainer>
        </HeaderContainer>

        {error ? (
          <Alert
            variant='warning'
            style={{ textAlign: "center", width: "25%", margin: "auto" }}
            dismissible
            onClose={() => setError(null)}>
            <Alert.Heading>{error}</Alert.Heading>
          </Alert>
        ) : (
          <TopStreamsContainer>
            <>
              <LoadingBoxes
                amount={Math.floor(((document.documentElement.clientWidth - 150) / 350) * 1.5)}
                load={!topData || topData.length <= 0}
              />

              <TransitionGroup className='twitch-top-live' component={null}>
                {topData.map((stream) => {
                  return (
                    <CSSTransition
                      // in={true}
                      key={stream.id}
                      timeout={{
                        appear: 500,
                        enter: 500,
                        exit: 0,
                      }}
                      classNames='fade-500ms'
                      unmountOnExit>
                      {videoElementTypeComp(stream)}
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
              {topData && topData.length > 0 && (
                <StyledLoadmore ref={loadmoreRef}>
                  <div />
                  <div
                    id='Button'
                    onClick={() => {
                      fetchVideos(true);
                    }}>
                    {!loadmoreLoaded ? (
                      <>
                        Loading..
                        <Spinner
                          animation='border'
                          role='status'
                          variant='light'
                          style={{ ...Util.loadingSpinnerSmall, marginLeft: "10px" }}
                        />
                      </>
                    ) : (
                      "Load more"
                    )}
                  </div>
                  <div />
                </StyledLoadmore>
              )}
            </>
          </TopStreamsContainer>
        )}
      </>
    </CSSTransition>
  );
};
