import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { createProduct } from "../../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../../constants/productConstants";
import DropNotif from "../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../components/TextEditor/MarkdownEditor";

const ProductCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingDesc, setUploadingDesc] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product, success } = productCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadImageForDesc = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploadingDesc(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/upload/descripion",
        formData,
        config
      );

      setDescription(description + "\n" + data);
      setUploadingDesc(false);
    } catch (error) {
      console.error(error);
      setUploadingDesc(false);
    }
  };

  const onChange = (value) => {
    setDescription(value);
  };
  return (
    <>
      <Container className="mb-5">
        <Link to="/userProfile" className="btn btn-primary my-3">
          Retour
        </Link>
        <h1>Cr??er un produit</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <DropNotif
            heading="Cr??er Produit"
            text="Creation produit avec succes"
            resetData={() => {
              history.push(`/admin/product/${product._id}/edit`);
              dispatch({ type: PRODUCT_CREATE_RESET });
            }}
          ></DropNotif>
        )}
        {loading ? (
          <Loader />
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

            <Form.Group controlId="price">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Entrer URL d'image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Col xs={6} md={4}>
              <Image className="img-fluid" src={image} rounded />
            </Col>

            <Form.Group controlId="brand">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre marque"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Quantit??</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer votre quantite"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="selection">
              <Form.Label>Cat??gorie</Form.Label>
              <Form.Control
                as="select"
                placeholder="Entrer votre categorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""></option>
                <option value="Books">Livre</option>
                <option value="Games">Jeux</option>
                <option value="Electronics">Electronics</option>
                <option value="Men">V??tement Homme</option>
                <option value="Women">V??tement Femme</option>
                <option value="Baby">B??b??</option>
                <option value="Automobile">Automobile</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mt-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.File
                className="mb-3"
                id="image-file"
                custom
                onChange={uploadImageForDesc}
              ></Form.File>
              {uploadingDesc && <Loader />}
              <MarkdownEditor text={description} onChange={onChange} />
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary">
              Cr??er un produit
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductCreateScreen;
