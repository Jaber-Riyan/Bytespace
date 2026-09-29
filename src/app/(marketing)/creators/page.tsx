import Image from "next/image";
import Link from "next/link";
import { creators } from "@/data/creators";
import { Container } from "@/components/layout/container";

export default function CreatorsPage() {
  return (
    <main>
      <Container className="py-16">
        <h1 className="font-heading text-4xl font-semibold">Meet our creators</h1>
        <p className="mt-4 text-shuttle-muted">
          Learn from creative people who turn their experience into practical lessons.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator) => (
            <Link
              key={creator.id}
              href={`/creators/${creator.id}`}
              className="rounded-3xl border p-6 transition-shadow hover:shadow-md"
            >
              <Image
                src={creator.avatar}
                alt=""
                width={80}
                height={80}
                className="size-20 rounded-2xl object-cover"
              />
              <h2 className="mt-5 text-xl font-bold">{creator.name}</h2>
              <p className="mt-2 text-shuttle-muted">{creator.headline}</p>
              <span className="mt-5 inline-block text-persian-blue">View profile →</span>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
