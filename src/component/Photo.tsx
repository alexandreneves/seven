import { useState } from "react";
import styled from "styled-components";
import { useDataSource } from "../hook/useDataSource";
import { fadeIn } from "../style/utils";
import { endpointResource } from "../util/resource";
import { Error } from "./Error";
import { Loader } from "./Loader";

interface ImageProps {
  dataLoaded: any;
}

const Image = styled.img<ImageProps>`
  ${(p) => p.dataLoaded && fadeIn}

  opacity: 0;
  width: 100%;
`;

export function Photo() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const data: any = useDataSource(endpointResource("/api/photo"));

  return data === null ? (
    <Loader />
  ) : !data ? (
    <Error />
  ) : (
    <Image
      onLoad={() => setImageLoaded(true)}
      src={data.data}
      alt="last photo"
      dataLoaded={imageLoaded}
    />
  );
}
