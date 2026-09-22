import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Ideas, guides, and studio notes from Refine & Rare on interiors, kitchens, and renovations in Bengaluru.",
};

export default function BlogsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_30%,rgba(197,178,138,0.16),transparent_40%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <p className="section-label">Blogs</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">
              Ideas for homes that{" "}
              <span className="gold-shimmer">feel rare.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-cream/70">
              Practical notes on design, materials, and renovations from the
              Refine &amp; Rare studio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 70} variant="scale">
              <article className="premium-card group flex h-full flex-col overflow-hidden">
                <Link href={`/blogs/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                      {post.category}
                    </p>
                    <h2 className="mt-2 font-display text-2xl text-ink transition group-hover:text-teal">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
