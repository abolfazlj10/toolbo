import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">صفحه پیدا نشد</h1>
      <p className="text-sm text-muted-foreground">
        این مسیر در تولبو وجود ندارد.
      </p>
      <Button asChild>
        <Link href="/">بازگشت به خانه</Link>
      </Button>
    </div>
  );
}
