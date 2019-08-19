
import Layout from '../components/MyLayout';
import Link from 'next/link';

import fetch from 'isomorphic-unfetch';

const PostLink = props => (
    <li>
      <Link href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  );

  const BlogLink = props => (
    <li>
      <Link href="/p/[id]" as={`/p/${props.id}`}>
        <a>{props.id}</a>
      </Link>
    </li>
  );

const Index = props => (
    <Layout>
        <p>Hello Next.js</p>

        <h2>Dynamic links</h2>
        <PostLink title="Hello Next.js" />
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />

        <h1>Batman TV Shows</h1>
        <ul>
        {props.shows.map(show => (
            <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
                <a>{show.name}</a>
            </Link>
            </li>
        ))}
        </ul>

    </Layout>
);

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
  
    console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      shows: data.map(entry => entry.show)
    };
  };

export default Index;