import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Cat = () => {
  const [cats, setCats] = useState([])
  useEffect(()=>{
    getCats();
  },[])
  const getCats = async () => {
    try {
      let res = await axios.get("api/cats")
      setCats(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const renderCats = () => {
    return cats.map((c) => {
      return (
        <p>{c.name}</p>
      )
    })
  }
  return (
    <div>
      {renderCats()}
    </div>
  );
};

export default Cat;