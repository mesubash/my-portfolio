// import React from "react";
import "./Preloader.css";
import { useEffect, useRef } from "react";

/*
  Video-based preloader (WebM recommended):
  - Place your WebM at `public/assets/loader/loader.webm` so it is served at
    `/assets/loader/loader.webm`.
  - Video will autoplay (muted) and loop. If the user prefers reduced motion,
    the video will not autoplay and will be paused.
*/

const Preloader = ({ active = true, onHidden } ) => {
  const videoRef = useRef(null);
  const rootRef = useRef(null);
  const mountTimeRef = useRef(Date.now());
  const hiddenRef = useRef(false);

  // Minimum time (ms) the preloader should remain visible
  const MIN_VISIBLE_MS = 3000;

  const prefersReduced = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Feature-detect support for WebM; if not supported, switch to an MP4 fallback.
    try {
      const canPlayWebm = typeof vid.canPlayType === 'function' && (
        vid.canPlayType('video/webm; codecs="vp8, vorbis"') || vid.canPlayType('video/webm')
      );

      if (!canPlayWebm) {
        // Replace sources with MP4 fallback (user should place mp4 at this path)
        // Clear existing children and add mp4 source
        while (vid.firstChild) vid.removeChild(vid.firstChild);
        const srcMp4 = document.createElement('source');
        srcMp4.src = '/assets/loader/12345.mp4';
        srcMp4.type = 'video/mp4';
        vid.appendChild(srcMp4);
        // Ensure the video element picks up the new source
        vid.load();
      }
    } catch (e) {
      // If detection fails, proceed — the browser will try the provided sources.
    }

    // Play/pause handling (respect reduced motion)
    if (prefersReduced) {
      try { vid.pause(); } catch (e) {}
    } else {
      vid.muted = true;
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => { /* ignore autoplay errors */ });
      }
    }

    // If video errors (some mobile browsers refuse certain codecs), try MP4 as a final fallback
    const onError = () => {
      // if MP4 already present, nothing to do
      const hasMp4 = Array.from(vid.querySelectorAll('source')).some(s => s.type === 'video/mp4' || /\.mp4$/.test(s.src));
      if (!hasMp4) {
        while (vid.firstChild) vid.removeChild(vid.firstChild);
        const srcMp4 = document.createElement('source');
        srcMp4.src = '/assets/loader/12345.mp4';
        srcMp4.type = 'video/mp4';
        vid.appendChild(srcMp4);
        vid.load();
        const p = vid.play();
        if (p && typeof p.then === 'function') p.catch(() => {});
      }
    };

    vid.addEventListener('error', onError);

    return () => {
      vid.removeEventListener('error', onError);
    };
  }, [prefersReduced]);

  // central hide function that respects minimum visible time and de-duplicates
  const hide = () => {
    if (hiddenRef.current) return;
    const el = rootRef.current;
    if (!el) return;
    const elapsed = Date.now() - (mountTimeRef.current || Date.now());
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

    const doHide = () => {
      if (hiddenRef.current) return;
      hiddenRef.current = true;
      el.classList.add('preloader--hidden');

      const onTransitionEnd = (e) => {
        if (e.target === el && e.propertyName === 'opacity') {
          el.removeEventListener('transitionend', onTransitionEnd);
          if (typeof onHidden === 'function') onHidden();
        }
      };

      el.addEventListener('transitionend', onTransitionEnd);
      // safety fallback
      setTimeout(() => {
        if (typeof onHidden === 'function') onHidden();
      }, 1200);
    };

    if (wait > 0) {
      setTimeout(doHide, wait);
    } else {
      doHide();
    }
  };

  // fade out preloader when the page has fully loaded, but respect min visible
  useEffect(() => {
    mountTimeRef.current = Date.now();
    const onLoad = () => {
      hide();
    };

    if (document.readyState === 'complete') {
      // If document already loaded, request hide (hide() will respect min time)
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
      // safety: if load never fires, ensure hide after a longer grace period
      const fallback = setTimeout(hide, MIN_VISIBLE_MS + 4000);
      return () => {
        window.removeEventListener('load', onLoad);
        clearTimeout(fallback);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parent may control visibility; when `active` turns false start hide
  useEffect(() => {
    if (active === false) {
      hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
  <div ref={rootRef} className="preloader" role="status" aria-busy="true" aria-label="Loading">
      <div className="loader-container">
        <div className="lottie-wrapper video-wrapper">
          <video
            ref={videoRef}
            className="preloader-video"
            playsInline
            autoPlay={!prefersReduced}
            muted
            loop
            preload="auto"
            aria-hidden="true"
          >
            <source src="/assets/loader/12345.webm" type="video/webm" />
            {/* optional mp4 fallback if you convert */}
            <source src="/assets/loader/12345.mp4" type="video/mp4" />
          </video>
          {/* dots were moved back next to the loading text for visibility on white */}
        </div>

        <div className="loading-text-container">
          <p className="loading-text">
            Loading
            <span className="loading-dots" aria-hidden="true">
              <span className="dot dot-1" />
              <span className="dot dot-2" />
              <span className="dot dot-3" />
            </span>
          </p>
          <span className="sr-only">Loading</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;