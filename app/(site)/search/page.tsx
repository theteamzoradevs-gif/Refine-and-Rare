import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProjects, getServices } from "@/lib/data";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Refine & Rare services and projects.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = (searchParams?.q || "").trim().toLowerCase();
  const [services, projects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);

  const matchedServices = q
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q) ||
          s.longDesc.toLowerCase().includes(q)
      )
    : [];
  const matchedProjects = q
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.title.toLowerCase().includes(q)
      )
    : [];

  return (
    <>
      <section className="bg-ink pb-12 pt-32 text-cream">
        <div className="container-site">
          <p className="section-label">Search</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            {q ? `Results for “${searchParams?.q}”` : "Search projects & services"}
          </h1>
          <form action="/search" className="mt-6 flex max-w-xl gap-2">
            <input
              name="q"
              defaultValue={searchParams?.q || ""}
              placeholder="Try kitchen, renovation, living room…"
              className="min-w-0 flex-1 border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/50 focus:border-gold"
            />
            <button type="submit" className="btn-gold">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="container-site space-y-12">
          {!q && (
            <p className="text-muted">Enter a keyword to find services or projects.</p>
          )}

          {q && matchedServices.length === 0 && matchedProjects.length === 0 && (
            <div className="border border-line bg-white p-8 text-center">
              <p className="font-display text-2xl">No matches found</p>
              <p className="mt-2 text-muted">
                Try another word, or enquire and we’ll guide you.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <ButtonLink href="/services" variant="outline">
                  Browse services
                </ButtonLink>
                <ButtonLink href="/contact" variant="primary">
                  Enquire now
                </ButtonLink>
              </div>
            </div>
          )}

          {matchedServices.length > 0 && (
            <div>
              <h2 className="font-display text-2xl">Services</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {matchedServices.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="group flex gap-4 border border-line bg-white p-4 transition hover:border-teal"
                  >
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden">
                      <Image
                        src={s.imageUrl}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xl group-hover:text-teal">
                        {s.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
                        {s.shortDesc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchedProjects.length > 0 && (
            <div>
              <h2 className="font-display text-2xl">Projects</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matchedProjects.map((p) => {
                  const cover = p.media.find((m) => m.type === "IMAGE");
                  return (
                    <Link
                      key={p.id}
                      href={`/gallery?category=${p.category.slug}`}
                      className="group overflow-hidden border border-line bg-white transition hover:border-teal"
                    >
                      <div className="relative aspect-[4/3]">
                        {cover && (
                          <Image
                            src={cover.url}
                            alt={cover.alt || p.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(max-width:768px) 100vw, 33vw"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-gold">
                          {p.category.title}
                        </p>
                        <h3 className="mt-1 font-display text-xl">{p.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted">
                          {p.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
