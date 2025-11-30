import React from 'react';
import { motion, AnimatePresence, scale } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  Edit2Icon,
  PauseIcon,
  PlayIcon,
  RotateCcw,
  ShuffleIcon,
  Volume2Icon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FlashcardType } from '../types/flashcard';
import { textToSpeech } from '@/shared/utils/textToSpeech';
import EditFlashcardModal from './editFlashcardModal';
import { shuffleArray } from '@/shared/utils/shuffleArray';
import { useLocation } from 'react-router-dom';

type FlashcardPracticeProps = {
  flashcards: FlashcardType[];
  isOwner: boolean;
};

const FlashcardPractice = ({ flashcards, isOwner }: FlashcardPracticeProps) => {
  const { pathname } = useLocation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [direction, setDirection] = React.useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = React.useState(false);
  const [isShuffle, setIsShuffle] = React.useState(false);
  const [editCard, setEditCard] = React.useState<FlashcardType | null>(null);
  const [shuffledFlashcards, setShuffledFlashcards] = React.useState<FlashcardType[]>([]);

  const termDuration = 3000;
  const definitionDuration = 3000;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      scale: 0.96,
    }),
    center: {
      x: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      scale: 0.96,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const currentCard =
    shuffledFlashcards.length > 0 ? shuffledFlashcards[currentIndex] : flashcards[currentIndex];

  React.useEffect(() => {
    if (!isPlayingAuto) return;

    // Step 1: Show term
    setIsFlipped(false);

    // Step 2: Show definition
    const flipTimeout = setTimeout(() => {
      setIsFlipped(true);
    }, termDuration);

    // Step 3: Next and repeat
    const nextTimeout = setTimeout(() => {
      setDirection(1);

      setCurrentIndex((prev) => {
        if (prev === flashcards.length - 1) {
          setIsPlayingAuto(false);
          return prev;
        }

        return prev + 1;
      });
    }, termDuration + definitionDuration);

    return () => {
      clearTimeout(flipTimeout);
      clearTimeout(nextTimeout);
    };
  }, [isPlayingAuto, currentIndex, flashcards.length]);

  const handleShuffleMode = () => {
    setIsFlipped(false);
    if (!isShuffle) {
      setIsShuffle(true);
      setShuffledFlashcards(shuffleArray(flashcards));
    } else {
      setIsShuffle(false);
      setShuffledFlashcards(flashcards);
    }
  };

  if (flashcards.length === 0) {
    return (
      <Card className="p-12 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">No flashcards available</h3>
        <p className="text-muted-foreground">Add some flashcards to start practicing!</p>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="perspective-1000">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.12 }}
          >
            <Card
              className={cn(
                'relative h-110 cursor-pointer transition-all ease-in-out duration-300 transform-gpu',
                'hover:shadow-lg',
              )}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
              }}
            >
              <div className="" style={{ backfaceVisibility: 'hidden' }}>
                <div className="flex items-center justify-end gap-3 px-6 py-2 ">
                  {isOwner && (
                    <button
                      onClick={() => setEditCard(currentCard)}
                      className=" hover:cursor-pointer relative z-50"
                    >
                      <Edit2Icon className="size-5 text-muted-foreground hover:text-black/80" />
                    </button>
                  )}
                  <button
                    className=" hover:cursor-pointer relative z-50"
                    onClick={() => {
                      textToSpeech(currentCard.term);
                    }}
                  >
                    <Volume2Icon className="size-6 text-muted-foreground hover:text-black/80" />
                  </button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-10 backface-hidden rounded-xl">
                  <div className="text-center space-y-4">
                    <p className="text-4xl font-bold text-foreground">{currentCard.term}</p>
                    <p className="text-muted-foreground">Click to reveal</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 flex flex-col  bg-primary text-primary-foreground backface-hidden rounded-xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg)',
                }}
              >
                <div className="flex items-center justify-end gap-3 px-6 pt-9 ">
                  {isOwner && (
                    <button
                      onClick={() => setEditCard(currentCard)}
                      className=" hover:cursor-pointer relative z-50"
                    >
                      <Edit2Icon className="size-5 text-muted-foreground hover:text-black/80" />
                    </button>
                  )}
                </div>
                <div className="flex items-center flex-1 justify-center p-10 pt-0">
                  <div className="text-center space-y-4">
                    <p className="text-4xl font-bold">{currentCard.definition}</p>
                    <p className="text-primary-foreground/80">Click to flip back</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 z-30" onClick={handleFlip} />
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-3 ">
        <div className=""></div>
        <div className="flex items-center justify-center  gap-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            title="Previous"
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="size-5" />
          </Button>

          <div>
            <p className="text-foreground font-semibold">
              {currentIndex + 1} / {flashcards.length}
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            title="Next"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button
            onClick={() => {
              setIsFlipped(false);
              setIsPlayingAuto((prev) => !prev);
            }}
            variant={isPlayingAuto ? 'default' : 'outline'}
            size="lg"
            title={isPlayingAuto ? 'Pause' : 'Play'}
          >
            {isPlayingAuto ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            onClick={handleShuffleMode}
            variant={isShuffle ? 'default' : 'outline'}
            size="lg"
            title="Shuffle"
          >
            <ShuffleIcon />
          </Button>
        </div>
      </div>
      {isOwner && (
        <EditFlashcardModal open={!!editCard} onChange={() => setEditCard(null)} card={editCard} />
      )}
    </div>
  );
};

export default FlashcardPractice;
