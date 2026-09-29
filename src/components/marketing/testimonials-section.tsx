import Image from "next/image";
import { Container } from "@/components/layout/container";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    image: "/images/testimonials/sarah.png",
    quote: "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    image: "/images/testimonials/james.png",
    quote: "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    image: "/images/testimonials/alex.png",
    quote: "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
] as const;

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <figure className="flex min-h-[432px] flex-col items-start gap-6 rounded-[24px] bg-white p-6">
      <Image src={testimonial.image} alt="" width={80} height={80} className="size-20 rounded-full object-cover" />
      <figcaption>
        <p className="font-heading text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-black">{testimonial.name}</p>
        <p className="text-[18px] leading-[1.6] text-persian-blue">{testimonial.role}</p>
      </figcaption>
      <blockquote className="text-[18px] leading-[1.6] text-[#4f4f4f]">&ldquo;{testimonial.quote}&rdquo;</blockquote>
    </figure>
  );
}

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="relative min-h-[784px] overflow-hidden bg-[#fafafa] pb-[60px] pt-[74px]">
      <Image src="/images/testimonials/glow-right.svg" alt="" width={1217} height={1217} className="pointer-events-none absolute left-[842px] top-[-281px] h-[1217px] w-[1217px] max-w-none" />
      <Image src="/images/testimonials/glow-middle.svg" alt="" width={752} height={752} className="pointer-events-none absolute left-[355px] top-[-178px] h-[752px] w-[752px] max-w-none" />
      <Image src="/images/testimonials/glow-left.svg" alt="" width={1217} height={1217} className="pointer-events-none absolute left-[-482px] top-[109px] h-[1217px] w-[1217px] max-w-none" />
      <Container className="relative">
        <div className="grid items-end gap-6 xl:grid-cols-[minmax(0,577px)_minmax(0,580px)] xl:gap-[43px]">
          <h2 id="testimonials-title" className="max-w-[577px] font-heading text-[clamp(32px,4vw,44px)] font-semibold leading-[1.2] tracking-[-0.01em] text-black">
            Discover What Our Community Is Saying
          </h2>
          <p className="max-w-[580px] text-[16px] leading-[1.6] text-[#4f4f4f] sm:text-[18px]">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>
        <div className="mt-[72px] grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-[40px]">
          {testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}
        </div>
      </Container>
    </section>
  );
}