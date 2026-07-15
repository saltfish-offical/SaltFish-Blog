/**
 * 文章列表为空时的占位提示
 */
export default function BlogPostListEmpty({ message = '这里空空如也，什么都没有找到~' }) {
  return (
    <div
      className='is-center'
      style={{
        minHeight: '30vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--anzhiyu-secondtext)'
      }}>
      <i className='anzhiyufont anzhiyu-icon-inbox' style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
      <span>{message}</span>
    </div>
  )
}
