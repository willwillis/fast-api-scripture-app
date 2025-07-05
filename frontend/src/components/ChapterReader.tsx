import React, { useState, useEffect } from 'react';
import { useScriptures } from '../hooks/useScriptures';
import type { Volume, Book, Chapter } from '../types/scripture';

interface ChapterReaderProps {
  volume: Volume;
  book: Book;
  chapter: Chapter;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({ volume, book, chapter }) => {
  const {
    verses,
    loading,
    error,
    fetchVersesByChapter,
  } = useScriptures();

  const [currentVerse, setCurrentVerse] = useState<number | null>(null);

  useEffect(() => {
    fetchVersesByChapter(chapter.id);
    setCurrentVerse(null);
  }, [chapter.id, fetchVersesByChapter]);

  const handleVerseClick = (verseNumber: number) => {
    setCurrentVerse(currentVerse === verseNumber ? null : verseNumber);
  };

  if (error) {
    return (
      <div className="bg-cursor-error/10 border border-cursor-error/20 rounded-lg p-4">
        <p className="text-cursor-error font-mono text-sm">
          <span className="text-cursor-accent">ERROR:</span> {error}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cursor-surface/30 border border-cursor-border rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl text-cursor-accent font-semibold mb-2">
          {book.book_title} {chapter.chapter_number}
        </h1>
        <div className="text-sm text-cursor-text-muted space-y-1">
          <p>{volume.volume_title}</p>
          <p>{book.book_long_title}</p>
          {book.book_subtitle && <p className="italic">{book.book_subtitle}</p>}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-cursor-text-muted text-sm">
            <span className="text-cursor-accent">[</span> LOADING CHAPTER...
            <span className="text-cursor-accent">]</span>
          </p>
        </div>
      )}

      {/* Verses */}
      {!loading && verses.length > 0 && (
        <div className="space-y-4">
          {verses.map((verse) => (
            <div
              key={verse.id}
              className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                currentVerse === verse.verse_number
                  ? 'bg-cursor-accent/10 border-cursor-accent/30'
                  : 'bg-cursor-surface/20 border-cursor-border/50 hover:bg-cursor-surface/40'
              }`}
              onClick={() => handleVerseClick(verse.verse_number)}
            >
              <div className="flex items-start gap-3">
                <span className="text-sm text-cursor-accent font-mono font-semibold min-w-[2rem]">
                  {verse.verse_number}
                </span>
                <div className="flex-1">
                  <p className="text-cursor-text leading-relaxed text-sm">
                    {verse.scripture_text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Verses */}
      {!loading && verses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-cursor-text-muted text-sm">
            <span className="text-cursor-accent">[</span> NO VERSES FOUND
            <span className="text-cursor-accent">]</span>
          </p>
        </div>
      )}

      {/* Chapter Info */}
      <div className="mt-6 pt-4 border-t border-cursor-border/30">
        <div className="text-xs text-cursor-text-muted space-y-1">
          <p>
            <span className="text-cursor-accent">[</span> CHAPTER INFO
            <span className="text-cursor-accent">]</span>
          </p>
          <p>Total Verses: {verses.length}</p>
          <p>Book ID: {book.id} | Chapter ID: {chapter.id}</p>
        </div>
      </div>
    </div>
  );
}; 