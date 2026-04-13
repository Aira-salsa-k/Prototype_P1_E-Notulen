import React from "react";
import { AppInput } from "@/components/ui/input/AppInput";
import { AppButton } from "@/components/ui/button/AppButton";

export const FormShowcase = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        13. Form Elements
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Standard input components with consistent styling for enterprise forms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-4">
          <AppInput
            label="Full Name"
            placeholder="Enter your full name"
            variant="bordered"
          />
          <AppInput
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            variant="bordered"
          />
          <AppInput
            label="Password"
            type="password"
            placeholder="Enter password"
            variant="bordered"
          />
          <div className="pt-2">
            <AppButton fullWidth>Submit Form</AppButton>
          </div>
        </div>

        <div className="bg-gray-800 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto h-fit">
          <p className="text-gray-400 mb-2">// Input Usage</p>
          <pre>{`<AppInput 
  label="Name" 
  variant="bordered" 
  placeholder="..." 
/>`}</pre>
        </div>
      </div>
    </section>
  );
};
