import {FADE_TIME} from "../../helpers/consts"

export default function FadeIn({level}) {
  const fadeTimeSeconds = FADE_TIME / 1000

  return (
    <div
      className="fade-component"
      style={{animation: `fadeIn ${fadeTimeSeconds}s forwards`}}
    ></div>
  )
}
