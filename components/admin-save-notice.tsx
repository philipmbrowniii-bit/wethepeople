export function AdminSaveNotice({ saved }: { saved: boolean }) {
  if (!saved) return null;

  return (
    <div role="status" className="mb-6 border border-gold bg-white px-4 py-3 text-sm font-bold text-gold-dark">
      Changes saved. The live site has been updated.
    </div>
  );
}
