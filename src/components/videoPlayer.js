// src/components/videoPlayer.js
/**
 * Responsive YouTube Player and Navigation Component.
 */

export function renderVideoPlayer(container, video) {
  container.innerHTML = `
    <div class="video-player-card">
      <div class="video-embed-wrapper">
        <iframe
          src="${video.embedUrl}"
          title="${video.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="video-meta-bar">
        <div class="video-meta-left">
          <span class="badge badge-primary">#${video.index} of 62</span>
          <span class="badge badge-category">${video.category}</span>
          <span class="video-duration"><i data-feather="clock"></i> ${video.duration}</span>
        </div>
        <div class="video-meta-right">
          <a href="${video.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
            Watch on YouTube <i data-feather="external-link"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}
