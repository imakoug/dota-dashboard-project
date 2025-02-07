import { useState, useEffect } from "react";
import liquiApiService from "../services/LiquiApi";
import BackButton from "../components/Backbutton";
import UpdateItem from "../components/UpdateItem";

function Updates() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const getPatches = async () => {
      const res = await liquiApiService.getPatchNotes!();
      setData(res);
    };
    getPatches();
  }, []);

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <BackButton />
      <h2 className="text-3xl font-bold text-gray-400 mb-6 text-center">
        Updates
      </h2>
      <table className="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Highlights</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-sm font-light">
          {data.length > 0 &&
            data.map((upd: any, i: number) => (
              <UpdateItem key={i} update={upd}></UpdateItem>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default Updates;
