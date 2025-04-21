// Importing necessary modules and styles
import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  // Define state variables for the user's question and the AI-generated answer
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Function to send the question to the Gemini API and retrieve the answer
  async function generateAnswer() {
    // Temporarily show a loading message
    setAnswer("Generating answer...");

    try {
      // Make a POST request to the Gemini API using axios
      const response = await axios({
        url: "" /* ADD YOUR GEMINI URL AND API HERE TO MAKE IT WORK */,
        method: "post",
        data: {
          "contents": [{
            "parts": [{ "text": question }] // Send the user's question
          }]
        }
      });

      // Extract the AI-generated answer from the response and update the state
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (err) {
      // Handle errors by displaying an error message
      setAnswer("Error generating answer.");
    }
  }

  // Render the UI
  return (
    <div className="app-container">
      <h1 className="title">💬 Chat AI</h1>

      {/* Text area for user input */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything..."
        className="input-box"
        rows="8"
      ></textarea>

      {/* Button to trigger answer generation */}
      <button onClick={generateAnswer} className="generate-button">
        Generate Answer
      </button>

      {/* Display the AI-generated answer */}
      <div className="output">
        <h2>Answer:</h2>
        <div>{answer}</div>
      </div>
    </div>
  )
}

export default App
