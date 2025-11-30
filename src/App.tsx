import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/sonner';
import { router } from './core/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './shared/contexts/themeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors closeButton duration={2000} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
