export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProjectSlug(project: { id: string; title: string }) {
  return slugify(project.title) || project.id;
}
