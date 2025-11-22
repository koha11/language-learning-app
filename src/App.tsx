import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/sonner';
import { router } from './core/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors closeButton duration={2000} />
      </QueryClientProvider>
    </>
  );
}

export default App;
