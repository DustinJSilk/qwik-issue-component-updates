import { component$, useComputed$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";

const DATA = [
  {
    title: "1",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
  },
  {
    title: "2",
    image:
      "https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "3",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "4",
    image:
      "https://images.unsplash.com/photo-1605701877331-645ad05dcb97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  },
  {
    title: "5",
    image:
      "https://images.unsplash.com/photo-1561143915-75f4d11a8dd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  },
  {
    title: "6",
    image:
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1933&q=80",
  },
];

export const usePosts = routeLoader$(({ params }) => {
  const index = Number(params.index);
  const current = DATA.slice(index, index + 2);

  return { current };
});

export const Card = component$((props: { image: string; title: string }) => {
  return (
    <div style="width: 200px">
      <img style="width: 100%" src={props.image} />
      <h6>{props.title}</h6>
    </div>
  );
});

export default component$(() => {
  const {
    value: { current },
  } = usePosts();

  const location = useLocation();
  const index = useComputed$(() => Number(location.params["index"]));

  return (
    <>
      <h6>Updates only the second item after a full loop</h6>
      <div style="display: flex; column-gap: 10px;">
        {current.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>

      <h6>Doesn't update content at all</h6>
      <div style="display: flex; column-gap: 10px;">
        {current.map((item, i) => (
          <Card key={i} title={item.title} image={item.image} />
        ))}
      </div>
      <Link href={`/${(index.value + 1) % DATA.length}/`}>Next</Link>
    </>
  );
});
