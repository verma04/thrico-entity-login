import {
  useLazyQuery,
  useMutation,
  useQuery,
  MutationHookOptions,
  QueryHookOptions,
  LazyQueryHookOptions,
} from "@apollo/client";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  VERIFY_OTP,
  GET_MY_ACCOUNTS,
  LOGIN_BY_ENTITY_ID,
  GET_ENTITY,
  GET_KYC_COUNTRIES,
  REGISTER_ENTITY,
  GET_LOGIN_USER_DETAILS,
  CHECK_DOMAIN,
} from "../quries";

export const useRegisterAsAdmin = (options?: MutationHookOptions<any, any>) =>
  useMutation(REGISTER, options);

export const useLoginAsAdmin = (options?: MutationHookOptions<any, any>) =>
  useMutation(LOGIN, options);

export const useOtpLogin = (options?: MutationHookOptions<any, any>) =>
  useMutation(VERIFY_OTP, options);

export const useLogoutUser = (options?: MutationHookOptions<any, any>) =>
  useMutation(LOGOUT, options);

export const useGetMyAccounts = (options?: LazyQueryHookOptions<any, any>) =>
  useLazyQuery(GET_MY_ACCOUNTS, options);

export const useLoginByEntityId = (options?: MutationHookOptions<any, any>) =>
  useMutation(LOGIN_BY_ENTITY_ID, options);

export const useGetEntity = (options?: QueryHookOptions<any, any>) =>
  useQuery(GET_ENTITY, options);

export const useKycCountries = (options?: QueryHookOptions<any, any>) =>
  useQuery(GET_KYC_COUNTRIES, options);

export const useRegisterEntity = (
  options?: MutationHookOptions<any, any>
) => useMutation(REGISTER_ENTITY, options);

export const useGetLoginUserDetails = (options?: QueryHookOptions<any, any>) =>
  useQuery(GET_LOGIN_USER_DETAILS, options);

export const useCheckDomain = (options?: QueryHookOptions<any, any>) =>
  useQuery(CHECK_DOMAIN, options);
