import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description:
    "Zásady ochrany osobních údajů společnosti HRUFIA s.r.o. Informace o zpracování a ochraně vašich osobních dat.",
};

export default function ZasadyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
