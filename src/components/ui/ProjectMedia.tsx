import { useEffect, useRef, useState } from "react";
import type { ProjectMedia as Media } from "../../data/projects";
import styles from "./ProjectMedia.module.css";
export function validMedia(media: Media): boolean {
  return Boolean(
    media &&
    ["image", "video"].includes(media.type) &&
    typeof media.src === "string" &&
    /^(\/(?!\/)|https?:\/\/)/.test(media.src.trim()) &&
    media.alt?.trim() &&
    (media.width === undefined ||
      (Number.isFinite(media.width) && media.width > 0)) &&
    (media.height === undefined ||
      (Number.isFinite(media.height) && media.height > 0)),
  );
}
export function ProjectMedia({
  media,
  priority = false,
}: {
  media: Media;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.1) element.pause();
      },
      { threshold: 0.1 },
    );
    const hide = () => {
      if (document.hidden) element.pause();
    };
    observer.observe(element);
    document.addEventListener("visibilitychange", hide);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", hide);
      element.pause();
    };
  }, [media.src, media.type, failed]);
  const width = media.width || 1600,
    height = media.height || 1000;
  if (!validMedia(media))
    return <p className={styles.unavailable}>Media unavailable.</p>;
  return (
    <figure className={styles.figure}>
      <div
        className={styles.frame}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {failed ? (
          <p className={styles.unavailable}>Media unavailable.</p>
        ) : media.type === "image" ? (
          <img
            src={media.src}
            alt={media.alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <video
            ref={video}
            src={media.src}
            poster={media.poster}
            width={width}
            height={height}
            controls
            playsInline
            preload="none"
            aria-label={media.alt}
            onError={() => setFailed(true)}
          >
            {media.captions && (
              <track
                kind="captions"
                src={media.captions}
                srcLang="en"
                label="English"
                default
              />
            )}
            Your browser does not support this video.
          </video>
        )}
      </div>
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}
