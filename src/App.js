import { useState, useEffect } from "react";
import { Loader } from "./Loader";
import "./styles.css";

function App() {
  const [riddles, setRiddles] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);


  const getRiddle = async () => {
    setLoading(true);
    await fetch("https://riddles-api.vercel.app/random")
      .then(res => res.json())
      .then(data => setRiddles(data));  

    setShowAnswer(false);
    setLoading(false);
  }

  useEffect(() => {
    getRiddle();
  }, [])

  const answerToggler = () => setShowAnswer(true);


  return (
    <div className="Riddles">
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <div className="riddle">
        {loading ? (
          <Loader />
        ) : (<div className="data">
          <p className="question">Riddle: {riddles.riddle}</p>
          <p className="answer">Answer:&nbsp;
            {!showAnswer &&
              <button className="show" onClick={answerToggler}>{riddles.answer}</button>
            }
            {showAnswer && <span>{riddles.answer}</span>}</p>
        </div>)}
        <div className="btnContainer">
          <button onClick={getRiddle} className="btn">
            ?
          </button>
        </div>
      </div>
    </div>
  )
}

export default App;
