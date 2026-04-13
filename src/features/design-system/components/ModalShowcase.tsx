import React, { useState } from "react";
import { AppModal } from "@/components/ui/modal/AppModal";
import { AppButton } from "@/components/ui/button/AppButton";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";

export const ModalShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        11. Modals
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Component <code>AppModal</code> adalah wrapper standar untuk modal
        dengan backdrop dan behavior scroll yang sudah terkonfigurasi.
      </p>

      <div className="flex gap-4 items-center">
        <AppButton onClick={() => setIsOpen(true)}>Open Demo Modal</AppButton>
        <span className="text-sm text-gray-400">
          Click to see standard modal layout
        </span>
      </div>

      <AppModal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-gray-900">Modal Title</h3>
        </ModalHeader>
        <ModalBody>
          <div className="py-4">
            <p className="text-gray-600">
              Ini adalah konten modal standar. Gunakan <code>ModalHeader</code>,
              <code>ModalBody</code>, dan <code>ModalFooter</code> dari{" "}
              <code>@heroui/modal</code>
              untuk struktur yang konsisten.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <AppButton
            variant="flat"
            color="danger"
            onClick={() => setIsOpen(false)}
          >
            Close
          </AppButton>
          <AppButton onClick={() => setIsOpen(false)}>Confirm Action</AppButton>
        </ModalFooter>
      </AppModal>

      <div className="mt-8 bg-gray-800 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
        <p className="text-gray-400 mb-2">// Modal Usage</p>
        <pre>{`<AppModal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader>...</ModalHeader>
  <ModalBody>...</ModalBody>
  <ModalFooter>...</ModalFooter>
</AppModal>`}</pre>
      </div>
    </section>
  );
};
