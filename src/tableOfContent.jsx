import './tableOfContent.css'
import { useEffect, useRef, useState } from 'react'

const getClassName = (level) => {
  switch (level) {
    case 2:
      return 'head2'
    case 3:
      return 'head3'
    case 4:
      return 'head4'
    default:
      return null
  }
}


function TableOfContent() {
  const [headings, setHeadings] = useState([])
const [activeId, setActiveId] = useState('')
  const observer = useRef()

  // This function is for handle right scroll events
  const handleScrollView = () => {
    const handleObsever = (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      }
  
      observer.current = new IntersectionObserver(handleObsever, {
        rootMargin: "-20% 0% -35% 0px"}
      )
      
      const elements = document.querySelectorAll("h2, h3", "h4")
      elements.forEach((elem) => observer.current.observe(elem))
      return () => observer.current?.disconnect()
  }

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
      .map((elem) => ({
        id: elem.id,
        text: elem.innerText,
        level: Number(elem.nodeName.charAt(1))
      }))
    setHeadings(elements)
    handleScrollView();
  }, [])

  
  return (
    <nav>
      <ul>
        {headings.map(heading => (
          <li
            key={heading.id}
            className={getClassName(heading.level)}
            >
            <a
              href={`#${heading.id}`} 
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`).scrollIntoView({
                  behavior: "smooth"
                })}}
                style={{
                  fontWeight: activeId === heading.id ? "bold" : "normal",
                  color: activeId === heading.id ? "blue" : "",
                //   borderLeft: activeId === heading.id ? "4px solid blue" : "",
                //   padding: activeId === heading.id ? "0px 10px" : "",
                }}
              >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
  
}

export default TableOfContent