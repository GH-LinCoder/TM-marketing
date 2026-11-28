(function () {
  var DEFAULT_VIDEO_URL = 'https://youtube.com/shorts/OOtlD2oo8Ws';
  var DEFAULT_VIDEO_TITLE = 'Early Adopters';

  function extractYouTubeId(url) {
    if (!url) return null;
    var match = url.match(
      /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  }

  document.querySelectorAll('.video-embed').forEach(function (box) {
    var rawUrl = (box.getAttribute('data-youtube-url') || '').trim();

    if (rawUrl.toLowerCase() === 'none') {
      var parentSection = box.closest('section');
      if (parentSection) parentSection.remove();
      return;
    }

    var videoId = extractYouTubeId(rawUrl) || extractYouTubeId(DEFAULT_VIDEO_URL);
    if (!videoId) return;

    var title = (box.getAttribute('data-video-title') || '').trim() || DEFAULT_VIDEO_TITLE;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0';
    iframe.title = title;
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;

    box.innerHTML = '';
    box.appendChild(iframe);
  });
})();
