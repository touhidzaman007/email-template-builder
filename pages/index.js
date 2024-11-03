import EmailTemplateBuilder from '@/components/EmailTemplateBuilder';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Email Template Builder</title>
        <meta
          name="description"
          content="Drag and Drop Email template easily"
        />
        <link rel="icon" href="../email.svg" />
      </Head>
      <EmailTemplateBuilder />
    </>
  );
}
