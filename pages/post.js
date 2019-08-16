import Layout from '../components/MyLayout';
import { useRouter } from 'next/router';

const Page = () => {
    const router = useRouter();

    return (
        <Layout>
            <h1>{router.query.title}</h1>
            <p>This is the blog content.</p>
        </Layout>
    );
};

export default Page;