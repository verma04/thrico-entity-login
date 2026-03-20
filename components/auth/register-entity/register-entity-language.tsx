"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormikContext } from "formik";
import { languageData } from "./types/register-entity-types";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageProps {
  initialValue?: string;
  isFormik?: boolean;
}

const Language: React.FC<LanguageProps> = ({ initialValue, isFormik = false }) => {
  const formikContext = useFormikContext<any>();

  const value = formikContext?.values?.language || initialValue || "";
  const error = formikContext?.touched?.language && formikContext?.errors?.language;

  return (
    <div className="space-y-2">
      <div className="relative group/input">
        <Select
          onValueChange={(val) => {
            formikContext?.setFieldValue("language", val);
          }}
          defaultValue={value}
        >
          <SelectTrigger
            className={cn(
              !value && "text-slate-400",
              "h-14 pl-12 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
              error && "border-destructive"
            )}
          >
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl shadow-2xl border-slate-200 dark:border-slate-800">
            {languageData.map((item) => (
              <SelectItem key={item.code} value={item.code} className="rounded-lg transition-colors">
                <div className="flex items-center gap-2 py-0.5">
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                    {item.code}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Languages className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
      </div>
      {error && (
        <p className="ml-1 text-[12px] text-destructive font-medium">{error as string}</p>
      )}
    </div>
  );
};

export default React.memo(Language);
