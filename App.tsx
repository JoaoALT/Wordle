import {  GameProvider } from './src/context/GameContext';
import React from 'react';
import WordleView from './src/views/WordleView';

export default function App() {
  return (
        <GameProvider>
            <WordleView />
        </GameProvider>
  );
}
