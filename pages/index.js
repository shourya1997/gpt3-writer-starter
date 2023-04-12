import { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames'
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const tonalityOptions = ['happy', 'sad', 'witty', 'desperate', 'covincing']

const Home = () => {
  const [input, setInput] = useState('');
  const [selectedTonality, setTonality] = useState([])
  console.log(selectedTonality)
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  
  const onChange = (event) => {
    console.log(event.target.value)
    setInput(event.target.value);
  };

  console.log(input, isGenerating)

  const handleTonalitySelect = (currTone) => {
    // check if currTone exist in selectedTonality
    const hasSelected = selectedTonality.includes(currTone)
    let currSelected = [...selectedTonality]

    if(hasSelected) {
    // if currTone exist in selectedTonality
    currSelected = currSelected.filter(curr => curr !== currTone)  

    }else {
      if(selectedTonality.length < 3) {
        // if curr does not exist in selectedTonality
        currSelected = [...currSelected, currTone]
      }else {
        alert("You can only select 3 tonalities")
      }
    
    }

    setTonality(currSelected)
  }

  const generateAction = async () => {
    console.log('sdasda')
    if (isGenerating) return;

    if(selectedTonality.length == 0){
      alert("You have to choose atleast 1")
    }
    // if (input) && (selectedTonality.length > 0){
    //   obj = {input: input, tonalities: selectedTonality};

    // }

    setIsGenerating(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {input} ),
    });
    const data = await response.json();
    // const { baseChoice, finalChoice } = data;
    const { baseChoice } = data;
    setOutput(
      // `Song Titles:${finalChoice.text}\n\nLyrics:\n${input}${baseChoice.text}`
      `Your Flair:\n${baseChoice.text}`
    );

    setIsGenerating(false);
  }

  useEffect(() => {
    const keydownHandler = async (event) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'Enter') {
        event.preventDefault();
        await generateAction();
      }
    };

    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [generateAction]);


  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Tone Genie</h1>
          </div>
          <div className="header-subtitle">
            <h2>Add Flair to Your Words</h2>
          </div>
          <div className="tonality-wrapper">
            {tonalityOptions.map(tone => 
            <button
            onClick={() =>handleTonalitySelect(tone)}
            className={
              classnames("tonality-btn", selectedTonality.includes(tone) ? "active": "")
              }>{tone}</button>)}
          </div>

        </div>
        <div className="prompt-container">
          <textarea className="prompt-box" value={input} onChange={onChange} />
          <div className="prompt-buttons">
            <div className="key-stroke">
              <p>cmd/ctrl + enter</p>
            </div>
            <div className="or">
              <p>OR</p>
            </div>
            <button
              className={
                isGenerating ? 'generate-button loading' : 'generate-button'
              }
              onClick={()=>generateAction()}
              >
              {/* <div className="generate" onClick={generateAction} > */}
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              {/* </div> */}
            </button>
          </div>
        </div>
        {output && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{output}</p>
            </div>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
