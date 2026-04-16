import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Nabízíme profesionální služby v oblasti rekonstrukcí, malování a stěhování. Kompletní přehled našich služeb v Praze a Středočeském kraji.",
};

export default function SluzbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
