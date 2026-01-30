export default function StatCard({ title, value, icon, bgColor }) {
  return (
    <div className={`p-5 rounded-xl shadow ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
}
