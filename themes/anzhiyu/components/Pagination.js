import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * 列表分页（首页/分类/标签/归档通用）
 * 对应原主题 includes/pagination.pug 的非文章分支
 */
export default function Pagination({ page, totalPage }) {
  const router = useRouter()
  const [jumpValue, setJumpValue] = useState('')

  if (!totalPage || totalPage <= 1) return null

  const currentPage = +page || 1
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')

  const hrefForPage = p => (p === 1 ? `${pagePrefix || '/'}` : `${pagePrefix}/page/${p}`)

  const jumpToPage = () => {
    const n = parseInt(jumpValue, 10)
    if (n && n >= 1 && n <= totalPage) {
      router.push(hrefForPage(n))
    }
  }

  return (
    <nav id='pagination'>
      <div className='pagination'>
        {currentPage > 1 && (
          <a className='extend prev' href={hrefForPage(currentPage - 1)}>
            <i className='anzhiyufont anzhiyu-icon-chevron-left fa-fw' />
            <div className='pagination_tips_prev'>上页</div>
          </a>
        )}
        {Array.from({ length: totalPage }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPage || Math.abs(p - currentPage) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...')
            acc.push(p)
            return acc
          }, [])
          .map((p, idx) =>
            p === '...' ? (
              <span className='space' key={`gap-${idx}`}>
                ...
              </span>
            ) : (
              <a
                key={p}
                className={`page-number ${p === currentPage ? 'current' : ''}`}
                href={hrefForPage(p)}>
                {p}
              </a>
            )
          )}
        {currentPage < totalPage && (
          <a className='extend next' href={hrefForPage(currentPage + 1)}>
            <div className='pagination_tips_next'>下页</div>
            <i className='anzhiyufont anzhiyu-icon-chevron-right fa-fw' />
          </a>
        )}
      </div>
      <div className='toPageGroup'>
        <input
          id='toPageText'
          aria-label='toPage'
          value={jumpValue}
          onChange={e => setJumpValue(e.target.value.replace(/[^0-9]/g, ''))}
          onKeyUp={e => e.key === 'Enter' && jumpToPage()}
        />
        <a id='toPageButton' onClick={jumpToPage}>
          <i className='anzhiyufont anzhiyu-icon-angles-right' style={{ fontWeight: 'inherit', fontSize: '1rem' }} />
        </a>
      </div>
    </nav>
  )
}
