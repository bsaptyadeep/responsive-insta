import React, { useState } from 'react';
import './App.css';
import StoryNavigation from './components/StoryNavigation';
import { Button } from 'antd';

function App() {
  const [showStory, setShowStory] = useState<boolean>(false);

  return (
    <div className="App">
      {showStory && <StoryNavigation onClose={() => setShowStory(false)} />}
        {!showStory && <Button
        onClick={() => setShowStory(true)}
        >
          Open Story
        </Button>}
    </div>
  );
}

export default App;
