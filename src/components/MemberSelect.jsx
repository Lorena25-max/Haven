import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  subscribeToHomeMembers,
} from "../services/userService";

export default function MemberSelect({
  value,
  onChange,
}) {

  const {
    profile,
  } = useContext(AuthContext);

  const [
    members,
    setMembers,
  ] = useState([]);

  useEffect(() => {

    if (!profile?.homeId)
      return;

    const unsubscribe =
      subscribeToHomeMembers(

        profile.homeId,

        (data) => {

          setMembers(data);
        }
      );

    return () =>
      unsubscribe();

  }, [profile]);

  return (

    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      className="bg-white border border-slate-200 p-4 rounded-2xl outline-none w-full"
    >

      <option value="">
        Seleccionar responsable
      </option>

      {members.map(
        (member) => (

          <option
            key={member.id}
            value={member.name}
          >

            {member.name}

          </option>
        )
      )}

    </select>
  );
}