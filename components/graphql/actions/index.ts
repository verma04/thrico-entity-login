import {
  useLazyQuery,
  useMutation,
  useQuery,
  MutationHookOptions,
  QueryHookOptions,
  LazyQueryHookOptions,
} from "@apollo/client";
import {
  GET_PROFILE,
  GET_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  VERIFY_OTP,
} from "../quries";

export const useRegisterAsAdmin = (options?: MutationHookOptions<any, any>) =>
  useMutation(REGISTER, options);

export const useLoginAsAdmin = (options?: MutationHookOptions<any, any>) =>
  useMutation(LOGIN, options);

export const useOtpLogin = (options?: MutationHookOptions<any, any>) =>
  useMutation(VERIFY_OTP, options);

export const useGetUser = (options?: QueryHookOptions<any, any>) =>
  useQuery(GET_USER, options);

export const useUserProfile = (options?: QueryHookOptions<any, any>) =>
  useQuery(GET_PROFILE, options);

export const useLogoutUser = (options?: MutationHookOptions<any, any>) =>
  useMutation(LOGOUT, options);

export const useCheckUser = (options?: LazyQueryHookOptions<any, any>) =>
  useLazyQuery(GET_USER, options);
