"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { motion, type Variants } from "framer-motion";
import { Globe, MapPin, ExternalLink, Navigation } from "lucide-react";
import { Label } from "@/components/ui/label";
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
  website: Yup.string()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,}$/, "Enter a valid URL")
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
      const suggestions = [".com", ".org", ".net", ".tech", ".in", ".io"].map(
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
        <Form className="w-full">
          <FormikStepSync step={4} />
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
                <Navigation className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                Location & Website
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium max-w-[280px] mx-auto">
                Establish your physical and digital presence
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Official Website
                </Label>
                <div className="relative group/input">
                  <Input
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
                      "h-14 pl-12 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
                      touched.website && errors.website && "border-destructive focus:ring-destructive/10"
                    )}
                  />
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  
                  {showAutocomplete && autoCompleteResult.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 z-50 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-1"
                    >
                      {autoCompleteResult.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="w-full px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl text-left text-sm font-bold flex items-center justify-between group/opt"
                          onClick={() => {
                            setFieldValue("website", option);
                            setShowAutocomplete(false);
                          }}
                        >
                          <span className="text-slate-700 dark:text-slate-300">{option}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-slate-300 group-hover/opt:text-primary transition-colors" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
                {touched.website && errors.website && (
                  <p className="ml-1 text-[12px] text-destructive font-medium">{errors.website as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Headquarters Address
                </Label>
                <div className="relative group/input">
                  <Textarea
                    name="address"
                    placeholder="Street, City, State, ZIP"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "min-h-[120px] pl-12 pt-4 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium resize-none",
                      touched.address && errors.address && "border-destructive focus:ring-destructive/10"
                    )}
                  />
                  <MapPin className="absolute left-4 top-5 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                {touched.address && errors.address && (
                  <p className="ml-1 text-[12px] text-destructive font-medium">{errors.address as string}</p>
                )}
              </div>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityLocation);
