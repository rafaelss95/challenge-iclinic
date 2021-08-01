import { useState } from 'react';
import { api } from '../../services/api';
import { Character } from '../Character';
import { Welcome } from '../Welcome';

enum Status {
  Complete,
  Error,
  Idle,
  Loading,
}

type CharacterModel = Readonly<{ name: string }>;
type CharacterResult = Readonly<{
  character: CharacterModel | null;
  status: Status;
}>;

export function Main() {
  const [{ character, status }, setCharacterResult] = useState<CharacterResult>(
    {
      character: null,
      status: Status.Idle,
    },
  );

  async function loadRandomCharacter() {
    setCharacterResult((previousState) => ({
      ...previousState,
      status: Status.Loading,
    }));

    try {
      const { data } = await Promise.any([
        api.get<CharacterModel>('people/1'),
        api.get<CharacterModel>('people/4'),
      ]);

      setCharacterResult({ character: data, status: Status.Complete });
    } catch {
      setCharacterResult((previousState) => ({
        ...previousState,
        status: Status.Error,
      }));
    }
  }

  function resetCharacter() {
    setCharacterResult({ character: null, status: Status.Idle });
  }

  if (character) {
    return (
      <Character
        loading={status === Status.Loading}
        name={character.name}
        onBack={resetCharacter}
        onChooseSide={loadRandomCharacter}
      />
    );
  }

  return (
    <Welcome
      disableStart={status === Status.Loading}
      hasError={status === Status.Error}
      onStart={loadRandomCharacter}
    />
  );
}
