import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import IconSmart from './IconSmart'

/**
 * 首页顶部横幅
 * 对应原主题 includes/top/top.pug（默认关闭 swiper 时的分支）
 * 左侧为大标题 + 分类快捷入口，右侧为推荐文章 + 推广卡片
 */
export default function HomeTop({ posts = [] }) {
  const enable = siteConfig('ANZHIYU_HOME_TOP_ENABLE', CONFIG.ANZHIYU_HOME_TOP_ENABLE, CONFIG)
  if (!enable) return null

  const title = siteConfig('ANZHIYU_HOME_TOP_TITLE', CONFIG.ANZHIYU_HOME_TOP_TITLE, CONFIG)
  const subTitle = siteConfig('ANZHIYU_HOME_TOP_SUBTITLE', CONFIG.ANZHIYU_HOME_TOP_SUBTITLE, CONFIG)
  const siteText = siteConfig('ANZHIYU_HOME_TOP_SITETEXT', CONFIG.ANZHIYU_HOME_TOP_SITETEXT, CONFIG)
  const categories = siteConfig('ANZHIYU_HOME_TOP_CATEGORY', CONFIG.ANZHIYU_HOME_TOP_CATEGORY, CONFIG)
  const bannerTips = siteConfig('ANZHIYU_HOME_TOP_BANNER_TIPS', CONFIG.ANZHIYU_HOME_TOP_BANNER_TIPS, CONFIG)
  const bannerTitle = siteConfig('ANZHIYU_HOME_TOP_BANNER_TITLE', CONFIG.ANZHIYU_HOME_TOP_BANNER_TITLE, CONFIG)
  const bannerImage = siteConfig('ANZHIYU_HOME_TOP_BANNER_IMAGE', CONFIG.ANZHIYU_HOME_TOP_BANNER_IMAGE, CONFIG)
  const bannerLink = siteConfig('ANZHIYU_HOME_TOP_BANNER_LINK', CONFIG.ANZHIYU_HOME_TOP_BANNER_LINK, CONFIG)

  // 推荐文章：优先取置顶文章，不足则用最新文章补齐，对应原版 sort_attr_post("top_group_list")
  const sticky = posts.filter(p => p.sticky || p.top)
  const rest = posts.filter(p => !(p.sticky || p.top))
  const topGroupList = [...sticky, ...rest].slice(0, 6)

  const toRandomPost = () => {
    window.dispatchEvent(new Event('anzhiyu:random-post'))
  }

  return (
    <div id='home_top'>
      <div className='swiper_container_card' style={{ height: 'auto', width: '100%' }}>
        <div id='bannerGroup'>
          <div id='random-banner'>
            <div className='banners-title'>
              <div className='banners-title-big'>{title}</div>
              <div className='banners-title-big'>{subTitle}</div>
              <div className='banners-title-small'>{siteText}</div>
            </div>
            <a id='random-hover' onClick={toRandomPost}>
              <i className='anzhiyufont anzhiyu-icon-paper-plane' />
              <div className='bannerText'>
                随便逛逛
                <i className='anzhiyufont anzhiyu-icon-arrow-right' />
              </div>
            </a>
          </div>
          <div className='categoryGroup'>
            {categories?.map(item => (
              <div className='categoryItem' style={{ boxShadow: item.shadow }} key={item.name}>
                <SmartLink href={item.path} className={`categoryButton ${item.class || ''}`}>
                  <span className='categoryButtonText'>{item.name}</span>
                  <IconSmart icon={item.icon} />
                </SmartLink>
              </div>
            ))}
          </div>
        </div>

        <div className='topGroup'>
          {topGroupList.map(item => (
            <div className='recent-post-item' key={item.id}>
              <div className='post_cover left_radius'>
                <SmartLink href={item.href} title={item.title}>
                  <span className='recent-post-top-text'>荐</span>
                  <img className='post_bg' alt='cover' src={item.pageCoverThumbnail} />
                </SmartLink>
              </div>
              <div className='recent-post-info'>
                <SmartLink href={item.href} title={item.title} className='article-title'>
                  {item.title}
                </SmartLink>
              </div>
            </div>
          ))}
          {bannerImage && (
            <a id='todayCard' className='todayCard' href={bannerLink} target='_blank' rel='noreferrer'>
              <div className='todayCard-info'>
                <div className='todayCard-tips'>{bannerTips}</div>
                <div className='todayCard-title'>{bannerTitle}</div>
              </div>
              <img className='todayCard-cover' src={bannerImage} alt={bannerTitle} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
