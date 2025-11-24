import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Brain, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import Loading from '@/components/ui/loading';

const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'var(--gradient-hero)' }} />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Master Any Language</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Learn Languages with
              <span className="text-primary"> Interactive Flashcards</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Boost your vocabulary and master new languages through engaging flashcards and
              challenging quizzes. Practice daily and track your progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/collections">
                <Button size="lg" className="text-lg px-8 py-5 ">
                  Start Learning
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="text-lg px-8 py-5">
                  Take a Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose LinguaLearn?
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to master a new language
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 space-y-4 border-2 hover:border-accent transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Smart Flashcards</h3>
              <p className="text-muted-foreground">
                Interactive flashcards that adapt to your learning pace and help you memorize
                vocabulary effectively.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-2 hover:border-accent transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Practice Quizzes</h3>
              <p className="text-muted-foreground">
                Test your knowledge with interactive quizzes and get instant feedback on your
                answers.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-2 hover:border-accent transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your learning journey with detailed stats and celebrate your achievements.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center space-y-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners mastering new languages every day with our proven flashcard
              system.
            </p>
            <Link to="/flashcards">
              <Button size="lg" className="text-lg px-8">
                Get Started Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 LinguaLearn.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
