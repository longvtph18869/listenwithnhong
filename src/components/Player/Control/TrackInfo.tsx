import React from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { Link } from "react-router-dom"
import { setOpenLyric } from "../../../redux/features/audioSlice"

const TrackInfo: React.FC = () => {

  const info = useAppSelector((state) => state.audio.infoSongPlayer)
  const isLyrics = useAppSelector((state) => state.audio.isLyric)
  const dispatch = useAppDispatch()

  const handleOpenLyrics = () => {
    isLyrics
    ? dispatch(setOpenLyric(false))
    : dispatch(setOpenLyric(true))
  }
  return(
    <div className="flex items-center col-span-2 md:col-span-1">
      {/* Thumbnail */}
      <img
        onClick={ handleOpenLyrics }
        src={info.thumbnail}
        alt={info.title}
        className="h-[46px] rounded-[5px] cursor-pointer"
      />
      {/* End Thumbnail */}

      {/* Info */}
      <div className="flex flex-col justify-center h-[46px] ml-3">
        <div onClick={ handleOpenLyrics } className="w-[150px] font-semibold text-base text-[color:var(--color-text)] opacity-90 mb-1 truncate cursor-pointer">{info.title}</div>
        <div className="w-[150px] flex text-[color:var(--color-text)] text-xs opacity-60 truncate">
        {
          info.artists &&
          info.artists.map((e:any, i:number) => {
            return (
              <span key={i}>
                {
                  (i > 0) ? (<span>, </span>) : ("")
                }
                <Link
                  className="hover:underline"
                  to={`/artist/${e.alias}`}
                >
                  {e.name}
                </Link>
              </span>
            )
          })
        }
        </div>
      </div>
      {/* End Info */}
    </div>
  )
}

export default TrackInfo
