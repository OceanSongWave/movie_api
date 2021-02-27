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
        <br />
        <br />

        <Container>
          <h4 className="mt-4">Movies by {director.Director.Name} you may be interested in...</h4>
          <br />
          <div className="d-flex row mt-3 ml-1">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Director.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="mb-3 mr-2 h-100"
                      style={{ width: '18rem' }}
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
                        <Link to={`/movies/${movie._id}`}>
                          <Button variant="info" size="sm">
                            More Info
                          </Button>
                        </Link>
                      </Card.Body>
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