import {
  useDroppable,
} from "@dnd-kit/core";

export default function TaskColumn({

  id,
  title,
  color,
  children,

}) {

  const {
    setNodeRef,
  } = useDroppable({

    id,

  });

  return (

    <div

      ref={setNodeRef}

      className="
        bg-white/50
        backdrop-blur-xl
        rounded-[2rem]
        p-5
        shadow-xl
        min-h-[600px]
      "

    >

      <h2
        className={`
          font-black
          text-xl
          mb-5
          ${color}
        `}
      >

        {title}

      </h2>

      <div className="space-y-3">

        {children}

      </div>

    </div>

  );

}