import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation RegisterAsAdmin($input: AdminRegisterInput) {
    registerAsAdmin(input: $input) {
      success
    }
  }
`;

export const LOGIN = gql`
  mutation LoginAsAdmin($input: AdminLoginInput) {
    loginAsAdmin(input: $input) {
      id
      status
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation OtpLogin($input: AdminOtpInput) {
    otpLogin(input: $input) {
      token
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      status
    }
  }
`;

export const GET_PROFILE = gql`
  query UserProfile {
    userProfile {
      email
      firstName
      lastName
    }
  }
`;
export const LOGOUT = gql`
  mutation LogoutUser {
    logoutUser {
      success
    }
  }
`;
