import Link from "next/link";

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" aria-label="تولبو، صفحه اصلی" onClick={onClick}>
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="brand-name" lang="en" dir="ltr" translate="no">toolbo</span>
    </Link>
  );
}
