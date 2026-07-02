import { useState, useRef } from 'react'

export default function RankQuestion({ options: initialOptions, value, onChange, correctOrder = null, readOnly = false }) {
  const [items, setItems] = useState(() =>
    value?.length ? value : initialOptions.map(o => o.id)
  )
  const [modalSrc, setModalSrc] = useState(null)
  const [draggingIndex, setDraggingIndex] = useState(null)
  const dragItem = useRef(null)
  const dragOver = useRef(null)
  const listRef = useRef(null)

  function getOption(id) {
    return initialOptions.find(o => o.id === id)
  }

  function move(index, direction) {
    const next = [...items]
    const swapIndex = index + direction
    if (swapIndex < 0 || swapIndex >= next.length) return
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
    setItems(next)
    onChange(next)
  }

  // Mouse drag handlers
  function onDragStart(index) {
    dragItem.current = index
    setDraggingIndex(index)
  }

  function onDragEnter(index) {
    dragOver.current = index
  }

  function onDragEnd() {
    const next = [...items]
    const dragged = next.splice(dragItem.current, 1)[0]
    next.splice(dragOver.current, 0, dragged)
    dragItem.current = null
    dragOver.current = null
    setDraggingIndex(null)
    setItems(next)
    onChange(next)
  }

  // Touch drag handlers
  function onTouchStart(e, index) {
    dragItem.current = index
    setDraggingIndex(index)
  }

  function onTouchMove(e) {
    e.preventDefault()
    const touch = e.touches[0]
    const el = document.elementFromPoint(touch.clientX, touch.clientY)
    const li = el?.closest('li[data-index]')
    if (li) {
      const idx = parseInt(li.dataset.index, 10)
      if (!isNaN(idx)) dragOver.current = idx
    }
  }

  function onTouchEnd() {
    if (dragItem.current !== null && dragOver.current !== null && dragItem.current !== dragOver.current) {
      const next = [...items]
      const dragged = next.splice(dragItem.current, 1)[0]
      next.splice(dragOver.current, 0, dragged)
      setItems(next)
      onChange(next)
    }
    dragItem.current = null
    dragOver.current = null
    setDraggingIndex(null)
  }

  const hasImages = initialOptions.some(o => o.image)
  const interactive = !correctOrder && !readOnly

  return (
    <>
    <ol className="rank-list" ref={listRef}>
      {items.map((id, index) => {
        const opt = getOption(id)
        const isCorrectPos = correctOrder ? correctOrder[index] === id : null
        const shouldBe = correctOrder ? correctOrder.indexOf(id) + 1 : null

        return (
          <li
            key={id}
            data-index={index}
            className={`rank-item${hasImages ? ' rank-item--image' : ''}${correctOrder ? (isCorrectPos ? ' rank-item--correct' : ' rank-item--wrong') : ''}${draggingIndex === index ? ' rank-item--dragging' : ''}`}
            draggable={interactive}
            onDragStart={() => interactive && onDragStart(index)}
            onDragEnter={() => interactive && onDragEnter(index)}
            onDragEnd={() => interactive && onDragEnd()}
            onDragOver={e => e.preventDefault()}
            onTouchStart={interactive ? e => onTouchStart(e, index) : undefined}
            onTouchMove={interactive ? onTouchMove : undefined}
            onTouchEnd={interactive ? onTouchEnd : undefined}
          >
            <span className="rank-number">{index + 1}</span>
            {opt.image
              ? (
                <img
                  className="rank-image"
                  src={opt.image}
                  alt={opt.label}
                  onClick={e => { e.stopPropagation(); setModalSrc(opt.image) }}
                  style={{ cursor: 'zoom-in' }}
                />
              )
              : <span className="rank-label">{opt.label}</span>
            }
            {correctOrder ? (
              <span className={`rank-feedback ${isCorrectPos ? 'rank-feedback--correct' : 'rank-feedback--wrong'}`}>
                {isCorrectPos ? '✓' : `✕ should be #${shouldBe}`}
              </span>
            ) : readOnly ? null : (
              <div className="rank-arrows">
                <button
                  className="rank-arrow"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                >▲</button>
                <button
                  className="rank-arrow"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label="Move down"
                >▼</button>
              </div>
            )}
          </li>
        )
      })}
    </ol>

      {modalSrc && (
        <div className="rank-modal-overlay" onClick={() => setModalSrc(null)}>
          <button className="rank-modal-close" onClick={() => setModalSrc(null)} aria-label="Close">✕</button>
          <img className="rank-modal-img" src={modalSrc} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
