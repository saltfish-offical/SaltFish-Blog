import SmartLink from '@/components/SmartLink'

/**
 * 标签胶囊列表（不含外层包裹），供全部标签页与单个标签详情页复用
 * 对应 scripts/helpers/tags_page_list.js 的输出内容
 */
export default function TagPills({ tagOptions = [] }) {
  const sorted = [...tagOptions].sort((a, b) => (b.name?.length || 0) - (a.name?.length || 0))
  return (
    <>
      {sorted.map(tag => (
        <SmartLink key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`}>
          <span className='tags-punctuation'>#</span>
          {tag.name}
          <span className='tagsPageCount'>{tag.count}</span>
        </SmartLink>
      ))}
    </>
  )
}
