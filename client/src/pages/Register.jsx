import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks.js";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
];

const Register = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { valueHandler, genderHandler, formHandler, values } = useForm(
    registerUser,
    {
      username: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
    }
  );

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_proxy, result) {
      history.push("/");
      context.login(result.data.register.userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="register">
      <Form
        onSubmit={formHandler}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={valueHandler}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={valueHandler}
        />
        <Form.Select
          fluid
          label="Gender"
          options={options}
          onChange={genderHandler}
          error={errors.gender ? true : false}
          placeholder="Gender"
        />

        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={valueHandler}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={valueHandler}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="register__list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $gender: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        gender: $gender
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      gender
      createdAt
      token
    }
  }
`;

export default Register;
