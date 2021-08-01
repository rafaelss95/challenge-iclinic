import styled, { css } from 'styled-components';
import darthVaderImg from '../../assets/images/darth-vader.png';
import lukeSkywalkerImg from '../../assets/images/luke-skywalker.png';

export const Container = styled.div`
  ${({ theme: { backgroundColor } }) => css`
    background: ${backgroundColor};
    display: grid;
    grid-template-rows: 10.625rem 9.375rem 26.875rem;
    height: 100vh;
    justify-items: center;

    @media (max-width: 800px) {
      grid-template-rows: 10.625rem 26.875rem 9.375rem;

      ${SideChooserButton} {
        order: 4;
      }
    }
  `}
`;

export const BackButton = styled.button.attrs(({ theme }) => ({
  theme,
  type: 'button',
}))`
  ${({ theme: { textColor } }) => css`
    background: inherit;
    border: none;
    color: ${textColor};
    display: flex;
    align-items: center;
    justify-self: start;
    gap: 0.8rem;
    font-size: 1.125rem;
    height: 2.938rem;
    margin-left: 3rem;
    margin-top: 2.188rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  `}
`;

export const SideChooserButton = styled.button.attrs(({ theme }) => ({
  theme,
  type: 'button',
}))`
  ${({ theme: { backgroundColor, textColor } }) => css`
    align-self: start;
    background: ${textColor};
    border-radius: 0.625rem;
    color: ${backgroundColor};
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25rem;
    padding: 1.032rem 1.855rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  `}
`;

export const MasterImage = styled.img.attrs(({ theme: { title } }) => ({
  src: title === 'dark' ? darthVaderImg : lukeSkywalkerImg,
}))`
  ${() => css`
    border-radius: 50%;

    @media (max-width: 800px) {
      width: 18.875rem;
    }
  `}
`;

export const MasterDescription = styled.p`
  ${({ theme: { textColor } }) => css`
    color: ${textColor};
    font-size: 2.25rem;
    text-align: center;
  `}
`;

export const MasterName = styled.strong`
  @media (max-width: 800px) {
    display: inline-block;
  }
`;
