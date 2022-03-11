import styled from "styled-components";
import imageLogoUrl from "../image/logo.png";
import imageMeVectorUrl from "../image/me_vector.png";
import imageMeUrl from "../image/me.png";
import { CubeCenteredText, FadeIn } from "../style";

const Wrapper = styled.div`
  ${FadeIn};
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  opacity: 0.1;
`;

export function About() {
  return (
    <Wrapper>
      <Image src={imageMeVectorUrl} alt="logo" />
      <CubeCenteredText>
        hi, i'm alex, i'm a web developer, all around geek, with a passion for
        motorcycles & photography.
      </CubeCenteredText>
    </Wrapper>
  );
}
