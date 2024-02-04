import React from "react";
import CaseModal from "../../components/caseModal/caseModal";
import UpiForm from "../../components/forms/upiForm/upiForm";
import SmsForm from "../../components/forms/sms/smsForm";
import FraudDetection from "../../pages/FraudDetection/fraudDetection";

const UserPage = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-24">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <CaseModal />
        <UpiForm />
        <SmsForm />
        <FraudDetection />
      </div>
    </div>
  );
};

export default UserPage;
