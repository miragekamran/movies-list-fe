import React from "react";
import "./SignIn.css";
import "../App.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import moviesimg from "../assets/images/netflix.jpg";

export default function SignIn() {
    return (
        <div
            style={{
                backgroundImage: `url(${moviesimg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100vh",
            }}
        >
            <div className="container">
                <div className="text-center m-5-auto">
                    <h2
                        style={{
                            textShadow: "-1px 1px 10px rgba(255,255,255)",
                            fontWeight: "bold",
                        }}
                    >
                        Sign In
                    </h2>
                    <form className="fontColor" action="/home">
                        <p>
                            <label>Username or email address</label>
                            <br />
                            <input type="text" name="first_name" required />
                        </p>
                        <p>
                            <label>Password</label>
                            <Link to="/forget-password">
                                <label className="right-label">
                                    Forget password?
                                </label>
                            </Link>
                            <br />
                            <input type="password" name="password" required />
                        </p>
                        <p>
                            <Button color="inherit" id="sub_btn" type="submit">
                                SignIn
                            </Button>
                        </p>
                    </form>
                    <footer>
                        <div className="footers ">
                            <p>
                                First time?{" "}
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "lightblue",
                                        textShadow:
                                            "-1px 1px 10px rgba(255,255,255)",
                                        fontWeight: "bold",
                                    }}
                                    to="/SignUp"
                                >
                                    Create an account
                                </Link>
                            </p>
                            <p>
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "lightblue",
                                        textShadow:
                                            "-1px 1px 10px rgba(255,255,255)",
                                        fontWeight: "bold",
                                    }}
                                    to="/"
                                >
                                    Back to Homepage
                                </Link>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
