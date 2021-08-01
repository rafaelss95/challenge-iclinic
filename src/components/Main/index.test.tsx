import { render, screen, waitFor } from '@testing-library/react';
import { ResponseTransformer, RestContext } from 'msw';
import { Main } from '.';
import { rest, server } from '../../servers/test-server';

type SideCallback = (
  context: RestContext,
) => ResponseTransformer<unknown, unknown>;

function overrideServerWith(
  options: Readonly<{
    darkSide: SideCallback;
    lightSide?: SideCallback;
  }>,
): void;
function overrideServerWith(
  options: Readonly<{
    darkSide?: SideCallback;
    lightSide: SideCallback;
  }>,
): void;
function overrideServerWith({
  darkSide,
  lightSide,
}: Readonly<{
  darkSide?: SideCallback;
  lightSide?: SideCallback;
}>) {
  server.use(
    rest.get(/\/people\/1/, async (_, response, context) => {
      return response(
        lightSide?.(context) ?? context.status(200),
        context.json({ name: 'Luke Skywalker' }),
      );
    }),
    rest.get(/\/people\/4/, async (_, response, context) => {
      return response(
        darkSide?.(context) ?? context.status(200),
        context.json({ name: 'Darth Vader' }),
      );
    }),
  );
}

function setup() {
  render(<Main />);
  const startButton = screen.getByRole('button', { name: /start/i });
  const darthVaderPattern = /darth vader/i;
  const lukeSkywalkerPattern = /luke skywalker/i;

  return { startButton, darthVaderPattern, lukeSkywalkerPattern } as const;
}

describe('<Main />', () => {
  test('renders the dark side', async () => {
    const { startButton, darthVaderPattern } = setup();
    overrideServerWith({
      darkSide: (context) => context.delay(),
      lightSide: (context) => context.delay(50),
    });
    startButton.click();
    expect(await screen.findByText(darthVaderPattern)).toBeInTheDocument();
  });

  test('renders the light side', async () => {
    const { startButton, lukeSkywalkerPattern } = setup();
    overrideServerWith({
      darkSide: (context) => context.delay(50),
      lightSide: (context) => context.delay(),
    });
    startButton.click();
    expect(await screen.findByText(lukeSkywalkerPattern)).toBeInTheDocument();
  });

  test('renders the dark side if light side errored', async () => {
    const { startButton, darthVaderPattern } = setup();
    overrideServerWith({
      lightSide: (context) => context.status(400),
    });
    startButton.click();
    expect(await screen.findByText(darthVaderPattern)).toBeInTheDocument();
  });

  test('renders the light side if dark side errored', async () => {
    const { startButton, lukeSkywalkerPattern } = setup();
    overrideServerWith({
      darkSide: (context) => context.status(401),
    });
    startButton.click();
    expect(await screen.findByText(lukeSkywalkerPattern)).toBeInTheDocument();
  });

  test('renders error message if both sides errored', async () => {
    const { startButton, darthVaderPattern } = setup();
    overrideServerWith({
      darkSide: (context) => context.status(403),
      lightSide: (context) => context.status(422),
    });
    startButton.click();
    expect(startButton).toBeDisabled();
    await waitFor(() => expect(startButton).toBeEnabled());
    expect(
      screen.queryByRole('button', { name: /back/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /oops!/i }),
    ).toBeInTheDocument();

    overrideServerWith({
      darkSide: (context) => context.delay(),
      lightSide: (context) => context.delay(1000),
    });
    startButton.click();
    await waitFor(() =>
      expect(screen.queryByText(/oops!/i)).not.toBeInTheDocument(),
    );
    expect(await screen.findByText(darthVaderPattern)).toBeInTheDocument();
  });

  test('renders random side again and goes back to welcome page', async () => {
    const { startButton, lukeSkywalkerPattern } = setup();
    overrideServerWith({
      darkSide: (context) => context.delay(1000),
      lightSide: (context) => context.delay(500),
    });
    startButton.click();
    expect(await screen.findByText(lukeSkywalkerPattern)).toBeInTheDocument();
    overrideServerWith({
      darkSide: (context) => context.status(500),
      lightSide: (context) => context.status(500),
    });
    const pathChooserButton = screen.getByRole('button', {
      name: /choose your path/i,
    });
    pathChooserButton.click();
    expect(pathChooserButton).toBeDisabled();
    await waitFor(() => expect(pathChooserButton).toBeEnabled());
    expect(screen.getByText(lukeSkywalkerPattern)).toBeInTheDocument();
    const backButton = screen.getByRole('button', { name: /back/i });
    backButton.click();
    expect(screen.queryByText(lukeSkywalkerPattern)).not.toBeInTheDocument();
  });
});
