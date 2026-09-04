"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
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
import { Check, ChevronsUpDown } from "lucide-react";
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
    <div className="space-y-1">
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-10 w-[105px] shrink-0 justify-between rounded-md border border-gray-300 bg-white px-3 text-[13.5px] font-normal text-gray-800 transition-all hover:bg-gray-50 focus:border-black focus:ring-1 focus:ring-black"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-base shrink-0">{selectedCountry.flag}</span>
                <span className="text-[13px] font-medium text-gray-700 truncate">
                  {selectedCountry.code}
                </span>
              </div>
              <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-40" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0 rounded-lg shadow-lg border border-gray-200" align="start">
            <Command>
              <CommandInput placeholder="Search country..." className="h-9 text-[13px] border-none focus:ring-0" />
              <CommandList className="max-h-[250px]">
                <CommandEmpty className="py-4 text-center text-xs text-gray-500">No country found.</CommandEmpty>
                <CommandGroup>
                  {countryCodes.map((country) => (
                    <CommandItem
                      key={`${country.country}-${country.code}`}
                      value={`${country.name} ${country.code}`}
                      onSelect={() => {
                        setCountryCode(country.code);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-md transition-colors cursor-pointer"
                    >
                      <div className={cn(
                        "flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-300 transition-all",
                        countryCode === country.code ? "bg-black border-black" : "opacity-0"
                      )}>
                        {countryCode === country.code && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                      <span className="text-base">{country.flag}</span>
                      <span className="text-gray-800 flex-1 truncate">{country.name}</span>
                      <span className="text-xs text-gray-400 font-mono">
                        {country.code}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative flex-1">
          <Input
            name="phone"
            type="tel"
            placeholder="123 456 7890"
            value={phoneValue}
            onChange={(e) => {
              const cleaned = handlePhoneChange(e.target.value);
              setFieldValue?.("phone", cleaned);
            }}
            onBlur={handleBlur}
            className={cn(
              "w-full h-10 px-3.5 rounded-md border text-[13.5px] text-gray-900 bg-white transition-all outline-none placeholder:text-gray-400 border-gray-300 focus:border-black focus:ring-1 focus:ring-black",
              phoneError && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            maxLength={15}
          />
        </div>
      </div>
      {phoneError && (
        <p className="text-[11.5px] font-medium text-red-600 mt-1">
          {phoneError as string}
        </p>
      )}
    </div>
  );
};

export default React.memo(PhoneNumber);
