import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Seznamte se s firmou HRUFIA s.r.o. Jsme tým profesionálů se zaměřením na rekonstrukce, malování a stěhování v Praze a Středočeském kraji.",
};

export default function ONasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
