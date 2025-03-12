import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import { Label } from "@/components/ui/label";

const Form = ({ children, ...props }) => {
  const methods = useFormContext();
  return <form {...props}>{children(methods)}</form>;
};

const FormFieldContext = React.createContext({});

const FormField = ({ name, as, rules, defaultValue, children }) => {
  const methods = useFormContext();
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        control={methods.control}
        rules={rules}
        defaultValue={defaultValue}
        as={as}
        render={({ field }) => children(field)}
      />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  
  if (!fieldContext) {
    throw new Error("useFormField must be used within a <FormField>");
  }

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

const FormItem = React.forwardRef(({ className, children, ...props }, ref) => {
  const id = React.useId();

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});

const FormLabel = React.forwardRef(({ children, className, ...props }, ref) => {
  const { error, name } = useFormField();

  return (
    <Label
      ref={ref}
      className={`${error ? "text-red-500" : ""} ${className}`}
      htmlFor={name}
      {...props}
    >
      {children}
    </Label>
  );
});

const FormControl = React.forwardRef(({ className, children, ...props }, ref) => {
  const { name } = useFormField();

  return (
    <Slot
      ref={ref}
      id={name}
      className={className}
      {...props}
    >
      {children}
    </Slot>
  );
});

const FormDescription = React.forwardRef(({ className, children, ...props }, ref) => {
  const { name } = useFormField();

  return (
    <p ref={ref} className={`text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  );
});

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error } = useFormField();

  return error ? (
    <p ref={ref} className={`text-red-500 ${className}`} {...props}>
      {error.message || children}
    </p>
  ) : null;
});

export {
  Form,
  FormField,
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
};
