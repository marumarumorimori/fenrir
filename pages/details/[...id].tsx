import { GetServerSideProps, NextPage } from "next";
import { useRouter } from 'next/router';
import styled from 'styled-components';

type DetailProps = {
  result: any,
};

const Detail: NextPage<DetailProps> = ({ result }) => {
  return (
    <div>
      {
        result.results.shop.map((s: any) => {
          return (
            <div
              key={s.id}
            >
              <p>{s.name}</p>
              <p>{s.address}</p>
              <p>{s.open}</p>
              <img src={s.photo.pc.l} alt='logo' />
            </div>
          );
        })
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<DetailProps> = async ({ params }) => {
  const id = params!.id;
  let url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&id=${id}&format=json`;
  const res = await fetch(url);
  const result = await res.json();
  const props = {
    result: result,
  };
  return {
    props: props,
  };
};

export default Detail;
