import { Formik } from "formik";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import * as Yup from "yup";
import firebase from "../../../FireBase";
import { AppState } from "../../../store";
import { userActions } from "../containers/login";
interface OwnProps {}

type LoginProps = OwnProps & userActions & AppState & RouteComponentProps;

interface OwnState {
  name: string;
  password: string;
}

export class Login extends React.Component<LoginProps, OwnState> {
  handleOnSubmit = (values: any) => {
    console.log("submit");
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        this.props.setUser({
          email: values.email,
          isLogin: true,
          uid: ""
        });
        this.props.history.push("/home");
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };
  render() {
    return (
      <Container>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={values => this.handleOnSubmit(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string().required()
          })}
          render={({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={{ size: 6, offset: 3 }}>
                  <p style={{ textAlign: "center" }}>ログイン</p>
                  <FormGroup>
                    <Label for="name">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.email && errors.email ? true : false}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={
                        touched.password && errors.password ? true : false
                      }
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 6, offset: 3 }}>
                  <div style={{ textAlign: "center" }}>
                    <Button color="success" type="submit" disabled={false}>
                      ログイン
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        />
      </Container>
    );
  }
}
