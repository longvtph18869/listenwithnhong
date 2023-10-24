import React, { useEffect, useState } from "react"
import { getCharthome } from "../api/zingchart"
import TrackPlaylist from "../components/TrackPlaylist"
import { useAppDispatch } from "../hooks/redux"
import { setPlaylistSong } from "../redux/features/audioSlice"
import Loading from "../components/Loading"

const ChartHome: React.FC = () => {

  const [dataChartHome, setDataChartHome] = useState<any>()

  const dispatch = useAppDispatch()


  useEffect(() => {
    (
      async () => {
        setDataChartHome(await getCharthome())
      }
    )()
  }, [])

  dataChartHome &&
    dispatch(setPlaylistSong(dataChartHome.RTChart.items))

  return (
    <>
      <main className="inset-0 box-border pt-[64px] pb-[96px] sm:px-[10vw] px-[4vw]">
        <div
          className="flex justify-between items-end text-[28px] font-bold text-[color:var(--color-text)] mt-9 mb-3 uppercase">
          ZINGCHART
        </div>
        <div className="mt-3">
          {
            dataChartHome
              ?
              <TrackPlaylist items={dataChartHome.RTChart.items} />
              :
              <Loading />
          }
        </div>
      </main>
    </>
  )
}

export default ChartHome