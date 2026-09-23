export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProjectSlug(project: {
  id: string;
  title: string;
  slug?: string | null;
}) {
  return project.slug || slugify(project.title) || project.id;
}
