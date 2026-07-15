import { useEffect, useRef, useState } from 'react'

/**
 * 文章加密访问面板
 */
export default function PostLock({ validPassword }) {
  const [showError, setShowError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus?.()
  }, [])

  const submit = () => {
    const value = inputRef.current?.value
    if (!validPassword(value)) {
      setShowError(false)
      requestAnimationFrame(() => setShowError(true))
    } else {
      setShowError(false)
    }
  }

  return (
    <div
      id='article-container'
      className='is-center'
      style={{ flexDirection: 'column', minHeight: '16rem', gap: '1rem' }}>
      <div>
        <i className='fas fa-lock' style={{ fontSize: '2rem' }} />
      </div>
      <div>此文章内容需要密码访问</div>
      <div style={{ display: 'flex' }}>
        <input
          ref={inputRef}
          type='password'
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder='请输入密码'
          style={{
            outline: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px 0 0 8px',
            border: '1px solid var(--anzhiyu-card-border)'
          }}
        />
        <div
          onClick={submit}
          style={{
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '0 8px 8px 0',
            background: 'var(--anzhiyu-main)',
            color: '#fff'
          }}>
          提交
        </div>
      </div>
      {showError && <div style={{ color: '#e23636' }}>密码错误，请重试</div>}
    </div>
  )
}
