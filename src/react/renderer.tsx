import { useTheme, type NodeRenderer } from '@myst-theme/providers';
import { DiscourseFeed } from './DiscourseFeed.js';
import { DiscourseWidget } from './DiscourseWidget.js';
import type { TransformedDiscourseNode } from './types.js';
import { DiscourseClient } from './DiscourseClient.js';

export const DiscourseRenderer: NodeRenderer = ({ node }: { node: TransformedDiscourseNode }) => {
  const { mode, url, category, pinned, limit, logo, logoDark, logoTitle, data } = node;

  const { isDark } = useTheme();
  if (mode === 'widget') {
    return <DiscourseWidget url={url} category={category} limit={limit} />;
  } else if (mode === 'client') {
    return (
      <DiscourseClient
        url={url}
        category={category}
        pinned={pinned}
        limit={limit}
        logo={logo}
        logoDark={logoDark}
        logoTitle={logoTitle}
        isDark={isDark}
      />
    );
  }

  return (
    <DiscourseFeed
      topics={data.topics}
      error={data.error}
      logo={logo}
      logoDark={logoDark}
      logoTitle={logoTitle}
      url={url}
      category={category}
      isDark={isDark}
    />
  );
};
