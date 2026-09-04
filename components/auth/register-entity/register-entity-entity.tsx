"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRegisterEntityFormStore } from "@/components/store/registerEntityStore";

interface OrganizationFormData {
  name: string;
  entityType: string;
  industryType: string;
}

interface RegisterEntityEntityProps {
  setCurrent: (step: number) => void;
  organization: any;
  setOrganization: (org: any) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Entity name is required"),
  entityType: Yup.string().required("Category is required"),
  industryType: Yup.string().required("Industry is required"),
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

const entityTypes = [
  { value: "startup", label: "Startup / SME", description: "D2C brand, small & medium business" },
  { value: "enterprise", label: "Enterprise", description: "Large company with multiple locations" },
  { value: "association", label: "Association", description: "For-profit / non-profit community group" },
  { value: "creator", label: "Creator", description: "Influencer, celebrity, content creator" },
  { value: "academia", label: "Academia", description: "Educational institution or college" },
];

const industryTypes = [
  { value: "Technology", label: "Technology" },
  { value: "Retail", label: "Retail & E-commerce" },
  { value: "Education", label: "Education & EdTech" },
  { value: "Finance", label: "Finance & Banking" },
  { value: "Healthcare", label: "Healthcare & Life Sciences" },
  { value: "Manufacturing", label: "Manufacturing & Logistics" },
  { value: "other", label: "Other" },
];

const RegisterEntityEntity: React.FC<RegisterEntityEntityProps> = ({
  setCurrent,
  organization,
  setOrganization,
}) => {
  const initialValues = useMemo(
    () => ({
      name: organization?.name || "",
      entityType: organization?.entityType || "",
      industryType: organization?.industryType || "",
    }),
    [organization]
  );

  const onFinish = (values: OrganizationFormData) => {
    setOrganization({ ...organization, ...values });
    setCurrent(4);
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
          <FormikStepSync step={3} />

          {/* Entity Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-[12.5px] font-medium text-gray-700 block">
              Organization name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Acme Corp"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                touched.name && errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {touched.name && errors.name && (
              <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.name as string}</p>
            )}
          </div>

          {/* Category & Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 block">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                onValueChange={(val) => setFieldValue("entityType", val)}
                defaultValue={values.entityType}
              >
                <SelectTrigger
                  className={cn(
                    "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                    !values.entityType && "text-gray-400",
                    touched.entityType && errors.entityType && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="max-h-[260px] rounded-lg border border-gray-200">
                  {entityTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="text-[13.5px] py-2 cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.label}</span>
                        <span className="text-[11.5px] text-gray-400">{item.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.entityType && errors.entityType && (
                <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.entityType as string}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12.5px] font-medium text-gray-700 block">
                Industry <span className="text-red-500">*</span>
              </label>
              <Select
                onValueChange={(val) => setFieldValue("industryType", val)}
                defaultValue={values.industryType}
              >
                <SelectTrigger
                  className={cn(
                    "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
                    !values.industryType && "text-gray-400",
                    touched.industryType && errors.industryType && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="max-h-[260px] rounded-lg border border-gray-200">
                  {industryTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="text-[13.5px] py-2 cursor-pointer">
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.industryType && errors.industryType && (
                <p className="text-[11.5px] font-medium text-red-600 mt-1">{errors.industryType as string}</p>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityEntity);
