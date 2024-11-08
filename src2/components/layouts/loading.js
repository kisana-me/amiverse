import React, { useState, useEffect } from 'react'
import { useMainContext } from '@/contexts/main_context'

export default function Loading() {
  const { loading, setLoading, loadingMessage } = useMainContext()
  const [showLoading, setShowLoading] = useState(loading)

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, 390)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <div className={`${showLoading ? 'show-loading' : 'hide-loading'}`}>
      <div className='loading-logo-wrap'>
        <div className={`loading-logo-ring1 ${loading ? '' : 'loading-logo-ring2'}`}></div>
        <img className='loading-logo' src='/ast-imgs/amiverse-v3-alpha.svg' />
      </div>
      <div className='loading-details'>
        <div className='loading-message'>{loadingMessage}</div>
        <div className='loading-close-button' onClick={() => setLoading(false)} >閉じる</div>
      </div>
      <style jsx>{`
        .show-loading {
          width: 100vw;
          height: 100svh;
          background: var(--background-color);
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 500;
        }
        .hide-loading {
          display: none;
        }
        .loading-logo-wrap {
          width: 50px;
          height: 50px;
          top: 50%;
          left: 50%;
          position: absolute;
          display: block;
          transform: translate(-50%, -50%);
        }
        .loading-logo-ring1 {
          background: rgba(181, 244, 253, 1);
          position: absolute;
          z-index:-1;
          border-radius: 100px;
          height: 70px;
          width: 70px;
          top: -10px;
          left: -10px;
          animation: pulsate1 1s ease-in-out;
          animation-iteration-count: infinite;
        }
        .loading-logo-ring2 {
          animation: pulsate2 0.4s ease-in-out;
        }
        @keyframes pulsate1 {
          0% { transform: scale(1, 1); opacity: 0.1; }
          50% { transform: scale(2, 2); opacity: 0.1; }
          100%  { transform: scale(1, 1); opacity: 0.1; }
        }
        @keyframes pulsate2 {
          0% { opacity: 0.1; }
          100%  { transform: scale(3, 3); opacity: 0.0; }
        }
        .loading-logo {
          width: 50px;
          height: 50px;
        }
        .loading-details {
          position: absolute;
          bottom: 10%;
        }
        .loading-message {
          color: #64a5fc;
        }
        .loading-close-button {
          display: inline;
        }
      `}</style>
    </div>
  )
}