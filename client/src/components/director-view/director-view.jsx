import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './director-view.scss';

import { Button, Container, Col, Row, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Col className="col-3" />
          <Col className="director-view container-fluid align-items-center col-6">
            <div className="director-title">
              <span className="label"></span>
              <span className="value">{director.Director.Name}</span>
            </div>
            <br />
            <div className="director-bio">
              <span className="label"></span>
              <span className="value">{director.Director.Bio}</span>
            </div>
            <br />
            <div className="director-birth">
              <span className="label">Birth Year:  </span>
              <span className="value">{director.Director.Birth}</span>
            </div>
            <br />

            <Link to={`/`}>
              <Button variant="info">Back to All Movies</Button>
            </Link>
          </Col>
          <Col className="col-3" />
        </Row>

        <Container>
          <h4 className="mt-4">Some {director.Director.Name} movies</h4>
          <div className="d-flex row mt-3 ml-1">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Director.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="mb-3 mr-2 h-100"
                      style={{ width: '16rem' }}
                    >
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Link
                          className="text-muted"
                          to={`/movies/${movie._id}`}
                        >
                          <Card.Title>{movie.Title}</Card.Title>
                        </Link>
                        <Card.Text>
                          {movie.Description.substring(0, 90)}...
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-top-0">
                        <Link to={`/movies/${movie._id}`}>
                          <Button
                            variant="link"
                            className="read-more-link pl-0"
                          >
                          Read more
                          </Button>  
                        </Link>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }),
};