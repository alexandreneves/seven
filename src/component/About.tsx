import imageLogoUrl from "../image/logo.png";
import imageMeUrl from "../image/me.png";
import styled from "styled-components";
import imageMeVectorUrl from "../image/me_vector.png";
import { CubeCenteredText } from "../style/components";
import { Social } from "./Social";
import { fadeIn } from "../style/utils";

const Wrapper = styled.div`
  ${fadeIn};
  height: 100%;
  display: flex;
`;

const Image = styled.img`
  height: 100%;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 45%;
`;

const TextWrapper = styled.div``;

export function About() {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={imageMeVectorUrl} alt="logo" />
      </ImageWrapper>
      <TextWrapper>
        <CubeCenteredText>
          I'm Alex, I'm a web developer, all around geek with a passion for
          motorcycles & photography.
          <Social />
        </CubeCenteredText>
      </TextWrapper>
    </Wrapper>
  );
}
