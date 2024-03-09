import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';

export default function Blog({ posts }) {
  // Reverse the order of posts to show the latest first
  posts.reverse();

  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <Head>
        <title>inter | blog</title>
        <meta property="og:description" content="inter's (mediocre) blog." />
        <meta property="og:url" content="https://iinter.me/blog" />
      </Head>
      <div className="max-w-3xl w-full px-4 py-8 space-y-6">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl text-zinc-300 font-bold tracking-tight border-b-4 border-zinc-300 pb-2">Blog</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <div key={post.slug} className="bg-blogcard rounded-lg shadow-lg overflow-hidden">
              <img src={post.frontmatter.image} alt="Blog Post Preview" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl text-zinc-300 font-semibold mb-2">{post.frontmatter.title}</h2>
                <p className="text-zinc-300 mb-2"><i className="fa-regular fa-calendar"></i> {post.frontmatter.date} • <i className="fa-regular fa-clock"></i> {post.frontmatter.timeToRead} min read</p>
                <a href={`/blog/${post.slug}`} className="text-blue-500 hover:text-sky-200 hover:underline duration-300">
                  Read the full post <i className="fa-solid fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'src', 'pages', 'blog', 'posts');
  let posts = [];

  try {
    const filenames = fs.readdirSync(postsDirectory);

    posts = filenames
      .filter(filename => filename.endsWith('.md')) // Filter out non-Markdown files
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        return {
          slug: filename.replace(/\.md$/, ''),
          frontmatter: data,
          content,
        };
      });
  } catch (error) {
    console.error('Error reading blog posts:', error);
  }

  return {
    props: {
      posts,
    },
  };
}