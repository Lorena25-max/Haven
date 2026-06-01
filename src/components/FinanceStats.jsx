export default function FinanceStats({
  title,
  value,
  icon,
  color,
}) {

  return (

    <div
      className={`
        rounded-2xl
        p-4
        shadow-md
        text-white
        ${color}
      `}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-white/80 text-xs uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-2xl font-black mt-1">
            ${value}
          </h2>

        </div>

        <div className="text-3xl">
          {icon}
        </div>

      </div>

    </div>
  );
}