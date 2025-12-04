import PremiumCard from "./PremiumCard";

const Subscriptions = () => {
  return (
    <div className="bg-outlet text-white p-6 md:p-8">
      <div className="w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Hãy khám phá tất cả quyền năng của gói cao cấp</h1>
        <div className="flex items-center justify-center gap-4">
          <PremiumCard />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
