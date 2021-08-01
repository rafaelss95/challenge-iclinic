import { render, screen } from '@testing-library/react';
import { css } from 'styled-components';
import { Character } from '.';
import { SideChooserButton } from './styles';

function setup(name: string) {
  const handleBackButton = jest.fn();
  const handleChooseSide = jest.fn();
  render(
    <Character
      loading={false}
      name={name}
      onBack={handleBackButton}
      onChooseSide={handleChooseSide}
    />,
  );
  const container = screen.getByTestId('container');
  const backButton = screen.getByRole('button', {
    name: /back/i,
  });
  const pathChooserButton = screen.getByRole('button', {
    name: /choose your path/i,
  });
  const avatar = screen.getByRole('img');
  const nameText = screen.getByText(/your master is/i);

  return {
    container,
    backButton,
    pathChooserButton,
    avatar,
    nameText,
  } as const;
}

describe('<Character />', () => {
  test.each([
    ['dark', 'darth vader', 'darth-vader.png', '#2A2A2A', '#FFFFFF'],
    ['light', 'luke skywalker', 'luke-skywalker.png', '#FBFE63', '#2A2A2A'],
  ] as const)(
    'renders corresponding theme according to %s side',
    (_, name, imageSrc, primaryColor, secondaryColor) => {
      const { container, backButton, pathChooserButton, avatar, nameText } =
        setup(name);
      expect(container).toHaveStyle({ background: primaryColor });
      expect(container).toHaveStyleRule('order', '4', {
        media: '(max-width: 800px)',
        // TODO: Remove typecast once this issue (https://github.com/styled-components/jest-styled-components/issues/268) is fixed.
        modifier: css`
          ${SideChooserButton}
        ` as unknown as string,
      });
      expect(backButton).toHaveAttribute('type', 'button');
      expect(backButton).toHaveStyle({ color: secondaryColor });
      expect(pathChooserButton).toHaveAttribute('type', 'button');
      expect(pathChooserButton).toHaveStyle({
        background: secondaryColor,
        color: primaryColor,
      });
      expect(avatar).toHaveAttribute('alt', name);
      expect(avatar).toHaveAttribute('src', imageSrc);
      expect(nameText).toHaveStyle({ color: secondaryColor });
    },
  );
});
