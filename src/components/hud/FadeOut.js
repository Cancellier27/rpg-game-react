import {FADE_TIME} from "../../helpers/consts"

export default function FadeOut({level}) {
  const fadeTimeSeconds = FADE_TIME / 1000

  return (
    <div
      className="fade-component"
      style={{animation: `fadeOut ${fadeTimeSeconds}s forwards`}}
    ></div>
  )
}
