import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
mutation signup($signUpInput: SignUpInput!) {
    signup(signUpInput: $signUpInput) {
        id
        email
        password
        name
    }
}
`;

export const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user{
        id
        email
        password
        name
      }
    }
  }
`;

