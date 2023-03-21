import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <Link href="/0/">Go to dynamic route</Link>
    </>
  );
});
