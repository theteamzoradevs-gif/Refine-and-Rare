import { AdminShell } from "@/components/admin/AdminShell";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <AdminShell title="Add testimonial">
      <TestimonialForm />
    </AdminShell>
  );
}
