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
  const canShare = text.trim().length > 0;
  const fileName = useMemo(() => {
    const slug = slugifyFilename(filenameSlug || title || "toolbo-result");
    return `${slug || "toolbo-result"}.txt`;
  }, [filenameSlug, title]);

  if (!text.trim()) {
    return null;
  }

  async function copyResult() {
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
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  async function shareResult() {
    if (!canShare) {
      return;
    }

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      await navigator.share({
        title,
        text,
      });
      return;
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
    <div className="result-actions" aria-label="عملیات نتیجه">
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        title="کپی نتیجه"
        aria-label="کپی نتیجه"
        onClick={copyResult}
      >
        {copied ? <Check /> : <Copy />}
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
        <Share2 />
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
          <Printer />
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
          <Download />
        </Button>
      )}
    </div>
  );
}
