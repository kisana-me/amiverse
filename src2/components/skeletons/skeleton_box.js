import React from "react"

const SkeletonBox = ({ width = "100px", height = "24px" }) => {
  return (
    <>
      <div className="skeleton-outside" style={{ width, height }}>
        <div className="skeleton-inside" />
      </div>
      <style jsx>{`
        .skeleton-outside {
          box-sizing: border-box;
          padding: 4px;
        }
        .skeleton-inside {
          background: linear-gradient(90deg, var(--inconspicuous-font-color) 25%, var(--border-color) 50%, var(--inconspicuous-font-color) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          box-sizing: border-box;
          border-radius: 4px;
          width: 100%;
          height: 100%;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  )
}

export default SkeletonBox

