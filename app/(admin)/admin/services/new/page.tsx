import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <AdminShell
      title="Add service"
      description="Create a service for the site navigation and listings."
    >
      <ServiceForm />
    </AdminShell>
  );
}
