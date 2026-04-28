import { generateSlug } from "random-word-slugs";
import { create } from "zustand";

const randomDomain = generateSlug();

interface RegisterEntityFormStore {
  current: number;
  setCurrent: (current: number) => void;
  profile: {
    designation: string;
    phone: { phone: string; code: string; isoCode: string } | null;
    country: string;
    language: string;
  };
  setProfile: (profile: Partial<RegisterEntityFormStore["profile"]>) => void;
  organization: {
    name: string;
    entityType: string;
    industryType: string;
    website: string;
    address: string;
    language: string;
    agreement: boolean;
    logo: any;
  };
  setOrganization: (
    organization: Partial<RegisterEntityFormStore["organization"]>,
  ) => void;
  kyc: {
    accountType: string;
    panCard: string;
    gstNumber: string;
    billingAddressLine1: string;
    billingAddressLine2: string;
    billingCity: string;
    billingState: string;
    billingPincode: string;
  };
  setKyc: (kyc: Partial<RegisterEntityFormStore["kyc"]>) => void;
  domain: string;
  setDomain: (domain: string) => void;
  logo: any;
  setLogo: (logo: any) => void;
  logoPreview: string;
  setLogoPreview: (logoPreview: string) => void;
  stepValidity: { [key: number]: boolean };
  setStepValidity: (step: number, isValid: boolean) => void;
  submitHandlers: { [key: number]: () => void };
  setSubmitHandler: (step: number, handler: () => void) => void;
}

export const useRegisterEntityFormStore = create<RegisterEntityFormStore>(
  (set) => ({
    current: 0,
    setCurrent: (current) => set({ current }),
    profile: {
      designation: "",
      phone: null,
      country: "",
      language: "",
    },
    setProfile: (profile) =>
      set((state) => ({
        profile: { ...state.profile, ...profile },
      })),
    organization: {
      name: "",
      entityType: "",
      industryType: "",
      website: "",
      address: "",
      language: "",
      agreement: false,
      logo: null,
    },
    setOrganization: (organization) =>
      set((state) => ({
        organization: { ...state.organization, ...organization },
      })),
    kyc: {
      accountType: "",
      panCard: "",
      gstNumber: "",
      billingAddressLine1: "",
      billingAddressLine2: "",
      billingCity: "",
      billingState: "",
      billingPincode: "",
    },
    setKyc: (kyc) =>
      set((state) => ({
        kyc: { ...state.kyc, ...kyc },
      })),
    domain: randomDomain,
    setDomain: (domain) => set({ domain }),
    logo: null,
    setLogo: (logo) => set({ logo }),
    logoPreview: "https://cdn.thrico.network/thrico_logo.png",
    setLogoPreview: (logoPreview) => set({ logoPreview }),
    stepValidity: {},
    setStepValidity: (step, isValid) =>
      set((state) => ({
        stepValidity: { ...state.stepValidity, [step]: isValid },
      })),
    submitHandlers: {},
    setSubmitHandler: (step, handler) =>
      set((state) => ({
        submitHandlers: { ...state.submitHandlers, [step]: handler },
      })),
  }),
);
