import { Topic, User } from './types.js';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function formatDiscourseTopics(
  topics: Topic[],
  users: User[],
  opts: { pinned?: boolean; limit?: number }
) {
  const composed = topics.map((t) => {
    t.posters =
      t.posters?.map((p) => {
        return {
          ...p,
          user: users.find((u) => u.id === p.user_id),
        };
      }) ?? [];
    return t;
  });

  return composed
    ?.filter((t) => (opts.pinned ? true : !t.pinned))
    .filter((t) => t.visible && !t.archived)
    .slice(0, opts.limit);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
