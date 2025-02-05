import { useEffect } from "react";

function UpdateItem({ update }: any) {

  useEffect(() => {

  }, [])

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-300">
      <td className="p-2 text-center text-sm">{[update.name.split(" ")[0], update.name.split(" ")[1]].join(' ').slice(0, -1)}</td>
      <td className="p-2 text-center text-sm">{update.extradata.sourcetitle.split(" ")[0] != "Dota"&& update.extradata.sourcetitle.length ? update.extradata.sourcetitle : "Minor changes"}</td>
    </tr>
  );
}

export default UpdateItem;
