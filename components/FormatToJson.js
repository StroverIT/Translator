import React, { useState } from "react";
import { toastError, toastSuccess } from "../libs/Notifications";

const FormatToJson = () => {
  const [isLoading, setLoading] = useState(false);
  const [siteIsLoading, setSiteLoading] = useState(false);

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
  const sendToSiteHandler = async (e) => {
    setSiteLoading(true);
    const res = await fetch("/api/sendToSite", {
      method: "GET",
    });
    const data = await res.json();

    if (data.message) {
      toastSuccess(data.message);
    }
    if (data.error) {
      toastError(data.error);
    }
    setSiteLoading(false);
  };
  return (
    <div className="flex-center flex-col gap-y-5">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-center"
        onClick={submitHandler}
      >
        {isLoading ? <div className="loader"></div> : "Преработи всички данни"}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-center"
        onClick={sendToSiteHandler}
      >
        {siteIsLoading ? <div className="loader"></div> : "Изпрати към сайта"}
      </button>
    </div>
  );
};

export default FormatToJson;
