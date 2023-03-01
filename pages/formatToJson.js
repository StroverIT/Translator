import React, { useState } from "react";
import { toastError, toastSuccess } from "../libs/Notifications";

const GetData = () => {
  const [isLoading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/formatToJson", {
      method: "GET",
    });
    const data = await res.json();

    if (data.message) {
      toastSuccess(data.message);
    }
    if (data.error) {
      toastError(data.error);
    }
    setLoading(false);
  };
  return (
    <div className="flex-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-center"
        onClick={submitHandler}
      >
        {isLoading ? <div className="loader"></div> : "Преработи всички данни"}
      </button>
    </div>
  );
};

export default GetData;
