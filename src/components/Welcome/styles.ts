import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 10rem;
  height: 100vh;
  margin-top: 13.125rem;
`;

export const Block = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.438rem;
`;

export const Title = styled.h1`
  color: var(--primary);
  font-size: 4.5rem;
  font-weight: 400;
  text-align: center;
`;

export const Subtitle = styled.h2`
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.35em;
`;

export const StartButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background-color: var(--primary);
  border: none;
  border-radius: 0.625rem;
  color: var(--white);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  padding: 1.063rem 3.111rem;
  place-self: center;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const ErrorMessage = styled.h3`
  color: var(--danger);
  font-weight: normal;
  padding: 0 2rem;
  text-align: center;
`;
