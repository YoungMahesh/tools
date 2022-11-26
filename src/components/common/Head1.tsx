import Head from "next/head";

export default function Head1({ title }: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
