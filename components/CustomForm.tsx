import React from "react";

import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormFieldType } from "./AuthForm";

import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { FileUploader } from "./FileUploader";

interface CustomFormProps {
  fieldType: FormFieldType;
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const RenderInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormProps;
}) => {
  const { fieldType, control, name, label, placeholder, disabled } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="w-full">
          <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-700 dark:text-white mb-1">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                className="shad-input"
              />
            </FormControl>
          </div>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="w-full">
          <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-700 dark:text-white mb-1">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                type="password"
                className="shad-input"
              />
            </FormControl>
          </div>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          className="shad-textArea"
          disabled={props.disabled}
        ></Textarea>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.IMAGE:
      return (
        <div className="flex w-full flex-col">
          <FormControl>
            <FileUploader onFieldChange={field.onChange} />
          </FormControl>
        </div>
      );
  }
};
const CustomForm = (props: CustomFormProps) => {
  const { fieldType, control, name, label, placeholder } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
export default CustomForm;
