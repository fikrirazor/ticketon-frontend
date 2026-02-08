import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { Button } from "../ui/button";

interface PaymentProofUploadProps {
  expiryDate: string;
  onUpload: (file: File | string) => void;
  isLoading?: boolean;
}

const PaymentProofUpload: React.FC<PaymentProofUploadProps> = ({
  expiryDate,
  onUpload,
  isLoading = false,
}) => {
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadType === "file" && selectedFile) {
      onUpload(selectedFile);
    } else if (uploadType === "url" && proofUrl) {
      onUpload(proofUrl);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
          Confirm Payment
        </h2>
        <p className="text-slate-500 mb-6">
          Please complete your payment before the timer expires.
        </p>

        <div className="inline-flex flex-col items-center bg-indigo-50 px-8 py-4 rounded-2xl border border-indigo-100 mb-8">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
            Time Remaining
          </span>
          <CountdownTimer expiryDate={expiryDate} />
        </div>

        {/* Upload Type Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl max-w-xs mx-auto mb-8">
          <button
            onClick={() => setUploadType("file")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              uploadType === "file"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setUploadType("url")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              uploadType === "url"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Submit URL
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {uploadType === "file" ? (
          <div className="relative group">
            {!previewUrl ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-indigo-400 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-12 h-12 mb-4 text-slate-400 group-hover:text-indigo-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-slate-700 font-bold">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    PNG, JPG, PDF (MAX. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
              </label>
            ) : (
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border-2 border-slate-200 group">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain bg-slate-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Payment Proof URL
              </label>
              <input
                type="url"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                placeholder="https://example.com/payment-proof.jpg"
                className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-slate-700"
                required
              />
              <p className="text-[10px] text-slate-400 font-medium">
                Link to your payment evidence (Cloudinary, Imgur, Google Drive,
                etc.)
              </p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full py-4 text-lg font-black uppercase tracking-widest shadow-xl shadow-indigo-100 disabled:opacity-50"
          disabled={
            (uploadType === "file" && !selectedFile) ||
            (uploadType === "url" && !proofUrl) ||
            isLoading
          }
          loading={isLoading}
        >
          {uploadType === "file" ? "Submit File" : "Submit URL"}
        </Button>
      </form>

      <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3">
        <svg
          className="w-6 h-6 text-amber-500 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="text-sm text-amber-800">
          <p className="font-bold mb-1">Important Instructions:</p>
          <ul className="list-disc list-inside space-y-1 opacity-90">
            <li>Ensure the account name matches your profile</li>
            <li>Make sure the transaction reference is clearly visible</li>
            {uploadType === "file" && <li>File size must not exceed 5MB</li>}
            {uploadType === "url" && <li>URL must be publically accessible</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentProofUpload;
