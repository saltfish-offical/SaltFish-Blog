import PostCard from './PostCard'
import CategoryBar from './CategoryBar'
import Pagination from './Pagination'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * 文章列表容器
 * 对应原主题 index.pug / category.pug / tag.pug 中 #recent-posts.recent-posts 部分
 */
export default function PostList({ posts = [], page = 1, totalPage = 1, categoryOptions, showCategoryBar = true }) {
  if (!posts || posts.length === 0) {
    return (
      <div id='recent-posts' className='recent-posts'>
        {showCategoryBar && <CategoryBar categoryOptions={categoryOptions} />}
        <BlogPostListEmpty />
      </div>
    )
  }

  // 判断今日/最新发布的文章，用于显示 “NEW” 标签，对应原版 maxDate 逻辑
  const maxDate = posts.reduce((max, p) => {
    const t = p?.publishDate ? new Date(p.publishDate).getTime() : 0
    return t > max ? t : max
  }, 0)

  return (
    <div id='recent-posts' className='recent-posts'>
      {showCategoryBar && <CategoryBar categoryOptions={categoryOptions} />}
      {posts.map((post, index) => {
        const isNewest =
          maxDate > 0 && post?.publishDate && new Date(post.publishDate).getTime() === maxDate
        return <PostCard key={post.id || post.href} post={post} index={index} isNewest={isNewest} />
      })}
      <Pagination page={page} totalPage={totalPage} />
    </div>
  )
}
