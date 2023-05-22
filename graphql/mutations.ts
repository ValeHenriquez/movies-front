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
        email
        password
        name
      }
    }
  }
`;

export const CREATE_PLAYLIST_MUTATION = gql`
mutation addPlaylist($input: CreatePlaylistInput!){
  addPlaylist(createPlaylistInput: $input){
    id
    title
    description
  }
}
`

export const REMOVE_PLAYLIST_MUTATION = gql`
mutation removePlaylist($id: String!){
  removePlaylist(id: $id){
    id
  }
}
`



export const UPDATE_PLAYLIST_MUTATION = gql`
mutation updatePlaylist($updatePlaylistInput: UpdatePlaylistInput!){
  updatePlaylist(updatePlaylistInput: $updatePlaylistInput){
    id
    movies{
      id
    }
  }
}
`