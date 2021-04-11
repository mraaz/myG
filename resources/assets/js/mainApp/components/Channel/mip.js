import React, { useState, useEffect } from 'react'
import axios from 'axios';

const MostImprovedGamer = () => {
  const [alias, setAlias] = useState('');
  const mipEndpoint = '/api/userStatTransaction/mostImprovedGamer'
  useEffect(() => axios.get(mipEndpoint).then((response) => setAlias(response.data.alias)), []);
  if (!alias) return null;
  return(
    <div className="most-improved-gamer">{alias} has achieved Most Improved Player (MIP) award this week.</div>
  );
}

export default MostImprovedGamer;