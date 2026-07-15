import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 公告卡片
 * 对应原主题 includes/widget/card_announcement.pug
 */
export default function AsideAnnouncementCard() {
  const enable = siteConfig('ANZHIYU_CARD_ANNOUNCEMENT_ENABLE', CONFIG.ANZHIYU_CARD_ANNOUNCEMENT_ENABLE, CONFIG)
  if (!enable) return null
  const content = siteConfig('ANZHIYU_CARD_ANNOUNCEMENT_CONTENT', CONFIG.ANZHIYU_CARD_ANNOUNCEMENT_CONTENT, CONFIG)

  return (
    <div className='card-widget card-announcement'>
      <div className='item-headline'>
        <i className='anzhiyufont anzhiyu-icon-bullhorn anzhiyu-shake' />
        <span>公告</span>
      </div>
      <div className='announcement_content' dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
