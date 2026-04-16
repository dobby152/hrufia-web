import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realizace",
  description:
    "Prohlédněte si naše dokončené projekty a realizace. Portfolio rekonstrukcí, malování a stěhování od HRUFIA s.r.o.",
};

export default function RealizaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
