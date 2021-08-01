import { ThemeProvider } from 'styled-components';
import { ReactComponent as ArrowLeftIcon } from '../../assets/images/arrow-left.svg';
import { darkTheme, lightTheme } from '../../assets/styles/themes';
import {
  BackButton,
  Container,
  MasterDescription,
  MasterImage,
  MasterName,
  SideChooserButton,
} from './styles';

type CharacterProps = Readonly<{
  loading: boolean;
  name: string;
  onBack(): void;
  onChooseSide(): void;
}>;

export function Character({
  loading,
  name,
  onBack,
  onChooseSide,
}: CharacterProps) {
  const isDarkSide = name.toLowerCase().replace(/\s/g, '') === 'darthvader';
  const theme = isDarkSide ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Container data-testid="container">
        <BackButton onClick={onBack}>
          <ArrowLeftIcon fill={theme.textColor} />
          <span>back</span>
        </BackButton>
        <SideChooserButton disabled={loading} onClick={onChooseSide}>
          choose your path again, Padawan
        </SideChooserButton>
        <MasterImage alt={name} />
        <MasterDescription>
          Your master is&nbsp;
          <MasterName>{name}</MasterName>
        </MasterDescription>
      </Container>
    </ThemeProvider>
  );
}
