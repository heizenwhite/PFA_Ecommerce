import React, { useEffect, useState } from "react";
import Message from "../../../components/Message";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import classes from "./Address.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../../actions/userAction";
import Loader from "../../../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import { getUserDetails } from "../../../actions/userAction";
import DropNotif from "../../../components/Modal/Modal";

const Addresses = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const updateLoading = userUpdateProfile.loading;
  const updateError = userUpdateProfile.error;
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (user.shippingAddress.address) {
      setAddress(user.shippingAddress.address);
    }
    if (user.shippingAddress.phone) {
      setMobile(user.shippingAddress.phone);
    }
    if (user.shippingAddress.state) {
      setState(user.shippingAddress.state);
    }
    if (user.shippingAddress.city) {
      setCity(user.shippingAddress.city);
    }
    if (user.shippingAddress.fullname) {
      setFullName(user.shippingAddress.fullname);
    }
    if (user.shippingAddress.postalCode) {
      setPostCode(user.shippingAddress.postalCode);
    }
  }, []);

  const saveAddressHandler = (e) => {
    e.preventDefault();
    const updateUser = {
      address,
      city,
      phone: mobile,
      state,
      postalCode: postCode,
      fullname: fullName,
    };
    dispatch(updateUserProfile(updateUser));
  };

  const stateHandler = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" gutterBottom component="div">
        Ajouter une nouvelle Adresse
      </Typography>
      {success && (
        <DropNotif
          heading="Mettre a jour le Profile"
          text="mis à jour du profile succes"
          resetData={() => {
            dispatch(getUserDetails("profile"));
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
          }}
        ></DropNotif>
      )}
      {loading && <Loader />}
      {updateLoading && <Loader />}
      {error && <Message>{error}</Message>}
      {updateError && <Message variant="danger">{updateError}</Message>}
      <form onSubmit={saveAddressHandler}>
        <TextField
          fullWidth
          label="Nom complet"
          variant="filled"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          type="number"
          fullWidth
          label="Numéro de télephone"
          variant="filled"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <TextField
          fullWidth
          label="Code Postale"
          variant="filled"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
        <TextField
          fullWidth
          label="Adresse"
          variant="filled"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="City"
          variant="filled"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
          <Select autoWidth value={state} label="State" onChange={stateHandler}>
            <MenuItem value={"Rabat-Sale-Kenitra"}>Rabat-Sale-Kenitra</MenuItem>
            <MenuItem value={"Casablanca"}>Casablanca</MenuItem>
            <MenuItem value={"Wadi dahab"}>Wadi dahab</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button type="submit" variant="contained">
          Add new Address
        </Button>
      </form>
    </div>
  );
};

export default Addresses;
