import React, { useState, useEffect } from 'react';
import { useScriptures } from '../hooks/useScriptures';
import type { Volume, Book, Chapter } from '../types/scripture';

interface ChapterReaderProps {
  volume: Volume;
  book: Book;
  chapter: Chapter;
  chapters: Chapter[];
  onChapterSelect: (volume: Volume, book: Book, chapter: Chapter) => void;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({ volume, book, chapter, chapters, onChapterSelect }) => {
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

  // Navigation logic
  const currentChapterIndex = chapters.findIndex(c => c.id === chapter.id);
  const hasPrevious = currentChapterIndex > 0 && chapters.length > 0;
  const hasNext = currentChapterIndex < chapters.length - 1 && chapters.length > 0;
  
  const handlePrevious = () => {
    if (hasPrevious && currentChapterIndex > 0) {
      const prevChapter = chapters[currentChapterIndex - 1];
      onChapterSelect(volume, book, prevChapter);
    }
  };
  
  const handleNext = () => {
    if (hasNext && currentChapterIndex < chapters.length - 1) {
      const nextChapter = chapters[currentChapterIndex + 1];
      onChapterSelect(volume, book, nextChapter);
    }
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
        <div className="space-y-3">
          {verses.map((verse) => (
            <div
              key={verse.id}
              className={`transition-colors cursor-pointer ${
                currentVerse === verse.verse_number
                  ? 'bg-cursor-accent/5'
                  : 'hover:bg-cursor-surface/10'
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

      {/* Chapter Info
      <div className="mt-6 pt-4 border-t border-cursor-border/30">
        <div className="text-xs text-cursor-text-muted space-y-1">
          <p>
            <span className="text-cursor-accent">[ CHAPTER INFO ]</span>
          </p>
          <p>Total Verses: {verses.length}</p>
          <p>Book ID: {book.id} | Chapter ID: {chapter.id}</p>
        </div>
      </div> */}

      {/* Navigation Buttons */}
      <div className="mt-6 pt-4 border-t border-cursor-border/30">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={`px-4 py-2 text-sm rounded border transition-colors ${
              hasPrevious
                ? 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                : 'opacity-50 cursor-not-allowed bg-cursor-surface/10 text-cursor-text-muted border-cursor-border/30'
            }`}
          >
            &lt;&lt; Previous
          </button>
          
          <span className="text-xs text-cursor-text-muted">
            Chapter {chapter.chapter_number} {chapters.length > 0 ? `of ${chapters.length}` : ''}
          </span>
          
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`px-4 py-2 text-sm rounded border transition-colors ${
              hasNext
                ? 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                : 'opacity-50 cursor-not-allowed bg-cursor-surface/10 text-cursor-text-muted border-cursor-border/30'
            }`}
          >
            Next &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}; 