"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugifyFilename } from "@/lib/result-format";

type ResultActionsProps = {
  title: string;
  text: string;
  filenameSlug?: string;
  canPrint?: boolean;
  canDownload?: boolean;
};

export function ResultActions({
  title,
  text,
  filenameSlug,
  canPrint = true,
  canDownload = true,
}: ResultActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
  const canShare = text.trim().length > 0;
  const fileName = useMemo(() => {
    const slug = slugifyFilename(filenameSlug || title || "toolbo-result");
    return `${slug || "toolbo-result"}.txt`;
  }, [filenameSlug, title]);

  if (!text.trim()) {
    return null;
  }

  async function copyResult() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        const succeeded = document.execCommand("copy");
        textarea.remove();
        if (!succeeded) throw new Error("Copy unavailable");
      }

      setCopied(true);
      setFeedback("نتیجه کپی شد.");
      window.setTimeout(() => {
        setCopied(false);
        setFeedback("");
      }, 1800);
    } catch {
      setFeedback("کپی انجام نشد. متن نتیجه را انتخاب و کپی کنید.");
    }
  }

  async function shareResult() {
    if (!canShare) {
      return;
    }

    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({
          title,
          text,
        });
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

    }

    await copyResult();
  }

  function downloadResult() {
    const blob = new Blob([`${title}\n\n${text}\n`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="result-actions" role="group" aria-label="عملیات نتیجه">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="result-copy-button"
        title={copied ? "کپی شد" : "کپی نتیجه"}
        aria-label={copied ? "نتیجه کپی شد" : "کپی نتیجه"}
        onClick={copyResult}
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        <span>{copied ? "کپی شد" : "کپی"}</span>
      </Button>
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        title="اشتراک گذاری نتیجه"
        aria-label="اشتراک گذاری نتیجه"
        disabled={!canShare}
        onClick={shareResult}
      >
        <Share2 aria-hidden="true" />
      </Button>
      {canPrint && (
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          title="چاپ نتیجه"
          aria-label="چاپ نتیجه"
          onClick={() => window.print()}
        >
          <Printer aria-hidden="true" />
        </Button>
      )}
      {canDownload && (
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          title="دانلود نتیجه"
          aria-label="دانلود نتیجه"
          onClick={downloadResult}
        >
          <Download aria-hidden="true" />
        </Button>
      )}
      <span className={copied ? "sr-only" : "result-action-feedback"} role="status" aria-live="polite">{feedback}</span>
    </div>
  );
}
