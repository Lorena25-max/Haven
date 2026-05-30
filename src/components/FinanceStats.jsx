export default function FinanceStats({
  title,
  value,
  icon,
  color,
}) {

  return (

    <div className={`
      rounded-[2rem] p-6 shadow-xl text-white
      ${color}
    `}>

      <div className="flex justify-between items-center">

        <div>

          <p className="text-white/70 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-black mt-2">
            ${value}
          </h2>

        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>

    </div>
  );
}