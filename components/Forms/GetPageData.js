import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

// Icons
import { AiFillEdit } from "react-icons/ai";
import { HiXCircle } from "react-icons/hi";
import { toastError, toastSuccess } from "../../libs/Notifications";

// Components
import Input from "../Input";

const GetPageData = ({ data }) => {
  return (
    <div className="w-full mt-10">
      {data?.translations.map((translation) => {
        return (
          <FormComp
            data={translation}
            key={translation.en + translation.bg}
            pageId={data._id}
          />
        );
      })}
    </div>
  );
};

function FormComp({ data, pageId }) {
  const router = useRouter();

  const [isEdit, setEdit] = useState(false);
  const [translation, setTranslation] = useState(data);

  const [inputs, setInputs] = useState({
    bg: translation.bg,
    en: translation.en,
  });
  const inputHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (translationId, e) => {
    e.preventDefault();
    const res = await fetch("/api/editTranslation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        translationId,
        pageId,
        bg: inputs.bg,
        en: inputs.en,
      }),
    });

    const data = await res.json();

    if (data.message) {
      toastSuccess(data.message);
    }

    if (data.error) {
      toastError(data.error);
    }
    setEdit(false);
    setTranslation(data.data);
    // Refreshing the page to the new route
  };

  const removeHandler = async (translationId) => {
    const res = await fetch("/api/removeTranslation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ translationId, pageId }),
    });

    const data = await res.json();

    if (data.message) {
      toastSuccess(data.message);
    }

    if (data.error) {
      toastError(data.error);
    }
    // Cleaning inputs

    // Refreshing the page to the new route
    router.replace(router.asPath);
  };
  return (
    <div className="flex items-center justify-between pb-2 text-2xl border-b border-blue-200 mt-9">
      <div className="flex gap-x-20">
        {!isEdit && (
          <>
            <TextData country="BG" image="bulgaria" text={translation.bg} />
            <TextData
              country="EN"
              image="united-states"
              text={translation.en}
            />
          </>
        )}
        {isEdit && (
          <>
            <Input
              labelName="Български"
              image="bulgaria"
              placeHolder="Аз съм българче и обичам наще планини зелени"
              name="bg"
              value={inputs.bg}
              width="w-96"
              handler={inputHandler}
            />
            <Input
              labelName="Английски"
              image="united-states"
              placeHolder="Ставам"
              name="en"
              width="w-96"
              value={inputs.en}
              handler={inputHandler}
            />
            <button
              type="button"
              className="px-4 my-10 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={(e) => submitHandler(translation._id, e)}
            >
              Изпрати
            </button>
          </>
        )}
      </div>
      <div className="flex gap-x-3">
        <div
          className="text-blue-700 cursor-pointer"
          onClick={() => setEdit(!isEdit)}
        >
          <AiFillEdit />
        </div>
        <div
          className="text-red-600 cursor-pointer"
          onClick={() => removeHandler(translation._id)}
        >
          <HiXCircle />
        </div>
      </div>
    </div>
  );
}

function TextData({ country, image, text }) {
  return (
    <div className="relative max-w-sm break-all whitespace-pre-line ">
      {text}
      <div className="absolute flex text-sm -top-4">
        <div className="relative w-5 h-5">
          <Image src={`/icons/${image}.png`} fill alt="bulgarian flag" />
        </div>
        <div className="pl-1">{country}</div>
      </div>
    </div>
  );
}
export default GetPageData;
