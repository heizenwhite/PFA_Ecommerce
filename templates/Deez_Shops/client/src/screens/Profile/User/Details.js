import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getUserDetails, updateUserProfile } from "../../../actions/userAction";
import { useEffect, useState } from "react";
import classes from "./Details.module.css";
import DropNotif from "../../../components/Modal/Modal";
import { USER_UPDATE_PROFILE_RESET } from "../../../constants/userConstants";

const Details = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const updateLoading = userUpdateProfile.loading;
  const updateError = userUpdateProfile.error;
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <div className={classes.wrapper}>
      <h2>Profile Utilisateur</h2>
      {success && (
        <DropNotif
          heading="mettre à jour le profil"
          text="mis à jour du profil avec succes"
          resetData={() => {
            dispatch(getUserDetails("profile"));
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
          }}
        ></DropNotif>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      {updateLoading && <Loader />}
      {updateError && <Message variant="danger">{updateError}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
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
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmer votre mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrer votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <button className={classes.update} type="submit" variant="primary">
          Update
        </button>
      </Form>
    </div>
  );
};

export default Details;
