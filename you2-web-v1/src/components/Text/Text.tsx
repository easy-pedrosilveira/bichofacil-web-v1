import styled from 'styled-components';
import { color, ColorProps, typography, TypographyProps } from 'styled-system';

type TextProps = TypographyProps & ColorProps;

export const Text = styled.p<TextProps>`
  font-family: 14px;
  ${typography}
  ${color}
  `;