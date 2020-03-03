import styled from "styled-components";
import { Button } from "react-bootstrap";
import { MdVideocam } from "react-icons/md";

const ChannelContainer = styled.div`
  min-height: 100vh;
  min-width: 100%;
`;

const Banner = styled.div`
  height: 300px;
  margin-bottom: 20px;

  #Banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BannerInfoOverlay = styled.div`
  /* height: 100%; */
  position: absolute;
  top: 65px;
  width: 100%;

  #IsFollowed {
    cursor: pointer;
    color: green;
    transition: color 250ms;
    margin: 0 10px;
    margin-right: -30px;

    &:hover {
      color: red;
    }
  }

  #IsNotFollowed {
    cursor: pointer;
    color: red;
    transition: color 250ms;
    margin: 0 10px;
    margin-right: -30px;

    &:hover {
      color: green;
    }
  }

  /* #FollowUnfollowButton {
    cursor: pointer;
    color: ${props => (props.following === true ? "green" : "white")};
    transition: color 150ms;
    margin: 0 10px;
    margin-right: -30px;

    &:hover {
      color: ${({ following }) => (following === "true" ? "red" : "green")};
    }
  } */
`;

const Name = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  display: grid;
  justify-items: center;
  background-color: #0000;
  text-shadow: 0px 0px 2px black;

  #HeaderChannelInfo {
    display: flex;
    flex-flow: column;
    text-align: center;
    background-color: #000000ab;
    box-shadow: 20px 20px 20px #000000bd;
    border-radius: 15px;
    padding: 10px;
    width: 30%;

    @media screen and (max-width: 1920px) {
      width: 40%;
    }

    p {
      margin-bottom: 0.6rem;
    }

    #ChannelLiveLink {
      color: white;
      font-size: 2rem !important;
      padding: 0 10px;
    }

    #title {
      font-size: 1.1rem;
    }

    #game {
      color: rgb(240, 240, 240);
      margin-bottom: 0.6rem;
      font-size: inherit;
      padding: 0;

      &:hover {
        color: #ffffff;
      }
    }

    #desc,
    #updated {
      color: #cacaca;
    }

    #placeholderProfileImgCircle {
      height: 50px;
      border-radius: 50%;
      background: #817979;
      width: 50px;
      margin-right: 20px;
      margin-right: 20px;
      margin-left: -70px;
      animation: pulse 4s linear infinite;
    }

    #PlaceholderSmallText {
      /* background-color: #adadadcf; */
      height: 24px;
      margin-bottom: 1rem;
      width: 100px;
      border-radius: 10px;
      animation: pulse 4s linear infinite;
    }
    @keyframes pulse {
      0% {
        background: #1a1b1dd1;
      }
      40% {
        background: #25262ad1;
      }
      100% {
        background: #1a1b1dd1;
      }
    }
  }

  #ChannelName {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  #profileIcon {
    padding: 0 10px;
  }

  img {
    height: 50px;
  }

  #partnered {
    height: 25px;
  }
`;

const SubFeedHeader = styled.div`
  display: grid;
  grid-template-areas: "sort title gap";
  grid-template-columns: 20% auto 20%;
  margin: 20px auto 10px auto;
  border-bottom: 1px solid grey;
  max-width: 100%;

  h3 {
    text-align: center;
    grid-area: title;
  }
`;

const SortButton = styled(Button).attrs({ variant: "dark" })`
  width: 200px;
  background-color: rgba(20, 23, 25, 0.5);

  &:hover,
  &:active,
  &:focus {
    background-color: rgba(20, 23, 25, 0.9);
  }

  svg {
    padding-right: 5px;
  }
`;

const SortDropDownList = styled.ul`
  position: absolute;
  padding: 10px;
  list-style: none;
  margin-top: 42px;
  background-color: rgba(20, 23, 25, 0.9);
  border-radius: 0 0 5px 5px;
  width: 200px;
  border-color: #1d2124;
  box-shadow: 0 0.1rem 0 0.2rem rgba(82, 88, 93, 0.5);
  z-index: 3;

  li {
    padding: 5px;
    cursor: pointer;
    text-align: center;
  }
`;

const LiveIndicator = styled.div`
  color: red;
  /* margin-left: -55px;
  padding-right: 15px; */
  animation: breathRedColor 3s linear 1s infinite;

  p {
    margin: 0;
    text-align: left;
    padding-left: 5px;
    margin-bottom: 0 !important;
  }

  @keyframes breathRedColor {
    0% {
      color: #ff0000;
    }
    50% {
      color: #8a0000;
    }
    100% {
      color: #ff0000;
    }
  }
`;

const LiveIndicatorIcon = styled(MdVideocam).attrs({ size: 30 })`
  /* position: absolute; */
`;

const VideoPlayer = styled.div`
  height: 300px;
  width: calc(300px * 1.777777777777778);
  position: absolute;
  z-index: 100;
`;

const Chat = styled.iframe`
  height: 300px;
  width: calc(300px * 1.777777777777778);
  position: absolute;
  z-index: 100;
  right: 0;
  border: none;
`;

const StyledLiveInfoContainer = styled.div`
  position: absolute;
  margin-right: 15%;
  display: flex;
  align-items: center;

  #LiveDetails {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 1920px) {
    margin-right: calc(40% - 250px);
  }
`;

export {
  ChannelContainer,
  Banner,
  Name,
  BannerInfoOverlay,
  SubFeedHeader,
  SortButton,
  SortDropDownList,
  LiveIndicator,
  LiveIndicatorIcon,
  VideoPlayer,
  Chat,
  StyledLiveInfoContainer,
};
