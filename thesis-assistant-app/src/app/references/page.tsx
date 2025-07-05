import AddReferenceForm from "@/components/AddReferenceForm";
import ReferenceTable from "@/components/ReferenceTable";

export default function ReferencesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reference Manager</h2>
        <AddReferenceForm />
      </div>
      <p className="mb-4">Manage your academic papers, articles, and links here.</p>
      <ReferenceTable />
    </div>
  );
}
