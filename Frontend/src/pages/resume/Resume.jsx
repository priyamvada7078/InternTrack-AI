import { useState, useRef } from "react";
import {
  FileText,
  UploadCloud,
  FileCheck,
  Trash2,
  Eye,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Download,
  Info,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Resume() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Handle local file selection from laptop
  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type (PDF, DOC, DOCX)
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      alert("Please upload a valid PDF or Word document (.pdf, .doc, .docx)");
      return;
    }

    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const objectUrl = URL.createObjectURL(file);

    setSelectedFile({
      fileObj: file,
      previewUrl: objectUrl,
    });

    setFileDetails({
      name: file.name,
      size: `${fileSizeMB} MB`,
      uploadedAt: "Just now",
      score: 92, // Simulated AI Score update for newly uploaded resume
    });

    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 4000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    if (selectedFile?.previewUrl) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }
    setSelectedFile(null);
    setFileDetails(null);
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Resume Manager & AI Optimizer
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Upload your resume from your laptop to get instant AI keyword optimization and role matching.
          </p>
        </div>

        {/* User Active Workspace Badge */}
        <div className="inline-flex items-center gap-2 rounded-xl border border-indigo-200/80 bg-indigo-50/80 px-3.5 py-2 text-xs font-semibold text-indigo-800 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300">
          <Sparkles className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
          <span>
            Workspace: <strong>{user?.name || "Authenticated Candidate"}</strong>
          </span>
        </div>
      </div>

      {uploadSuccess && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900/80 dark:bg-emerald-950/80 dark:text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-xs font-semibold sm:text-sm">
            Resume uploaded successfully! Selected file: <strong>{fileDetails?.name}</strong>
          </p>
        </div>
      )}

      {/* Main Grid: Upload Dropzone & Active Resume Card */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Laptop File Upload Dropzone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
            dragActive
              ? "border-indigo-500 bg-indigo-50/60 dark:border-indigo-400 dark:bg-indigo-950/40"
              : "border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            className="hidden"
          />

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4 shadow-2xs">
            <UploadCloud className="h-7 w-7" />
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Upload your resume from laptop
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            Drag and drop your PDF or Word file here, or click to browse files on your computer.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-all cursor-pointer"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Select File from Computer</span>
          </button>

          <span className="mt-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
            Supported formats: PDF, DOC, DOCX (Max size: 10 MB)
          </span>
        </div>

        {/* Active Resume Details Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <FileCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Resume
                </h3>
              </div>
              {fileDetails && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-900/60">
                  Ready for Applications
                </span>
              )}
            </div>

            {fileDetails ? (
              <div className="mt-4 space-y-4">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[220px] sm:max-w-[280px]">
                        {fileDetails.name}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {fileDetails.size} • Uploaded {fileDetails.uploadedAt}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* AI ATS Match Score */}
                <div className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-teal-50/70 p-4 dark:border-indigo-900/60 dark:from-indigo-950/30 dark:via-slate-900 dark:to-teal-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      AI ATS Compatibility Score
                    </span>
                    <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                      {fileDetails.score} / 100
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 transition-all duration-700"
                      style={{ width: `${fileDetails.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-slate-400 dark:text-slate-500">
                No active resume uploaded yet. Select a file from your laptop above to activate AI parsing.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {fileDetails && (
            <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              {selectedFile?.previewUrl ? (
                <a
                  href={selectedFile.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview File</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => alert(`Previewing ${fileDetails.name}`)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview File</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-all cursor-pointer"
              >
                <UploadCloud className="h-4 w-4" />
                <span>Replace File</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
