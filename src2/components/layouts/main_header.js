import Link from 'next/link'
import Image from 'next/image'
import { useOverlayContext } from '@/contexts/overlay_context'

export default function MainHeader({ children }) {
  const { isHeaderMenuOpen, headerMenuTrigger, asideMenuTrigger } = useOverlayContext()

  return (
    <>
      <div className="main-header">
        <div className="main-header-button-1">
          <button onClick={() => {headerMenuTrigger()}}>
            <Image
              src="/ast-imgs/amiverse-v3-alpha-400x400.png"
              alt="Amiverseのロゴ"
              width={40}
              height={40}
            />
          </button>
        </div>
        <div className="main-header-content">
          {children}
        </div>
        <div className="main-header-button-2">
          <button onClick={() => {asideMenuTrigger()}}>
            ☰
          </button>
        </div>
      </div>
      <style jsx>{`
        .main-header {
          height: 50px;
          width: 100%;
          position: sticky;
          top: 0px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          backdrop-filter: blur(3px);
          background: var(--blur-color);
          z-index: 80;
        }
        .main-header-button-1, .main-header-button-2 {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          aspect-ratio: 1/1;
          flex-shrink: 0;
        }
        .main-header-button-1 button, .main-header-button-2 button {
          color: var(--font-color);
          background: none;
          border: none;
          border-radius: 22px;
          width: 44px;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .main-header-content {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mhc-title {
          background: linear-gradient(90deg, #747eee, #d453cc 50%, #fe5597);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 20px;
        }
        .main-container {
          background: var(--main-container-background-color);
          padding: 5px;
        }
        @media (min-width: 700px) and (min-height: 720px) {
          .main-header-button-1 {
            display: none;
          }
        }
        @media (min-width: 1000px) {
          .main-header-button-2 {
            display: none;
          }
        }
      `}</style>
    </>
  )
}