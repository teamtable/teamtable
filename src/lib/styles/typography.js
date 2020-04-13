import { css } from "styled-components";
// import {  } from "./colors";
// import { transition } from "./mixins";



// export const oswaldFont = ({ weight = 600, spacing = 0.075 }) => css`
//   font-family: "Helvetica Narrow", "Arial Narrow", HelveticaNeue-CondensedBold, Arial, Helvetica, sans-serif;
//   font-stretch: condensed;
//   font-weight: ${weight + 100};
//   letter-spacing: ${spacing / 5.0}em;

//   .wf-active &,
//   html[amp] & {
//     font-family: Oswald, sans-serif;
//     font-stretch: normal;
//     font-weight: ${weight};
//     letter-spacing: ${spacing}em;
//   }
// `;

// export const notoSerifFont = css`
//   font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
//   letter-spacing: .038em;

//   .wf-active &,
//   html[amp] & {
//     font-family: "Noto Serif", serif;
//     letter-spacing: normal;
//   }
// `;

// export const notoSansFont = css`
//   font-family: Helvetica, Arial, sans-serif;
//   letter-spacing: .02em;

//   .wf-active &,
//   html[amp] & {
//     font-family: "Noto Sans", sans-serif;
//     letter-spacing: normal;
//   }
// `;

// const linkStyleShadow = (color, size, shadowColor) => {
//   if (typeof size === "number") {
//     return `inset 0 -1px ${shadowColor}, inset 0 -${size + 1}px ${color}`;
//   }
//   return `inset 0 -.1em ${color}`;
// };

// const linkStyleTextShadow = (shadowColor) => {
//   const offsets = [
//     "-.07em -.07em", "-.07em .07em", ".07em -.07em", ".07em .07em", "0 -.1em", "0 .1em", ".1em 0", "-.1em 0",
//   ];
//   return offsets.map(offset => [offset, shadowColor].join(" ")).join(",");
// };

// export const linkStyle = (options = {}) => {
//   const { color = hero, size = ".1em", shadowColor = "#fff" } = options;
//   return css`
//     ${transition("color")}
//     box-shadow: ${linkStyleShadow(color, size, shadowColor)};
//     color: ${dark};
//     text-decoration: none;
//     text-shadow: ${linkStyleTextShadow(shadowColor)};

//     &:hover {
//       color: ${color};
//       text-decoration: none;
//     }
//   `;
// };

// export const labelsBoxInfoFont = css`
//   ${oswaldFont({ weight: 600, spacing: 0.025 })};
//   font-size: 13px;
//   line-height: 1.313em;
//   text-transform: uppercase;
// `;
