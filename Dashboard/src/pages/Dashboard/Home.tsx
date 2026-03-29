import DailyVisitorsChart from "../../components/dashboard/DailyVisitorsChart";
import VisitorTrendsChart from "../../components/dashboard/VisitorTrendsChart";
import VisitorTarget from "../../components/dashboard/VisitorTarget";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Analytics Dashboard"
        description="Dashboard analytics showing visitor statistics"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <DailyVisitorsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <VisitorTarget />
        </div>

        <div className="col-span-12">
          <VisitorTrendsChart />
        </div>
      </div>
    </>
  );
}

