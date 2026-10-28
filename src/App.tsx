import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Home, Login, SignUp } from './pages'
import { AuthGuard } from './components'

const client = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
})

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<AuthGuard mode="private" />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<AuthGuard mode="public" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
