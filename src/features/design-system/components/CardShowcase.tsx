import React from "react";
import { AppCard } from "@/components/ui/card/AppCard";
import { AppButton } from "@/components/ui/button/AppButton";
import { PlusIcon } from "@heroicons/react/24/solid";

export const CardShowcase = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        9. Cards
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Component <code>AppCard</code> membungkus content dalam container yang
        konsisten dengan padding dan shadow standar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Card */}
        <AppCard title="User Statistics">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Users</span>
              <span className="font-bold text-2xl">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Active Sessions</span>
              <span className="font-bold text-2xl text-green-600">85</span>
            </div>
          </div>
        </AppCard>

        {/* Card with Action */}
        <AppCard
          title="Recent Projects"
          action={
            <AppButton
              size="sm"
              startContent={<PlusIcon className="w-4 h-4" />}
            >
              New Project
            </AppButton>
          }
        >
          <div className="text-gray-500 text-sm">
            You have 5 projects currently in progress.
          </div>
          <div className="mt-4 flex gap-2">
            <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
              Web App
            </div>
            <div className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold">
              Design
            </div>
          </div>
        </AppCard>
      </div>

      <div className="mt-8 bg-gray-800 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
        <p className="text-gray-400 mb-2">// Card with Header & Action</p>
        <pre>{`<AppCard 
  title="Card Title" 
  action={<AppButton ... />}
>
  Content goes here...
</AppCard>`}</pre>
      </div>
    </section>
  );
};
