import DCountInfo from "@/components/dashboard/admin/DHome/DCountInfo";
import DDailyBlogInfo from "@/components/dashboard/admin/DHome/DDailyBlogInfo";
import DSection from "@/components/dashboard/admin/DHome/DSection";

const DHomePage = () => {
  return (
    <div className="mt-3">
      <DSection title="All Info">
        <DCountInfo />
      </DSection>

      <DSection title="Daily Blog Posts">
        <DDailyBlogInfo />
      </DSection>
    </div>
  );
};

export default DHomePage;
