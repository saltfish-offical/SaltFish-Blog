import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

/**
 * 网站信息统计卡片
 * 对应原主题 includes/widget/card_webinfo.pug
 */
export default function AsideWebInfoCard({ postCount }) {
  const enable = siteConfig('ANZHIYU_CARD_WEBINFO_ENABLE', CONFIG.ANZHIYU_CARD_WEBINFO_ENABLE, CONFIG)
  const showPostCount = siteConfig('ANZHIYU_CARD_WEBINFO_POST_COUNT', CONFIG.ANZHIYU_CARD_WEBINFO_POST_COUNT, CONFIG)
  const runtimeEnable = siteConfig('ANZHIYU_CARD_WEBINFO_RUNTIME_ENABLE', CONFIG.ANZHIYU_CARD_WEBINFO_RUNTIME_ENABLE, CONFIG)
  const publishDate = siteConfig('ANZHIYU_RUNTIME_PUBLISH_DATE', CONFIG.ANZHIYU_RUNTIME_PUBLISH_DATE, CONFIG)

  const [runtime, setRuntime] = useState('')

  useEffect(() => {
    if (!runtimeEnable || !publishDate) return
    const update = () => {
      const start = new Date(publishDate).getTime()
      const diffDays = Math.floor((Date.now() - start) / 86400000)
      setRuntime(`${diffDays} 天`)
    }
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [runtimeEnable, publishDate])

  if (!enable) return null

  return (
    <div className='card-webinfo'>
      <div className='item-headline'>
        <i className='anzhiyufont anzhiyu-icon-chart-line' />
        <span>网站资讯</span>
      </div>
      <div className='webinfo'>
        {showPostCount && (
          <div className='webinfo-item'>
            <div className='webinfo-item-title'>
              <i className='anzhiyufont anzhiyu-icon-file-lines' />
              <div className='item-name'>文章数目 :</div>
            </div>
            <div className='item-count'>{postCount ?? '-'}</div>
          </div>
        )}
        {runtimeEnable && (
          <div className='webinfo-item'>
            <div className='webinfo-item-title'>
              <i className='anzhiyufont anzhiyu-icon-stopwatch' />
              <div className='item-name'>本站运行时间 :</div>
            </div>
            <div className='item-count'>{runtime || <i className='anzhiyufont anzhiyu-icon-spinner anzhiyu-spin' />}</div>
          </div>
        )}
      </div>
    </div>
  )
}
