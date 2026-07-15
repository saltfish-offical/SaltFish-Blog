import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 分类卡片
 * 对应原主题 includes/widget/card_categories.pug + scripts/helpers/aside_categories.js
 * （此处未实现多级父子分类展开，NotionNext 的分类通常是扁平结构）
 */
export default function AsideCategoriesCard({ categoryOptions = [] }) {
  const enable = siteConfig('ANZHIYU_CARD_CATEGORIES_ENABLE', CONFIG.ANZHIYU_CARD_CATEGORIES_ENABLE, CONFIG)
  if (!enable || !categoryOptions || categoryOptions.length === 0) return null

  const limit = siteConfig('ANZHIYU_CARD_CATEGORIES_LIMIT', CONFIG.ANZHIYU_CARD_CATEGORIES_LIMIT, CONFIG)
  const list = limit > 0 ? categoryOptions.slice(0, limit) : categoryOptions
  const hasMore = limit > 0 && categoryOptions.length > limit

  return (
    <div className='card-widget card-categories'>
      <div className='item-headline'>
        <i className='anzhiyufont anzhiyu-icon-folder-open' />
        <span>分类</span>
        {hasMore && (
          <SmartLink href='/category' className='card-more-btn' title='更多'>
            <i className='anzhiyufont anzhiyu-icon-angle-right' />
          </SmartLink>
        )}
      </div>
      <ul className='card-category-list' id='aside-cat-list'>
        {list.map(c => (
          <li className='card-category-list-item' key={c.name}>
            <SmartLink href={`/category/${c.name}`} className='card-category-list-link'>
              <span className='card-category-list-name'>{c.name}</span>
              <span className='card-category-list-count'>{c.count}</span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
