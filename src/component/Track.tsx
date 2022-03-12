import styled from "styled-components";
import { useDataSource } from "../hook/useDataSource";
import { useForceRender } from "../hook/useForceRender";
import { CubeCenteredText, FadeIn } from "../style";
import { endpointResource } from "../util/resource";
import { Error } from "./Error";
import { Loader } from "./Loader";

const Wrapper = styled.div`
  ${FadeIn};

  height: 100%;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.75;
`;

const Title = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;

  width: calc(100% - 40px);

  text-align: right;

  h2,
  h3 {
    display: inline;

    padding: 0 2px;
    margin: 0;

    background: rgba(255, 255, 255, 0.9);
    box-shadow: 2px 2px 0 0 rgb(0 0 0 / 50%);

    font-weight: 400;
    line-height: 1.6;
  }

  h2 {
    font-size: 15px;
    text-transform: lowercase;
  }

  h3  {
    font-size: 11px;
    text-transform: uppercase;
  }
`;

export function Track() {
  const render = useForceRender(3 * 60 * 1_000);
  const data: any = useDataSource(endpointResource("/api/track"), [render]);

  return data === null ? (
    <Loader />
  ) : !data ? (
    <Error />
  ) : data.data ? (
    <Wrapper>
      <Cover src={data.data.item.album.images[1].url} alt="album cover"></Cover>
      <Title>
        <h2>{data.data.item.name}</h2>
        <br />
        <h3>{data.data.item.album.name}</h3>
      </Title>
    </Wrapper>
  ) : (
    <CubeCenteredText>Wow! I'm not listening to anything ATM!</CubeCenteredText>
  );
}
