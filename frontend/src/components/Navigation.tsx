import React, { useState, useEffect } from 'react';
import { useScriptures } from '../hooks/useScriptures';
import type { Volume, Book, Chapter } from '../types/scripture';

interface NavigationProps {
  onChapterSelect: (volume: Volume, book: Book, chapter: Chapter) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onChapterSelect }) => {
  const {
    volumes,
    books,
    chapters,
    loading,
    error,
    fetchVolumes,
    fetchBooksByVolume,
    fetchChaptersByBook,
  } = useScriptures();

  const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [expandedVolumes, setExpandedVolumes] = useState<Set<number>>(new Set());
  const [expandedBooks, setExpandedBooks] = useState<Set<number>>(new Set());
  const [showLDS, setShowLDS] = useState(false);

  useEffect(() => {
    fetchVolumes();
  }, [fetchVolumes]);

  const handleVolumeClick = async (volume: Volume) => {
    if (expandedVolumes.has(volume.id)) {
      // Collapse volume
      const newExpanded = new Set(expandedVolumes);
      newExpanded.delete(volume.id);
      setExpandedVolumes(newExpanded);
      setSelectedVolume(null);
      setSelectedBook(null);
    } else {
      // Expand volume
      const newExpanded = new Set(expandedVolumes);
      newExpanded.add(volume.id);
      setExpandedVolumes(newExpanded);
      setSelectedVolume(volume);
      setSelectedBook(null);
      await fetchBooksByVolume(volume.id);
    }
  };

  const handleBookClick = async (book: Book) => {
    if (expandedBooks.has(book.id)) {
      // Collapse book
      const newExpanded = new Set(expandedBooks);
      newExpanded.delete(book.id);
      setExpandedBooks(newExpanded);
      setSelectedBook(null);
    } else {
      // Expand book
      const newExpanded = new Set(expandedBooks);
      newExpanded.add(book.id);
      setExpandedBooks(newExpanded);
      setSelectedBook(book);
      await fetchChaptersByBook(book.id);
    }
  };

  const handleChapterClick = (chapter: Chapter) => {
    if (selectedVolume && selectedBook) {
      onChapterSelect(selectedVolume, selectedBook, chapter);
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
    <div className="bg-cursor-surface/30 border border-cursor-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm text-cursor-accent font-semibold">
          VOLUMES
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-cursor-text-muted">LDS</span>
          <button
            onClick={() => setShowLDS(!showLDS)}
            className={`w-8 h-4 rounded-full transition-colors ${
              showLDS
                ? 'bg-cursor-accent/60'
                : 'bg-cursor-surface/40'
            }`}
          >
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
              showLDS ? 'translate-x-4' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p className="text-cursor-text-muted text-sm">
            <span className="text-cursor-accent">[</span> LOADING...
            <span className="text-cursor-accent">]</span>
          </p>
        </div>
      )}

      <div className="space-y-2">
        {volumes
          .filter((volume) => {
            // Show all volumes if LDS is enabled, otherwise only show OT and NT
            if (showLDS) return true;
            return volume.volume_short_title === 'OT' || volume.volume_short_title === 'NT';
          })
          .map((volume) => (
          <div key={volume.id} className="space-y-1">
            {/* Volume */}
            <button
              onClick={() => handleVolumeClick(volume)}
              className={`w-full text-left p-2 rounded hover:bg-cursor-surface/50 transition-colors ${
                selectedVolume?.id === volume.id
                  ? 'bg-cursor-accent/20 text-cursor-accent'
                  : 'text-cursor-text'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {expandedVolumes.has(volume.id) ? '▼' : '▶'} {volume.volume_short_title}
                </span>
                <span className="text-xs text-cursor-text-muted">
                  {volume.volume_title}
                </span>
              </div>
            </button>

            {/* Books */}
            {expandedVolumes.has(volume.id) && (
              <div className="ml-4 space-y-1">
                {books
                  .filter((book) => book.volume_id === volume.id)
                  .map((book) => (
                    <div key={book.id} className="space-y-1">
                      <button
                        onClick={() => handleBookClick(book)}
                        className={`w-full text-left p-2 rounded hover:bg-cursor-surface/50 transition-colors ${
                          selectedBook?.id === book.id
                            ? 'bg-cursor-accent/20 text-cursor-accent'
                            : 'text-cursor-text'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            {expandedBooks.has(book.id) ? '▼' : '▶'} {book.book_short_title}
                          </span>
                          <span className="text-xs text-cursor-text-muted">
                            {book.book_title}
                          </span>
                        </div>
                      </button>

                      {/* Chapters */}
                      {expandedBooks.has(book.id) && (
                        <div className="ml-4 mt-2">
                          <div className="flex flex-wrap gap-1">
                            {chapters
                              .filter((chapter) => chapter.book_id === book.id)
                              .map((chapter) => (
                                <button
                                  key={chapter.id}
                                  onClick={() => handleChapterClick(chapter)}
                                  className="min-w-[3rem] h-8 px-2 rounded border border-cursor-border/50 hover:bg-cursor-surface/50 hover:border-cursor-border transition-colors text-cursor-text text-sm font-mono flex items-center justify-center"
                                >
                                  {chapter.chapter_number}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
