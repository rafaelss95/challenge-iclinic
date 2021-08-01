import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly title: 'dark' | 'light';
    readonly backgroundColor: string;
    readonly textColor: string;
  }
}
