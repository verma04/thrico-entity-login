"use client";

import React, { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { motion, type Variants } from "framer-motion";
import { Building2 } from "lucide-react";
import { Label } from "@/components/ui/label";
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

  const entityTypes = [
    { value: "academia", label: "Academia", description: "Educational Institution" },
    { value: "enterprise", label: "Enterprise", description: "Large Business" },
    { value: "creator", label: "Creator", description: "Content Creator" },
    { value: "association", label: "Association", description: "Non-profit / Group" },
    { value: "startup", label: "Startup", description: "Early-stage Company" },
  ];

  const industryTypes = [
    { value: "Technology", label: "Technology", icon: "💻" },
    { value: "Retail", label: "Retail", icon: "🛍️" },
    { value: "Education", label: "Education", icon: "🎓" },
    { value: "Finance", label: "Finance", icon: "💰" },
    { value: "Healthcare", label: "Healthcare", icon: "🏥" },
    { value: "Manufacturing", label: "Manufacturing", icon: "🏭" },
    { value: "other", label: "Other", icon: "📊" },
  ];

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
        <Form className="w-full">
          <FormikStepSync step={3} />
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
                <Building2 className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                Organization Details
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium max-w-[280px] mx-auto">
                Tell us about the entity you're registering
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Entity Name
                </Label>
                <div className="relative group/input">
                  <Input
                    name="name"
                    placeholder="e.g. Acme Corp"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "h-14 pl-12 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
                      touched.name && errors.name && "border-destructive focus:ring-destructive/10"
                    )}
                  />
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                {touched.name && errors.name && (
                  <p className="ml-1 text-[12px] text-destructive font-medium">{errors.name as string}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Category
                  </Label>
                  <Select 
                    onValueChange={(val) => setFieldValue("entityType", val)} 
                    defaultValue={values.entityType}
                  >
                    <SelectTrigger className={cn(
                      "h-14 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
                      touched.entityType && errors.entityType && "border-destructive"
                    )}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value} className="rounded-lg">
                          <div className="flex flex-col py-0.5">
                            <span className="font-bold text-sm">{item.label}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{item.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.entityType && errors.entityType && (
                    <p className="ml-1 text-[12px] text-destructive font-medium">{errors.entityType as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Industry
                  </Label>
                  <Select 
                    onValueChange={(val) => setFieldValue("industryType", val)} 
                    defaultValue={values.industryType}
                  >
                    <SelectTrigger className={cn(
                      "h-14 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
                      touched.industryType && errors.industryType && "border-destructive"
                    )}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value} className="rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-bold text-sm">{item.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.industryType && errors.industryType && (
                    <p className="ml-1 text-[12px] text-destructive font-medium">{errors.industryType as string}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(RegisterEntityEntity);
