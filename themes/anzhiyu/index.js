/**
 *   ANZHIYU 主题说明
 *  > 原主题 AnZhiYu (Hexo) 作者: anzhiyu-c (https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
 *  > NotionNext 移植版
 *  1. 开启方式：在 blog.config.js 将 THEME 设置为 'anzhiyu'
 *  2. 主题配置见 ./config.js，可通过环境变量 NEXT_PUBLIC_ANZHIYU_XXX 覆盖
 *  3. 详见主题目录下 README.md 的移植说明与已知限制
 */
import Comment from '@/components/Comment'
import LoadingCover from '@/components/LoadingCover'
import NotionPage from '@/components/NotionPage'
import AISummary from '@/components/AISummary'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import CONFIG from './config'
import { Style } from './style'
import { resolveAllPosts, sampleArray } from './utils'

import Header from './components/Header'
import Footer from './components/Footer'
import MobileSidebar from './components/MobileSidebar'
import RightSide from './components/RightSide'
import SearchDrawer from './components/SearchDrawer'
import Aside from './components/Aside'
import HomeTop from './components/HomeTop'
import PostList from './components/PostList'
import ArticleSortList from './components/ArticleSortList'
import CategoryBar from './components/CategoryBar'
import Pagination from './components/Pagination'
import PostCopyright from './components/PostCopyright'
import PostPagination from './components/PostPagination'
import PostRecommend from './components/PostRecommend'
import PostLock from './components/PostLock'
import TagCloudList from './components/TagCloudList'
import TagPills from './components/TagPills'
import CategoryCloudList from './components/CategoryCloudList'
import { ThemeGlobalProvider } from './components/ThemeGlobalContext'

/**
 * 基础布局：顶部导航 + 主体（内容区+侧栏）+ 页脚，
 * 移动端侧边抽屉、右下角悬浮按钮、搜索弹窗挂载于此。
 * 对应原主题 includes/layout.pug
 */
const LayoutBase = props => {
  const { children, post, siteInfo } = props
  const router = useRouter()
  const { fullWidth } = useGlobal()
  const allPosts = resolveAllPosts(props)
  const postCount = allPosts?.length

  const isHome = router.pathname === '/'
  const asideEnable = siteConfig('ANZHIYU_ASIDE_ENABLE', CONFIG.ANZHIYU_ASIDE_ENABLE, CONFIG)
  const showAside = asideEnable && !fullWidth
  const loadingCoverEnable = siteConfig('ANZHIYU_LOADING_COVER', true, CONFIG)

  // 随便逛逛：随机跳转到一篇文章，对应原主题 toRandomPost()
  useEffect(() => {
    const handler = () => {
      if (!allPosts || allPosts.length === 0) return
      const [randomPost] = sampleArray(allPosts, 1)
      if (randomPost?.href) router.push(randomPost.href)
    }
    window.addEventListener('anzhiyu:random-post', handler)
    return () => window.removeEventListener('anzhiyu:random-post', handler)
  }, [allPosts, router])

  return (
    <ThemeGlobalProvider>
      <div id='theme-anzhiyu' data-type='anzhiyu'>
        <Style />
        <div id='web_bg' />

        <div id='body-wrap' className={post?.type === 'Page' ? 'page' : 'post'}>
          <Header post={post} siteInfo={siteInfo} />

          <main id='blog-container'>
            {isHome && <HomeTop posts={allPosts} />}

            <div id='content-inner' className='layout'>
              {children}
              {showAside && <Aside {...props} />}
            </div>
          </main>

          <footer id='footer'>
            <Footer />
          </footer>
        </div>

        <MobileSidebar
          siteInfo={siteInfo}
          categoryOptions={props.categoryOptions}
          tagOptions={props.tagOptions}
          postCount={postCount}
        />
        <RightSide post={post} />
        <SearchDrawer />
        {loadingCoverEnable && <LoadingCover />}
      </div>
    </ThemeGlobalProvider>
  )
}

/**
 * 首页
 * 对应原主题 index.pug（HomeTop 由 LayoutBase 统一渲染，这里只负责文章列表卡片）
 */
const LayoutIndex = props => {
  const { posts, page, totalPage, categoryOptions } = props
  return (
    <PostList
      posts={posts}
      page={page || 1}
      totalPage={totalPage || 1}
      categoryOptions={categoryOptions}
    />
  )
}

/**
 * 文章列表：分类详情 / 标签详情页
 * 对应原主题 category.pug / tag.pug 的默认分支（theme.category_ui / tag_ui 默认为空，
 * 即走 article-sort 精简列表样式，而非首页的卡片样式）
 */
const LayoutPostList = props => {
  const router = useRouter()
  const { posts, categoryOptions, tagOptions, page, totalPage } = props
  const currentCategory = router?.query?.category
  const currentTag = router?.query?.tag

  const isTagPage = !!currentTag
  const isCategoryPage = !isTagPage && !!currentCategory

  if (isTagPage) {
    return (
      <div id='tag'>
        <div id='tag-page-tags'>
          <TagPills tagOptions={tagOptions || []} />
        </div>
        <div className='article-sort-title'>{decodeURIComponent(String(currentTag))}</div>
        <ArticleSortList posts={posts} />
        <Pagination page={page || 1} totalPage={totalPage || 1} />
      </div>
    )
  }

  if (isCategoryPage) {
    return (
      <div id='category'>
        <CategoryBar categoryOptions={categoryOptions} />
        <div className='article-sort-title'>
          分类 - {decodeURIComponent(String(currentCategory))}
        </div>
        <ArticleSortList posts={posts} />
        <Pagination page={page || 1} totalPage={totalPage || 1} />
      </div>
    )
  }

  // 兜底：非分类/标签场景下退化为卡片列表样式
  return (
    <PostList
      posts={posts}
      page={page || 1}
      totalPage={totalPage || 1}
      categoryOptions={categoryOptions}
    />
  )
}

/**
 * 搜索结果页
 * 对应原主题 local-search 弹窗的结果区域，这里落地为独立结果页
 */
const LayoutSearch = props => {
  const { keyword, posts, page, totalPage } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  return (
    <div id='search'>
      <div className='article-sort-title'>
        搜索 {currentSearch ? `“${currentSearch}”` : ''} 的结果
        {posts ? `（共 ${posts.length} 篇）` : ''}
      </div>
      {!currentSearch ? (
        <div className='is-center' style={{ padding: '2rem 0' }}>
          请输入关键词开始搜索
        </div>
      ) : (
        <PostList posts={posts} page={page || 1} totalPage={totalPage || 1} showCategoryBar={false} />
      )}
    </div>
  )
}

/**
 * 归档页
 * 对应原主题 archive.pug
 */
const LayoutArchive = props => {
  const { archivePosts, posts, page, totalPage } = props
  // archivePosts 为 { 分组标题: [posts] } 结构时展开；否则直接用 posts 按年分组（ArticleSortList 内部处理）
  const flatPosts = archivePosts
    ? Object.values(archivePosts).reduce((acc, arr) => acc.concat(arr), [])
    : posts || []

  return (
    <div id='archive'>
      <div className='article-sort-title'>归档 - 共 {flatPosts.length} 篇文章</div>
      <ArticleSortList posts={flatPosts} />
      <Pagination page={page || 1} totalPage={totalPage || 1} />
    </div>
  )
}

/**
 * 文章 / 独立页面详情
 * 对应原主题 post.pug / page.pug
 */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next } = props
  const allPosts = resolveAllPosts(props)
  const router = useRouter()

  // 兜底：文章数据长时间未到位时跳转 404（例如 fallback 渲染场景）
  const waitingFor404 = siteConfig('POST_WAITING_TIME_FOR_404', 8) * 1000
  useEffect(() => {
    if (!post) {
      const timer = setTimeout(() => {
        router.push('/404')
      }, waitingFor404)
      return () => clearTimeout(timer)
    }
  }, [post, router, waitingFor404])

  if (!post) {
    return <div id='article-container' className='is-center' style={{ minHeight: '20rem' }} />
  }

  const isPost = post.type !== 'Page'
  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID')

  return (
    <div id={isPost ? 'post' : 'page'}>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : (
        <>
          {isPost && post?.aiSummary && <AISummary aiSummary={post.aiSummary} />}
          <article id='article-container' className='post-content'>
            {!isPost && <h1 className='page-title'>{post?.title}</h1>}
            <NotionPage post={post} />
          </article>

          {isPost && <PostCopyright post={post} />}
          {isPost && <PostPagination prev={prev} next={next} />}
          {isPost && <PostRecommend post={post} allPosts={allPosts} />}

          {commentEnable && (
            <div id='post-comment' className='comment-switch'>
              <Comment frontMatter={post} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

/**
 * 404
 * 对应原主题 includes/404.pug
 */
const Layout404 = () => {
  const subtitle = siteConfig('ANZHIYU_404_SUBTITLE', CONFIG.ANZHIYU_404_SUBTITLE, CONFIG)
  const background = siteConfig('ANZHIYU_404_BACKGROUND', CONFIG.ANZHIYU_404_BACKGROUND, CONFIG)
  return (
    <div className='error-box'>
      <div id='error-wrap'>
        <div className='error-content'>
          <div className='error-img' style={{ backgroundImage: `url(${background})` }} />
          <div className='error-info'>
            <h1 className='error_title'>404</h1>
            <div className='error_subtitle'>{subtitle}</div>
            <SmartLink href='/' className='button--animated'>
              <i className='anzhiyufont anzhiyu-icon-rocket' />
              回到主页
            </SmartLink>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 全部分类
 * 对应原主题 includes/page/categories.pug
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <div id='category-outer-wrapper'>
      <div className='article-sort-title'>全部分类</div>
      <CategoryCloudList categoryOptions={categoryOptions || []} />
    </div>
  )
}

/**
 * 全部标签
 * 对应原主题 includes/page/tags.pug
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <div id='tag-outer-wrapper'>
      <div className='article-sort-title'>全部标签</div>
      <TagCloudList tagOptions={tagOptions || []} />
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
