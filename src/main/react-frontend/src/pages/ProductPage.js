import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container,Col,Row,Button,Form,Stack} from "react-bootstrap";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import Image from "../components/items/Image";

export default function ProductPage() {
	let { itemid } = useParams();

	//Fetches the item using item ID
	const FETCH_URL = "http://localhost:8080/item/get/" + itemid;
	var [datajson, setDataJson] = useState([]); // used to store data TODO rename var

	// function that will be called when the page loads purpose is to handle and process the axios get request
	async function gatherData() {
		return await axios
			.get(FETCH_URL) // preform get request
			.then((res) => {
				return res.data; // return response
			})
			.catch((err) => console.error(err));
	}

	// runs the gatherdata function when the page loads
	useEffect(() => {
		gatherData().then((data) => {
			setDataJson(data || "no data returned"); // store returned data in a variable
		});
	}, []);

	//sets what is output to the webpage


	if (datajson === "no data returned") { //if no data is found return NO DATA FOUND
		return (
			<section>
				<p>{datajson}</p>
				<p>NO DATA FOUND</p>
			</section>
		);
	} else { //if data is found return the data (item information)
		return (
			<>
				<Container fluid={"xxl"}>
					<Row>
						<Col md="auto" xs={10}>
							<Image itemId={itemid} size="350px" />
						</Col>

						<Col md="auto">
							<div>{datajson.itemName}</div>
							<div>item category placeholder</div>
							<div>${datajson.itemPrice}</div>

							<Form>
								<Form.Group controlId="size-select" className={"mb-3"}>
									<Form.Label>Select Size</Form.Label>
									<Form.Control as="select">
										<option>Small</option>
										<option>Medium</option>
										<option>Large</option>
									</Form.Control>
								</Form.Group>

								<Form.Group controlId="quantity-select" className="mb-3">
									<Form.Label>Select Quantity</Form.Label>
									<Form.Control as="select">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Form.Control>
								</Form.Group>

								{/*Adds to cart using previous*/}
								<UserContext.Consumer >
									{(value) => {
										function AddToCart() {
											let newCart = value.contextData.cart;

											for (let i = 0; i < newCart.length; i++) {
												if (newCart[i].item.itemName === datajson.itemName) {
													newCart[i].quantity++;
													return newCart;
												}
											}

											newCart.push({ item: datajson, quantity: 1 });
											return newCart;
										}

										return (
											<Button variant={"primary"} className={"m-1"}
												onClick={() => {
													// Do this:
													value.setContextData((prevData) => {
														return {
															...prevData,
															cart: AddToCart(),
														};
													});
												}}
												
											>
												Add To Cart
											</Button>
										);
									}}
								</UserContext.Consumer>
								<Button variant={"primary"} className={"m-1"}>
									Buy Now
								</Button>
							</Form>
						</Col>
					</Row>

					<Row>
						{/*item desciption placeholder*/}
						<Stack gap={3}>
							<div></div>
							<div>
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum."
							</div>
						</Stack>
					</Row>
				</Container>


			</>
		);
	}
}
