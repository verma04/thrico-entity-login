"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { motion, type Variants } from "framer-motion";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
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

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

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
    () => countries?.sort((a, b) => a.name.localeCompare(b.name)) || [],
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
        <Form className="w-full">
          <FormikStepSync step={2} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-xl mx-auto px-4"
          >
            <div className="text-center mb-10">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 mb-6"
              >
                <Globe className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                Regional Settings
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium max-w-[280px] mx-auto">
                Choose your primary region and language for the workspace
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    Primary Country
                  </Label>
                  <div className="relative group/input">
                    <Select
                      onValueChange={(val) => setFieldValue("country", val)}
                      defaultValue={values.country}
                    >
                      <SelectTrigger
                        className={cn(
                          !values.country && "text-muted-foreground",
                          "h-14 pl-12 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
                          touched.country && errors.country && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] rounded-2xl">
                        {sortedCountries.map((country: CountryData) => (
                          <SelectItem key={country.code} value={country.code} className="rounded-lg">
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" />
                  </div>
                  {touched.country && errors.country && (
                    <p className="ml-1 text-[12px] text-destructive font-medium">{errors.country as string}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1 mb-2 block">
                    Primary Language
                  </Label>
                  <Language isFormik initialValue={initialValues.language} />
                </div>
              </div>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityPreferences);
