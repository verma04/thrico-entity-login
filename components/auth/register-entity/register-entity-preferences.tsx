"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import Language from "./register-entity-language";
import type { CountryData } from "./types/register-entity-types";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface PreferencesFormData {
  country: string;
  language: string;
}

interface RegisterEntityPreferencesProps {
  profile: {
    country?: string;
    language?: string;
  };
  setProfile: (values: any) => void;
  setCurrent: (step: number) => void;
  countries: CountryData[];
}

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  language: Yup.string().required("Language is required"),
});

const FormikStepSync = ({ step }: { step: number }) => {
  const { isValid, handleSubmit } = useFormikContext<any>();
  const { setStepValidity, setSubmitHandler } = useRegisterEntityFormStore();

  React.useEffect(() => {
    setStepValidity(step, isValid);
  }, [isValid, step, setStepValidity]);

  React.useEffect(() => {
    setSubmitHandler(step, handleSubmit);
  }, [step, setSubmitHandler, handleSubmit]);

  return null;
};

const RegisterEntityPreferences: React.FC<RegisterEntityPreferencesProps> = ({
  profile,
  setProfile,
  setCurrent,
  countries,
}) => {
  const initialValues = useMemo(
    () => ({
      country: profile?.country || "",
      language: profile?.language || "",
    }),
    [profile]
  );

  const onFinish = (values: PreferencesFormData) => {
    setProfile(values);
    setCurrent(3);
  };

  const sortedCountries = useMemo(
    () => [...(countries || [])].sort((a, b) => a.name.localeCompare(b.name)),
    [countries]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFinish}
      enableReinitialize
      validateOnMount
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="w-full space-y-4">
          <FormikStepSync step={2} />

          {/* Country Field */}
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium text-gray-700 block">
              Country <span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={(val) => setFieldValue("country", val)}
              defaultValue={values.country}
            >
              <SelectTrigger
                className={cn(
                  "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                  !values.country && "text-gray-400",
                  touched.country && errors.country && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              >
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="max-h-[260px] rounded-lg border border-gray-200">
                {sortedCountries.map((country: CountryData) => (
                  <SelectItem key={country.code} value={country.code} className="text-[13.5px] py-2 cursor-pointer">
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.country && errors.country && (
              <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.country as string}</p>
            )}
          </div>

          {/* Language Field */}
          <div className="space-y-1.5">
            <label className="text-[12.5px] font-medium text-gray-700 block">
              Language <span className="text-red-500">*</span>
            </label>
            <Language isFormik initialValue={initialValues.language} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityPreferences);
