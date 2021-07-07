import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Congrats from './components/Congrats';
import NewWordButton from './components/NewWordButton';
import GuessedWords from './components/GuessedWords';
import Input from './components/Input';
import TotalGuesses from './components/TotalGuesses';
import { getSecretWord, resetGame } from './actions';

const App = () => {
  const success = useSelector(state => state.success);
  const secretWord = useSelector(state => state.secretWord);
  const guessedWords = useSelector(state => state.guessedWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, []);


  return (
    <div className="component-app">
      <h1>Jotto</h1>
      <div>The secret word is {secretWord}</div>
      <Congrats success={success} />
      <NewWordButton display={success} resetAction={resetGame}/>
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
      <TotalGuesses guessCount={guessedWords.length} />
    </div>
  );
}

export default App;
