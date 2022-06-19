import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getUserDetails, updateUser } from "../../../actions/userAction";
import { USER_UPDATE_RESET } from "../../../constants/userConstants";
import DropNotif from "../../../components/Modal/Modal";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsSeller(user.isSeller);
    }
  }, [dispatch, user, userId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin, isSeller }));
  };

  return (
    <>
      <Container>
        <Link to="/userProfile" className="btn btn-primary my-3">
          Retour
        </Link>
        <h1>Editer Utilisateur</h1>
        {successUpdate && (
          <DropNotif
            heading="Changer statut"
            text="Changer statut utilisateur avec succes"
            resetData={() => {
              dispatch({ type: USER_UPDATE_RESET });
              history.push("/userProfile");
            }}
          ></DropNotif>
        )}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="name"
                placeholder="Entrer votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer votre mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Admin ?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="isSeller" className="my-3">
              <Form.Check
                type="checkbox"
                label="Vendeur ?"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Mettre à jour
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};
export default UserEditScreen;
