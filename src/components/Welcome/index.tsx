import {
  Block,
  Container,
  ErrorMessage,
  StartButton,
  Subtitle,
  Title,
} from './styles';

type WelcomeProps = Readonly<{
  disableStart: boolean;
  hasError: boolean;
  onStart(): void;
}>;

export function Welcome({ disableStart, hasError, onStart }: WelcomeProps) {
  return (
    <Container>
      <Block>
        <Title>
          Welcome to&nbsp;<strong>iClinic</strong>
        </Title>
        <Subtitle>FRONTEND CHALLENGE</Subtitle>
      </Block>
      <Block>
        <StartButton disabled={disableStart} onClick={onStart}>
          START
        </StartButton>
        {hasError && (
          <ErrorMessage>
            Oops! We were unable to show your path this time. You could try
            again and if the error persists, don't hesitate to contact us
            directly :)
          </ErrorMessage>
        )}
      </Block>
    </Container>
  );
}
