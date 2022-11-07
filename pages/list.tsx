import { GetServerSideProps, NextPage } from "next";
import { useRouter } from 'next/router';
import styled from 'styled-components';

type ListProps = {
  result: any,
};

type CardProps = {
  color: string;
};

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-right: 30px;
  padding-left: 30px;
`;

const Card = styled.div<CardProps>`
  cursor: pointer;
  background-color: ${(props) => props.color};
  width: 700px;
  margin: 4px;
  padding: 10px;
  border-radius: 4px;
`;

const List: NextPage<ListProps> = ({ result }) => {
  const router = useRouter();
  return (
    <Stack>
      {
        result.results.shop.map((s: any) => {
          return (
            <Card
              color='#333'
              key={s.id}
              onClick={() => {
                router.push(`/details/${s.id}`);
              }}
            >
              <p>{s.name}</p>
              <p>{s.access}</p>
              <img src={s.logo_image} alt='logo' />
            </Card>
          );
        })
      }
    </Stack >
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
