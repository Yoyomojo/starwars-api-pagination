import React, { useState, useEffect } from 'react';
import './table.css';

function App() {
  const [starPeeps, setStarPeeps] = useState();
  const [apiURL, setAPIUrl] = useState('https://swapi.dev/api/people/');
  const [isPaginated, setIsPaginated] = useState(false);
  const [prevURL, setPrevURL] = useState(null);

  useEffect(() => {
    fetchData(apiURL);
  }, []);

  const fetchData = (apiURL) => {
    fetch(apiURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResp) {
      setStarPeeps(jsonResp.results);
      setAPIUrl(jsonResp.next);
      setPrevURL(jsonResp.previous);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  const goToPrevPage = () => {
    let isFirstPage = apiURL.split('=');
    if (isFirstPage !== '2' || isFirstPage !== '') {
      fetchData(prevURL);
    } else {
      fetchData(apiURL);
      setIsPaginated(false);
    }
  }

  const goToNextPage = () => {
    setIsPaginated(true);
    fetchData(apiURL);
  }

  return (
    <>
      <p>Starwars</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Homeworld</th>
          </tr>
        </thead>
        <tbody>
          {starPeeps && starPeeps.map((person, index) => (
            <tr key={index} className={index%2 === 0 ? 'even' : 'odd'}>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.homeworld}</td>
            </tr>
          ))}
          <tr>
            {isPaginated ?
              <td><button type="button" onClick={goToPrevPage}>Go Back</button></td>
            :
              null
            }
            <td><button type="button" onClick={goToNextPage}>Click me Obi Wan, you're my only hope</button></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
