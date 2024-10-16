import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Gallery, UsersPrompts, Prompt } from './pages';
import './index.css';
import { ThemeProvider } from "@/components/theme-provider"

const router = createBrowserRouter([
  {
    path: "/",
    element:  <UsersPrompts />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/prompt",
    element: <Prompt />,
  }
], {
  basename: "/imagine"
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
