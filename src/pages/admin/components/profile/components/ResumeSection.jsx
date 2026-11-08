import React, { useState } from "react";
import { FiFileText, FiUploadCloud } from "react-icons/fi";

const ResumeSection = ({ resumeData = {}, onChange, onShowToast }) => {
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const handleFieldChange = (field, value) => {
    onChange({
      ...resumeData,
      [field]: value,
    });
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            targetFolder: "resume",
            base64Data,
          }),
        });
        const json = await res.json();
        if (json.success) {
          handleFieldChange("pdfPath", json.url);
          onShowToast?.(`Uploaded: ${file.name}`);
        } else {
          onShowToast?.("PDF upload failed", "error");
        }
      } catch {
        onShowToast?.("Error uploading PDF", "error");
      } finally {
        setUploadingPdf(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center gap-2 pb-3 border-b border-[#26194d]">
        <FiFileText className="text-indigo-400 w-4 h-4" />
        <h3 className="font-extrabold text-white text-sm">
          Resume Page Settings
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF File Path & Upload */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-200">
            Resume PDF Download Path
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={resumeData.pdfPath || ""}
              onChange={(e) => handleFieldChange("pdfPath", e.target.value)}
              placeholder="/resume/imtiazsResume.pdf"
              className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
            />
            <label className="px-4 py-2 bg-[#1f154d] text-indigo-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#2d1e5a] hover:border-indigo-500 transition-colors shrink-0">
              <FiUploadCloud className="w-4 h-4" />
              <span>{uploadingPdf ? "Uploading..." : "Upload PDF"}</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                disabled={uploadingPdf}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Last Updated Tag */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-200">
            Last Updated Date Tag
          </label>
          <input
            type="text"
            value={resumeData.lastUpdated || ""}
            onChange={(e) => handleFieldChange("lastUpdated", e.target.value)}
            placeholder="e.g. June 2026 or Nov 2026"
            className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Professional Profile Summary */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-200">
          Professional Profile Summary (Displayed at top of Resume Page)
        </label>
        <textarea
          rows="4"
          value={resumeData.profileSummary || ""}
          onChange={(e) => handleFieldChange("profileSummary", e.target.value)}
          placeholder="Detailed narrative summary of your qualifications..."
          className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      </div>
    </div>
  );
};

export default ResumeSection;
