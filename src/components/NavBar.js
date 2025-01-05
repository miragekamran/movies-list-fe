import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";

export default function NavBar() {
    return (
        <Router>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            fontFamily="monospace"
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            FilmFaves
                        </Typography>
                        <Button color="inherit">
                            <Link
                                to="/SignIn"
                                style={{ textDecoration: "none" }}
                            >
                                SignIn
                            </Link>
                        </Button>
                        <Button color="inherit">
                            <Link
                                to="/SignUp"
                                style={{ textDecoration: "none" }}
                            >
                                SignUp
                            </Link>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/SignIn" component={SignIn} />
                    <Route path="/SignUp" component={SignUp} />
                </Switch>
            </Box>
        </Router>
    );
}
