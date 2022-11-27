//import { InputValidation } from "@/types/InputValidation";

export type FormValidation = {
  hasErrors: boolean;
  errors?: Map<string, { check: InputValidation }>;
};

export type FormErrors = {
  field: string;
  check: InputValidation;
};
