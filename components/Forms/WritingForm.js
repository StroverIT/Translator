import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../libs/Notifications";
import Input from "../Input";

const WritingForm = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    bg: "",
    en: "",
    page: "",
  });
  const inputHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/createTranslation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    if (data.message) {
      toastSuccess(data.message);
    }
    if (data.error) {
      toastError(data.error);
    }
    // Cleaning inputs
    setInputs((prevState) => ({ ...prevState, bg: "", en: "" }));

    // Refreshing the page to the new route
    router.replace(router.pathname + "?" + inputs.page);
  };
  useEffect(() => {
    if (router.query) {
      const query = Object.keys(router.query)[0];
      setInputs((prevState) => ({ ...prevState, page: query }));
    }
  }, [router]);
  useEffect(() => {
    (async function () {
      const resChatGpt = await fetch("/api/openAiTranslation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputs.bg }),
      });
      const dataChat = await resChatGpt.json();
      setInputs((prevState) => ({
        ...prevState,
        en: dataChat.text.trim(),
      }));
    })();
  }, [inputs.bg]);
  return (
    <form onSubmit={submitHandler} className="">
      <div className="mb-6">
        <label
          htmlFor="page"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Страница
        </label>
        <input
          type="page"
          id="page"
          name="page"
          value={inputs.page}
          onChange={inputHandler}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={` / = home ; /brands/web = web; /company/contactUs = contactUs `}
        />
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Input
          labelName="Български"
          image="bulgaria"
          placeHolder="Аз съм българче и обичам наще планини зелени"
          name="bg"
          value={inputs.bg}
          handler={inputHandler}
        />
        <Input
          labelName="Английски"
          image="united-states"
          placeHolder="Ставам"
          name="en"
          value={inputs.en}
          handler={inputHandler}
        />
      </div>

      <button className="text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Изпрати
      </button>
    </form>
  );
};

export default WritingForm;
