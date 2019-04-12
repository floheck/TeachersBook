import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../../styles/App.css';
import '../../styles/login.css';
import { LoginViewModel } from 'src/ViewModels/Login/loginViewModel';
import { Redirect } from 'react-router';

class Login extends React.Component<any, any> {

public loginViewModel = new LoginViewModel();

  constructor(props: any, context: any) {
    super(props, context);
    
    this.state = {
        loginSuccessfull: false,
        password: '',
        username: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handelUserNameChange = this.handelUserNameChange.bind(this);
    this.handelPasswordChange = this.handelPasswordChange.bind(this);
  }

  public async handleLogin() {
    const loginSuccessfully = await this.loginViewModel.login(this.state.username, this.state.password);
    this.setState({
        loginSuccessfull: loginSuccessfully
    })
  }

  public handelUserNameChange(event: any) {
    this.setState({
        username: event.target.value
    })
  }

  public handelPasswordChange(event: any) {
      this.setState({
          password: event.target.value
      })
  }

  public render() {
      if(this.state.loginSuccessfull) {
          return <Redirect to='/pupils' />
      }
    return (
        <Container className="login-container">
            <Row className="justify-content-center">
                <Col lg="4" xs="12">
                    <div className="login-card">
                        <Row className="justify-content-center">
                            <Col lg="12" xs="12">
                            <div className="login-logo">Logo</div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col lg="12" xs="12">
                                <div className="login-form-group">
                                    <FontAwesomeIcon icon="envelope" />
                                    <input type="email" placeholder="E-Mail" onChange={this.handelUserNameChange} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col lg="12" xs="12">
                                <div className="login-form-group">
                                    <FontAwesomeIcon icon="key" />
                                    <input type="password" placeholder="Passwort" onChange={this.handelPasswordChange} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col lg="12" xs="12">
                                <button className="btn" onClick={ this.handleLogin }>Anmelden</button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }

}

export default Login;