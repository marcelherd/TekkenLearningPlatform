import { Box } from '@mantine/core';

export interface YoutubeEmbedProps {
  href: string;
  title?: string;
  width?: string | number;
  height?: string | number;
}

export default function YoutubeEmbed({ href, title, width, height }: YoutubeEmbedProps) {
  const [baseUrl, videoId] = href.split('?v=');
  return (
    <Box>
      <iframe
        width={width ?? 560}
        height={height ?? 315}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title ?? 'Embedded video'}
      />
    </Box>
  );
}
