import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/data";
import { staticBlogPosts } from "@/lib/staticContent";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return staticBlogPosts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogBySlug(params.slug);
  if (!post) notFound();

  const dateLabel = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-cream md:pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background:radial-gradient(circle_at_75%_20%,rgba(197,178,138,0.2),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(42,83,68,0.35),transparent_45%)]" />
        <div className="container-site relative">
          <Reveal variant="blur">
            <Link
              href="/blogs"
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/90 transition hover:text-gold"
            >
              ← All blogs
            </Link>
            <p className="section-label mt-5">{post.category}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-cream md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
              {post.excerpt}
            </p>
            <p className="mt-4 text-sm text-cream/55">{dateLabel}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain relative overflow-hidden bg-cream py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_10%_15%,rgba(197,178,138,0.14),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(27,58,47,0.08),transparent_40%)]" />

        <div className="container-site relative max-w-3xl">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {post.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} variant="scale">
            <div className="group relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-[0_24px_60px_-36px_rgba(28,36,33,0.45)] md:mt-12">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                priority
                className="object-cover transition duration-1000 ease-premium group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 768px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-ink p-7 text-cream sm:p-8 md:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_90%_10%,rgba(197,178,138,0.22),transparent_40%)]" />
              <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Next step
                </p>
                <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                  Inspired by this note?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70 md:text-base">
                  Talk to our team about shaping these ideas into a refined home
                  for how you live.
                </p>
                <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    href="/contact"
                    variant="gold"
                    className="btn-shine w-full justify-center px-6 py-3.5 sm:w-auto sm:min-w-[11rem]"
                  >
                    Talk to Our Team
                  </ButtonLink>
                  <ButtonLink
                    href="/blogs"
                    variant="secondary"
                    className="btn-shine w-full justify-center border-white/35 bg-transparent px-6 py-3.5 text-cream hover:border-white hover:bg-white hover:text-ink sm:w-auto sm:min-w-[11rem]"
                  >
                    More Blogs
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
