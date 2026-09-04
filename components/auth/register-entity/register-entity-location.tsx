"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface OrganizationLocationData {
  website: string;
  address: string;
}

interface RegisterEntityLocationProps {
  setCurrent: (step: number) => void;
  organization: any;
  setOrganization: (org: any) => void;
}

const validationSchema = Yup.object().shape({
  website: Yup.string()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,}$/, "Enter a valid URL (e.g. acme.com)")
    .required("Website is required"),
  address: Yup.string().min(5, "Too short").required("Address is required"),
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

const RegisterEntityLocation: React.FC<RegisterEntityLocationProps> = ({
  setCurrent,
  organization,
  setOrganization,
}) => {
  const [autoCompleteResult, setAutoCompleteResult] = React.useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = React.useState(false);

  const initialValues = useMemo(
    () => ({
      website: organization?.website || "",
      address: organization?.address || "",
    }),
    [organization]
  );

  const onWebsiteChange = (value: string) => {
    if (!value || value.includes(".")) {
      setAutoCompleteResult([]);
      setShowAutocomplete(false);
    } else {
      const suggestions = [".com", ".org", ".net", ".io", ".in", ".tech"].map(
        (domain) => `${value.toLowerCase()}${domain}`
      );
      setAutoCompleteResult(suggestions);
      setShowAutocomplete(true);
    }
  };

  const onFinish = (values: OrganizationLocationData) => {
    setOrganization({ ...organization, ...values });
    setCurrent(5);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFinish}
      enableReinitialize
      validateOnMount
    >
      {({ values, errors, touched, setFieldValue, handleBlur, handleChange }) => (
        <Form className="w-full space-y-4">
          <FormikStepSync step={4} />

          {/* Official Website */}
          <div className="space-y-1.5">
            <label htmlFor="website" className="text-[12.5px] font-medium text-gray-700 block">
              Official website <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="website"
                name="website"
                placeholder="example.com"
                value={values.website}
                onChange={(e) => {
                  handleChange(e);
                  onWebsiteChange(e.target.value);
                }}
                onBlur={(e) => {
                  handleBlur(e);
                  setTimeout(() => setShowAutocomplete(false), 200);
                }}
                className={cn(
                  "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                  touched.website && errors.website && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />

              {showAutocomplete && autoCompleteResult.length > 0 && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-1">
                  {autoCompleteResult.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full text-left px-3 py-1.5 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-black rounded-md cursor-pointer transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setFieldValue("website", option);
                        setShowAutocomplete(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {touched.website && errors.website && (
              <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.website as string}</p>
            )}
          </div>

          {/* Headquarters Address */}
          <div className="space-y-1.5">
            <label htmlFor="address" className="text-[12.5px] font-medium text-gray-700 block">
              Headquarters address <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="address"
              name="address"
              placeholder="Street, City, State, ZIP"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={cn(
                "w-full p-3 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black resize-none",
                touched.address && errors.address && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {touched.address && errors.address && (
              <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.address as string}</p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityLocation);
