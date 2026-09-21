import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { prisma } from "@/lib/prisma";

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string };
}) {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: params.id },
  });
  if (!testimonial) notFound();

  return (
    <AdminShell title="Edit testimonial">
      <TestimonialForm initial={testimonial} />
    </AdminShell>
  );
}
