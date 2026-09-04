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
    <div className="space-y-1">
      <Select
        onValueChange={(val) => {
          formikContext?.setFieldValue("language", val);
        }}
        defaultValue={value}
      >
        <SelectTrigger
          className={cn(
            "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
            !value && "text-gray-400",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
        >
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="max-h-[260px] rounded-lg border border-gray-200">
          {languageData.map((item) => (
            <SelectItem key={item.code} value={item.code} className="text-[13.5px] py-2 cursor-pointer">
              <div className="flex items-center justify-between w-full gap-2">
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-[11.5px] text-gray-400 font-mono">
                  {item.code.toUpperCase()}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-[11.5px] font-medium text-red-600 mt-1">{error as string}</p>
      )}
    </div>
  );
};

export default React.memo(Language);
