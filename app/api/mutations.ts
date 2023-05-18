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