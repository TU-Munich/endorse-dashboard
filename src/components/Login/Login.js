import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";
import LockIcon from '@material-ui/icons/LockOutlined';
import React, {Component} from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";

const LoginBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 400px;
`;

const LoginBoxPaper = styled(Paper)`
  padding: 15px;
`;

const LoginBoxAvatar = styled(Avatar)`
  margin: 20px auto;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
    this.state = {token: localStorage.getItem('token')};
  }

  localStorageUpdated() {
    if (localStorage.getItem('token')) {
      this.updateState(null)
    } else {
      this.updateState("TOKEN")
    }
  }

  updateState(value) {
    this.setState({isLoggedIn: value})
  }

  handleLoginClick() {
    localStorage.setItem('token', "TOKEN");
    this.setState({
      token: "TOKEN"
    });
  }

  handleLogoutClick() {
    localStorage.setItem('token', null);
    this.setState({token: null});
  }

  render() {
    return(
      <LoginBox className="login-box">
        <CssBaseline/>
        <LoginBoxPaper className="login-box-paper">
          <LoginBoxAvatar className="login-box-avatar">
            <LockIcon/>
          </LoginBoxAvatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password"/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleLoginClick}>
            Sign in
          </Button>
        </LoginBoxPaper>
      </LoginBox>
    )
  }
}

export default Login