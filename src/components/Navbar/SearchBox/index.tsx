import React, { useState } from "react"
import IconSearch from "../../Icons/Search"
import { useNavigate } from "react-router-dom"
import "./../style.css"
const SearchBox: React.FC = () => {

  const navigate = useNavigate()

  const [ isActive, setActive ] = useState<boolean>(false)
  const [ keyword, setKeyword ] = useState<string>()

  const handleSubmitForm = (e:any) => {
    e.preventDefault()
    navigate(`/search/${e.target[0].value}`)
  }

  return (
    <div
      className={`search_box flex items-center w-96 h-9 rounded-lg
          ${
            ( isActive === false
              ? "bg-[color:var(--color-secondary-bg-for-transparent)]"
              : "bg-[color:var(--color-primary-bg-for-transparent)]"
            )
          }
        `
      }
    >
      {/* Icon Search */}
      <div
        className={`icon_search ml-2 mr-1
            ${(isActive === false ? "opacity-25" : "")}
          `
        }
      >
        <IconSearch setColor="var(--color-text)" setWidth="15px" setHeight="15px"/>
      </div>
      {/* Input */}
      <form
      className="w-full"
        method="GET"
        onSubmit={handleSubmitForm}
      >
        <input
          type="search"
          value={keyword}
          placeholder={ isActive === false ? "Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." : "" }
          className={ "input_search text-[16px] text-[color:var(--color-text)] border-none bg-transparent outline-none w-full px-2 " + (isActive === false ? "opacity-25" : "") }
          onFocus={ () => { setActive(!isActive) } }
          onBlur={ () => { setActive(!isActive) } }
          onChange={e => setKeyword(e.target.value)}
        >
        </input>
      </form>
    </div>
  )
}

export default SearchBox
