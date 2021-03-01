import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./genre-view.scss";

import { Row, Container, Col, Card } from "react-bootstrap";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="wrapper container-fluid">
        <Container className="outterbox container-fluid">
        <Row>
          <Col className="col-3" />
          <Col sm="auto" className="genre-view container-fluid align-items-center">
            <div className="genre-title">
              <span className="label"></span>
              <span className="value">{genre.Genre.Name}</span>
            </div>
            <br />
            <div className="genre-description">
              <span className="label"></span>
              <span className="value">{genre.Genre.Description}</span>
            </div>
            <br />
            <Link to={`/`}>
              <Button variant="info">Back to All Movies</Button>
            </Link>
          </Col>
          <Col className="col-3" />
        </Row>
        </Container>
        <br />
        <br />

        <Container>
          <h4 className="mt-4">
            Other {genre.Genre.Name} Movies you may be interested in...
          </h4>
          <br />
          <div className="d-flex row mt-3 ml-2">
            {movies.map((movie) => {
              if (movie.Genre.Name === genre.Genre.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="mb-3 mr-2 h-100"
                      style={{ width: "18rem" }}
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

GenreView.propTypes = {
  Movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    },
  }),
};
