import Item from '@/components/items/item'
import SkeletonItem from '@/components/items/skeleton_item'

export default function FeedItems({ items = [], loadItems = false }) {

  return (
    <>
      <div className="items">
        {(() => {
          if (loadItems) {
            return (
              <>
                {[...Array(20)].map((_, index) => (
                  <SkeletonItem key={index} />
                ))}
              </>
            )
          } else if (items.length > 0) {
            return (
              <>
                {items.map(item => (
                  <Item key={item.item.aid + ((item.object == 'diffuse') ? '-d-' + item.item.aid : '')} item={item.item} />
                ))}
              </>
            )
          } else {
            return (
              <>
                <p>アイテムはありません。</p>
              </>
            )
          }
        })()}
      </div>
      <style jsx>{`
        .items {
        }
      `}</style>
    </>
  )
}