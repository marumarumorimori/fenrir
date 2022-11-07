import { GetServerSideProps, NextPage } from "next";
import { useRouter } from 'next/router';
import styled from 'styled-components';

type ListProps = {
  result: any,
};

const List: NextPage<ListProps> = ({ result }) => {
  return (
    <div>
      {
        result.results.shop.map((s: any) => {
          return (
            <div
              key={s.id}
            >
              <p>{s.name}</p>
              <p>{s.access}</p>
              <img src={s.logo_image} alt='logo' />
            </div>
          );
        })
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ListProps> = async ({ query }) => {
  const range = query.range ?? 3;
  const lat = query.lat;
  const lng = query.lng;
  let url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json`;
  if (lat !== undefined && lng !== undefined) {
    url += `&lat=${lat}&lng=${lng}&range=${range}`;
  }
  const res = await fetch(url);
  const result = await res.json();
  const props = {
    result: result,
  };
  return {
    props: props,
  };
};

export default List;
