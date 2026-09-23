import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative min-h-[50vh] overflow-hidden bg-ink">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover opacity-55"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="relative container-site flex min-h-[50vh] items-end pb-12 pt-32">
          <Reveal variant="blur">
            <p className="section-label">{post.category}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-cream/65">
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-grain bg-cream py-12 md:py-16">
        <div className="container-site max-w-3xl">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {post.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary" className="btn-shine">
                Talk to Our Team
              </ButtonLink>
              <Link
                href="/blogs"
                className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.14em] text-teal hover:text-gold"
              >
                ← All blogs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
