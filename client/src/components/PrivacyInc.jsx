import React, { useState } from "react";
import Modal from "./Modal";

const PrivacyTnC = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">ShopSphere Policies</h1>
      <button
        onClick={() => openModal("privacy")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Privacy Policy
      </button>
      <button
        onClick={() => openModal("tnc")}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Terms & Conditions
      </button>

      {modalType === "privacy" && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Privacy Policy"
          content="This is the privacy policy content for ShopSphere. We value your privacy and ensure your data is protected."
        />
      )}

      {modalType === "tnc" && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Terms & Conditions"
          content="These are the terms and conditions for using ShopSphere. Please read carefully before proceeding."
        />
      )}
    </div>
  );
};

export default PrivacyTnC;
