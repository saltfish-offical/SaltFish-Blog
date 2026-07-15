import SmartLink from '@/components/SmartLink'

/**
 * 全部分类列表页面
 * 对应原主题 includes/page/categories.pug
 */
export default function CategoryCloudList({ categoryOptions = [] }) {
  const sorted = [...categoryOptions].sort((a, b) => (b.name?.length || 0) - (a.name?.length || 0))

  return (
    <div id='tag'>
      <div className='category-lists' id='tag-page-tags'>
        {sorted.map(c => (
          <SmartLink key={c.name} href={`/category/${c.name}`}>
            <span className='tags-punctuation'>#</span>
            {c.name}
            <span className='tagsPageCount'>{c.count}</span>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}
