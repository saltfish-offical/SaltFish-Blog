import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

/**
 * 分类导航条
 * 对应原主题 includes/categoryGroup.pug
 */
export default function CategoryBar({ categoryOptions = [] }) {
  const router = useRouter()
  const { category } = router.query
  const scrollRef = useRef(null)
  const [scrolledRight, setScrolledRight] = useState(false)

  const scrollToEnd = () => {
    const el = scrollRef.current
    if (!el) return
    if (scrolledRight) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: 'smooth' })
    }
    setScrolledRight(!scrolledRight)
  }

  return (
    <div id='categoryBar'>
      <div id='category-bar' className='category-bar'>
        <div id='catalog-bar'>
          <div id='catalog-list' ref={scrollRef}>
            <div className='catalog-list-item' id='首页'>
              <SmartLink href='/' className={!category ? 'active' : ''}>
                首页
              </SmartLink>
            </div>
            {categoryOptions?.map(c => (
              <div className='catalog-list-item' key={c.name}>
                <SmartLink
                  href={`/category/${c.name}`}
                  className={category === c.name ? 'active' : ''}>
                  {c.name}
                </SmartLink>
              </div>
            ))}
          </div>
          <div className='category-bar-next' id='category-bar-next' onClick={scrollToEnd}>
            <i className='anzhiyufont anzhiyu-icon-angle-double-right' />
          </div>
          <SmartLink className='catalog-more' href='/category'>
            更多
          </SmartLink>
        </div>
      </div>
    </div>
  )
}
