import Image from "next/image";
import { Container } from "@/components/layout/container";

export function PartnerStrip() {
  return (
    <section aria-label="Our partners" className="bg-shuttle-soft">
      <Container className="flex min-h-[202px] flex-wrap items-center justify-center gap-x-6 gap-y-8 py-10 lg:gap-x-[72px]">
        {Array.from({ length: 5 }, (_, index) => (
          <Image
            key={index}
            src={`/images/partners/partner-${index + 1}.svg`}
            alt={`Partner ${index + 1}`}
            width={170}
            height={42}
            className="h-[42px] w-[calc(50%-12px)] max-w-[150px] object-contain sm:w-auto sm:max-w-none"
          />
        ))}
      </Container>
    </section>
  );
}