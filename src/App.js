import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import './table.css';

function App() {
  const [starPeeps, setStarPeeps] = useState();
  const [apiURL, setAPIUrl] = useState('https://swapi.dev/api/people/');
  const [isPaginated, setIsPaginated] = useState(false);
  const [prevURL, setPrevURL] = useState(null);

  useEffect(() => {
    fetchData(apiURL);
  }, []);

  const fetchData = (url) => {
    fetch(url)
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
    const isFirstPage = prevURL?.split('=')[1];
    fetchData(prevURL);
    if (isFirstPage === '1' || typeof isFirstPage === undefined) {
      setIsPaginated(false);
    }
  }

  const goToNextPage = () => {
    setIsPaginated(true);
    fetchData(apiURL);
  }

  return (
    <>
    <Container fluid>
      <Row>
        <Col>
          <header>
            <h1>Starwars API Pagination</h1>
          </header>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table dark striped>
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
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
            {isPaginated ?
              <Button color="secondary" type="button" className="mr-4" onClick={goToPrevPage}>Go Back</Button>
            :
              null
            }
            <Button color="secondary" type="button" onClick={goToNextPage}>Click me Obi Wan, you're my only hope</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
