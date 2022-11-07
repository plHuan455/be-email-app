import { css } from 'styled-components';

const templateFontStyle = {
  h1: css`
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
  `,
  h2: css`
    font-weight: 500;
    font-size: 17px;
    line-height: 23px;
  `,
  body1: css`
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    color: var(--color-neutral-3);
  `,
  body2: css`
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: var(--color-neutral-3);
  `,
  default: css`
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    color: var(--color-neutral-3);
  `,
};

const templateFontColor = {
  neutral_1: css`
    color: var(--color-neutral-1);
  `,
  neutral_3: css`
    color: var(--color-neutral-3);
  `,
  neutral_3_ed: css`
    color: var(--color-neutral-3-ed);
  `,
  neutral_4: css`
    color: var(--color-neutral-4);
  `,
  neutral_5: css`
    color: var(--color-neutral-5);
  `,
  semantic_blue_1: css`
    color: var(--color-semantic-blue-1);
  `,
  semantic_blue_3: css`
    color: var(--color-semantic-blue-3);
  `,
  semantic_green_1: css`
    color: var(--color-semantic-green-1);
  `,
  semantic_green_2: css`
    color: var(--color-semantic-green-2);
  `,
  semantic_green_3: css`
    color: var(--color-semantic-green-3);
  `,
  semantic_pink_1: css`
    color: var(--color-semantic-pink-1);
  `,
  semantic_pink_3: css`
    color: var(--color-semantic-pink-3);
  `,
  semantic_orange_1: css`
    color: var(--color-semantic-orange-1);
  `,
  semantic_orange_3: css`
    color: var(--color-semantic-orange-3);
  `,
  semantic_purple_1: css`
    color: var(--color-semantic-purple-1);
  `,
  semantic_purple_3: css`
    color: var(--color-semantic-purple-3);
  `,
};

const cssHelper = (() => {
  const disabled = (() => css`
    pointer-events: none !important;
    opacity: 0.4 !important;
  `)();

  const fontStyle = (variant) => {
    return templateFontStyle[variant] || templateFontStyle['default'];
  };

  const fontColor = (pattern) => {
    return templateFontColor[pattern] || templateFontColor['neutral_1'];
  };

  return {
    disabled,
    fontStyle,
    fontColor,
  };
})();
export default cssHelper;
