import { Card } from '@/components/ui/card';
import { TrendingUp, BookOpen, Trophy, Target, Calendar, Flame } from 'lucide-react';
import { Progress as ProgressBar } from '@/components/ui/progress';

const Progress = () => {
  // Sample data - in a real app, this would come from a database
  const stats = {
    totalCards: 47,
    cardsLearned: 32,
    quizzesTaken: 12,
    averageScore: 78,
    currentStreak: 7,
    longestStreak: 14,
    timeSpent: 340, // minutes
    lastPractice: 'Today',
  };

  const recentActivity = [
    { date: 'Today', action: 'Practiced 15 flashcards', type: 'flashcard' },
    { date: 'Today', action: 'Completed quiz with 80% score', type: 'quiz' },
    { date: 'Yesterday', action: 'Added 5 new flashcards', type: 'add' },
    { date: 'Yesterday', action: 'Practiced 20 flashcards', type: 'flashcard' },
    { date: '2 days ago', action: 'Completed quiz with 75% score', type: 'quiz' },
  ];

  const languageProgress = [
    { language: 'French', cards: 25, learned: 18, progress: 72 },
    { language: 'Spanish', cards: 12, learned: 8, progress: 67 },
    { language: 'German', cards: 10, learned: 6, progress: 60 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              Your Progress
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your learning journey and achievements
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 text-primary" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{stats.totalCards}</div>
                  <div className="text-sm text-muted-foreground">Total Cards</div>
                </div>
              </div>
              <ProgressBar value={(stats.cardsLearned / stats.totalCards) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground mt-2">{stats.cardsLearned} learned</div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8 text-warning" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{stats.averageScore}%</div>
                  <div className="text-sm text-muted-foreground">Avg Score</div>
                </div>
              </div>
              <ProgressBar value={stats.averageScore} className="h-2" />
              <div className="text-xs text-muted-foreground mt-2">
                {stats.quizzesTaken} quizzes taken
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8 text-destructive" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{stats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
              <ProgressBar
                value={(stats.currentStreak / stats.longestStreak) * 100}
                className="h-2"
              />
              <div className="text-xs text-muted-foreground mt-2">
                Best: {stats.longestStreak} days
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-accent" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {Math.floor(stats.timeSpent / 60)}h {stats.timeSpent % 60}m
                  </div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Last practice: {stats.lastPractice}
              </div>
            </Card>
          </div>

          {/* Language Progress */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Language Progress
            </h2>
            <div className="space-y-6">
              {languageProgress.map((lang) => (
                <div key={lang.language} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{lang.language}</div>
                      <div className="text-sm text-muted-foreground">
                        {lang.learned} of {lang.cards} cards learned
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{lang.progress}%</div>
                  </div>
                  <ProgressBar value={lang.progress} className="h-3" />
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'quiz'
                        ? 'bg-success'
                        : activity.type === 'flashcard'
                        ? 'bg-primary'
                        : 'bg-accent'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{activity.action}</div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-warning" />
              Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border-2 border-success bg-success/5">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-semibold text-foreground">First Steps</div>
                <div className="text-sm text-muted-foreground">Created 10 flashcards</div>
              </div>
              <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                <div className="text-3xl mb-2">📚</div>
                <div className="font-semibold text-foreground">Dedicated Learner</div>
                <div className="text-sm text-muted-foreground">7 day streak</div>
              </div>
              <div className="p-4 rounded-lg border-2 border-warning bg-warning/5">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-semibold text-foreground">Quiz Master</div>
                <div className="text-sm text-muted-foreground">Score 80%+ on 5 quizzes</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
