import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(text);
    try {
      let res = await axios.post("/api/memes", { text });
    } catch (err) {
      alert("err in post meme occured");
    }
  };
  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <p>text</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
