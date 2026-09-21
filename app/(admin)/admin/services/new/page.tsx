import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <AdminShell title="Add service">
      <ServiceForm />
    </AdminShell>
  );
}
