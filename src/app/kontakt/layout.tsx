import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte nás pro nezávaznou poptávku nebo dotaz. HRUFIA s.r.o. – rekonstrukce, malování a stěhování v Praze a Středočeském kraji.",
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
