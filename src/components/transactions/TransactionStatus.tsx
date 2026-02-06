import React from "react";
import type { TransactionStatus as TStatus } from "../../types";
import { Button } from "../ui/button";

interface TransactionStatusProps {
  status: TStatus;
  transactionId: string;
  onAction?: (action: string) => void;
  className?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  transactionId,
  onAction,
  className = "",
}) => {
  const steps = [
    {
      key: "WAITING_PAYMENT",
      label: "Payment",
      description: "Waiting for transfer",
    },
    {
      key: "WAITING_ADMIN",
      label: "Verification",
      description: "Admin checking proof",
    },
    { key: "DONE", label: "Success", description: "Tickets issued" },
  ];

  const getStatusIndex = (currentStatus: TStatus) => {
    if (["REJECTED", "EXPIRED", "CANCELED"].includes(currentStatus)) return -1;
    return steps.findIndex((step) => step.key === currentStatus);
  };

  const currentIndex = getStatusIndex(status);

  const getStatusColor = (s: TStatus) => {
    switch (s) {
      case "DONE":
        return "text-green-600 bg-green-50 border-green-200";
      case "REJECTED":
        return "text-red-600 bg-red-50 border-red-200";
      case "EXPIRED":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "CANCELED":
        return "text-slate-600 bg-slate-50 border-slate-200";
      case "WAITING_PAYMENT":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "WAITING_ADMIN":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getStatusLabel = (s: TStatus) => s.replace(/_/g, " ");

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Visual Status Indicator */}
      <div
        className={`px-6 py-4 rounded-2xl border-2 flex items-center justify-between ${getStatusColor(status)}`}
      >
        <div>
          <span className="text-xs font-black uppercase tracking-widest opacity-70">
            Order ID: {transactionId}
          </span>
          <h3 className="text-xl font-black uppercase tracking-tight">
            {getStatusLabel(status)}
          </h3>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-50">
          {status === "DONE" && (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {status === "WAITING_PAYMENT" && (
            <svg
              className="w-8 h-8 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {["REJECTED", "EXPIRED", "CANCELED"].includes(status) && (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Timeline/Stepper (Only for non-terminal failure states) */}
      {!["REJECTED", "EXPIRED", "CANCELED"].includes(status) && (
        <div className="relative flex justify-between">
          <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-10"></div>
          {steps.map((step, idx) => {
            const isCompleted = currentIndex > idx || status === "DONE";
            const isActive = currentIndex === idx;

            return (
              <div key={step.key} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                    isCompleted
                      ? "bg-indigo-600 text-white"
                      : isActive
                        ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                        : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="mt-4 text-center">
                  <p
                    className={`text-sm font-black uppercase tracking-tight ${isActive || isCompleted ? "text-slate-900" : "text-slate-400"}`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Failure State Message */}
      {["REJECTED", "EXPIRED", "CANCELED"].includes(status) && (
        <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-100">
          <p className="text-slate-600 font-medium">
            {status === "REJECTED" &&
              "Your payment proof was rejected by the admin. Please contact support."}
            {status === "EXPIRED" &&
              "The transaction timer has expired. Please create a new booking."}
            {status === "CANCELED" && "This transaction has been canceled."}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 pt-4">
        {status === "WAITING_PAYMENT" && (
          <>
            <Button
              className="flex-1"
              onClick={() => onAction?.("UPLOAD_PROOF")}
            >
              Upload Proof Now
            </Button>
            <Button variant="secondary" onClick={() => onAction?.("CANCEL")}>
              Cancel Order
            </Button>
          </>
        )}
        {status === "DONE" && (
          <Button className="flex-1" variant="success">
            Download E-Tickets
          </Button>
        )}
        {(status === "REJECTED" || status === "EXPIRED") && (
          <Button className="flex-1" onClick={() => onAction?.("RETRY")}>
            Try Again
          </Button>
        )}
        <Button variant="outline" className="flex-1">
          View Order Details
        </Button>
      </div>
    </div>
  );
};

export default TransactionStatus;
