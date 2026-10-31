import { AppShell } from "@/components/layout/AppShell";
import { ResumeView } from "@/components/sections/resume/ResumeView";

/** The resume page: the corpus cut by role, with the matching PDF one click away. */
const ResumePage = () => (
  <AppShell>
    <div className="overflow-x-hidden px-6 pt-36 pb-24 sm:px-10 lg:px-24">
      <ResumeView />
    </div>
  </AppShell>
);

export default ResumePage;
