import React, { useEffect, useRef, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { setOpenLyric } from "../../redux/features/audioSlice"
import IconArrowDown from "../../components/Icons/ArrowDow"
import useLyric from "../../hooks/lyric"
import "./style.css"
const Lyric: React.FC<{ auRef: HTMLAudioElement | null }> = ({ auRef }) => {

  const isLyric = useAppSelector((state) => state.audio.isLyric)
  const songId = useAppSelector((state) => state.audio.songId)
  const currentTime = useAppSelector((state) => state.audio.currentTime)
  const [currentImage, setCurrentImage] = useState(0);
  const info = useAppSelector((state) => state.audio.infoSongPlayer)
  const isPlay = useAppSelector((state) => state.audio.isPlay)
  const dispatch = useAppDispatch()
  const images = [
    'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1379640/pexels-photo-1379640.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/50594/sea-bay-waterfront-beach-50594.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1252508/pexels-photo-1252508.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/845242/pexels-photo-845242.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3626475/pexels-photo-3626475.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/6640111/pexels-photo-6640111.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/707265/pexels-photo-707265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/11788823/pexels-photo-11788823.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/8409020/pexels-photo-8409020.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1408225/pexels-photo-1408225.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/2734469/pexels-photo-2734469.jpeg?auto=compress&cs=tinysrgb&w=1600'
  ]
  const lyrRef = useRef<HTMLDivElement>(null)

  const handleCloseLyric = () => {
    if (isLyric) {
      if (lyrRef.current) {
        lyrRef.current.classList.remove("animate-[lyric-up_1s]")
        lyrRef.current.classList.add("animate-[lyric-down_1s]")
      }
      setTimeout(() => {
        dispatch(setOpenLyric(false))
      }, 1000)
    } else {
      dispatch(setOpenLyric(true))
    }
  }

  const lyric = useLyric(songId)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    document.getElementById(`line-${0}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [lyric]);
  return (
    <>
      <div
        className={"fixed inset-0 z-[80] bg-[color:var(--color-body-bg)] transition-all ease-linear duration-300 " + (isLyric ? "animate-[lyric-up_1s]" : "hidden")}
        ref={lyrRef}
      >
        <div className="fs-background">
          <div className="video-blur-image">
            <canvas className="react-blur-canvas" ></canvas>
          </div>
          <div className="overlay">
          </div>
          <div className={`image-effect ${isPlay ? "is-play" : ""}`}>
            <ul>
              {images.map((image, index) => (
                <li key={index} className={index === currentImage ? 'enter' : 'exit'}>
                  <img src={image} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="z-40 p-2 mx-3 my-3 bg-transparent rounded-[25%] transition-all duration-200 hover:bg-[color:var(--color-secondary-bg-for-transparent)] fixed top-6 right-6"
          title="Close"
          onClick={handleCloseLyric}
        >
          <IconArrowDown setColor="white" setWidth="24px" setHeight="24px" />
        </button>
        {/* End Close Button */}

        {/* Lyric */}
        <div className="flex flex-col h-[calc(100%-64px)] relative top-0 z-1">
          <div className="h-[80px]"></div>
          <div className="z-30 h-full">
            <div className="grid grid-cols-9 h-full">
              <div className="col-span-4 w-full h-full px-3 hidden md:flex md:flex-col md:items-end md:justify-center">
                <div className="w-[500px] max-w-[80%] mr-[50px]">
                  <div className="cover"><figure className="image is-48x48 ">
                    <img className="rounded-md" src={info.thumbnail.replaceAll("w94", "w480")} alt={info.title} />
                  </figure>
                  </div>
                </div>
              </div>
              <div className="col-span-9 md:col-span-5 w-full h-full px-3 flex flex-col items-start justify-center">

                <div className="scroll-content font-semibold max-h-[480px] text-[42px] text-[color:var(--color-text)] w-full mx-0 my-0 h-full flex flex-col overflow-y-auto overflow-x-hidden">

                  {/* <div className="mt-[50vh]"></div> */}
                  {/* Line Lyric */}
                  {
                    lyric &&
                    lyric.map((e: { data: string, startTime: number, endTime: number }, index: number) => {
                      if (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime) {
                        document.getElementById(`line-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
                      }
                      return (
                        <div
                          id={`line-${index}`}
                          key={index}
                          className={"my-[2px] mx-0 px-[18px] py-3 rounded-xl transition-all duration-500 hover:bg-[color:var(--color-secondary-bg-for-transparent)] box-border " + (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime ? "origin-[center_left] scale-105" : "")}
                          onDoubleClick={() => {
                            if (auRef) {
                              auRef.currentTime = e.startTime / 1000
                            }
                          }}
                        >
                          <span
                            className={"cursor-pointer inline-block " + (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime ? "text-[#ffed00]" : "opacity-80")}
                          >
                            {e.data}
                          </span>
                        </div>
                      )
                    })
                  }
                  {/* End Line Lyric*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Lyric */}
      </div>
    </>
  )
}

export default Lyric
