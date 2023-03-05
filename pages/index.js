// Db
import { connectMongo } from "../db/connectDb";
import Translation from "../db/models/Translation";

// Components
import WritingForm from "../components/Forms/WritingForm";
import SearchPageForm from "../components/Forms/SearchPageForm";
import GetPageData from "../components/Forms/GetPageData";
import FormatToJson from "../components/FormatToJson";

export default function Home({ data, specificPage }) {
  return (
    <div className="min-h-screen min-w-screen ">
      <main className="flex-col px-20 pb-32">
        <div className="flex-col flex-center mt-10">
          <FormatToJson />
          <SearchPageForm data={data} />
          <WritingForm />
          <GetPageData data={specificPage} />
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  await connectMongo();

  const { query } = context;

  const page = Object.keys(query)[0];

  const translation = await Translation.find();

  const getSpecificTranslation = await Translation.findOne({ page });

  return {
    props: {
      data: JSON.parse(JSON.stringify(translation)),
      specificPage: JSON.parse(JSON.stringify(getSpecificTranslation)),
    },
  };
}
