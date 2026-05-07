interface TimesheetPageProps {
  params: Promise<{ id: string }>;
}

async function TimesheetPage({ params }: TimesheetPageProps) {
  const { id } = await params;

  return <div>TimesheetPage - ({id})</div>;
}
export default TimesheetPage;
