import { css, styled } from "styled-components";

// CSS FONKSİYONU, CSS KODUNU YAZARKEN CSS DÜZENİNİ SAĞLAMAK İÇİN KULLANILIR, YOKSA AŞAĞIDA OLDUĞU GİBİ KODLAR DÜZGÜN GÖRÜNMEZ
const Heading = styled.h1`
  /* HEADING KOMPONENTİNE GELEN PROP'U ALMAK */
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}
  line-height: 1.4;
`;

export default Heading;
