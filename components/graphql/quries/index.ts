import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation RegisterAsAdmin($input: AdminRegisterInput) {
    registerAsAdmin(input: $input) {
      success
    }
  }
`;

export const LOGIN = gql`
  mutation SendAdminLoginOtp($input: AdminLoginInput) {
    sendAdminLoginOtp(input: $input) {
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

export const LOGOUT = gql`
  mutation LogoutUser {
    logoutUser {
      success
    }
  }
`;

export const GET_MY_ACCOUNTS = gql`
  query GetMyAccounts {
    getMyAccounts {
      id
      entityId
      name
      logo
      role
    }
  }
`;

export const LOGIN_BY_ENTITY_ID = gql`
  mutation LoginByEntityId($entityId: ID!) {
    loginByEntityId(entityId: $entityId) {
      token
    }
  }
`;

export const GET_ENTITY = gql`
  query GetEntity {
    getEntity {
      id
      name
    }
  }
`;

export const GET_KYC_COUNTRIES = gql`
  query GetKycCountries {
    getKycCountries {
      name
      code
    }
  }
`;

export const REGISTER_ENTITY = gql`
  mutation RegisterEntity($input: RegisterEntityInput) {
    registerEntity(input: $input) {
      token
    }
  }
`;

export const GET_LOGIN_USER_DETAILS = gql`
  query GetLoginUserDetails {
    getLoginUserDetails {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

export const CHECK_DOMAIN = gql`
  query CheckDomain($input: DomainQuery) {
    checkDomain(input: $input) {
      success
    }
  }
`;
