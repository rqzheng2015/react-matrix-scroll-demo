'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const CANVAS_WIDTH = 375
const CANVAS_HEIGHT = 667

export default function CanvasContainer() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement | null>(null) // 创建一个ref

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    const { deltaX, deltaY } = event
    const MIN_X = -CANVAS_WIDTH / 2 - 50
    const MAX_X = CANVAS_WIDTH / 2 + 50
    const MIN_Y = -CANVAS_HEIGHT / 2 - 50
    const MAX_Y = CANVAS_HEIGHT / 2 + 50
    setPosition(prev => {
      // 计算新的位置
      const newX = prev.x - deltaX
      const newY = prev.y - deltaY
      // 检查新的位置是否在范围内
      const inRangeX = newX >= MIN_X && newX <= MAX_X
      const inRangeY = newY >= MIN_Y && newY <= MAX_Y

      return {
        x: inRangeX ? newX : newX < MIN_X ? MIN_X : MAX_X,
        y: inRangeY ? newY : newY < MIN_Y ? MIN_Y : MAX_Y,
      }
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel) // 在元素上添加事件监听器
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel) // 在元素上移除事件监听器
      }
    }
  }, [containerRef.current])

  return (
    <div className={'flex-1 overflow-hidden relative p-[16px]'} ref={containerRef}>
      <div
        className={'w-full relative'}
        style={{
          transform: `matrix(1, 0, 0, 1, ${position.x}, ${position.y})`,
        }}
      >
        <div
          className={'bg-white m-auto relative flex items-center justify-center'}
          style={{
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
          }}
        >
          <p className={'text-[20px]'}>{`This is project's home page.`}</p>
        </div>
      </div>
    </div>
  )
}
