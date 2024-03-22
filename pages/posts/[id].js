import Layout from "../../components/layout";
import { getAllPostId, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="{utilStyles.headingXl}">{postData.title}</h1>
        {/* <div className="{utilStyle.lightText}">{postData.id}</div> */}
        <div className="{utilStyle.lightText}">
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

//next.js will automatically call following functions.

export async function getStaticPaths() {
  //pre-render the objects, urls, data prerender at build path
  //return a list of possible value for id
  const paths = getAllPostId();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
