import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

type TextProps = LayoutProps & SpaceProps;

export const Input = styled.input`
  background-color: #f7f7f7;
  color: #242424;
  padding: 0.15rem 0.5rem;
  min-height: 40px;
  font-size:14px;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 5px 20px -18px;

  &:focus {
    border-bottom: 2px solid #5b5fc7;
    border-radius: 4px 4px 2px 2px;
  }

  &:hover {
    outline: 1px solid lightgrey;
  }
  ${layout}
  ${space}
`;
