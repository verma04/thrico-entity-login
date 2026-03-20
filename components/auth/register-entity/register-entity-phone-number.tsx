"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useFormikContext } from "formik";
import { Phone, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneNumberProps {
  initialValue?: string;
  initialCountryCode?: string;
  isFormik?: boolean;
}

const countryCodes = [
  { code: "+1", country: "US", name: "United States", flag: "🇺🇸" },
  { code: "+1", country: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "+44", country: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", country: "IN", name: "India", flag: "🇮🇳" },
  { code: "+86", country: "CN", name: "China", flag: "🇨🇳" },
  { code: "+81", country: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "+49", country: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "FR", name: "France", flag: "🇫🇷" },
  { code: "+39", country: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "+61", country: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "+55", country: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "+7", country: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "+82", country: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "+971", country: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+27", country: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "+234", country: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "+20", country: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "+62", country: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "+60", country: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "+65", country: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "+63", country: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "+66", country: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "+92", country: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "+880", country: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", country: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", country: "NP", name: "Nepal", flag: "🇳🇵" },
  { code: "+31", country: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "+46", country: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "+45", country: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "+358", country: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "+41", country: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "+32", country: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "+351", country: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "+30", country: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "+48", country: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "+90", country: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "+98", country: "IR", name: "Iran", flag: "🇮🇷" },
  { code: "+964", country: "IQ", name: "Iraq", flag: "🇮🇶" },
  { code: "+972", country: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "+962", country: "JO", name: "Jordan", flag: "🇯🇴" },
  { code: "+961", country: "LB", name: "Lebanon", flag: "🇱🇧" },
  { code: "+974", country: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "+965", country: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "+968", country: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "+973", country: "BH", name: "Bahrain", flag: "🇧🇭" },
  { code: "+254", country: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "+255", country: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "+256", country: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "+233", country: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "+54", country: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "+51", country: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "+58", country: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "+64", country: "NZ", name: "New Zealand", flag: "🇳🇿" },
];

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  initialValue = "",
  initialCountryCode = "+1",
  isFormik = false,
}) => {
  const formikContext = useFormikContext<any>();
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState(initialCountryCode);

  const selectedCountry = useMemo(
    () => countryCodes.find((c) => c.code === countryCode) || countryCodes[0],
    [countryCode]
  );

  const { 
    setFieldValue, 
    values, 
    touched, 
    errors, 
    handleBlur 
  } = formikContext || {};

  React.useEffect(() => {
    if (setFieldValue) {
      if (values?.phoneCode !== countryCode) {
        setFieldValue("phoneCode", countryCode);
      }
      if (values?.phoneIsoCode !== selectedCountry.country) {
        setFieldValue("phoneIsoCode", selectedCountry.country);
      }
    }
  }, [countryCode, selectedCountry.country, setFieldValue, values?.phoneCode, values?.phoneIsoCode]);

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^\d\s]/g, "");
    return cleaned;
  };

  const phoneValue = values?.phone || "";
  const phoneError = touched?.phone && errors?.phone;

  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-bold uppercase tracking-widest text-slate-400 ml-1">
        Phone Number
      </Label>
      <div className="flex gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-14 w-[110px] justify-between rounded-[1.25rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="font-bold text-sm text-slate-600 dark:text-slate-300">
                  {selectedCountry.code}
                </span>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0 rounded-2xl shadow-2xl border-slate-200 dark:border-slate-800" align="start">
            <Command>
              <CommandInput placeholder="Search country..." className="h-12 border-none focus:ring-0" />
              <CommandList className="max-h-[300px]">
                <CommandEmpty className="py-6 text-center text-sm text-slate-500">No country found.</CommandEmpty>
                <CommandGroup>
                  {countryCodes.map((country) => (
                    <CommandItem
                      key={`${country.country}-${country.code}`}
                      value={`${country.name} ${country.code}`}
                      onSelect={() => {
                        setCountryCode(country.code);
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl m-1 transition-colors"
                    >
                      <div className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full border border-primary/20 transition-all",
                        countryCode === country.code ? "bg-primary border-primary" : "opacity-0"
                      )}>
                        {countryCode === country.code && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{country.name}</span>
                      </div>
                      <span className="ml-auto font-mono text-xs font-black text-slate-400">
                        {country.code}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative flex-1 group/input">
          <Input
            name="phone"
            placeholder="123 456 7890"
            value={phoneValue}
            onChange={(e) => {
              const cleaned = handlePhoneChange(e.target.value);
              setFieldValue?.("phone", cleaned);
            }}
            onBlur={handleBlur}
            className={cn(
              "h-14 pl-12 rounded-[1.25rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-medium",
              phoneError && "border-destructive focus:ring-destructive/10"
            )}
            maxLength={15}
          />
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
      </div>
      {phoneError && (
        <p className="ml-1 text-[12px] text-destructive font-medium">
          {phoneError as string}
        </p>
      )}
      <p className="text-[11px] text-slate-400 ml-1">
        Full number: <span className="font-bold text-primary">{countryCode} {phoneValue || "___ ___ ____"}</span>
      </p>
    </div>
  );
};

export default React.memo(PhoneNumber);
