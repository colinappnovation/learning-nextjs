
import Layout from '../components/MyLayout';
import Link from 'next/link';

import fetch from 'isomorphic-unfetch';

const PostLink = props => (
    <li>
      <Link href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
      <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: green;
        font-family: 'Arial';
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
    </li> 
  );

const Index = props => (
    <Layout>
        <h1>My Blog</h1>
        <p>Hello Next.js</p>

        <h2>Dynamic links</h2>
        <ul>
          <PostLink title="Hello Next.js" />
          <PostLink title="Learn Next.js is awesome" />
          <PostLink title="Deploy apps with Zeit" />
        </ul>

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

        <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>

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