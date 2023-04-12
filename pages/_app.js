import Head from 'next/head';
import './styles.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
      <title>ToneGenie</title>
      <meta property="og:title" content="GPT-3 Writer" />
      <meta property="og:description" content="build with buildspace" />
      <meta
        property="og:image"
        content="https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg"
      />
    </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
