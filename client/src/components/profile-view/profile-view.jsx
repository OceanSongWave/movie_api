import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import "./profile-view.scss";

import { Form, Button, Card, Container, Col, Row } from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser(token) {
    //console.log(localStorage.getItem("user"));
    let url =
      "https://starflix-movieworld.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://starflix-movieworld.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  handleDelete() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(`https://starflix-movieworld.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + " has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    // this.getUser(localStorage.getItem("token"));
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    // console.log(favoriteMovieList);

    if (!movies) alert("Please sign in");
    return (
      <Container className="wrapper container-fluid">
        <Container className="outterbox container-fluid">
          <Row>
            <Col
              sm="auto"
              className="profile-view container-fluid align-items-center"
            >
              <div className="profile-heading">Your Profile Details</div>
              <br />
              <br />

              <Form.Group controlId="formBasicUsername">
                <h4>Username: </h4>
                <Form.Label className="userInfo">
                  {this.state.username}
                </Form.Label>
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicEmail">
                <h4>Email:</h4>
                <Form.Label className="userInfo">{this.state.email}</Form.Label>
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicDate">
                <h4>Date of Birth:</h4>
                <Form.Label className="userInfo">{this.state.dob}</Form.Label>
              </Form.Group>
              <br />
              <br />

              <Link to={`/update/${this.state.username}`}>
                <Button
                  className="edit-button"
                  variant="primary"
                  type="link"
                  size="sm"
                >
                  Edit Your Profile
                </Button>
              </Link>
              <br />
              <br />

              <Link to={`/`}>
                <Button className="back-button" variant="success" size="sm">
                  Back to All Movies
                </Button>
              </Link>
              <br />
              <br />

              <Button
                className="delete-button"
                variant="danger"
                size="sm"
                onClick={() => this.handleDelete()}
              >
                Delete Your Account
              </Button>
              <br />
              <br />
            </Col>
          </Row>
        </Container>

        <h4 className="mt-4">
            Your Favorite Movies
          </h4>
        <br />
        <br />
        <div className="d-flex row mt-0 ml-2">
          {favoriteMovieList.map((movie) => {
            return (
              <div className="fav-movie" key={movie._id}>
                <Card>
                  <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Title>{movie.Title}</Card.Title>
                    </Link>
                  </Card.Body>
                  <Button
                    className="remove-fav"
                    variant="warning"
                    size="sm"
                    onClick={() => this.removeFavorite(movie)}
                  >
                    Remove from Favorites
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};