'use client';

import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onPlayPause?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onLike?: () => void;
  onMute?: () => void;
  onVolumeUp?: () => void;
  onVolumeDown?: () => void;
  onSeekForward?: () => void;
  onSeekBackward?: () => void;
}

export default function KeyboardShortcuts(props: KeyboardShortcutsProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e as any).isComposing) return;

      switch (e.key.toLowerCase()) {
        case ' ': // Space
          e.preventDefault();
          props.onPlayPause?.();
          break;
        case 'j':
          props.onPrev?.();
          break;
        case 'k':
          props.onNext?.();
          break;
        case 'l':
          props.onLike?.();
          break;
        case 'm':
          props.onMute?.();
          break;
        case 'arrowup':
          e.preventDefault();
          props.onVolumeUp?.();
          break;
        case 'arrowdown':
          e.preventDefault();
          props.onVolumeDown?.();
          break;
        case 'arrowright':
          e.preventDefault();
          props.onSeekForward?.();
          break;
        case 'arrowleft':
          e.preventDefault();
          props.onSeekBackward?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [props]);

  return null;
}


