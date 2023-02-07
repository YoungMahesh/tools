import Head from "next/head";

export default function Head1({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
