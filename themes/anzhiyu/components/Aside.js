import AsideAuthorCard from './AsideAuthorCard'
import AsideAnnouncementCard from './AsideAnnouncementCard'
import AsideTagsCard from './AsideTagsCard'
import AsideArchivesCard from './AsideArchivesCard'
import AsideCategoriesCard from './AsideCategoriesCard'
import AsideWebInfoCard from './AsideWebInfoCard'
import AsideRecentPostCard from './AsideRecentPostCard'
import AsideTocCard from './AsideTocCard'
import { resolveAllPosts } from '../utils'

/**
 * 侧边栏卡片组合
 * 对应原主题 includes/widget/index.pug
 *
 * posts 取值说明：归档卡片需要全站文章列表按月分组，具体取值逻辑见
 * utils.js 中的 resolveAllPosts()。
 */
export default function Aside(props) {
  const { post, siteInfo, categoryOptions, tagOptions } = props
  const allPosts = resolveAllPosts(props)
  const postCount = props?.postCount ?? allPosts?.length

  const isPost = !!post && post.type !== 'Page'

  return (
    <div id='aside-content' className='aside-content'>
      {isPost ? (
        <>
          <AsideTocCard post={post} />
          <AsideAuthorCard siteInfo={siteInfo} />
          <AsideAnnouncementCard />
          <AsideRecentPostCard posts={allPosts} />
        </>
      ) : (
        <>
          <AsideAuthorCard siteInfo={siteInfo} />
          <AsideAnnouncementCard />
          <AsideCategoriesCard categoryOptions={categoryOptions} />
          <AsideTagsCard tagOptions={tagOptions} />
          <AsideArchivesCard posts={allPosts} />
          <AsideWebInfoCard postCount={postCount} />
        </>
      )}
    </div>
  )
}
