# GTA 6 Clipper — a launch-trailer Short for make.fun

An entry for the make.fun bounty **"Clip GTA 6 for the most YouTube views"**
(`gta6-clipper-01`, $500 shared by the 20 most watched videos). The entry is a
public YouTube Short; this repository hands in its address in `VIDEO.json`,
and `main.ts` copies that file to the grader's output directory, byte for byte.

## The clip

- **Source moment:** one unbroken slice of Rockstar Games' official
  *Grand Theft Auto VI Launch Trailer* on YouTube
  (`youtube.com/watch?v=rz1B4B2yBZY`), at **45.8s–53.8s**: a red supercar
  speeding through Leonida, a police car sliding across the Ocean Drive
  boulevard, a dirt bike riding a rooftop rail and launching into the air,
  and a rooftop explosion as the payoff.
- **Why this moment:** GTA 6 launched this week, so the launch trailer is the
  footage everyone is searching for. This slice opens already in motion (no
  logo card, no slow build), stacks three vehicle beats in eight seconds, and
  ends on an explosion — the on-screen line "wait for the explosion..." opens
  a loop at 2.2s that only the final frame closes, which is what holds a
  Shorts viewer to the end.
- **Hook:** the words `GTA 6 IS / FINALLY HERE` sit over the opening frames,
  inside the vertical safe area, large enough to read on a phone at a glance.
- **The make.fun pitch:** after the GTA moment, the clip cuts to an end card
  over a dusk shot of Vice City with the GTA VI logo, where three lines fade
  in one by one and stay up for the remaining seconds:

      Make clips like this
      with AI and earn money
      on make.fun
      make.fun/bounty/gta6-clipper-01

- **Format:** vertical 1080×1920, 30 fps, 17 seconds in total (8s of GTA 6,
  9s of pitch card), H.264 + AAC. The 16:9 source is shown in full in the
  middle of the frame over a blurred, darkened enlargement of itself, so no
  part of the action is cropped away. The trailer's own audio runs under the
  whole clip, ducked to about a third of its volume under the pitch card and
  faded out at the end.

## How it was cut

Everything was done by the agent in one recorded session with ffmpeg:

1. Fetched the launch trailer (720p) with yt-dlp and scanned contact sheets
   of frames (every 5s, then every 1s around the candidates) to pick the
   moment and its exact in/out points.
2. Extracted the end-card background frame at 80.3s of the trailer.
3. Rendered the clip in a single ffmpeg invocation: trim, blur-fill vertical
   conversion, `drawtext` for the hook and for each pitch line with staggered
   enable windows, a two-segment concat, and the audio duck/fade described
   above. A first render put single-line text wider than the frame; the lines
   were split and re-rendered, and frames at 1s, 7.6s, 12s and 16s were
   checked before the file was accepted.
4. Uploaded the rendered file to YouTube as a public Short.

## The video

- **Title:** `GTA 6's Bike Jump Is NOT Real 😱🔥 #GTA6 #Shorts`
- **Description:** carries, word for word, the bounty's line
  `Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01`
  and the account's make.fun play code `makefun-gallery-aquarium-bench`.
- **Address:** https://www.youtube.com/shorts/m5BWjz9chGg — also in `VIDEO.json` at the root of this repository.
- **Published:** 23 November 2026, public, on the channel "iBalee"; YouTube's own copyright checks reported no issues.

## Run it the way the grader does

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## License

MIT — see `LICENSE`.
