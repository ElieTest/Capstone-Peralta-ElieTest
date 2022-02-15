import React from "react";
import {Form, FormGroup, InputGroup, Button} from "react-bootstrap";
import  {Link}  from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

export default function  LoginUser() {


        const emailRef = useRef();
        const passwordRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const returnedEmail = emailRef.current.value;
        const returnedPassword = passwordRef.current.value;

        const user = {
            email: returnedEmail,
            password: returnedPassword,
        };

        const POST_URL = "http://localhost:8080/user/authenticate"; // fetch url
        axios.post(POST_URL, user).then((res) => {
            console.log(res);
        });
    }

    return (
        <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3" controlId="emailForm">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" ref={emailRef}/>
            </FormGroup>


            <FormGroup className="mb-3" controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" ref={passwordRef}/>
            </FormGroup>



            <FormGroup className="mb-3" controlId="noAccount">
                <Form.Text className="text-muted">
                    Don't have an account yet?
                </Form.Text>
                <Link to="/signUp" className="btn btn-light ml-2">Sign Up</Link>
            </FormGroup>

            <Button type="submit" variant="primary">Login</Button>




        </Form>
    )


}
