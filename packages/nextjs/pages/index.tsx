// import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DisplayLock } from "~~/components/unlock/DisplayLock";
import { WrapLock } from "~~/components/unlock/WrapLock";

const Home: NextPage = () => {
  // const GREETINGS_GRAPHQL = `
  // {
  //   greetings(first: 25, orderBy: createdAt, orderDirection: desc) {
  //     id
  //     greeting
  //     premium
  //     value
  //     createdAt
  //     sender {
  //       address
  //       greetingCount
  //     }
  //   }
  // }
  // `;

  // const GREETINGS_GQL = gql(GREETINGS_GRAPHQL);
  // const { data } = useQuery(GREETINGS_GQL, { pollInterval: 1000 });
  // console.log("Greeting::", data?.greetings);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow">
        <div className="flex-grow bg-base-300 w-full px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col">
            <WrapLock />
            <DisplayLock />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
